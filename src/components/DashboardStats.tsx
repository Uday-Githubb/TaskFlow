import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Clock, Zap } from "lucide-react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useEffect } from "react";

export const DashboardStats = () => {
  const { stats, updateStats } = useTaskStore();

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [updateStats]);

  const statsData = [
    {
      title: "Active Tasks",
      value: stats.activeTasks.toString(),
      description: "Currently running",
      icon: Activity,
      trend: "+2 from yesterday"
    },
    {
      title: "Completed Today",
      value: stats.completedToday.toString(),
      description: "Successfully finished",
      icon: CheckCircle,
      trend: "+12% from yesterday"
    },
    {
      title: "Time Saved",
      value: `${stats.timeSavedHours}h`,
      description: "Today's automation",
      icon: Clock,
      trend: "+0.5h from yesterday"
    },
    {
      title: "API Calls",
      value: stats.apiCallsMonth.toLocaleString(),
      description: "This month",
      icon: Zap,
      trend: "+8% from last month"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};