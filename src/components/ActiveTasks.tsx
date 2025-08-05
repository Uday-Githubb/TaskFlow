import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, MoreHorizontal, Clock, Zap, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const ActiveTasks = () => {
  const { tasks, updateTaskStatus, updateTaskProgress, deleteTask } = useTaskStore();
  const { toast } = useToast();

  // Simulate task progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach(task => {
        if (task.status === 'running' && task.progress < 100) {
          const newProgress = Math.min(100, task.progress + Math.random() * 5);
          updateTaskProgress(task.id, newProgress);
          
          // Complete task when it reaches 100%
          if (newProgress >= 100) {
            updateTaskStatus(task.id, 'completed');
            toast({
              title: "Task Completed",
              description: `"${task.name}" has finished successfully!`,
            });
          }
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks, updateTaskProgress, updateTaskStatus, toast]);

  const handleTaskAction = (taskId: string, action: string, taskName: string) => {
    switch (action) {
      case 'run':
        updateTaskStatus(taskId, 'running');
        toast({
          title: "Task Started",
          description: `"${taskName}" is now running.`,
        });
        break;
      case 'pause':
        updateTaskStatus(taskId, 'paused');
        toast({
          title: "Task Paused",
          description: `"${taskName}" has been paused.`,
        });
        break;
      case 'stop':
        updateTaskStatus(taskId, 'scheduled');
        updateTaskProgress(taskId, 0);
        toast({
          title: "Task Stopped",
          description: `"${taskName}" has been stopped and reset.`,
        });
        break;
      case 'delete':
        deleteTask(taskId);
        toast({
          title: "Task Deleted",
          description: `"${taskName}" has been removed.`,
          variant: "destructive"
        });
        break;
    }
  };

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
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active tasks yet. Create your first AI automation above!</p>
          </div>
        ) : (
          tasks.map((task) => (
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
                      <DropdownMenuItem onClick={() => handleTaskAction(task.id, 'run', task.name)}>
                        <Play className="h-4 w-4 mr-2" />
                        Run Now
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTaskAction(task.id, 'pause', task.name)}>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTaskAction(task.id, 'stop', task.name)}>
                        <Square className="h-4 w-4 mr-2" />
                        Stop
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTaskAction(task.id, 'delete', task.name)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {task.status === "running" && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{Math.round(task.progress)}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};