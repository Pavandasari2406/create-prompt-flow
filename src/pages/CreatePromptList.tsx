import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Save, List, X } from "lucide-react";

export default function CreatePromptList() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: false,
    category: ""
  });

  const [prompts, setPrompts] = useState([
    { id: 1, title: "Example Prompt", content: "Write a creative story about..." }
  ]);

  const addPrompt = () => {
    setPrompts(prev => [...prev, { 
      id: Date.now(), 
      title: "", 
      content: "" 
    }]);
  };

  const removePrompt = (id: number) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  const updatePrompt = (id: number, field: string, value: string) => {
    setPrompts(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the prompt list
    navigate("/prompt-lists");
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/prompt-lists")}
            className="transition-smooth hover:shadow-soft"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Prompt Lists
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Prompt List</h1>
            <p className="text-muted-foreground">Organize your prompts into collections</p>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-gradient-card shadow-large border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              Prompt List Configuration
            </CardTitle>
            <CardDescription>
              Set up the basic properties for your new prompt list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">List Name</Label>
                <Input
                  id="name"
                  placeholder="Enter prompt list name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="transition-smooth focus:shadow-soft"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what prompts this list contains..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-24 transition-smooth focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Marketing, Creative Writing, Technical"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="transition-smooth focus:shadow-soft"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="public">Make Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow other users to view and use this prompt list
                  </p>
                </div>
                <Switch
                  id="public"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Prompts Section */}
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Prompts</CardTitle>
              <CardDescription>
                Add and manage prompts in your list
              </CardDescription>
            </div>
            <Badge variant="outline" className="border-primary text-primary">
              {prompts.length} prompts
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {prompts.map((prompt, index) => (
              <Card key={prompt.id} className="bg-muted/30 border border-border/50">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Prompt {index + 1}</Label>
                    {prompts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePrompt(prompt.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`title-${prompt.id}`}>Title</Label>
                    <Input
                      id={`title-${prompt.id}`}
                      placeholder="Prompt title"
                      value={prompt.title}
                      onChange={(e) => updatePrompt(prompt.id, 'title', e.target.value)}
                      className="transition-smooth focus:shadow-soft"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`content-${prompt.id}`}>Content</Label>
                    <Textarea
                      id={`content-${prompt.id}`}
                      placeholder="Enter your prompt here..."
                      value={prompt.content}
                      onChange={(e) => updatePrompt(prompt.id, 'content', e.target.value)}
                      className="min-h-24 transition-smooth focus:shadow-soft"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addPrompt}
              className="w-full border-2 border-dashed border-border hover:border-primary transition-smooth"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Prompt
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            <Save className="h-4 w-4 mr-2" />
            Create Prompt List
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/prompt-lists")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}