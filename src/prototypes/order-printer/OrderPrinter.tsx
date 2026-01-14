import { useLocation, useSearchParams } from "react-router-dom";
import ShopifyAdminLayout from "./ShopifyAdminLayout";
import InactivePage from "./InactivePage";
import DocumentsPage from "./DocumentsPage";
import TemplateEditorPage from "./TemplateEditorPage";
import OrdersPage from "./OrdersPage";
import { getDefaultIteration } from "../../lib/workflows";

interface OrderPrinterProps {
  iteration?: string;
}

export default function OrderPrinter({ iteration: propIteration }: OrderPrinterProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathname = location.pathname;
  
  // Get iteration from URL query params, prop, or default to v1
  const iteration = searchParams.get("iteration") || propIteration || getDefaultIteration("order-printer") || "v1";
  
  // Check if we're on a sub-page (not the main order printer page)
  // Path structure: /prototypes/order-printer or /prototypes/order-printer/[subpage]
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const orderPrinterIndex = pathParts.findIndex(part => part === "order-printer");
  const isSubPage = orderPrinterIndex >= 0 && pathParts.length > orderPrinterIndex + 1;
  const subPage = isSubPage ? pathParts[orderPrinterIndex + 1] : null;
  
  // For V3, check if we're on a template editor page
  if (iteration === "v3" && isSubPage && subPage) {
    // Decode template name from URL
    const templateName = decodeURIComponent(subPage);
    // Determine template type from name or localStorage
    const getTemplateType = (name: string): "packing-slip" | "invoice" | "pick-list" | "custom" => {
      const lowerName = name.toLowerCase();
      if (lowerName.includes("packing")) return "packing-slip";
      if (lowerName.includes("invoice")) return "invoice";
      if (lowerName.includes("pick")) return "pick-list";
      if (lowerName.includes("custom")) return "custom";
      // Try to get from localStorage
      try {
        const key = `template-custom-${name}`;
        const saved = localStorage.getItem(key);
        if (saved) return "custom";
      } catch (e) {
        // Ignore
      }
      return "packing-slip"; // default
    };
    
    const templateType = getTemplateType(templateName);
    
    return (
      <ShopifyAdminLayout iteration={iteration}>
        <TemplateEditorPage
          templateName={templateName}
          templateType={templateType}
        />
      </ShopifyAdminLayout>
    );
  }
  
  // Active pages
  const activePages: string[] = ["orders"]; // Pages that should render content
  
  const isActive = !isSubPage || activePages.includes(subPage || "");

  return (
    <ShopifyAdminLayout iteration={iteration}>
      {!isSubPage ? (
        <DocumentsPage iteration={iteration} />
      ) : subPage === "orders" ? (
        <OrdersPage iteration={iteration} />
      ) : (
        <InactivePage pageName={subPage || ""} />
      )}
    </ShopifyAdminLayout>
  );
}

