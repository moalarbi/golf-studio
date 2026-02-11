import type { PricingCategory } from '@/types';

export const storePricing: PricingCategory[] = [
  {
    id: 'legal',
    name: 'الوثائق القانونية',
    options: [
      { id: 'freelance-doc', name: 'وثيقة عمل حر', price: 500, category: 'legal' },
      { id: 'commercial-reg', name: 'سجل تجاري', price: 1200, category: 'legal' },
    ],
  },
  {
    id: 'branding',
    name: 'الهوية البصرية',
    options: [
      { id: 'logo-design', name: 'تصميم شعار', price: 800, category: 'branding' },
    ],
  },
  {
    id: 'store',
    name: 'إنشاء المتجر',
    options: [
      { id: 'salla-store', name: 'إنشاء متجر سلة', price: 2000, category: 'store' },
      { id: 'add-products', name: 'إضافة 20 منتج', price: 600, category: 'store' },
      { id: 'payment-gateway', name: 'ربط بوابات الدفع', price: 400, category: 'store' },
    ],
  },
];

export const marketingPricing: PricingCategory[] = [
  {
    id: 'ads',
    name: 'الإعلانات الممولة',
    options: [
      { id: 'ad-campaign', name: 'إطلاق حملة إعلانية', price: 1500, category: 'ads' },
    ],
  },
  {
    id: 'management',
    name: 'إدارة المتجر',
    options: [
      { id: 'first-month', name: 'إدارة شهر أول', price: 2000, category: 'management' },
    ],
  },
];

export const whatsappNumber = '966500000000';

export const generateWhatsAppMessage = (
  serviceType: 'store' | 'marketing',
  options: string[],
  total: number,
  name: string,
  phone: string
): string => {
  const serviceName = serviceType === 'store' ? 'إنشاء متجر إلكتروني' : 'تسويق المتجر الإلكتروني';
  const optionsList = options.map(opt => `- ${opt}`).join('\n');
  
  return `مرحبًا، أنا مهتم بخدمات GOLF STUDIO
الخدمة: ${serviceName}
الخيارات المختارة:
${optionsList}
الإجمالي التقريبي: ${total} ريال
الاسم: ${name}
رقم التواصل: ${phone}
أبغى أحجز اجتماع الآن.`;
};
