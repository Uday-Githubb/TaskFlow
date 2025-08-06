// Mock OpenAI service for demonstration
export interface AITaskRequest {
  prompt: string;
  platform: string;
  priority: string;
}

export interface AITaskResponse {
  success: boolean;
  taskName: string;
  description: string;
  estimatedDuration: string;
  confidence: number;
  suggestedSchedule?: string;
}

export class OpenAIService {
  static async generateTask(request: AITaskRequest): Promise<AITaskResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Mock AI responses based on keywords in prompt
    const prompt = request.prompt.toLowerCase();
    
    let taskName = '';
    let description = '';
    let estimatedDuration = '';
    
    if (prompt.includes('email') || prompt.includes('mail')) {
      taskName = `Email Automation: ${this.extractTaskName(prompt)}`;
      description = `Automated email workflow: ${request.prompt}`;
      estimatedDuration = '5-10 min';
    } else if (prompt.includes('social') || prompt.includes('post') || prompt.includes('tweet')) {
      taskName = `Social Media Automation: ${this.extractTaskName(prompt)}`;
      description = `Social media posting workflow: ${request.prompt}`;
      estimatedDuration = '3-7 min';
    } else if (prompt.includes('data') || prompt.includes('analytics') || prompt.includes('report')) {
      taskName = `Analytics Task: ${this.extractTaskName(prompt)}`;
      description = `Data analysis and reporting: ${request.prompt}`;
      estimatedDuration = '10-15 min';
    } else if (prompt.includes('schedule') || prompt.includes('calendar')) {
      taskName = `Scheduling Automation: ${this.extractTaskName(prompt)}`;
      description = `Calendar and scheduling workflow: ${request.prompt}`;
      estimatedDuration = '2-5 min';
    } else {
      taskName = `Custom Automation: ${this.extractTaskName(prompt)}`;
      description = `Custom workflow: ${request.prompt}`;
      estimatedDuration = '5-12 min';
    }
    
    return {
      success: true,
      taskName,
      description,
      estimatedDuration,
      confidence: 0.85 + Math.random() * 0.15, // 85-100% confidence
      suggestedSchedule: this.getSuggestedSchedule(request.priority)
    };
  }
  
  private static extractTaskName(prompt: string): string {
    // Extract key action words to create a meaningful task name
    const words = prompt.split(' ').slice(0, 6);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  
  private static getSuggestedSchedule(priority: string): string {
    switch (priority) {
      case 'high': return 'Run immediately';
      case 'medium': return 'Schedule for next hour';
      case 'low': return 'Schedule for tomorrow';
      default: return 'Schedule as needed';
    }
  }
}