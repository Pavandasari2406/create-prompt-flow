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
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/workflows")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Create New Workflow</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-medium">Workflow Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-24 text-base resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Workflow Type (Determines System Prompt & Default Config):
                </Label>
                <RadioGroup 
                  value={formData.workflowType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, workflowType: value }))}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="SFW" id="sfw" />
                    <Label htmlFor="sfw" className="text-base font-medium">SFW</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="NSFW" id="nsfw" />
                    <Label htmlFor="nsfw" className="text-base font-medium">NSFW</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="corePrompt" className="text-base font-medium">
                  Core Workflow Prompt (Context/Instructions for LLM)
                </Label>
                <Textarea
                  id="corePrompt"
                  value={formData.corePrompt}
                  onChange={(e) => setFormData(prev => ({ ...prev, corePrompt: e.target.value }))}
                  placeholder="Generate a general character prompt. The person should be out of shape, unattractive, and the photo should be grainy and low quality. Use prompting to make the photograph look realistic. Describe the person's expression as well as their body language. Be sure to include a description of the location and what the person is doing using keywords. Don't only rely on the keywords, but also use the prompts to make the photo look realistic."
                  className="min-h-32 text-base resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="minWords" className="text-base font-medium">Minimum Words</Label>
                  <Input
                    id="minWords"
                    type="number"
                    value={formData.minWords}
                    onChange={(e) => setFormData(prev => ({ ...prev, minWords: e.target.value }))}
                    className="h-12 text-base"
                  />
                  <p className="text-sm text-muted-foreground">
                    If prompt is too short, forced positive terms will be added to reach this length.
                  </p>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="maxWords" className="text-base font-medium">Maximum Words</Label>
                  <Input
                    id="maxWords"
                    type="number"
                    value={formData.maxWords}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxWords: e.target.value }))}
                    className="h-12 text-base"
                  />
                  <p className="text-sm text-muted-foreground">
                    If prompt is too long, it will be truncated to this length.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Configuration */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Positive Prompts</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="useMyInputsPositive"
                        checked={formData.useMyInputsPositive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, useMyInputsPositive: !!checked }))}
                      />
                      <Label htmlFor="useMyInputsPositive" className="text-sm">Use My Inputs</Label>
                      <Badge variant="outline">3 prompts</Badge>
                    </div>
                  </div>
                  <Textarea
                    value={formData.positivePrompts}
                    onChange={(e) => setFormData(prev => ({ ...prev, positivePrompts: e.target.value }))}
                    placeholder="attractive and unprofessional picture&#10;ugly person&#10;low quality photo&#10;bad lighting&#10;dim lighting&#10;dark"
                    className="min-h-32 text-sm resize-none font-mono"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">FORCED Positive Prompts (ALWAYS INCLUDED IN PROMPT)</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="useMyInputsForced"
                        checked={formData.useMyInputsForced}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, useMyInputsForced: !!checked }))}
                      />
                      <Label htmlFor="useMyInputsForced" className="text-sm">Use My Inputs</Label>
                    </div>
                  </div>
                  <Textarea
                    value={formData.forcedPositivePrompts}
                    onChange={(e) => setFormData(prev => ({ ...prev, forcedPositivePrompts: e.target.value }))}
                    className="min-h-32 text-sm resize-none font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Categories */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Actions/Poses */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Actions / Poses (SFW)</Label>
                    <Badge variant="outline">{formData.selectedActions.length} pose(s)</Badge>
                  </div>
                  <ScrollArea className="h-48 border rounded-md">
                    <div className="p-3 space-y-2">
                      {actionsOptions.map((action) => (
                        <div 
                          key={action}
                          className={`p-2 text-sm rounded cursor-pointer transition-colors ${
                            formData.selectedActions.includes(action)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => toggleSelection(action, 'selectedActions')}
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Expressions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Expressions (SFW)</Label>
                    <Badge variant="outline">{formData.selectedExpressions.length} expression(s)</Badge>
                  </div>
                  <ScrollArea className="h-48 border rounded-md">
                    <div className="p-3 space-y-2">
                      {expressionsOptions.map((expression) => (
                        <div 
                          key={expression}
                          className={`p-2 text-sm rounded cursor-pointer transition-colors ${
                            formData.selectedExpressions.includes(expression)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => toggleSelection(expression, 'selectedExpressions')}
                        >
                          {expression}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Locations */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Locations (SFW)</Label>
                    <Badge variant="outline">{formData.selectedLocations.length} location(s)</Badge>
                  </div>
                  <ScrollArea className="h-48 border rounded-md">
                    <div className="p-3 space-y-2">
                      {locationsOptions.map((location) => (
                        <div 
                          key={location}
                          className={`p-2 text-sm rounded cursor-pointer transition-colors ${
                            formData.selectedLocations.includes(location)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => toggleSelection(location, 'selectedLocations')}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Clothing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Clothing</Label>
                    <Badge variant="outline">{formData.selectedClothing.length} clothing item(s)</Badge>
                  </div>
                  <ScrollArea className="h-48 border rounded-md">
                    <div className="p-3 space-y-2">
                      {clothingOptions.map((clothing) => (
                        <div 
                          key={clothing}
                          className={`p-2 text-sm rounded cursor-pointer transition-colors ${
                            formData.selectedClothing.includes(clothing)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
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

              {/* Lighting Section */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Lighting (SFW)</Label>
                  <Badge variant="outline">{formData.selectedLighting.length} lighting option(s)</Badge>
                </div>
                <ScrollArea className="h-32 border rounded-md">
                  <div className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {lightingOptions.map((lighting) => (
                        <div 
                          key={lighting}
                          className={`p-2 text-sm rounded cursor-pointer transition-colors ${
                            formData.selectedLighting.includes(lighting)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => toggleSelection(lighting, 'selectedLighting')}
                        >
                          {lighting}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              type="submit"
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Create Workflow
            </Button>
            <Button 
              type="button" 
              variant="outline"
              size="lg"
              onClick={() => navigate("/workflows")}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}