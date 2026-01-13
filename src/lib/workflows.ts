// Workflow configuration for different design iterations

export interface WorkflowIteration {
  id: string;
  name: string;
  description?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  iterations: WorkflowIteration[];
  defaultIteration?: string;
  isPasswordProtected?: boolean;
  passwordEnvKey?: string;
}

// Workflows organized by category/folder
export interface WorkflowCategory {
  id: string;
  name: string;
  workflows: Workflow[];
}

export const workflowCategories: WorkflowCategory[] = [
  {
    id: "design-experiments",
    name: "Design & Motion Experiments",
    workflows: [
      {
        id: "door-handle-checkin",
        name: "Door Handle Check-in",
        description: "Hotel card check-in with door handle interaction",
        iterations: [
          { id: "v1", name: "Version 1" },
        ],
        defaultIteration: "v1",
      },
    ],
  },
  {
    id: "shopify-projects",
    name: "Shopify projects",
    workflows: [
      {
        id: "order-printer",
        name: "Order Printer",
        description: "Order printing workflow iterations",
        iterations: [
          { id: "v1", name: "Vision - max modal list" },
          { id: "v2", name: "Vision - max modal tiered" },
          { id: "v3", name: "Near-term updates" },
        ],
        defaultIteration: "v1",
        isPasswordProtected: false,
      },
    ],
  },
];

// Flattened list for backward compatibility
export const workflows: Workflow[] = workflowCategories.flatMap(
  (category) => category.workflows
);

export function getWorkflow(workflowId: string): Workflow | undefined {
  return workflows.find((w) => w.id === workflowId);
}

export function getIteration(
  workflowId: string,
  iterationId: string
): WorkflowIteration | undefined {
  const workflow = getWorkflow(workflowId);
  return workflow?.iterations.find((i) => i.id === iterationId);
}

export function getDefaultIteration(workflowId: string): string | undefined {
  const workflow = getWorkflow(workflowId);
  return workflow?.defaultIteration || workflow?.iterations[0]?.id;
}
