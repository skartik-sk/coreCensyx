
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Wallet, Check } from "lucide-react";
import NavBar from "@/components/NavBar";
import { UserButton } from "@civic/auth-web3/react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* <NavBar /> */}
      
      {/* Hero Section with animated background */}
      <div className="relative pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-crypto-blue/10 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-crypto-purple/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-crypto-green/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your <span className="gradient-text">Crypto Profile</span> With UnchainScore
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Track your wallet performance, view in-depth analytics, and see how your crypto activity ranks with our innovative scoring system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <UserButton/>
              
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-2">
                  View Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need To Track Your Crypto Journey</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card hover-lift p-6 rounded-xl">
              <div className="w-14 h-14 bg-crypto-blue/10 rounded-lg flex items-center justify-center mb-4">
                <User className="h-7 w-7 text-crypto-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Profile</h3>
              <p className="text-gray-600">Create your unique profile to track your crypto activity and performance over time.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card hover-lift p-6 rounded-xl">
              <div className="w-14 h-14 bg-crypto-green/10 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="h-7 w-7 text-crypto-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Wallet Analytics</h3>
              <p className="text-gray-600">Connect your wallet to see detailed analytics about your transactions and holdings.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card hover-lift p-6 rounded-xl">
              <div className="w-14 h-14 bg-crypto-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="h-7 w-7 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unchain Score</h3>
              <p className="text-gray-600">Get your personal crypto score based on activity, security, and portfolio diversity.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-radial from-crypto-blue/20 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to discover your UnchainScore?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of crypto enthusiasts who are already tracking their performance and improving their strategies.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90 rounded-full px-8 py-6 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2025 UnchainScore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
