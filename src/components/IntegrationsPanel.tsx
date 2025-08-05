import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Database, BarChart3, Calendar, FileText, Settings } from "lucide-react";

export const IntegrationsPanel = () => {
  const integrations = [
    {
      name: "Email Automation",
      description: "Connect with Gmail, Outlook, and other email providers",
      icon: Mail,
      status: "connected",
      apiCallsToday: 142,
      lastSync: "5 min ago"
    },
    {
      name: "Social Media",
      description: "Automate posts on Twitter, LinkedIn, Facebook",
      icon: MessageSquare,
      status: "connected",
      apiCallsToday: 67,
      lastSync: "1 hour ago"
    },
    {
      name: "CRM Systems",
      description: "Integrate with Salesforce, HubSpot, Pipedrive",
      icon: Database,
      status: "disconnected",
      apiCallsToday: 0,
      lastSync: "Never"
    },
    {
      name: "Analytics Tools",
      description: "Connect Google Analytics, Mixpanel, etc.",
      icon: BarChart3,
      status: "connected",
      apiCallsToday: 23,
      lastSync: "2 hours ago"
    },
    {
      name: "Calendar Apps",
      description: "Sync with Google Calendar, Outlook Calendar",
      icon: Calendar,
      status: "connected",
      apiCallsToday: 8,
      lastSync: "30 min ago"
    },
    {
      name: "Document Management",
      description: "Automate Google Drive, Dropbox, OneDrive",
      icon: FileText,
      status: "disconnected",
      apiCallsToday: 0,
      lastSync: "Never"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "connected" ? "bg-green-500 text-white" : "bg-gray-500 text-white";
  };

  const getIcon = (IconComponent: any, status: string) => {
    return <IconComponent className={`h-5 w-5 ${status === "connected" ? "text-green-600" : "text-gray-400"}`} />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Platform Integrations</span>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 flex-1">
              {getIcon(integration.icon, integration.status)}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{integration.name}</h4>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>API calls today: <strong>{integration.apiCallsToday}</strong></span>
                  <span>Last sync: {integration.lastSync}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Switch 
                checked={integration.status === "connected"} 
                className="data-[state=checked]:bg-green-500"
              />
              <Button variant="ghost" size="sm">
                Configure
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button className="w-full" variant="outline">
            + Add New Integration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};