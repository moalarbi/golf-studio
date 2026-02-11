import { useEffect } from 'react';
import { ArrowLeft, TrendingUp, Users, ShoppingCart } from 'lucide-react';

const CaseStudies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cases = [
    {
      id: 1,
      title: 'متجر الأزياء الفاخرة',
      category: 'إنشاء متجر',
      beforeStats: { label: 'المبيعات الشهرية', value: '0 ريال' },
      afterStats: { label: 'المبيعات الشهرية', value: '150,000 ريال' },
      description: 'إنشاء متجر احترافي على منصة سلة مع تصميم مخصص وإضافة 50 منتج',
      icon: <ShoppingCart className="w-6 h-6" />,
      results: [
        { label: 'عدد المنتجات', value: '50+' },
        { label: 'معدل التحويل', value: '3.5%' },
        { label: 'العملاء', value: '500+' },
      ],
    },
    {
      id: 2,
      title: 'حملة تسويقية متكاملة',
      category: 'تسويق إلكتروني',
      beforeStats: { label: 'الزيارات اليومية', value: '50 زيارة' },
      afterStats: { label: 'الزيارات اليومية', value: '2,000 زيارة' },
      description: 'إدارة حملات إعلانية على Google وSnapchat مع تحسين معدل التحويل',
      icon: <TrendingUp className="w-6 h-6" />,
      results: [
        { label: 'نسبة النقر', value: '4.2%' },
        { label: 'الاستقطاع', value: '-40%' },
        { label: 'العائد', value: '350%' },
      ],
    },
    {
      id: 3,
      title: 'متجر المكملات الغذائية',
      category: 'إنشاء + تسويق',
      beforeStats: { label: 'عدد العملاء', value: '0 عميل' },
      afterStats: { label: 'عدد العملاء', value: '1,200 عميل' },
      description: 'بناء متجر متكامل مع استراتيجية تسويقية شاملة',
      icon: <Users className="w-6 h-6" />,
      results: [
        { label: 'المبيعات', value: '300K+' },
        { label: 'معدل الاحتفاظ', value: '65%' },
        { label: 'التقييم', value: '4.8/5' },
      ],
    },
  ];

  return (
    <div className="min-h-screen neu-bg pb-20" dir="rtl">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="#/" className="neu-button p-2">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-xl font-bold text-gray-800">قصص النجاح</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="neu-card p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              نتائج حقيقية لعملائنا
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              تعرف على كيفية مساعدتنا لرواد الأعمال في بناء متاجر ناجحة وتحقيق مبيعات مستدامة
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {cases.map((caseStudy) => (
            <div key={caseStudy.id} className="neu-card p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    {caseStudy.icon}
                  </div>
                  <div>
                    <span className="text-xs text-emerald-600 font-medium">{caseStudy.category}</span>
                    <h3 className="text-lg font-bold text-gray-800">{caseStudy.title}</h3>
                  </div>
                </div>
              </div>

              {/* Before/After */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="neu-card-inset p-4">
                  <p className="text-sm text-gray-500 mb-1">قبل</p>
                  <p className="text-xl font-bold text-gray-400">{caseStudy.beforeStats.value}</p>
                  <p className="text-xs text-gray-400">{caseStudy.beforeStats.label}</p>
                </div>
                <div className="neu-card-inset p-4 bg-emerald-50">
                  <p className="text-sm text-emerald-600 mb-1">بعد</p>
                  <p className="text-xl font-bold text-emerald-600">{caseStudy.afterStats.value}</p>
                  <p className="text-xs text-emerald-600">{caseStudy.afterStats.label}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{caseStudy.description}</p>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="text-center p-3 neu-card-inset rounded-xl">
                    <p className="text-lg font-bold text-emerald-600">{result.value}</p>
                    <p className="text-xs text-gray-500">{result.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="neu-card p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              جاهز تكون قصة النجاح القادمة؟
            </h3>
            <p className="text-gray-600 mb-4">
              ابدأ رحلتك في عالم التجارة الإلكترونية مع GOLF STUDIO
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#/builder-store" className="neu-button-primary px-6 py-3 font-semibold">
                ابدأ متجرك
              </a>
              <a href="#/contact" className="neu-button px-6 py-3 font-semibold text-gray-700">
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
