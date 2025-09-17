import { TentGridPlanner } from "@/components/TentGridPlanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Tent Grid Planner</h1>
          <p className="text-xl text-muted-foreground">Professional Event Layout Planning</p>
        </div>
        <TentGridPlanner />
      </div>
    </div>
  );
};

export default Index;
