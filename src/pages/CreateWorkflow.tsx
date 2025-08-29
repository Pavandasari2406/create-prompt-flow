import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Plus, X } from "lucide-react";

export default function CreateWorkflow() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "New Workflow",
    description: "",
    workflowType: "SFW",
    corePrompt: "",
    minWords: "10",
    maxWords: "45",
    useMyInputsPositive: false,
    positivePrompts: "",
    forcedPositivePrompts: "low quality",
    useMyInputsForced: false,
    selectedActions: [] as string[],
    selectedExpressions: [] as string[],
    selectedLocations: [] as string[],
    selectedClothing: [] as string[],
    selectedLighting: [] as string[]
  });

  const actionsOptions = [
    "(phone high), angled down", "(phone low), angled up", "arm-length (selfie)", 
    "(smiling naturally)", "(serious face)", "slight (head tilt)", "looking away, casual",
    "(pouty lips)", "(peace sign)", "(finger heart)", "(duck face)", "head tilted (right)",
    "head tilted (left)", "(eyebrows raised)", "(one eye closed)"
  ];

  const expressionsOptions = [
    "soft smile", "wide grin", "hearty laugh", "quiet chuckle", "mischievous smirk",
    "beaming joy", "content sigh", "pleased", "amused", "playful wink", "slight frown",
    "deep scowl", "pouty lips", "angry glare", "narrowed eyes, fury"
  ];

  const locationsOptions = [
    "in bedroom", "on bed", "cross-legged on rug", "against (kitchen) counter",
    "in bathtub", "sitting on chair", "living room floor", "bathroom tiles",
    "behind curtain", "by window", "on windowsill", "over armchair", "edge of bed",
    "beside nightstand", "open refrigerator"
  ];

  const clothingOptions = [
    "cotton t-shirt", "denim jeans", "wool sweater", "fleece jacket", "linen shirt",
    "silk blouse", "leather boots", "canvas sneakers", "cotton socks", "wool coat",
    "flannel pajamas", "corduroy pants", "knit cardigan", "cotton hoodie", "pleated skirt"
  ];

  const lightingOptions = [
    "natural daylight", "golden hour", "blue hour", "harsh midday sun", "soft window light",
    "warm indoor lighting", "cool fluorescent", "candle light", "string lights",
    "neon lighting", "backlighting", "side lighting", "dramatic shadows"
  ];

  const toggleSelection = (item: string, category: 'selectedActions' | 'selectedExpressions' | 'selectedLocations' | 'selectedClothing' | 'selectedLighting') => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i: string) => i !== item)
        : [...prev[category], item]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the workflow
    navigate("/workflows");
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Elegant Header */}
          <div className="text-center space-y-4 py-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/workflows")}
              className="absolute top-6 left-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="space-y-2">
              <h1 className="text-5xl font-light text-foreground tracking-tight">
                Create Workflow
              </h1>
              <p className="text-muted-foreground text-lg">
                Design your perfect prompt generation workflow
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Essential Details - Clean Card */}
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg p-8 space-y-8">
              <h2 className="text-2xl font-medium text-foreground mb-6">Essential Details</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-base font-medium text-foreground">Workflow Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12 text-base border-border/50 focus:border-primary bg-background/50"
                    placeholder="Enter a descriptive name..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base font-medium text-foreground">Workflow Type</Label>
                  <RadioGroup 
                    value={formData.workflowType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, workflowType: value }))}
                    className="flex gap-8 pt-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="SFW" id="sfw" className="h-5 w-5" />
                      <Label htmlFor="sfw" className="text-base font-medium cursor-pointer">Safe for Work</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="NSFW" id="nsfw" className="h-5 w-5" />
                      <Label htmlFor="nsfw" className="text-base font-medium cursor-pointer">Not Safe for Work</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium text-foreground">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-20 text-base border-border/50 focus:border-primary bg-background/50 resize-none"
                  placeholder="Briefly describe what this workflow generates..."
                />
              </div>
            </div>

            {/* Core Prompt - Featured Card */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-medium text-foreground">Core Workflow Prompt</h2>
              <p className="text-muted-foreground">The main instructions that guide your AI model</p>
              
              <Textarea
                value={formData.corePrompt}
                onChange={(e) => setFormData(prev => ({ ...prev, corePrompt: e.target.value }))}
                placeholder="Generate a general character prompt. The person should be out of shape, unattractive, and the photo should be grainy and low quality. Use prompting to make the photograph look realistic..."
                className="min-h-32 text-base border-primary/30 focus:border-primary bg-background/70 resize-none"
              />

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Minimum Words</Label>
                  <Input
                    type="number"
                    value={formData.minWords}
                    onChange={(e) => setFormData(prev => ({ ...prev, minWords: e.target.value }))}
                    className="h-12 border-primary/30 focus:border-primary bg-background/70"
                  />
                  <p className="text-xs text-muted-foreground">Forced terms added if too short</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-medium">Maximum Words</Label>
                  <Input
                    type="number"
                    value={formData.maxWords}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxWords: e.target.value }))}
                    className="h-12 border-primary/30 focus:border-primary bg-background/70"
                  />
                  <p className="text-xs text-muted-foreground">Truncated if too long</p>
                </div>
              </div>
            </div>

            {/* Prompt Configuration - Dual Panel */}
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg p-8 space-y-8">
              <h2 className="text-2xl font-medium text-foreground">Prompt Enhancement</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Positive Prompts */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium text-foreground">Positive Prompts</Label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="useMyInputsPositive"
                          checked={formData.useMyInputsPositive}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, useMyInputsPositive: !!checked }))}
                        />
                        <Label htmlFor="useMyInputsPositive" className="text-sm cursor-pointer">Use My Inputs</Label>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">3 prompts</Badge>
                    </div>
                  </div>
                  <Textarea
                    value={formData.positivePrompts}
                    onChange={(e) => setFormData(prev => ({ ...prev, positivePrompts: e.target.value }))}
                    placeholder="attractive and unprofessional picture&#10;ugly person&#10;low quality photo&#10;bad lighting&#10;dim lighting&#10;dark"
                    className="min-h-32 text-sm font-mono bg-muted/30 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                {/* Forced Positive Prompts */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium text-foreground">Forced Prompts</Label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="useMyInputsForced"
                          checked={formData.useMyInputsForced}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, useMyInputsForced: !!checked }))}
                        />
                        <Label htmlFor="useMyInputsForced" className="text-sm cursor-pointer">Use My Inputs</Label>
                      </div>
                      <Badge variant="destructive" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">Always Included</Badge>
                    </div>
                  </div>
                  <Textarea
                    value={formData.forcedPositivePrompts}
                    onChange={(e) => setFormData(prev => ({ ...prev, forcedPositivePrompts: e.target.value }))}
                    className="min-h-32 text-sm font-mono bg-muted/30 border-border/50 focus:border-primary resize-none"
                  />
                  <p className="text-xs text-muted-foreground">These prompts are always included in every generation</p>
                </div>
              </div>
            </div>

            {/* Selection Categories - Modern Grid */}
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl border shadow-lg p-8 space-y-8">
              <h2 className="text-2xl font-medium text-foreground">Content Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Actions/Poses */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Actions & Poses</Label>
                    <Badge variant="outline" className="text-xs">{formData.selectedActions.length}</Badge>
                  </div>
                  <div className="bg-muted/20 rounded-lg border max-h-64 overflow-hidden">
                    <ScrollArea className="h-64">
                      <div className="p-3 space-y-1">
                        {actionsOptions.map((action) => (
                          <div 
                            key={action}
                            className={`p-3 text-sm rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              formData.selectedActions.includes(action)
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => toggleSelection(action, 'selectedActions')}
                          >
                            {action}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* Expressions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Expressions</Label>
                    <Badge variant="outline" className="text-xs">{formData.selectedExpressions.length}</Badge>
                  </div>
                  <div className="bg-muted/20 rounded-lg border max-h-64 overflow-hidden">
                    <ScrollArea className="h-64">
                      <div className="p-3 space-y-1">
                        {expressionsOptions.map((expression) => (
                          <div 
                            key={expression}
                            className={`p-3 text-sm rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              formData.selectedExpressions.includes(expression)
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => toggleSelection(expression, 'selectedExpressions')}
                          >
                            {expression}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Locations</Label>
                    <Badge variant="outline" className="text-xs">{formData.selectedLocations.length}</Badge>
                  </div>
                  <div className="bg-muted/20 rounded-lg border max-h-64 overflow-hidden">
                    <ScrollArea className="h-64">
                      <div className="p-3 space-y-1">
                        {locationsOptions.map((location) => (
                          <div 
                            key={location}
                            className={`p-3 text-sm rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              formData.selectedLocations.includes(location)
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => toggleSelection(location, 'selectedLocations')}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* Clothing */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Clothing</Label>
                    <Badge variant="outline" className="text-xs">{formData.selectedClothing.length}</Badge>
                  </div>
                  <div className="bg-muted/20 rounded-lg border max-h-64 overflow-hidden">
                    <ScrollArea className="h-64">
                      <div className="p-3 space-y-1">
                        {clothingOptions.map((clothing) => (
                          <div 
                            key={clothing}
                            className={`p-3 text-sm rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              formData.selectedClothing.includes(clothing)
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => toggleSelection(clothing, 'selectedClothing')}
                          >
                            {clothing}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>

              {/* Lighting - Full Width */}
              <div className="space-y-4 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Lighting Options</Label>
                  <Badge variant="outline" className="text-xs">{formData.selectedLighting.length} selected</Badge>
                </div>
                <div className="bg-muted/20 rounded-lg border p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {lightingOptions.map((lighting) => (
                      <div 
                        key={lighting}
                        className={`p-3 text-sm rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] text-center ${
                          formData.selectedLighting.includes(lighting)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => toggleSelection(lighting, 'selectedLighting')}
                      >
                        {lighting}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Centered */}
            <div className="flex justify-center gap-6 pt-8 pb-16">
              <Button 
                type="submit"
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Create Workflow
              </Button>
              <Button 
                type="button" 
                variant="outline"
                size="lg"
                onClick={() => navigate("/workflows")}
                className="px-12 py-4 text-lg font-medium rounded-xl border-2 hover:bg-muted/50 transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}