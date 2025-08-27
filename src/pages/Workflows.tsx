import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Copy, Edit, Plus, Trash2, Search, Filter, MoreHorizontal, X } from "lucide-react";

export default function Workflows() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    isPartOfBatch: "all",
    taskStatus: "all", 
    isOwnedByYou: "all",
    hasBeenExported: "all"
  });

  const workflows = [
    { id: "WF001", name: "Marketing Automation", description: "Automated marketing workflow", status: "Active", batch: "Batch-2024", isOwned: true, exported: false },
    { id: "WF002", name: "Lead Generation", description: "Lead generation and nurturing", status: "Active", batch: "Batch-2024", isOwned: true, exported: true },
    { id: "WF003", name: "Customer Onboarding", description: "New customer onboarding process", status: "Archived", batch: "Batch-2023", isOwned: false, exported: false },
    { id: "WF004", name: "Data Processing", description: "Automated data processing pipeline", status: "Active", batch: null, isOwned: true, exported: true },
    { id: "WF005", name: "Email Campaign", description: "Email marketing campaign workflow", status: "Active", batch: "Batch-2024", isOwned: false, exported: false }
  ];

  const publicWorkflows = [
    { id: "PW001", name: "E-commerce Template", description: "Complete e-commerce workflow template", author: "Community", status: "Active", batch: "Template-V1" },
    { id: "PW002", name: "Blog Content Workflow", description: "Content creation and publishing workflow", author: "Expert User", status: "Active", batch: "Template-V2" }
  ];

  const resetFilters = () => {
    setFilters({
      isPartOfBatch: "all",
      taskStatus: "all",
      isOwnedByYou: "all", 
      hasBeenExported: "all"
    });
    setSearchQuery("");
  };

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Workflows / List</div>
              <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
            </div>
            <Button 
              onClick={() => navigate("/workflows/new")}
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          {/* Workflows Content */}
          <Tabs defaultValue="your" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="your" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Your Workflows
              </TabsTrigger>
              <TabsTrigger value="public" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Public Workflows
              </TabsTrigger>
            </TabsList>

            <TabsContent value="your">
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="font-semibold text-foreground">
                          ID <ChevronDown className="inline h-3 w-3 ml-1" />
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">Name</TableHead>
                        <TableHead className="font-semibold text-foreground">Description</TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Status <ChevronDown className="inline h-3 w-3 ml-1" />
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Workflow Batch <ChevronDown className="inline h-3 w-3 ml-1" />
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">Has been exported</TableHead>
                        <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workflows.map((workflow) => (
                        <TableRow key={workflow.id} className="border-border/50 hover:bg-muted/30 transition-smooth">
                          <TableCell className="font-medium text-foreground">{workflow.id}</TableCell>
                          <TableCell>
                            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover font-medium">
                              {workflow.name}
                            </Button>
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-xs truncate">
                            {workflow.description}
                          </TableCell>
                          <TableCell>
                            <Badge variant={workflow.status === "Active" ? "default" : "secondary"} className="bg-accent text-accent-foreground">
                              {workflow.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-foreground">
                            {workflow.batch || "-"}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {workflow.exported ? "Yes" : "No"}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-popover border border-border shadow-lg">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="public">
              <Card className="bg-gradient-card shadow-medium border-0">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="font-semibold text-foreground">
                          ID <ChevronDown className="inline h-3 w-3 ml-1" />
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">Name</TableHead>
                        <TableHead className="font-semibold text-foreground">Description</TableHead>
                        <TableHead className="font-semibold text-foreground">Author</TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Status <ChevronDown className="inline h-3 w-3 ml-1" />
                        </TableHead>
                        <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {publicWorkflows.map((workflow) => (
                        <TableRow key={workflow.id} className="border-border/50 hover:bg-muted/30 transition-smooth">
                          <TableCell className="font-medium text-foreground">{workflow.id}</TableCell>
                          <TableCell>
                            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover font-medium">
                              {workflow.name}
                            </Button>
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-xs truncate">
                            {workflow.description}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {workflow.author}
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-success text-success-foreground">
                              {workflow.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-popover border border-border shadow-lg">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Use Template
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Filters Sidebar */}
        <div className="w-80 border-l border-border bg-background/50 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-destructive hover:text-destructive">
              Reset
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Is part of batch</label>
              <Select value={filters.isPartOfBatch} onValueChange={(value) => setFilters(prev => ({ ...prev, isPartOfBatch: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All workflows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All workflows</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Task statuses</label>
              <Select value={filters.taskStatus} onValueChange={(value) => setFilters(prev => ({ ...prev, taskStatus: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Is owned by you</label>
              <Select value={filters.isOwnedByYou} onValueChange={(value) => setFilters(prev => ({ ...prev, isOwnedByYou: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Has been exported</label>
              <Select value={filters.hasBeenExported} onValueChange={(value) => setFilters(prev => ({ ...prev, hasBeenExported: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}