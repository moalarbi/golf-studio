import { useState, useEffect } from 'react';
import { 
  Users, FileText, Settings, LogOut, 
  Search, Edit2, Trash2, Plus,
  Save, X
} from 'lucide-react';
import { toast } from 'sonner';
import type { Lead, BlogPost } from '@/types';
import { getLeads, updateLead, getPosts, createPost, updatePost, deletePost } from '@/services/api';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'blog' | 'settings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const token = localStorage.getItem('adminToken') || '';

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'leads') {
      const data = await getLeads(token);
      setLeads(data.length > 0 ? data : getMockLeads());
    } else if (activeTab === 'blog') {
      const data = await getPosts();
      setPosts(data.length > 0 ? data : getMockPosts());
    }
    setLoading(false);
  };

  const getMockLeads = (): Lead[] => [
    { id: '1', name: 'أحمد محمد', phone: '0501234567', serviceType: 'store', options: ['إنشاء متجر سلة', 'تصميم شعار'], totalPrice: 2800, status: 'new', createdAt: new Date().toISOString() },
    { id: '2', name: 'سارة عبدالله', phone: '0559876543', serviceType: 'marketing', options: ['إطلاق حملة إعلانية'], totalPrice: 1500, status: 'contacted', createdAt: new Date().toISOString() },
    { id: '3', name: 'خالد العلي', phone: '0561112233', serviceType: 'store', options: ['وثيقة عمل حر', 'إنشاء متجر سلة', 'إضافة 20 منتج'], totalPrice: 3100, status: 'qualified', createdAt: new Date().toISOString() },
  ];

  const getMockPosts = (): BlogPost[] => [
    { id: '1', title: 'كيف تبدأ متجرك الإلكتروني', slug: 'start-ecommerce', content: 'المحتوى...', status: 'published', publishedAt: new Date().toISOString() },
    { id: '2', title: 'استراتيجيات التسويق الفعّالة', slug: 'marketing-strategies', content: 'المحتوى...', status: 'draft' },
  ];

  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    const success = await updateLead(leadId, { status: newStatus }, token);
    if (success) {
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      toast.success('تم تحديث الحالة');
    }
  };

  const handleSavePost = async (post: BlogPost) => {
    if (post.id) {
      const success = await updatePost(post.id, post, token);
      if (success) {
        setPosts(posts.map(p => p.id === post.id ? post : p));
        toast.success('تم تحديث المقال');
      }
    } else {
      const success = await createPost(post, token);
      if (success) {
        setPosts([...posts, { ...post, id: Date.now().toString() }]);
        toast.success('تم إنشاء المقال');
      }
    }
    setShowPostModal(false);
    setEditingPost(null);
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      const success = await deletePost(postId, token);
      if (success) {
        setPosts(posts.filter(p => p.id !== postId));
        toast.success('تم حذف المقال');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      qualified: 'bg-purple-100 text-purple-700',
      won: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700',
    };
    const labels: Record<string, string> = {
      new: 'جديد',
      contacted: 'تم التواصل',
      qualified: 'مؤهل',
      won: 'تم البيع',
      lost: 'خسر',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen neu-bg" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-64 neu-card z-40 hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-8">GOLF STUDIO</h1>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'leads' ? 'bg-emerald-500 text-white' : 'neu-button text-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              العملاء المحتملين
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'blog' ? 'bg-emerald-500 text-white' : 'neu-button text-gray-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              المدونة
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'settings' ? 'bg-emerald-500 text-white' : 'neu-button text-gray-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              الإعدادات
            </button>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-[#F5F6F7] z-30 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-gray-800">لوحة التحكم</h1>
          <button onClick={onLogout} className="neu-button p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {['leads', 'blog', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab ? 'bg-emerald-500 text-white' : 'neu-button text-gray-700'
              }`}
            >
              {tab === 'leads' && 'العملاء'}
              {tab === 'blog' && 'المدونة'}
              {tab === 'settings' && 'الإعدادات'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="md:mr-64 p-4 md:p-8 pt-24 md:pt-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث..."
              className="neu-input w-full pr-10"
            />
          </div>
        </div>

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">العملاء المحتملين</h2>
              <span className="text-gray-500">{filteredLeads.length} عميل</span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="neu-card p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="neu-card p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-800">{lead.name}</h3>
                          {getStatusBadge(lead.status || 'new')}
                        </div>
                        <p className="text-gray-600 text-sm">{lead.phone}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          الخدمة: {lead.serviceType === 'store' ? 'إنشاء متجر' : 'تسويق'}
                        </p>
                        {lead.options.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {lead.options.map((opt, i) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {opt}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-emerald-600">
                          {lead.totalPrice.toLocaleString()} ريال
                        </p>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id!, e.target.value as Lead['status'])}
                          className="neu-input mt-2 text-sm"
                        >
                          <option value="new">جديد</option>
                          <option value="contacted">تم التواصل</option>
                          <option value="qualified">مؤهل</option>
                          <option value="won">تم البيع</option>
                          <option value="lost">خسر</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">المقالات</h2>
              <button
                onClick={() => {
                  setEditingPost({ title: '', slug: '', content: '', status: 'draft' });
                  setShowPostModal(true);
                }}
                className="neu-button-primary px-4 py-2 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                مقال جديد
              </button>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="neu-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800">{post.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {post.status === 'published' ? 'منشور' : 'مسودة'}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">/{post.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setShowPostModal(true);
                        }}
                        className="neu-button p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id!)}
                        className="neu-button p-2 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">الإعدادات</h2>
            <div className="neu-card p-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4">إعدادات عامة</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">رقم الواتساب</label>
                  <input
                    type="text"
                    defaultValue="966500000000"
                    className="neu-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    defaultValue="info@golfstudio.sa"
                    className="neu-input w-full"
                  />
                </div>
                <button className="neu-button-primary px-6 py-2">
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Post Modal */}
      {showPostModal && editingPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="neu-bg rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {editingPost.id ? 'تعديل مقال' : 'مقال جديد'}
              </h3>
              <button
                onClick={() => {
                  setShowPostModal(false);
                  setEditingPost(null);
                }}
                className="neu-button p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">العنوان</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="neu-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">الرابط (Slug)</label>
                <input
                  type="text"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  className="neu-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">المحتوى</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={6}
                  className="neu-input w-full resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">الحالة</label>
                <select
                  value={editingPost.status}
                  onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as 'draft' | 'published' })}
                  className="neu-input w-full"
                >
                  <option value="draft">مسودة</option>
                  <option value="published">منشور</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleSavePost(editingPost)}
                  className="neu-button-primary flex-1 py-3 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  حفظ
                </button>
                <button
                  onClick={() => {
                    setShowPostModal(false);
                    setEditingPost(null);
                  }}
                  className="neu-button flex-1 py-3"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
