import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ChevronDown, Copy, Edit, Plus, Trash2 } from "lucide-react";

export default function Workflows() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: "all",
    sortBy: "newest",
    owner: "all",
    showArchive: false
  });

  const workflows = [
    { id: 1, name: "New Workflow", description: "", public: false, status: "Active" },
    { id: 2, name: "New Workflow", description: "", public: false, status: "Active" },
    { id: 3, name: "New Workflow", description: "", public: false, status: "Archived" },
    { id: 4, name: "New Workflow", description: "", public: false, status: "Active" },
    { id: 5, name: "New Workflow", description: "", public: false, status: "Active" }
  ];

  const publicWorkflows = [
    { id: 6, name: "Public Template", description: "A shared workflow template", public: true, status: "Active", author: "Community" },
    { id: 7, name: "Marketing Flow", description: "For marketing campaigns", public: true, status: "Active", author: "Expert User" }
  ];

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
          <Button 
            onClick={() => navigate("/workflows/new")}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Workflow
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Type</label>
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-32">
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
                  <SelectTrigger className="w-40">
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
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All owners</SelectItem>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox 
                  id="archive" 
                  checked={filters.showArchive}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showArchive: checked as boolean }))}
                />
                <label htmlFor="archive" className="text-sm font-medium text-foreground">
                  Show only Archive
                </label>
              </div>

              <div className="flex gap-2 pt-6 ml-auto">
                <Button variant="default" className="bg-gradient-primary">
                  Apply Filters
                </Button>
                <Button variant="outline">
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                      <TableHead className="font-semibold text-foreground">Name</TableHead>
                      <TableHead className="font-semibold text-foreground">Description</TableHead>
                      <TableHead className="font-semibold text-foreground">Public</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((workflow) => (
                      <TableRow key={workflow.id} className="border-border/50 hover:bg-muted/30 transition-smooth">
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover">
                            {workflow.name}
                          </Button>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {workflow.description || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                            Private
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8">
                                <span className="flex items-center text-success">
                                  ✓ {workflow.status}
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
                            <Button size="sm" variant="outline" className="h-8 px-3">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-3 bg-accent hover:bg-accent-hover">
                              <Copy className="h-3 w-3 mr-1" />
                              Duplicate
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-3 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                              <Trash2 className="h-3 w-3 mr-1" />
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

          <TabsContent value="public">
            <Card className="bg-gradient-card shadow-medium border-0">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="font-semibold text-foreground">Name</TableHead>
                      <TableHead className="font-semibold text-foreground">Description</TableHead>
                      <TableHead className="font-semibold text-foreground">Author</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {publicWorkflows.map((workflow) => (
                      <TableRow key={workflow.id} className="border-border/50 hover:bg-muted/30 transition-smooth">
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-hover">
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
                          <Badge variant="outline" className="border-success text-success">
                            {workflow.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 px-3 bg-accent hover:bg-accent-hover">
                              <Copy className="h-3 w-3 mr-1" />
                              Use Template
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
        </Tabs>
      </div>
    </AppLayout>
  );
}