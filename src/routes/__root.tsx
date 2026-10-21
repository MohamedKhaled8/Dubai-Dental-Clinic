import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/lovable-error-reporting"; // kept for error boundary
import { I18nProvider } from "../lib/i18n";
import { Header, Footer, TopInfoBar } from "../components/site";
import {
  ScrollProgress,
  MobileBottomBar,
  DesktopFloatingWhatsApp,
  CustomCursor,
} from "../components/GlobalEnhancements";
import { SiteSwitcher } from "../components/SiteSwitcher";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF9F4] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-[#0E1F1C]">404</h1>
        <h2 className="mt-4 text-xl font-bold text-[#0E1F1C]">الصفحة غير موجودة · Page Not Found</h2>
        <p className="mt-2 text-sm text-[#16372F]/70">
          لم نتمكن من العثور على الصفحة المطلوبة. يمكنك العودة إلى الصفحة الرئيسية لمركز دبي لطب الأسنان.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#0E1F1C] px-6 py-2.5 text-xs font-bold text-[#C2A06A] shadow-md transition-all hover:bg-[#16372F]"
          >
            الرئيسية · Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF9F4] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight text-[#0E1F1C]">
          حدث خطأ أثناء تحميل الصفحة · This page didn't load
        </h1>
        <p className="mt-2 text-xs text-[#16372F]/70">
          Something went wrong. Please try refreshing or return to the home page.
        </p>
        {Boolean(error) && (
          <pre className="mt-3 text-start text-[11px] font-mono text-red-700 bg-red-50/80 p-3 rounded-xl border border-red-200 overflow-x-auto max-w-md">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#0E1F1C] px-5 py-2 text-xs font-bold text-[#C2A06A] shadow-sm hover:bg-[#16372F]"
          >
            إعادة المحاولة · Retry
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#C2A06A]/40 bg-white px-5 py-2 text-xs font-bold text-[#0E1F1C] hover:bg-[#F6F1E7]"
          >
            الرئيسية · Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "مركز دبي لطب الأسنان بالهرم | Dubai Dental Clinic" },
      {
        name: "description",
        content:
          "مركز دبي لطب وجراحة وتجميل وزراعة الأسنان في الهرم، الجيزة (شارع عز الدين عمر - محطة العريش). رعاية تخصصية لطب الأسنان، علاج الجذور، زراعة وتقويم الأسنان بأحدث التقنيات.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOris = pathname === "/" || pathname === "/oris" || pathname === "/v1";
  const isV2 = pathname.startsWith("/v2");
  const isDentia = pathname.startsWith("/dentia");

  if (isOris || isV2 || isDentia) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <Outlet />
          <DesktopFloatingWhatsApp />
          <MobileBottomBar />
        </I18nProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 z-50 bg-[#0B4FC7] text-white px-4 py-2 rounded-lg font-bold shadow-lg ring-2 ring-[#0B1B3A]"
        >
          تخطي إلى المحتوى الرئيسي / Skip to content
        </a>
        <TopInfoBar />
        <Header />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
        <DesktopFloatingWhatsApp />
        <MobileBottomBar />
      </I18nProvider>
    </QueryClientProvider>
  );
}
