import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Heart, Share2, Shuffle, Sun, Cloud, Snowflake, Calendar, Star } from "lucide-react";

interface OutfitSuggestionsProps {
  onBack: () => void;
}

const mockOutfits = [
  {
    id: 1,
    title: "Casual Chic",
    description: "Perfect for weekend brunch or casual meetings",
    weather: "sunny",
    occasion: "Casual",
    items: ["White Button-up Shirt", "Dark Wash Jeans", "Brown Leather Loafers", "Crossbody Bag"],
    colors: ["#FFFFFF", "#1E3A8A", "#8B4513", "#D2691E"],
    rating: 4.8
  },
  {
    id: 2,
    title: "Professional Power",
    description: "Command attention in the boardroom",
    weather: "mild",
    occasion: "Work",
    items: ["Navy Blazer", "White Blouse", "Tailored Trousers", "Block Heels"],
    colors: ["#1E3A8A", "#FFFFFF", "#374151", "#000000"],
    rating: 4.9
  },
  {
    id: 3,
    title: "Date Night Elegance",
    description: "Sophisticated and romantic",
    weather: "mild",
    occasion: "Date Night",
    items: ["Little Black Dress", "Statement Jewelry", "Red Heels", "Clutch Purse"],
    colors: ["#000000", "#FFD700", "#DC2626", "#1F2937"],
    rating: 4.7
  },
  {
    id: 4,
    title: "Bohemian Vibes",
    description: "Free-spirited and artistic",
    weather: "sunny",
    occasion: "Creative",
    items: ["Flowy Maxi Dress", "Layered Necklaces", "Sandals", "Fringed Bag"],
    colors: ["#F59E0B", "#10B981", "#8B5CF6", "#EF4444"],
    rating: 4.6
  }
];

const weatherIcons = {
  sunny: Sun,
  mild: Cloud,
  cold: Snowflake
};

export const OutfitSuggestions: React.FC<OutfitSuggestionsProps> = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [likedOutfits, setLikedOutfits] = useState<number[]>([]);

  const toggleLike = (outfitId: number) => {
    setLikedOutfits(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  const filteredOutfits = selectedFilter === 'all' 
    ? mockOutfits 
    : mockOutfits.filter(outfit => outfit.occasion.toLowerCase() === selectedFilter.toLowerCase());

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
              <h1 className="text-2xl font-bold text-foreground">Outfit Suggestions</h1>
              <p className="text-sm text-muted-foreground">AI-curated looks just for you</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Shuffle className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              4 New Looks
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Badge 
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2"
            onClick={() => setSelectedFilter('all')}
          >
            All Occasions
          </Badge>
          <Badge 
            variant={selectedFilter === 'work' ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2"
            onClick={() => setSelectedFilter('work')}
          >
            Work
          </Badge>
          <Badge 
            variant={selectedFilter === 'casual' ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2"
            onClick={() => setSelectedFilter('casual')}
          >
            Casual
          </Badge>
          <Badge 
            variant={selectedFilter === 'date night' ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2"
            onClick={() => setSelectedFilter('date night')}
          >
            Date Night
          </Badge>
        </div>

        {/* Outfit Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredOutfits.map((outfit) => {
            const WeatherIcon = weatherIcons[outfit.weather as keyof typeof weatherIcons];
            const isLiked = likedOutfits.includes(outfit.id);
            
            return (
              <Card key={outfit.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{outfit.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          <WeatherIcon className="h-3 w-3 mr-1" />
                          {outfit.weather}
                        </Badge>
                      </div>
                      <CardDescription>{outfit.description}</CardDescription>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{outfit.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {outfit.occasion}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleLike(outfit.id)}
                        className={`h-8 w-8 ${isLiked ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Color Palette */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Color Palette</p>
                    <div className="flex space-x-2">
                      {outfit.colors.map((color, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Outfit Items */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Outfit Items</p>
                    <div className="grid grid-cols-2 gap-2">
                      {outfit.items.map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <Button variant="hero" className="flex-1">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Try This Look
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Generate More */}
        <Card className="mt-12 bg-gradient-accent border-0 shadow-soft text-center">
          <CardContent className="p-12 space-y-6">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">Want More Options?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our AI can generate unlimited outfit combinations based on your style preferences and wardrobe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                <Shuffle className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Generate More Outfits
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Plan Weekly Outfits
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};