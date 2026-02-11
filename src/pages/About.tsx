import { useEffect } from 'react';
import { ArrowLeft, Target, Lightbulb, Heart, Award } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: 'التركيز على النتائج',
      description: 'نهدف لتحقيق نتائج ملموسة لعملائنا وليس مجرد تسليم مشروع',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-emerald-600" />,
      title: 'الابتكار المستمر',
      description: 'نتابع أحدث التقنيات والاستراتيجيات لتقديم الأفضل دائماً',
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      title: 'الشغف بالعمل',
      description: 'نحب ما نعمله ونعتبر نجاح عملائنا نجاحاً لنا',
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: 'الجودة أولاً',
      description: 'لا نساوم على الجودة في أي مرحلة من مراحل العمل',
    },
  ];

  const process = [
    { step: '01', title: 'الاستشارة', desc: 'نفهم احتياجاتك وأهدافك' },
    { step: '02', title: 'التخطيط', desc: 'نضع خطة عمل واضحة' },
    { step: '03', title: 'التنفيذ', desc: 'ننفذ بإتقان واهتمام' },
    { step: '04', title: 'المتابعة', desc: 'ندعمك بعد التسليم' },
  ];

  return (
    <div className="min-h-screen neu-bg pb-20" dir="rtl">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="#/" className="neu-button p-2">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-xl font-bold text-gray-800">عن GOLF STUDIO</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="neu-card p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              GOLF STUDIO
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              شريكك الموثوق في عالم التجارة الإلكترونية
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              نحن فريق متخصص في إنشاء المتاجر الإلكترونية والتسويق الرقمي، 
              نساعد رواد الأعمال والشركات على بناء حضور رقمي قوي وتحقيق مبيعات مستدامة.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="neu-card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">رسالتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                تمكين رواد الأعمال في المملكة العربية السعودية من بناء متاجر إلكترونية 
                ناجحة من خلال حلول تقنية وتسويقية مبتكرة وموثوقة.
              </p>
            </div>
            <div className="neu-card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نكون الشريك الأول للشركات الناشئة في رحلتها الرقمية، 
                وأن نساهم في نجاح 1000 متجر إلكتروني بحلول عام 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">قيمنا</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="neu-card p-6">
                <div className="mb-4">{value.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">منهجيتنا في العمل</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {process.map((item, index) => (
              <div key={index} className="neu-card p-4 text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-2">{item.step}</div>
                <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {[
              { number: '+50', label: 'متجر منشأ' },
              { number: '+100', label: 'عميل سعيد' },
              { number: '3+', label: 'سنوات خبرة' },
            ].map((stat, index) => (
              <div key={index} className="neu-card p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
