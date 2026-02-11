// Types for GOLF STUDIO

export interface PricingOption {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface PricingCategory {
  id: string;
  name: string;
  options: PricingOption[];
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: 'store' | 'marketing';
  options: string[];
  totalPrice: number;
  source?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
  notes?: string;
  createdAt?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  status: 'draft' | 'published';
  authorId?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  role: 'super_admin' | 'content_manager' | 'analyst';
}

export interface CaseStudy {
  id: string;
  title: string;
  beforeImage?: string;
  afterImage?: string;
  beforeStats: string;
  afterStats: string;
  description: string;
}
