import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, ArrowRight, ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getPosts } from "@/lib/repository";
import { PageHero } from "@/components/site";
import type { PostItem } from "@/data/types";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      {
        title: "مدونة التثقيف السريري وصحة الأسنان | Dental Blog — Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "مقالات وإرشادات توعوية من أطباء عيادة دبي لطب الأسنان: زراعة الأسنان، تقويم الأسنان، تجميل الأسنان، والعناية بصحة الفم.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const { data: posts = [] } = useQuery<PostItem[]>({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "مدونة التثقيف السريري وصحة الأسنان" : "Dental Education & Health Guides"}
        sub={
          isAr
            ? "مقالات ومعلومات مبسطة لمساعدتك في فهم الإجراءات والعناية بابتسامتك وصحة فم عائلتك."
            : "Clear, reassuring educational articles crafted by our dental clinicians to guide your daily oral health."
        }
        crumb={isAr ? "المدونة" : "Blog"}
      />

      <section className="container-x py-16">
        <div className="mb-10">
          <span className="eyebrow">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>{isAr ? "مقالات توعوية" : "Clinical Articles"}</span>
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "أحدث موضوعات صحة وتجميل الأسنان" : "Latest Guides & Insights"}
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="rounded-3xl border border-[#C2A06A]/20 bg-white p-7 shadow-xs hover:border-[#C2A06A]/60 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#16372F]/60 mb-4">
                  <span className="font-mono">{p.publishedAt[lang]}</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-[#C2A06A]" />
                    {p.readTime[lang]}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#0E1F1C] group-hover:text-[#C2A06A] transition-colors mb-3">
                  {p.title[lang]}
                </h3>

                <p className="text-xs leading-relaxed text-[#16372F]/70 line-clamp-3">
                  {p.excerpt[lang]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C2A06A]/15 flex items-center justify-between text-xs font-bold text-[#0E1F1C]">
                <span>{isAr ? "قراءة المقال" : "Read Article"}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 text-[#C2A06A] group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#C2A06A] group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
