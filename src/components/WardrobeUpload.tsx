import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowLeft, Camera, Plus, X, Image } from "lucide-react";

interface WardrobeUploadProps {
  onBack: () => void;
}

export const WardrobeUpload: React.FC<WardrobeUploadProps> = ({ onBack }) => {
  const [uploadedItems, setUploadedItems] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setUploadedItems(prev => [...prev, url]);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeItem = (index: number) => {
    setUploadedItems(prev => prev.filter((_, i) => i !== index));
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
              <h1 className="text-2xl font-bold text-foreground">Upload Wardrobe</h1>
              <p className="text-sm text-muted-foreground">Build your digital closet</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            {uploadedItems.length} items
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Upload Area */}
        <Card 
          className={`mb-12 border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border bg-gradient-card hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-12 text-center space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">
                Upload Your Clothing Items
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Drag and drop photos of your clothes, or click to browse. We support JPG, PNG, and WEBP formats.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => document.getElementById('file-input')?.click()}
                className="group"
              >
                <Camera className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Browse Photos
              </Button>
              <Button variant="outline" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Connect Shopping Profile
              </Button>
            </div>

            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
          </CardContent>
        </Card>

        {/* Uploaded Items Grid */}
        {uploadedItems.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Your Wardrobe</h2>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedItems.map((item, index) => (
                <Card key={index} className="group bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-4 space-y-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={item} 
                        alt={`Wardrobe item ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Item name..."
                        className="w-full text-sm font-medium bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                      />
                      <select className="w-full text-xs text-muted-foreground bg-transparent border border-border rounded px-2 py-1">
                        <option>Select category</option>
                        <option>Tops</option>
                        <option>Bottoms</option>
                        <option>Dresses</option>
                        <option>Outerwear</option>
                        <option>Shoes</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add More Card */}
              <Card 
                className="border-2 border-dashed border-muted hover:border-primary/50 bg-muted/20 cursor-pointer transition-colors group"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square text-center space-y-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Add more items</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <Card className="mt-12 bg-gradient-accent border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="h-5 w-5 text-primary" />
              <span>Pro Tips for Better Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>• Take photos with good lighting</div>
              <div>• Include full garment in frame</div>
              <div>• Use plain backgrounds when possible</div>
              <div>• Capture different angles for complex items</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};