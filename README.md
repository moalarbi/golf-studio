# GOLF STUDIO ⛳

موقع تحويل (Conversion Engine) لخدمات إنشاء وإطلاق المتاجر الإلكترونية + تسويق المتاجر.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🔗 الروابط

- **الموقع المباشر**: https://golf-studio.github.io/golf-studio/
- **API**: https://your-railway-app.up.railway.app

## ✨ المميزات

- ✅ تصميم Neumorphism حديث وأنيق
- ✅ حساب تسعير مباشر للخدمات
- ✅ إرسال الطلبات عبر واتساب
- ✅ لوحة تحكم Admin كاملة
- ✅ إدارة المدونة (Blog)
- ✅ تتبع العملاء المحتملين (Leads)
- ✅ تصميم متجاوب (Mobile-First)

## 📸 لقطات الشاشة

### الصفحة الرئيسية
![Home](https://via.placeholder.com/800x400?text=Home+Page)

### حاسبة التسعير
![Builder](https://via.placeholder.com/800x400?text=Pricing+Builder)

### لوحة التحكم
![Admin](https://via.placeholder.com/800x400?text=Admin+Dashboard)

## 🛠️ التقنيات المستخدمة

### Frontend
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

### Backend
- [Node.js](https://nodejs.org/) - Runtime
- [Express](https://expressjs.com/) - Web framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Prisma](https://www.prisma.io/) - ORM
- [JWT](https://jwt.io/) - Authentication

## 🚀 التشغيل المحلي

### متطلبات النظام
- Node.js 18+
- PostgreSQL 14+

### Frontend

```bash
# استنساخ المستودع
git clone https://github.com/golf-studio/golf-studio.git
cd golf-studio

# تثبيت التبعيات
npm install

# إعداد متغيرات البيئة
cp .env.example .env
# عدل ملف .env وأضف:
# VITE_API_BASE_URL=http://localhost:3000
# VITE_WHATSAPP_NUMBER=966500000000

# تشغيل خادم التطوير
npm run dev
```

### Backend

```bash
cd backend

# تثبيت التبعيات
npm install

# إعداد متغيرات البيئة
cp .env.example .env
# عدل ملف .env وأضف:
# DATABASE_URL=postgresql://user:password@localhost:5432/golf_studio
# JWT_SECRET=your-secret-key
# CORS_ORIGIN=http://localhost:5173

# تشغيل migrations
npx prisma migrate dev

# تشغيل الخادم
npm run dev
```

## 📁 هيكل المشروع

```
golf-studio/
├── src/                    # Frontend source
│   ├── pages/             # React pages
│   │   ├── Home.tsx
│   │   ├── StoreBuilder.tsx
│   │   ├── MarketingBuilder.tsx
│   │   ├── Blog.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── components/        # Shared components
│   ├── services/          # API services
│   ├── data/              # Static data
│   ├── types/             # TypeScript types
│   └── App.tsx            # Main app component
├── backend/               # Backend source
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── index.ts       # Entry point
│   └── prisma/            # Database schema
├── dist/                  # Build output
├── .github/workflows/     # GitHub Actions
└── package.json
```

## 🌐 النشر

### Frontend - GitHub Pages

1. ارفع المشروع على GitHub
2. اذهب إلى **Settings > Pages**
3. اختر **Source: GitHub Actions**
4. سيتم النشر تلقائياً عند كل push على فرع `main`

### Backend - Railway

1. اربط مستودع GitHub بـ Railway
2. أضف متغيرات البيئة:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CORS_ORIGIN`
3. Railway سينشر تلقائياً

## 🔧 الإعدادات

### إنشاء مستخدم Admin أولي

```bash
cd backend

# تشغيل سكريبت الإعداد
npm run setup

# أو عبر API
POST /api/auth/setup
{
  "name": "Admin",
  "email": "admin@golfstudio.sa",
  "password": "your-password"
}
```

### تعديل الأسعار

عدل ملف `src/data/pricing.ts`:

```typescript
export const storePricing: PricingCategory[] = [
  {
    id: 'legal',
    name: 'الوثائق القانونية',
    options: [
      { id: 'freelance-doc', name: 'وثيقة عمل حر', price: 500, category: 'legal' },
      // ...
    ],
  },
];
```

## 📝 API Endpoints

### Auth
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/setup` - إنشاء admin أولي

### Leads
- `GET /api/leads` - قائمة العملاء (admin)
- `POST /api/leads` - إنشاء عميل جديد (public)
- `PATCH /api/leads/:id` - تحديث عميل (admin)

### Posts
- `GET /api/posts` - قائمة المقالات
- `GET /api/posts/:slug` - مقال واحد
- `POST /api/posts` - إنشاء مقال (admin)
- `PATCH /api/posts/:id` - تحديث مقال (admin)
- `DELETE /api/posts/:id` - حذف مقال (admin)

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المستودع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص بموجب [MIT License](LICENSE).

## 👨‍💻 المطور

**GOLF STUDIO** - [golf-studio.github.io](https://golf-studio.github.io/golf-studio/)

---

<p align="center">
  صنع بـ ❤️ في المملكة العربية السعودية
</p>
