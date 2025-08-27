import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Workflow, 
  List, 
  FileText, 
  MessageSquare, 
  Database,
  Edit
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Workflows",
    href: "/workflows",
    icon: Workflow,
  },
  {
    name: "Prompt Lists",
    href: "/prompt-lists",
    icon: List,
  },
  {
    name: "Prompt Templates",
    href: "/prompt-templates",
    icon: FileText,
  },
  {
    name: "AI Chat",
    href: "/ai-chat",
    icon: MessageSquare,
  },
  {
    name: "Inputs",
    href: "/inputs",
    icon: Database,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gradient-sidebar border-r border-sidebar-border shadow-soft">
      <div className="flex h-16 items-center justify-center px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <Edit className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Prompt Creator</span>
        </div>
      </div>
      
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}