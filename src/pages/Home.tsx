import { useEffect } from 'react';
import { Store, TrendingUp, Zap, CheckCircle, Phone, Calendar } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen neu-bg" dir="rtl">
      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="neu-card p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              GOLF STUDIO
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              نحوّل فكرتك إلى متجر إلكتروني ناجح
            </p>
            <p className="text-gray-500">
              إنشاء متاجر • تسويق إلكتروني • نتائج مضمونة
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#/builder-store" 
              className="neu-button-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2"
            >
              <Store className="w-5 h-5" />
              ابدأ متجرك الآن
            </a>
            <a 
              href="#/builder-marketing" 
              className="neu-button px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 text-gray-700"
            >
              <TrendingUp className="w-5 h-5" />
              سوّق متجرك
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            هل تواجه هذه التحديات؟
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🤔', title: 'ما أعرف من وين أبدأ', desc: 'فكرة واضحة لكن لا تعرف كيف تنفذها' },
              { icon: '⏰', title: 'الوقت يضيع', desc: 'شهور تبحث عن مصممين ومطورين' },
              { icon: '💸', title: 'تكاليف مبهمة', desc: 'كل شركة تعطيك سعر مختلف وما تعرف الصح' },
            ].map((item, index) => (
              <div key={index} className="neu-card p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            الحل: نظام GOLF الشامل
          </h2>
          <div className="neu-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Store className="w-6 h-6 text-emerald-600" />
                  إنشاء المتاجر
                </h3>
                <ul className="space-y-3">
                  {[
                    'متجر احترافي على سلة',
                    'تصميم مخصص يعكس هويتك',
                    'إضافة المنتجات والتصنيفات',
                    'ربط بوابات الدفع',
                    'تدريب على إدارة المتجر',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  التسويق الإلكتروني
                </h3>
                <ul className="space-y-3">
                  {[
                    'حملات إعلانية مستهدفة',
                    'إدارة حسابات التواصل',
                    'تحليلات و تقارير شهرية',
                    'تحسين معدل التحويل',
                    'دعم فني مستمر',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            كيف نعمل؟
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'اختيار الخدمة', desc: 'حدد ما تحتاجه' },
              { step: '2', title: 'التسعير المباشر', desc: 'شوف السعر فوري' },
              { step: '3', title: 'التواصل', desc: 'نناقش التفاصيل' },
              { step: '4', title: 'التنفيذ', desc: 'نسلمك المتجر جاهز' },
            ].map((item, index) => (
              <div key={index} className="neu-card p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h4>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="neu-card p-8 text-center">
            <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              جاهز تبدأ مشروعك؟
            </h2>
            <p className="text-gray-600 mb-6">
              اختر الخدمة اللي تناسبك واحصل على تسعير فوري
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#/builder-store" 
                className="neu-button-primary px-6 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <Store className="w-5 h-5" />
                إنشاء متجر
              </a>
              <a 
                href="#/builder-marketing" 
                className="neu-button px-6 py-3 font-semibold flex items-center justify-center gap-2 text-gray-700"
              >
                <TrendingUp className="w-5 h-5" />
                تسويق المتجر
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar */}
      <div className="sticky-bottom">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <p className="font-bold text-gray-800">تحتاج استشارة مجانية؟</p>
            <p className="text-sm text-gray-600">تواصل معنا مباشرة</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="https://wa.me/966500000000" 
              target="_blank"
              rel="noopener noreferrer"
              className="neu-button-primary px-4 py-2 flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              واتساب
            </a>
            <a 
              href="https://calendly.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="neu-button px-4 py-2 flex items-center gap-2 text-sm text-gray-700"
            >
              <Calendar className="w-4 h-4" />
              احجز اجتماع
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
