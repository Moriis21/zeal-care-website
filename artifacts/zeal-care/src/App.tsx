import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { DonateModal } from "@/components/DonateModal";
import { DonateProvider } from "@/context/DonateContext";

// Lazy-load ALL page routes — only the current route's JS is downloaded
const Home = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const WhyEmpowermentPage = lazy(() => import("@/pages/WhyEmpowermentPage"));
const WhoWeArePage = lazy(() => import("@/pages/WhoWeArePage"));
const WhatWeDoPage = lazy(() => import("@/pages/WhatWeDoPage"));
const IgnitingPotentialPage = lazy(() => import("@/pages/IgnitingPotentialPage"));
const MediaPage = lazy(() => import("@/pages/MediaPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Admin routes
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminChildren = lazy(() => import("@/pages/admin/AdminChildren"));
const AdminDonations = lazy(() => import("@/pages/admin/AdminDonations"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminNewsletter = lazy(() => import("@/pages/admin/AdminNewsletter"));
const AdminMessages = lazy(() => import("@/pages/admin/AdminMessages"));
const AdminContent = lazy(() => import("@/pages/admin/AdminContent"));

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AdminSpinner = () => (
  <div className="min-h-screen bg-[#061A32] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#F5C619] border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 min — avoid refetching on every tab focus
      gcTime: 1000 * 60 * 10,      // 10 min garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PublicRouter() {
  return (
    <>
      <Navbar />
      <DonateModal />
      <Suspense fallback={<PageSpinner />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/about/:section" component={AboutPage} />
          <Route path="/why-empowerment" component={WhyEmpowermentPage} />
          <Route path="/why-empowerment/:section" component={WhyEmpowermentPage} />
          <Route path="/who-we-are" component={WhoWeArePage} />
          <Route path="/who-we-are/:section" component={WhoWeArePage} />
          <Route path="/what-we-do" component={WhatWeDoPage} />
          <Route path="/what-we-do/:section" component={WhatWeDoPage} />
          <Route path="/igniting-potential" component={IgnitingPotentialPage} />
          <Route path="/igniting-potential/:section" component={IgnitingPotentialPage} />
          <Route path="/media" component={MediaPage} />
          <Route path="/media/:section" component={MediaPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function AdminRouter() {
  return (
    <Suspense fallback={<AdminSpinner />}>
      <Switch>
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/children" component={AdminChildren} />
        <Route path="/admin/donations" component={AdminDonations} />
        <Route path="/admin/messages" component={AdminMessages} />
        <Route path="/admin/newsletter" component={AdminNewsletter} />
        <Route path="/admin/content" component={AdminContent} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route component={AdminLogin} />
      </Switch>
    </Suspense>
  );
}

function RootRouter() {
  return (
    <Switch>
      <Route path="/admin" component={AdminRouter} />
      <Route path="/admin/:rest*" component={AdminRouter} />
      <Route component={PublicRouter} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DonateProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <RootRouter />
          </WouterRouter>
          <Toaster />
        </DonateProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
