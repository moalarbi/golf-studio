import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Send, Calendar, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createLead } from '@/services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const lead = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: 'store' as const,
      options: ['تواصل عبر النموذج'],
      totalPrice: 0,
      source: window.location.href,
      notes: formData.message,
    };

    const result = await createLead(lead);
    if (result.success) {
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } else {
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className="min-h-screen neu-bg pb-20" dir="rtl">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="#/" className="neu-button p-2">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-xl font-bold text-gray-800">تواصل معنا</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Contact Info Cards */}
      <section className="px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <a 
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-gray-800 text-sm">واتساب</h3>
              <p className="text-gray-500 text-xs mt-1">تواصل مباشرة</p>
            </a>
            <a 
              href="mailto:info@golfstudio.sa"
              className="neu-card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Mail className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-gray-800 text-sm">البريد الإلكتروني</h3>
              <p className="text-gray-500 text-xs mt-1">info@golfstudio.sa</p>
            </a>
            <a 
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <Calendar className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-gray-800 text-sm">احجز اجتماع</h3>
              <p className="text-gray-500 text-xs mt-1">استشارة مجانية</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <div className="neu-card p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">أرسل لنا رسالة</h2>
            <p className="text-gray-600 text-sm mb-6">
              املأ النموذج وسنتواصل معك في أقرب وقت
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">الاسم *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك"
                    className="neu-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxxx"
                    className="neu-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="neu-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">الرسالة</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب رسالتك هنا..."
                  rows={4}
                  className="neu-input w-full resize-none"
                />
              </div>

              <button
                type="submit"
                className="neu-button-primary w-full py-4 font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="neu-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">أوقات العمل</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">الأحد - الخميس</span>
                <span className="font-semibold text-gray-800">9:00 ص - 6:00 م</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">الجمعة</span>
                <span className="font-semibold text-gray-800">مغلق</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">السبت</span>
                <span className="font-semibold text-gray-800">10:00 ص - 4:00 م</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
