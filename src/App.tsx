import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import CareerMatch from "./pages/CareerMatch";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Impact from "./pages/Impact";
import News from "./pages/News";
import Article from "./pages/Article";
import About from "./pages/About";
import ChatBot from "./pages/ChatBot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/career-match" element={<CareerMatch />} />
              <Route path="/skill-gap" element={<SkillGap />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<Article />} />
              <Route path="/about" element={<About />} />
              <Route path="/chatbot" element={<ChatBot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
