import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, FileText, Plus, Workflow } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const recentWorkflows = [
    { id: 1, name: "New Workflow", date: "2025-08-27 10:33", status: "Draft" },
    { id: 2, name: "New Workflow", date: "2025-08-27 10:21", status: "Draft" }
  ];

  const recentPromptLists = [
    { id: 1, name: ".mn", date: "2025-08-27 10:28", status: "Active" }
  ];

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="flex justify-center">
            <Bot className="h-16 w-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Hi Pavan! 👋
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to your creative workspace. Let's build something incredible together with Pro Creator
            </p>
          </div>
          <Button 
            onClick={() => navigate("/workflows")}
            className="bg-gradient-primary hover:shadow-glow transition-smooth text-lg px-8 py-6 h-auto"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Recent Items Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Workflows */}
          <Card className="bg-gradient-card shadow-medium border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-primary" />
                  Recent Workflows
                </CardTitle>
                <CardDescription>Your latest workflow creations</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/workflows")}
                className="transition-smooth hover:shadow-soft"
              >
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentWorkflows.map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-smooth">
                  <div className="flex items-center gap-3">
                    <Workflow className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{workflow.name}</p>
                      <p className="text-sm text-muted-foreground">{workflow.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-warning text-warning-foreground">
                    {workflow.status}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-border hover:border-primary transition-smooth"
                onClick={() => navigate("/workflows/new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Workflow
              </Button>
            </CardContent>
          </Card>

          {/* Recent Prompt Lists */}
          <Card className="bg-gradient-card shadow-medium border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Prompt Lists
                </CardTitle>
                <CardDescription>Your recent prompt collections</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/prompt-lists")}
                className="transition-smooth hover:shadow-soft"
              >
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPromptLists.map((list) => (
                <div key={list.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-smooth">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{list.name}</p>
                      <p className="text-sm text-muted-foreground">{list.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {list.status}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-border hover:border-primary transition-smooth"
                onClick={() => navigate("/prompt-lists/new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Prompt List
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}