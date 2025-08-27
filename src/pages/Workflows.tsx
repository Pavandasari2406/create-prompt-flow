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
  const [filters, setFilters] = useState({
    type: "all",
    sortBy: "newest",
    owner: "all",
    showOnlyActive: false
  });

  const workflows = [
    { id: "WF001", name: "New Workflow", description: "", public: false, status: "Active" },
    { id: "WF002", name: "New Workflow", description: "", public: false, status: "Active" },
    { id: "WF003", name: "New Workflow", description: "", public: false, status: "Archived" },
    { id: "WF004", name: "New Workflow", description: "", public: false, status: "Active" },
    { id: "WF005", name: "New Workflow", description: "", public: false, status: "Active" }
  ];

  const publicWorkflows = [
    { id: "PW001", name: "Public Template", description: "A shared workflow template", public: true, status: "Active", author: "Community" },
    { id: "PW002", name: "Marketing Flow", description: "For marketing campaigns", public: true, status: "Active", author: "Expert User" }
  ];

  const clearFilters = () => {
    setFilters({
      type: "all",
      sortBy: "newest",
      owner: "all",
      showOnlyActive: false
    });
  };

  return (
    <AppLayout>
      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
          <Button 
            onClick={() => navigate("/workflows/new")}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            Create New Workflow
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-background border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Type</label>
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-40 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Sort by</label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger className="w-40 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Owner</label>
                <Select value={filters.owner} onValueChange={(value) => setFilters(prev => ({ ...prev, owner: value }))}>
                  <SelectTrigger className="w-40 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All owners</SelectItem>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showOnlyActive"
                  checked={filters.showOnlyActive}
                  onChange={(e) => setFilters(prev => ({ ...prev, showOnlyActive: e.target.checked }))}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="showOnlyActive" className="text-sm font-medium text-foreground">
                  Show only Active
                </label>
              </div>

              <div className="flex gap-3 ml-auto">
                <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflows Content */}
        <Tabs defaultValue="your" className="space-y-6">
          <TabsList className="bg-muted/30 p-1 rounded-lg">
            <TabsTrigger 
              value="your" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md px-6 py-2"
            >
              Your Workflows
            </TabsTrigger>
            <TabsTrigger 
              value="public" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md px-6 py-2 text-primary"
            >
              Public Workflows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="your" className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your Workflows</h2>
            <Card className="bg-background border border-border shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="font-semibold text-foreground h-12">Name</TableHead>
                      <TableHead className="font-semibold text-foreground">Description</TableHead>
                      <TableHead className="font-semibold text-foreground">Public</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((workflow) => (
                      <TableRow key={workflow.id} className="border-border/50 hover:bg-muted/20 transition-smooth">
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover underline font-normal">
                            {workflow.name}
                          </Button>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {workflow.description || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground rounded-full">
                            Private
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 justify-between min-w-24">
                                <span className="flex items-center">
                                  {workflow.status === "Active" && <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />}
                                  {workflow.status}
                                </span>
                                <ChevronDown className="h-3 w-3 ml-1" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Active</DropdownMenuItem>
                              <DropdownMenuItem>Archived</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="h-8 px-3 bg-muted hover:bg-muted/80">
                              Edit
                            </Button>
                            <Button size="sm" className="h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                              Duplicate
                            </Button>
                            <Button size="sm" variant="destructive" className="h-8 px-3">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="public" className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Public Workflows</h2>
            <Card className="bg-background border border-border shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="font-semibold text-foreground h-12">Name</TableHead>
                      <TableHead className="font-semibold text-foreground">Description</TableHead>
                      <TableHead className="font-semibold text-foreground">Author</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {publicWorkflows.map((workflow) => (
                      <TableRow key={workflow.id} className="border-border/50 hover:bg-muted/20 transition-smooth">
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover underline font-normal">
                            {workflow.name}
                          </Button>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {workflow.description}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {workflow.author}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 rounded-full">
                            {workflow.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" className="h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                            Use Template
                          </Button>
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
    </AppLayout>
  );
}