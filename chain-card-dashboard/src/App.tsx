
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import React from 'react';
import { CivicAuthProvider } from "@civic/auth-web3/react";
import NavBar from "./components/NavBar";

// Create the query client outside of the component
const queryClient = new QueryClient();

// Define App as a proper React function component
const App: React.FC = () => {
  return (
    <CivicAuthProvider clientId="95d5a10e-21fc-4d22-aaf9-e09203abd2f3">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
     </CivicAuthProvider>
  );
};

export default App;
