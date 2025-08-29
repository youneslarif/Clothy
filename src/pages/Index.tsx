import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Sparkles, Palette, Users, ArrowRight, Camera, Shirt, Star } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";
import { WardrobeUpload } from "@/components/WardrobeUpload";
import { StyleProfile } from "@/components/StyleProfile";
import { OutfitSuggestions } from "@/components/OutfitSuggestions";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'profile' | 'outfits'>('home');

  if (currentView === 'upload') {
    return <WardrobeUpload onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'profile') {
    return <StyleProfile onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'outfits') {
    return <OutfitSuggestions onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">StyleSync AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a>
            <Button variant="hero" size="sm">Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered Styling
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                  Your Personal
                  <span className="block text-primary-glow">Fashion Stylist</span>
                </h1>
                <p className="text-xl text-primary-foreground/80 leading-relaxed">
                  Upload your wardrobe, discover perfect outfit combinations, and get personalized style recommendations powered by advanced AI.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="hero"
                  onClick={() => setCurrentView('upload')}
                  className="group"
                >
                  <Upload className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Styling
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="elegant" 
                  size="hero"
                  onClick={() => setCurrentView('profile')}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Style Profile
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-primary-foreground/60">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-sm">10k+ Styled Outfits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">5k+ Happy Users</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-accent rounded-3xl blur-3xl opacity-30" />
              <img 
                src={heroImage} 
                alt="Fashion styling hero image" 
                className="relative rounded-3xl shadow-elegant w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need to Style Better
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI-driven features to transform how you approach fashion and styling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Wardrobe</CardTitle>
                <CardDescription>
                  Upload photos of your clothing items and build a digital wardrobe that's always organized.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shirt className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Outfit Generator</CardTitle>
                <CardDescription>
                  Get personalized outfit suggestions based on your style, occasion, and weather preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Style Analysis</CardTitle>
                <CardDescription>
                  Discover your personal style profile and get recommendations tailored to your unique aesthetic.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              How It Works
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Three Simple Steps to Better Style
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Upload className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Upload Your Wardrobe</h3>
              <p className="text-muted-foreground">
                Take photos of your clothing items or link your shopping profiles to build your digital closet.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Tell us about your style preferences, body type, and lifestyle to personalize recommendations.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Styled</h3>
              <p className="text-muted-foreground">
                Receive AI-powered outfit suggestions and style advice tailored specifically for you.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="hero" 
              size="hero"
              onClick={() => setCurrentView('upload')}
              className="group"
            >
              <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Your Style Journey
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your Style?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of fashion-forward individuals who've discovered their perfect style with StyleSync AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="elegant" 
                size="hero"
                onClick={() => setCurrentView('upload')}
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Wardrobe
              </Button>
              <Button 
                variant="hero" 
                size="hero"
                onClick={() => setCurrentView('outfits')}
              >
                <Shirt className="h-5 w-5 mr-2" />
                View Outfits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Palette className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">StyleSync AI</span>
          </div>
          <p className="text-muted-foreground">
            Your AI-powered personal stylist and outfit planner.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;