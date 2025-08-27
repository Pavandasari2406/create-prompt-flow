import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Workflow } from "lucide-react";

export default function CreateWorkflow() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: false,
    tags: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the workflow
    navigate("/workflows");
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/workflows")}
            className="transition-smooth hover:shadow-soft"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workflows
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Workflow</h1>
            <p className="text-muted-foreground">Design and configure your prompt workflow</p>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-gradient-card shadow-large border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-primary" />
              Workflow Configuration
            </CardTitle>
            <CardDescription>
              Set up the basic properties for your new workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  placeholder="Enter workflow name"
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
                  placeholder="Describe what this workflow does..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-32 transition-smooth focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="transition-smooth focus:shadow-soft"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="public">Make Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow other users to view and use this workflow
                  </p>
                </div>
                <Switch
                  id="public"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit"
                  className="bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Workflow
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/workflows")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Section - Placeholder */}
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle>Workflow Builder</CardTitle>
            <CardDescription>
              Design your prompt workflow with visual components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <Workflow className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Workflow builder will be implemented here
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop components to build your workflow
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}