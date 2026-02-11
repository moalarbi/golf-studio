import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/types';
import { getPosts } from '@/services/api';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    // Fallback data if API is not available
    if (data.length === 0) {
      setPosts([
        {
          id: '1',
          title: 'كيف تبدأ متجرك الإلكتروني في 2024',
          slug: 'how-to-start-ecommerce-2024',
          content: 'المحتوى هنا...',
          seoTitle: 'دليلك الشامل لبدء متجر إلكتروني ناجح',
          seoDescription: 'تعرف على الخطوات الأساسية لإنشاء متجر إلكتروني ناجح في 2024',
          tags: ['تجارة إلكترونية', 'ريادة أعمال'],
          status: 'published',
          publishedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: '5 استراتيجيات تسويقية فعّالة للمتاجر',
          slug: '5-marketing-strategies',
          content: 'المحتوى هنا...',
          seoTitle: '5 استراتيجيات تسويقية لزيادة مبيعات متجرك',
          seoDescription: 'استراتيجيات تسويقية مجربة لزيادة المبيعات والوصول لعملاء جدد',
          tags: ['تسويق', 'إعلانات'],
          status: 'published',
          publishedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'أخطاء شائعة يجب تجنبها في التجارة الإلكترونية',
          slug: 'common-ecommerce-mistakes',
          content: 'المحتوى هنا...',
          seoTitle: 'تجنب هذه الأخطاء في متجرك الإلكتروني',
          seoDescription: 'أخطاء شائعة تؤثر على نجاح متجرك الإلكتروني وكيفية تجنبها',
          tags: ['نصائح', 'تجارة إلكترونية'],
          status: 'published',
          publishedAt: new Date().toISOString(),
        },
      ]);
    } else {
      setPosts(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen neu-bg pb-20" dir="rtl">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="#/" className="neu-button p-2">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-xl font-bold text-gray-800">المدونة</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Blog Posts */}
      <div className="px-4">
        <div className="max-w-4xl mx-auto">
          <div className="neu-card p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">آخر المقالات</h2>
            <p className="text-gray-600 text-sm">نصائح وإرشادات في التجارة الإلكترونية</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="neu-card p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <a 
                  key={post.id}
                  href={`#/blog/${post.slug}`}
                  className="block neu-card p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.seoDescription}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt || '').toLocaleDateString('ar-SA')}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
