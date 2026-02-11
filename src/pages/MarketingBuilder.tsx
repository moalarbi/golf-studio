import { useState, useEffect } from 'react';
import { TrendingUp, ArrowLeft, Phone, CheckCircle, Target, BarChart3, Users } from 'lucide-react';
import { marketingPricing, generateWhatsAppMessage, whatsappNumber } from '@/data/pricing';
import { createLead } from '@/services/api';
import { toast } from 'sonner';

const MarketingBuilder = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [marketingGoal, setMarketingGoal] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const getTotalPrice = () => {
    let total = 0;
    marketingPricing.forEach(category => {
      category.options.forEach(option => {
        if (selectedOptions.includes(option.id)) {
          total += option.price;
        }
      });
    });
    return total;
  };

  const getSelectedOptionsList = () => {
    const list: string[] = [];
    marketingPricing.forEach(category => {
      category.options.forEach(option => {
        if (selectedOptions.includes(option.id)) {
          list.push(option.name);
        }
      });
    });
    return list;
  };

  const handleWhatsAppClick = async () => {
    if (!customerName || !customerPhone) {
      setShowForm(true);
      toast.error('يرجى إدخال الاسم ورقم الجوال');
      return;
    }

    // Save lead to database
    const lead = {
      name: customerName,
      phone: customerPhone,
      serviceType: 'marketing' as const,
      options: [...getSelectedOptionsList(), marketingGoal].filter(Boolean),
      totalPrice: getTotalPrice(),
      source: window.location.href,
    };

    await createLead(lead);

    // Open WhatsApp
    const message = generateWhatsAppMessage(
      'marketing',
      [...getSelectedOptionsList(), marketingGoal].filter(Boolean),
      getTotalPrice(),
      customerName,
      customerPhone
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const goals = [
    { id: 'awareness', name: 'زيادة الوعي بالعلامة التجارية', icon: <Users className="w-5 h-5" /> },
    { id: 'sales', name: 'زيادة المبيعات والطلبات', icon: <Target className="w-5 h-5" /> },
    { id: 'engagement', name: 'تفاعل أكبر مع الجمهور', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen neu-bg pb-40" dir="rtl">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="#/" className="neu-button p-2">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            تسويق المتجر
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 neu-card-inset rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min((selectedOptions.length / 2) * 100, 100)}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {selectedOptions.length} اختيارات
            </span>
          </div>
        </div>
      </div>

      {/* Marketing Goals */}
      <div className="px-4 mb-6">
        <div className="max-w-4xl mx-auto neu-card p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            ما هو هدفك التسويقي؟
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setMarketingGoal(goal.name)}
                className={`p-4 rounded-xl text-center transition-all ${
                  marketingGoal === goal.name
                    ? 'bg-emerald-50 border-2 border-emerald-500'
                    : 'neu-card-inset hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-center mb-2 text-emerald-600">
                  {goal.icon}
                </div>
                <span className="text-sm text-gray-800">{goal.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {marketingPricing.map((category) => (
            <div key={category.id} className="neu-card p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.options.map((option) => (
                  <label 
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                      selectedOptions.includes(option.id) 
                        ? 'bg-emerald-50 border-2 border-emerald-500' 
                        : 'neu-card-inset'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => toggleOption(option.id)}
                        className="neu-checkbox"
                      />
                      <span className="text-gray-800">{option.name}</span>
                    </div>
                    <span className="font-bold text-emerald-600">
                      {option.price.toLocaleString()} ريال
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Form */}
      {showForm && (
        <div className="px-4 mt-6">
          <div className="max-w-4xl mx-auto neu-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">معلومات التواصل</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">الاسم</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="neu-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">رقم الجوال</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="neu-input w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Summary Bar */}
      <div className="sticky-bottom">
        <div className="max-w-4xl mx-auto">
          {/* Selected Options Summary */}
          {(selectedOptions.length > 0 || marketingGoal) && (
            <div className="mb-4 p-4 neu-card-inset rounded-xl">
              <p className="text-sm text-gray-600 mb-2">الخيارات المختارة:</p>
              <div className="flex flex-wrap gap-2">
                {marketingGoal && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    الهدف: {marketingGoal}
                  </span>
                )}
                {getSelectedOptionsList().map((option, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Total and CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600">الإجمالي التقريبي</p>
              <p className="text-2xl font-bold text-emerald-600">
                {getTotalPrice().toLocaleString()} ريال
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              {!showForm && (selectedOptions.length > 0 || marketingGoal) && (
                <button
                  onClick={() => setShowForm(true)}
                  className="neu-button flex-1 sm:flex-none px-6 py-3 font-semibold text-gray-700"
                >
                  متابعة
                </button>
              )}
              {(selectedOptions.length > 0 || marketingGoal) && (
                <button
                  onClick={handleWhatsAppClick}
                  className="neu-button-primary flex-1 sm:flex-none px-6 py-3 font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  إرسال للواتساب
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingBuilder;
