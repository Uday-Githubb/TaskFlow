import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";

export const AIInsights = () => {
  const insights = [
    {
      type: "optimization",
      title: "Workflow Optimization Opportunity",
      description: "Your email automation could be 23% more efficient by combining related tasks",
      impact: "High",
      action: "Optimize Now",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      type: "alert",
      title: "API Rate Limit Warning",
      description: "Social media integration approaching daily limit (87% used)",
      impact: "Medium",
      action: "Review Limits",
      icon: AlertTriangle,
      color: "text-yellow-600"
    },
    {
      type: "suggestion",
      title: "New Automation Suggestion",
      description: "Based on your patterns, consider automating lead qualification in CRM",
      impact: "High",
      action: "Create Task",
      icon: Lightbulb,
      color: "text-blue-600"
    },
    {
      type: "performance",
      title: "Performance Improvement",
      description: "Your automations saved 4.2 hours this week, up 15% from last week",
      impact: "Positive",
      action: "View Details",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "positive": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="shrink-0">
                  {insight.action}
                </Button>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              AI analyzed <strong>247 data points</strong> to generate these insights
            </div>
            <Button variant="ghost" size="sm">
              View All Insights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};