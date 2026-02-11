import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { login } from '@/services/api';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.token) {
      localStorage.setItem('adminToken', result.token);
      toast.success('تم تسجيل الدخول بنجاح');
      onLogin(result.token);
    } else {
      toast.error(result.error || 'بيانات الدخول غير صحيحة');
    }
    
    setLoading(false);
  };

  // Demo login for development
  const handleDemoLogin = () => {
    const demoToken = 'demo-token-12345';
    localStorage.setItem('adminToken', demoToken);
    toast.success('تسجيل دخول تجريبي');
    onLogin(demoToken);
  };

  return (
    <div className="min-h-screen neu-bg flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="neu-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
            <p className="text-gray-600 mt-2">GOLF STUDIO Admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@golfstudio.sa"
                  className="neu-input w-full pr-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="neu-input w-full pr-10 pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neu-button-primary w-full py-4 font-semibold disabled:opacity-50"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Demo login button for development */}
          <button
            onClick={handleDemoLogin}
            className="w-full mt-4 text-sm text-gray-500 hover:text-emerald-600 underline"
          >
            دخول تجريبي (للتطوير)
          </button>

          <div className="mt-6 text-center">
            <a href="#/" className="text-sm text-gray-500 hover:text-emerald-600">
              العودة للموقع
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
