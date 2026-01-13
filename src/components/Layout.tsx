import { ReactNode } from "react";
import WorkflowFloatingNav from "./WorkflowFloatingNav";

interface LayoutProps {
  children: ReactNode;
  workflowId?: string;
  currentIteration?: string;
  showIterationSwitcher?: boolean;
}

export default function Layout({
  children,
  workflowId,
  currentIteration,
  showIterationSwitcher = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        {children}
      </main>
      {/* Floating navigation - only shows on workflow pages */}
      {showIterationSwitcher && <WorkflowFloatingNav />}
    </div>
  );
}
