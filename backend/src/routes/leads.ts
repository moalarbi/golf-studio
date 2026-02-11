import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

const createLeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  serviceType: z.enum(['store', 'marketing']),
  options: z.array(z.string()),
  totalPrice: z.number().int().min(0),
  source: z.string().optional(),
});

const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']).optional(),
  notes: z.string().optional(),
});

// Create lead (public)
router.post('/', async (req, res) => {
  try {
    const data = createLeadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        serviceType: data.serviceType,
        optionsJson: JSON.stringify(data.options),
        totalPrice: data.totalPrice,
        source: data.source,
        status: 'new',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead: {
        id: lead.id,
        name: lead.name,
        serviceType: lead.serviceType,
        totalPrice: lead.totalPrice,
      },
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(400).json({ 
      success: false,
      error: 'Invalid request data' 
    });
  }
});

// Get all leads (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      serviceType: lead.serviceType,
      options: JSON.parse(lead.optionsJson),
      totalPrice: lead.totalPrice,
      source: lead.source,
      status: lead.status,
      notes: lead.notes,
      createdAt: lead.createdAt,
    })));
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Update lead (admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = updateLeadSchema.parse(req.body);

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
      },
    });

    res.json({
      success: true,
      lead: {
        id: lead.id,
        status: lead.status,
        notes: lead.notes,
      },
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(400).json({ error: 'Failed to update lead' });
  }
});

export default router;
