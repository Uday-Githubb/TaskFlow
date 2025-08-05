import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Database, BarChart3, Calendar, FileText, Settings } from "lucide-react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useToast } from "@/hooks/use-toast";

export const IntegrationsPanel = () => {
  const { integrations, toggleIntegration } = useTaskStore();
  const { toast } = useToast();

  const allIntegrations = [
    {
      name: "Email Automation",
      description: "Connect with Gmail, Outlook, and other email providers",
      icon: Mail,
      key: "Email Automation"
    },
    {
      name: "Social Media",
      description: "Automate posts on Twitter, LinkedIn, Facebook",
      icon: MessageSquare,
      key: "Social Media"
    },
    {
      name: "CRM Systems",
      description: "Integrate with Salesforce, HubSpot, Pipedrive",
      icon: Database,
      key: "CRM Systems"
    },
    {
      name: "Analytics Tools",
      description: "Connect Google Analytics, Mixpanel, etc.",
      icon: BarChart3,
      key: "Analytics Tools"
    },
    {
      name: "Calendar Apps",
      description: "Sync with Google Calendar, Outlook Calendar",
      icon: Calendar,
      key: "Calendar Apps"
    },
    {
      name: "Document Management",
      description: "Automate Google Drive, Dropbox, OneDrive",
      icon: FileText,
      key: "Document Management"
    }
  ];

  const handleToggleIntegration = (integrationName: string) => {
    toggleIntegration(integrationName);
    
    const integration = integrations.find(i => i.name === integrationName);
    const newStatus = integration?.enabled ? 'disconnected' : 'connected';
    
    toast({
      title: `Integration ${newStatus === 'connected' ? 'Connected' : 'Disconnected'}`,
      description: `${integrationName} has been ${newStatus}.`,
      variant: newStatus === 'connected' ? 'default' : 'destructive'
    });
  };

  const getIntegrationData = (key: string) => {
    return integrations.find(i => i.name === key) || {
      name: key,
      status: 'disconnected' as const,
      apiCallsToday: 0,
      lastSync: 'Never',
      enabled: false
    };
  };

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
        {allIntegrations.map((integration, index) => {
          const data = getIntegrationData(integration.key);
          return (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 flex-1">
                {getIcon(integration.icon, data.status)}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{integration.name}</h4>
                    <Badge className={getStatusColor(data.status)}>
                      {data.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>API calls today: <strong>{data.apiCallsToday}</strong></span>
                    <span>Last sync: {data.lastSync}</span>
                  </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Switch 
                    checked={data.enabled} 
                    onCheckedChange={() => handleToggleIntegration(integration.key)}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            );
          })}
        
        <div className="pt-4 border-t">
          <Button className="w-full" variant="outline">
            + Add New Integration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};