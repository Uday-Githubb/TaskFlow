import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { useTaskStore } from "@/hooks/useTaskStore";

export const AIInsights = () => {
  const { tasks, integrations, stats } = useTaskStore();

  const insights = [
    {
      title: "Performance Trend",
      value: "+23%",
      description: "Task completion rate this week",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Active Integrations", 
      value: integrations.filter(i => i.enabled).length.toString(),
      description: "Connected platforms",
      icon: CheckCircle,
      color: "text-blue-600"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          AI Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-3 rounded-lg border bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                  <span className={`text-lg font-bold ${insight.color}`}>
                    {insight.value}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Platform Efficiency</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Email Automation</span>
              <span className="text-muted-foreground">96%</span>
            </div>
            <Progress value={96} className="h-1.5" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Social Media</span>
              <span className="text-muted-foreground">89%</span>
            </div>
            <Progress value={89} className="h-1.5" />
          </div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                AI Recommendation
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-200">
                Consider batching email workflows to reduce API calls by 30%.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};