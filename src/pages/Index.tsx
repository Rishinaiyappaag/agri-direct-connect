
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  
  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (!loading && currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-farm-light to-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Connect Farmers Directly with Exporters
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Farm2Export helps farmers sell their crops at better prices by connecting them directly with exporters, eliminating middlemen and improving transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-farm-primary hover:bg-farm-secondary text-white px-8 py-3 rounded-lg text-lg"
                  size="lg"
                >
                  Get Started
                </Button>
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-farm-primary text-farm-primary hover:bg-farm-light px-8 py-3 rounded-lg text-lg"
                  size="lg"
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white p-1 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                  alt="Farmer with crops" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Farm2Export Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-farm-light rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-farm-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Register Your Profile</h3>
              <p className="text-gray-700">
                Create your account as a farmer or exporter and set up your profile with details about your crops or buying needs.
              </p>
            </div>
            
            <div className="bg-farm-light rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-farm-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Directly</h3>
              <p className="text-gray-700">
                Farmers can view exporters and their buying prices. Exporters can update the prices they offer for different crops.
              </p>
            </div>
            
            <div className="bg-farm-light rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-farm-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Trade with Confidence</h3>
              <p className="text-gray-700">
                Message directly, negotiate prices, arrange logistics, and complete transactions without intermediaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-farm-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Agricultural Trade?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and exporters already using Farm2Export to streamline their agricultural trade process.
          </p>
          <Button 
            onClick={() => navigate('/signup')}
            className="bg-farm-primary hover:bg-farm-secondary text-white px-8 py-3 rounded-lg text-lg"
            size="lg"
          >
            Join Farm2Export Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Farm2Export</h2>
              <p className="text-gray-400">Connecting Farmers to Global Markets</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">How It Works</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">support@farm2export.com</li>
                  <li className="text-gray-400">+91 123 456 7890</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
            <p>© 2023 Farm2Export. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
