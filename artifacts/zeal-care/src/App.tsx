import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import WhyEmpowermentPage from "@/pages/WhyEmpowermentPage";
import WhoWeArePage from "@/pages/WhoWeArePage";
import WhatWeDoPage from "@/pages/WhatWeDoPage";
import IgnitingPotentialPage from "@/pages/IgnitingPotentialPage";
import MediaPage from "@/pages/MediaPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />

        {/* About Us */}
        <Route path="/about" component={AboutPage} />
        <Route path="/about/:section" component={AboutPage} />

        {/* Why Empowerment */}
        <Route path="/why-empowerment" component={WhyEmpowermentPage} />
        <Route path="/why-empowerment/:section" component={WhyEmpowermentPage} />

        {/* Who We Are */}
        <Route path="/who-we-are" component={WhoWeArePage} />
        <Route path="/who-we-are/:section" component={WhoWeArePage} />

        {/* What We Do */}
        <Route path="/what-we-do" component={WhatWeDoPage} />
        <Route path="/what-we-do/:section" component={WhatWeDoPage} />

        {/* Igniting Potential */}
        <Route path="/igniting-potential" component={IgnitingPotentialPage} />
        <Route path="/igniting-potential/:section" component={IgnitingPotentialPage} />

        {/* Media */}
        <Route path="/media" component={MediaPage} />
        <Route path="/media/:section" component={MediaPage} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
