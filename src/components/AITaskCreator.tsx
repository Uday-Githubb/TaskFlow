import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Play, Clock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AITaskCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const [priority, setPriority] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const platforms = [
    { value: "email", label: "Email Automation" },
    { value: "social", label: "Social Media" },
    { value: "crm", label: "CRM Integration" },
    { value: "analytics", label: "Data Analytics" },
    { value: "content", label: "Content Generation" },
    { value: "scheduling", label: "Task Scheduling" }
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "bg-green-500" },
    { value: "medium", label: "Medium Priority", color: "bg-yellow-500" },
    { value: "high", label: "High Priority", color: "bg-red-500" }
  ];

  const handleCreateTask = async () => {
    if (!prompt.trim() || !platform || !priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create a task.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "Task Created Successfully",
        description: "Your AI automation task has been queued for execution.",
      });
      setPrompt("");
      setPlatform("");
      setPriority("");
      setIsProcessing(false);
    }, 2000);
  };

  const getPriorityColor = (value: string) => {
    const priority = priorities.find(p => p.value === value);
    return priority?.color || "bg-gray-500";
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          AI Task Creator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Describe your automation task and let AI handle the implementation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Task Description</label>
          <Textarea
            placeholder="E.g., 'Send a weekly summary email to my team with analytics data' or 'Post daily motivational quotes on social media'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Target className="h-4 w-4" />
              Platform/Integration
            </label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Choose platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Priority Level
            </label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Set priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.color}`} />
                      {p.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {priority && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Selected Priority:</span>
            <Badge 
              variant="secondary" 
              className={`${getPriorityColor(priority)} text-white`}
            >
              {priorities.find(p => p.value === priority)?.label}
            </Badge>
          </div>
        )}

        <Button 
          onClick={handleCreateTask}
          disabled={isProcessing || !prompt.trim() || !platform || !priority}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing with AI...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Create AI Task
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};