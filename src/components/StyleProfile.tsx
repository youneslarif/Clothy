import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Palette, Heart, Star, ChevronRight } from "lucide-react";

interface StyleProfileProps {
  onBack: () => void;
}

const styleTypes = [
  { id: 'classic', name: 'Classic', description: 'Timeless, elegant pieces' },
  { id: 'bohemian', name: 'Bohemian', description: 'Free-spirited, artistic flair' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean lines, simple elegance' },
  { id: 'edgy', name: 'Edgy', description: 'Bold, unconventional choices' },
  { id: 'romantic', name: 'Romantic', description: 'Soft, feminine touches' },
  { id: 'casual', name: 'Casual', description: 'Comfortable, everyday wear' }
];

const colorPreferences = [
  { name: 'Neutral Tones', colors: ['#F5F5DC', '#D2B48C', '#A0522D', '#8B4513'] },
  { name: 'Cool Blues', colors: ['#E6F3FF', '#4A90E2', '#2E5A87', '#1A365D'] },
  { name: 'Warm Pinks', colors: ['#FFE4E1', '#FF69B4', '#DC143C', '#8B0000'] },
  { name: 'Earth Tones', colors: ['#F4E4BC', '#D2B48C', '#CD853F', '#A0522D'] },
  { name: 'Bold & Bright', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'] }
];

export const StyleProfile: React.FC<StyleProfileProps> = ({ onBack }) => {
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const toggleStyle = (styleId: string) => {
    setSelectedStyle(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const toggleLifestyle = (item: string) => {
    setLifestyle(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Style Profile</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 4</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            <User className="h-4 w-4 mr-2" />
            Personal Styling
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground text-center mt-2">
            Complete your profile for personalized recommendations
          </div>
        </div>

        {/* Step 1: Style Preferences */}
        {currentStep === 1 && (
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Heart className="h-6 w-6 text-primary" />
                <span>What's Your Style?</span>
              </CardTitle>
              <CardDescription>
                Select one or more styles that resonate with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {styleTypes.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedStyle.includes(style.id)
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-background hover:shadow-soft'
                    }`}
                    onClick={() => toggleStyle(style.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{style.name}</h3>
                      <p className="text-sm opacity-80 mt-1">{style.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Color Preferences */}
        {currentStep === 2 && (
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Palette className="h-6 w-6 text-primary" />
                <span>Color Preferences</span>
              </CardTitle>
              <CardDescription>
                Which color palette speaks to you?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {colorPreferences.map((palette) => (
                <Card
                  key={palette.name}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedColors === palette.name
                      ? 'bg-primary/10 border-primary shadow-soft'
                      : 'bg-background hover:shadow-soft'
                  }`}
                  onClick={() => setSelectedColors(palette.name)}
                >
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="flex space-x-2">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{palette.name}</h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Body Type */}
        {currentStep === 3 && (
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="text-center">
              <CardTitle>Body Type & Fit Preferences</CardTitle>
              <CardDescription>
                Help us suggest the most flattering styles for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {['Pear', 'Apple', 'Hourglass', 'Rectangle', 'Inverted Triangle', 'Prefer not to specify'].map((type) => (
                  <Card
                    key={type}
                    className={`cursor-pointer transition-all duration-300 ${
                      bodyType === type
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-background hover:shadow-soft'
                    }`}
                    onClick={() => setBodyType(type)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold">{type}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Lifestyle */}
        {currentStep === 4 && (
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Star className="h-6 w-6 text-primary" />
                <span>Lifestyle & Occasions</span>
              </CardTitle>
              <CardDescription>
                What occasions do you dress for most often?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Work/Professional',
                  'Casual Daily',
                  'Social Events',
                  'Date Nights',
                  'Travel',
                  'Exercise/Active',
                  'Formal Events',
                  'Creative/Artistic'
                ].map((item) => (
                  <Card
                    key={item}
                    className={`cursor-pointer transition-all duration-300 ${
                      lifestyle.includes(item)
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-background hover:shadow-soft'
                    }`}
                    onClick={() => toggleLifestyle(item)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold">{item}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <Button
            variant="hero"
            onClick={currentStep === 4 ? onBack : nextStep}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === 4 ? 'Complete Profile' : 'Next'}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};