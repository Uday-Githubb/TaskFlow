import { Header } from "@/components/Header";
import { DashboardStats } from "@/components/DashboardStats";
import { AITaskCreator } from "@/components/AITaskCreator";
import { ActiveTasks } from "@/components/ActiveTasks";
import { IntegrationsPanel } from "@/components/IntegrationsPanel";
import { AIInsights } from "@/components/AIInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            AI-Powered Task Automation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your workflows with intelligent automation. Connect platforms, create AI-driven tasks, 
            and boost your productivity with secure, scalable automation.
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <AITaskCreator />
            <AIInsights />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <ActiveTasks />
            <IntegrationsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
