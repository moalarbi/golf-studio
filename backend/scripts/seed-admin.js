const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@golfstudio.sa';
  const password = process.env.ADMIN_PASSWORD || 'GolfStudio2026!';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email,
      passwordHash,
      role: 'super_admin'
    }
  });

  console.log('Admin created successfully:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
