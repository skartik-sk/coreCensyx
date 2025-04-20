
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User } from "lucide-react";
import { UserButton } from '@civic/auth-web3/react';

const NavBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md py-4 px-6 shadow-sm fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-crypto-blue to-crypto-purple text-white flex items-center justify-center text-xl font-bold">
            U
          </div>
          <span className="ml-2 font-semibold text-xl">UnchainScore</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/">
            <Button variant={isActiveRoute('/') ? "default" : "ghost"} className="rounded-full">
              Home
            </Button>
          </Link>
          <Link to="/dashboard">
          
          </Link>
          <Link to="/register">
          <UserButton/>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMobileMenu} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-2">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant={isActiveRoute('/') ? "default" : "ghost"} className="w-full justify-start">
              Home
            </Button>
          </Link>
          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant={isActiveRoute('/dashboard') ? "default" : "ghost"} className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="default" className="w-full justify-start bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90">
              <User className="mr-2 h-4 w-4" /> Register
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
