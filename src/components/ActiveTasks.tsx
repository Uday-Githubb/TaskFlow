import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, MoreHorizontal, Clock, Zap } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const ActiveTasks = () => {
  const tasks = [
    {
      id: 1,
      name: "Weekly Analytics Report",
      description: "Generate and send weekly performance summary",
      platform: "Email",
      status: "running",
      progress: 75,
      priority: "high",
      eta: "2 min",
      lastRun: "Running now"
    },
    {
      id: 2,
      name: "Social Media Scheduler",
      description: "Post daily content across platforms",
      platform: "Social Media",
      status: "scheduled",
      progress: 0,
      priority: "medium",
      eta: "1 hour",
      lastRun: "2 hours ago"
    },
    {
      id: 3,
      name: "Lead Scoring Update",
      description: "Update CRM lead scores using AI analysis",
      platform: "CRM",
      status: "running",
      progress: 45,
      priority: "high",
      eta: "5 min",
      lastRun: "Running now"
    },
    {
      id: 4,
      name: "Content Optimization",
      description: "Optimize website content for SEO",
      platform: "Analytics",
      status: "paused",
      progress: 20,
      priority: "low",
      eta: "Paused",
      lastRun: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500 text-white";
      case "scheduled": return "bg-blue-500 text-white";
      case "paused": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Zap className="h-3 w-3" />;
      case "scheduled": return <Clock className="h-3 w-3" />;
      case "paused": return <Pause className="h-3 w-3" />;
      default: return <Play className="h-3 w-3" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Automations</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {tasks.filter(t => t.status === "running").length} Running
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{task.name}</h4>
                  <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    Platform: <strong>{task.platform}</strong>
                  </span>
                  <span>ETA: {task.eta}</span>
                  <span>Last: {task.lastRun}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(task.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    {task.status}
                  </div>
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="h-4 w-4 mr-2" />
                      Run Now
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {task.status === "running" && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};