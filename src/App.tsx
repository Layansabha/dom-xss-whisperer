
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Progress from "./pages/Progress";
import Results from "./pages/Results";
import History from "./pages/History";
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="progress" element={<Progress />} />
              <Route path="results" element={<Results />} />
              <Route path="history" element={<History />} />
              <Route path="chat" element={<Chat />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signout" element={<SignOut />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
