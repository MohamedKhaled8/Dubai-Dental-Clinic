import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Clock, Stethoscope, Calendar, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getPostBySlug, getPosts } from "@/lib/repository";
import { postsData } from "@/data/posts";
import { PageHero } from "@/components/site";
import type { PostItem } from "@/data/types";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      {
        title: "المقال التثقيفي السريري | مدونة مركز دبي لطب الأسنان بالهرم",
      },
      {
        name: "description",
        content:
          "مقالات توعوية ومعلومات طبية معتمدة من استشاريي مركز دبي لطب وتجميل وجراحة الأسنان بالهرم.",
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";

  const fallbackPost = postsData.find((p) => p.slug === slug || p.id === slug) ?? null;

  const { data: post = fallbackPost, isLoading } = useQuery<PostItem | null>({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
    initialData: fallbackPost,
  });

  const { data: allPosts = postsData } = useQuery<PostItem[]>({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    initialData: postsData,
  });

  if (isLoading && !post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FBF9F4]">
        <div className="w-10 h-10 rounded-full border-2 border-[#C2A06A] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FBF9F4] px-4">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "المقال غير موجود" : "Article Not Found"}
          </h1>
          <p className="mt-3 text-sm text-[#16372F]/70">
            {isAr
              ? "لم يتم العثور على المقال المطلوب. يمكنك استعراض باقي موضوعات المدونة التثقيفية."
              : "The requested article was not found. Please explore our dental education blog."}
          </p>
          <div className="mt-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E1F1C] px-6 py-3 text-xs font-bold text-[#C2A06A] shadow-md hover:bg-[#16372F] transition-all"
            >
              <span>{isAr ? "العودة للمدونة" : "Back to Blog"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={tr(post.title)}
        sub={tr(post.excerpt)}
        crumb={tr(post.title)}
      />

      <article className="container-x py-12 lg:py-16 max-w-4xl">
        <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-14 shadow-sm">
          {/* Article Header Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C2A06A]/20 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0E1F1C] text-[#C2A06A] shadow-sm">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <p className="font-serif font-bold text-xs sm:text-sm text-[#0E1F1C]">
                  {isAr
                    ? "إشراف الفريق الطبي — مركز دبي لطب الأسنان"
                    : "Supervised by Dubai Dental Clinical Team — Al-Haram"}
                </p>
                <p className="text-[11px] text-[#16372F]/65 mt-0.5">٢٠ شارع عز الدين عمر، الطالبية، الهرم</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#16372F]/70">
              <Clock className="w-4 h-4 text-[#C2A06A]" />
              <span>{tr(post.readTime)}</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="mt-8 space-y-5 text-sm md:text-base leading-relaxed text-[#16372F]/85">
            {Array.isArray(post.content) &&
              post.content.map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {tr(para)}
                </p>
              ))}
          </div>

          {/* Clinical Disclaimer */}
          <div className="mt-10 rounded-2xl border border-[#C2A06A]/30 bg-[#F6F1E7] p-5 text-xs text-[#16372F] flex items-start gap-3 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-[#C2A06A] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-bold text-[#0E1F1C]">
                {isAr ? "ملاحظة توعوية: " : "Educational Disclaimer: "}
              </span>
              {isAr
                ? "المعلومات الواردة في هذا المقال إرشادية وتثقيفية، ولا تعد بديلاً عن الفحص السريري المباشر وتشخيص الطبيب المختص داخل مركز دبي لطب الأسنان بالهرم."
                : "Information in this article is for patient education and does not replace in-person diagnostic evaluation at Dubai Dental Clinic Al-Haram."}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#C2A06A]/20 pt-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#C2A06A]/40 bg-white px-5 py-2.5 text-xs font-bold text-[#0E1F1C] hover:bg-[#F6F1E7] transition-all"
            >
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{isAr ? "العودة لقائمة المقالات" : "Back to Blog"}</span>
            </Link>

            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E1F1C] px-6 py-2.5 text-xs font-bold text-[#F6F1E7] shadow-md hover:bg-[#16372F] transition-all"
            >
              <Calendar className="w-4 h-4 text-[#C2A06A]" />
              <span>{isAr ? "طلب حجز موعد" : "Book an Appointment"}</span>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-xl font-bold text-[#0E1F1C] mb-6">
              {isAr ? "مقالات أخرى قد تهمك" : "Related Reading"}
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  to="/blog/$slug"
                  params={{ slug: op.slug }}
                  className="rounded-3xl border border-[#C2A06A]/20 bg-white p-6 shadow-2xs hover:border-[#C2A06A]/60 hover:shadow-md transition-all block group"
                >
                  <h4 className="font-serif text-base font-bold text-[#0E1F1C] group-hover:text-[#C2A06A] transition-colors">
                    {tr(op.title)}
                  </h4>
                  <p className="mt-2 text-xs text-[#16372F]/70 line-clamp-2 leading-relaxed">
                    {tr(op.excerpt)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
