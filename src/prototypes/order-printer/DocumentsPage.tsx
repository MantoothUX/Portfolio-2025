// @ts-nocheck - Polaris web components are custom elements

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PolarisPage from "../shared/PolarisPage";
import TemplateEditorModal from "./TemplateEditorModal";
import TemplatePreview from "./TemplatePreview";
import { useUnsavedChanges } from "./UnsavedChangesContext";

// Format Date object to formatted date/time string (utility function)
const formatDateTimeFromDate = (date: Date): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
  // Add ordinal suffix to day
  const getOrdinal = (n: number): string => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
  };
  
  return `${month} ${getOrdinal(day)}, ${year} at ${hours}:${minutesStr} ${ampm}`;
};

// Default template code constants
const TEMPLATE_CODE: Record<string, string> = {
  "packing-slip": `<div>
<div class="columns">
  <h1>Packing Slip</h1>
  <div class="address">
    <p style="text-align: right; margin: 0;">
    Order {{ order.order_name }}<br />
    {% if order.po_number %}PO # {{ order.po_number }}<br />{% endif %}
    {{ order.created_at | date: "%B %e, %Y" }}
    </p>
  </div>
</div>
<div class="columns" style="margin-top: 1.5em;">
  <div class="address">
    <strong>From</strong><br/>
    {{ shop.name }}<br/>
    {{ shop.address | format_address }}
  </div>
  {% if order.shipping_address %}
  <div class="address">
    <strong>Ship to</strong>
    {{ order.shipping_address | format_address  }}
   </div>
  {% endif %}
</div>
<hr />
<h2>Order Details</h2>
<table class="table-tabular" style="margin: 1em 0 0 0;">
  <thead>
    <tr>
      <th style="width: 15%; text-align: left;">Qty</th>
      <th style="width: 85%; text-align: left;">Item</th>
    </tr>
  </thead>
  <tbody>
    {% for line_item in order.line_items %}
    <tr>
      <td style="text-align: left;">{{ line_item.quantity }}</td>
      <td style="text-align: left;">{{ line_item.title }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>`,
  "invoice": `<div>
<div class="columns">
   <h1>Invoice</h1>
   <div>
      <p style="text-align: right; margin: 0;">
         Order {{ order.order_name }}<br />
         {% if order.po_number %}PO # {{ order.po_number }}<br />{% endif %}
         {{ order.created_at | date: "%B %e, %Y" }}
      </p>
   </div>
</div>
<div class="columns" style="margin-top: 1.5em;">
   <div class="address">
      <strong>From</strong><br/>
      {{ shop.name }}<br/>
      {{ shop.address | format_address }}
   </div>
   {% if order.shipping_address %}
   <div class="address">
      <strong>Ship to</strong>
      {{ order.shipping_address | format_address  }}
   </div>
   {% endif %}
</div>
<hr />
<h2>Order Details</h2>
<table class="table-tabular" style="margin: 1em 0 0 0;">
   <thead>
      <tr>
         <th>Qty</th>
         <th>Item</th>
         <th style="text-align: right;">Price</th>
      </tr>
   </thead>
   <tbody>
      {% for line_item in order.line_items %}
      <tr>
         <td>{{ line_item.quantity }}</td>
         <td>{{ line_item.title }}</td>
         <td style="text-align: right;">{{ line_item.final_price | money }}</td>
      </tr>
      {% endfor %}
   </tbody>
</table>
</div>`,
  "pick-list": `<div>
<div class="columns">
  <h1>Pick list</h1>
  <div class="address">
    <p style="text-align: right; margin: 0;">
      {{ shop.name }}<br />
      {{ "now" | date: "%B %d, %Y" }}
    </p>
  </div>
</div>
<table class="table-tabular" style="margin: 1em 0 0 0;">
  <thead>
    <tr>
      <th style="width: 100px;">Image</th>
      <th>Product Title</th>
      <th>Variant</th>
      <th>Order</th>
      <th>SKU</th>
      <th style="width: 80px; text-align: center;">Qty</th>
      <th style="width: 120px;">Bin name</th>
    </tr>
  </thead>
  <tbody>
    {% for line_item in order.line_items %}
    <tr>
      <td></td>
      <td>{{ line_item.product.title }}</td>
      <td>{{ line_item.variant.title }}</td>
      <td>{{ order.order_name }}</td>
      <td>{{ line_item.sku }}</td>
      <td style="text-align: center;">{{ line_item.quantity }}</td>
      <td></td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>`,
};

// Document type with extended fields
interface Document {
  id: number;
  name: string;
  status: "Active" | "Draft";
  created: string;
  lastEdited?: string;
  usageCount?: number;
  thumbnail: string;
}

// Documents page matching Figma design
const documents: Document[] = [
  {
    id: 1,
    name: "Packing slip",
    status: "Active",
    created: "October 4th, 2025 at 10:01 am",
    lastEdited: "October 4th, 2025 at 10:01 am",
    usageCount: 0,
    thumbnail: "/Order_printer_proto/previews/packing-slip.png",
  },
  {
    id: 2,
    name: "Pick list",
    status: "Active",
    created: "October 4th, 2025 at 10:01 am",
    lastEdited: "October 4th, 2025 at 10:01 am",
    usageCount: 0,
    thumbnail: "/Order_printer_proto/previews/pick-list.png",
  },
  {
    id: 3,
    name: "Invoice",
    status: "Active",
    created: "October 4th, 2025 at 10:01 am",
    lastEdited: "October 4th, 2025 at 10:01 am",
    usageCount: 0,
    thumbnail: "/Order_printer_proto/previews/invoice.png",
  },
];

interface DocumentsPageProps {
  iteration?: string;
}

export default function DocumentsPage({ iteration = "v1" }: DocumentsPageProps) {
  const navigate = useNavigate();
  const { setHasUnsavedChanges, setSaveHandler, setDiscardHandler } = useUnsavedChanges();
  const [selectedTemplate, setSelectedTemplate] = useState<{
    name: string;
    type: "packing-slip" | "invoice" | "pick-list" | "custom";
  } | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<{
    name: string;
    type: "packing-slip" | "invoice" | "pick-list" | "custom";
    code: string;
  } | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<Document[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  
  // Load template metadata (lastEdited, usageCount) from localStorage
  const loadTemplateMetadata = useCallback((templateName: string, templateType: string): { lastEdited?: string; usageCount?: number } => {
    try {
      const key = templateType === "custom" 
        ? `template-custom-${templateName}`
        : `template-${templateType}-${templateName}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const templateData = JSON.parse(saved);
        return {
          lastEdited: templateData.lastEdited || templateData.savedAt ? formatDateTimeFromISO(templateData.savedAt) : undefined,
          usageCount: templateData.usageCount || 0,
        };
      }
    } catch (error) {
      console.error("Failed to load template metadata:", error);
    }
    return {};
  }, []);

  // Load custom templates from localStorage on mount and when modal closes
  const loadCustomTemplates = useCallback(() => {
    try {
      const savedCustomTemplates = localStorage.getItem("custom-templates-list");
      if (savedCustomTemplates) {
        const parsed = JSON.parse(savedCustomTemplates);
        // Update status and metadata for each template from saved template data
        const updated = parsed.map((template: Document) => {
          const templateKey = `template-custom-${template.name}`;
          try {
            const saved = localStorage.getItem(templateKey);
            if (saved) {
              const templateData = JSON.parse(saved);
              const metadata = {
                status: templateData.status && (templateData.status === "Active" || templateData.status === "Draft") 
                  ? templateData.status 
                  : template.status,
                lastEdited: templateData.lastEdited || (templateData.savedAt ? formatDateTimeFromISO(templateData.savedAt) : template.lastEdited),
                usageCount: templateData.usageCount || template.usageCount || 0,
              };
              return { ...template, ...metadata };
            }
          } catch (error) {
            console.error("Failed to load template status:", error);
          }
          return template;
        });
        setCustomTemplates(updated);
        // Also save updated list back to localStorage
        localStorage.setItem("custom-templates-list", JSON.stringify(updated));
      }
    } catch (error) {
      console.error("Failed to load custom templates:", error);
    }
  }, []);

  useEffect(() => {
    loadCustomTemplates();
  }, [loadCustomTemplates]);

  // Reload custom templates when modal closes
  useEffect(() => {
    if (!selectedTemplate) {
      loadCustomTemplates();
    }
  }, [selectedTemplate, loadCustomTemplates]);

  // Function to get status for a template (default or saved)
  const getTemplateStatus = (templateName: string, templateType: string): "Active" | "Draft" => {
    try {
      const key = `template-${templateType}-${templateName}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const templateData = JSON.parse(saved);
        if (templateData.status && (templateData.status === "Active" || templateData.status === "Draft")) {
          return templateData.status;
        }
      }
    } catch (error) {
      console.error("Failed to load template status:", error);
    }
    return "Active"; // Default to Active
  };

  // Get status for default templates
  const getDefaultTemplateStatus = (doc: Document): "Active" | "Draft" => {
    const templateType = getTemplateType(doc.name);
    return getTemplateStatus(doc.name, templateType);
  };

  // Format ISO date string to formatted date/time string
  const formatDateTimeFromISO = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      return formatDateTimeFromDate(date);
    } catch (error) {
      return formatDateTime();
    }
  };

  
  // Handle saving custom template
  const handleSaveCustomTemplate = async (templateName: string, code: string, status?: "Active" | "Draft") => {
    try {
      // Generate preview image
      let thumbnail = "/Order_printer_proto/previews/packing-slip.png"; // Default fallback
      
      try {
        const previewResponse = await fetch("/api/generate-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateCode: code,
            templateName: templateName,
            templateType: "custom",
          }),
        });

        if (previewResponse.ok) {
          const previewData = await previewResponse.json();
          if (previewData.previewPath) {
            thumbnail = previewData.previewPath;
          }
        }
      } catch (previewError) {
        console.error("Failed to generate preview image:", previewError);
        // Continue with default thumbnail if preview generation fails
      }

      // Use provided status or default to "Active"
      const templateStatus: "Active" | "Draft" = status || "Active";
      const templateKey = `template-custom-${templateName}`;

      const now = new Date();
      const lastEditedFormatted = formatDateTimeFromDate(now);
      
      // Update state - check if template already exists
      setCustomTemplates((prev) => {
        const existingIndex = prev.findIndex((t) => t.name === templateName);
        
        if (existingIndex >= 0) {
          // Update existing template
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: templateStatus,
            thumbnail: thumbnail,
            lastEdited: lastEditedFormatted,
          };
          // Save to localStorage
          localStorage.setItem("custom-templates-list", JSON.stringify(updated));
          return updated;
        } else {
          // Add new template
          const newTemplate: Document = {
            id: Date.now(), // Use timestamp as ID
            name: templateName,
            status: templateStatus,
            created: formatDateTime(),
            lastEdited: lastEditedFormatted,
            usageCount: 0,
            thumbnail: thumbnail,
          };
          const updated = [...prev, newTemplate];
          // Save to localStorage
          localStorage.setItem("custom-templates-list", JSON.stringify(updated));
          return updated;
        }
      });
      
      // Also save the template code with status and metadata
      const existingData = (() => {
        try {
          const existing = localStorage.getItem(templateKey);
          return existing ? JSON.parse(existing) : {};
        } catch {
          return {};
        }
      })();
      
      const templateData = {
        ...existingData,
        code,
        templateName,
        templateType: "custom",
        status: templateStatus,
        savedAt: now.toISOString(),
        lastEdited: lastEditedFormatted,
        usageCount: existingData.usageCount || 0,
      };
      localStorage.setItem(templateKey, JSON.stringify(templateData));
    } catch (error) {
      console.error("Failed to save custom template:", error);
    }
  };

  // Handle deleting a template
  const handleDeleteTemplate = (docId: number, isCustom: boolean, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click from firing
    
    if (isCustom) {
      // Delete custom template
      setCustomTemplates((prev) => {
        const updated = prev.filter((template) => template.id !== docId);
        // Update localStorage
        localStorage.setItem("custom-templates-list", JSON.stringify(updated));
        
        // Also delete the template code from localStorage
        const templateToDelete = prev.find((t) => t.id === docId);
        if (templateToDelete) {
          const key = `template-custom-${templateToDelete.name}`;
          localStorage.removeItem(key);
        }
        
        return updated;
      });
    } else {
      // For default templates, we could show a confirmation or prevent deletion
      // For now, we'll just prevent deletion of default templates
      if (confirm("Default templates cannot be deleted. Would you like to create a copy instead?")) {
        // Could implement copy functionality here if needed
      }
    }
  };

  // Map document names to template types
  const getTemplateType = (name: string): "packing-slip" | "invoice" | "pick-list" => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("packing")) return "packing-slip";
    if (lowerName.includes("invoice")) return "invoice";
    if (lowerName.includes("pick")) return "pick-list";
    return "packing-slip"; // default
  };

  // Track template usage and update lastEdited
  const trackTemplateUsage = useCallback((templateName: string, templateType: string) => {
    try {
      const key = templateType === "custom" 
        ? `template-custom-${templateName}`
        : `template-${templateType}-${templateName}`;
      const existing = localStorage.getItem(key);
      const now = new Date();
      const lastEditedFormatted = formatDateTimeFromDate(now);
      
      if (existing) {
        const templateData = JSON.parse(existing);
        const usageCount = (templateData.usageCount || 0) + 1;
        localStorage.setItem(key, JSON.stringify({
          ...templateData,
          usageCount,
          lastEdited: lastEditedFormatted,
        }));
      } else {
        // Create entry for default templates
        const templateData = {
          templateName,
          templateType,
          usageCount: 1,
          lastEdited: lastEditedFormatted,
        };
        localStorage.setItem(key, JSON.stringify(templateData));
      }
      
      // Update custom templates list if it's a custom template
      if (templateType === "custom") {
        setCustomTemplates((prev) => {
          const updated = prev.map((t) => {
            if (t.name === templateName) {
              return { 
                ...t, 
                usageCount: (t.usageCount || 0) + 1,
                lastEdited: lastEditedFormatted,
              };
            }
            return t;
          });
          localStorage.setItem("custom-templates-list", JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error("Failed to track template usage:", error);
    }
  }, []);

  // Load template code from localStorage
  const loadTemplateCode = useCallback((templateName: string, templateType: string): string => {
    try {
      const key = templateType === "custom" 
        ? `template-custom-${templateName}`
        : `template-${templateType}-${templateName}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const templateData = JSON.parse(saved);
        return templateData.code || "";
      }
      
      // If no saved code, return default template code
      if (templateType === "packing-slip") {
        return TEMPLATE_CODE.PACKING_SLIP;
      } else if (templateType === "invoice") {
        return TEMPLATE_CODE.INVOICE;
      } else if (templateType === "pick-list") {
        return TEMPLATE_CODE.PICK_LIST;
      }
    } catch (error) {
      console.error("Failed to load template code:", error);
    }
    return "";
  }, []);

  // Handle preview image click - opens preview modal (v1/v2 only)
  const handlePreviewImageClick = useCallback((e: React.MouseEvent, doc: Document) => {
    e.stopPropagation(); // Prevent row click
    
    // Only show preview modal for v1 and v2
    if (iteration === "v3") {
      return;
    }
    
    const templateType = getTemplateType(doc.name);
    const code = loadTemplateCode(doc.name, templateType);
    
    setPreviewTemplate({
      name: doc.name,
      type: templateType,
      code,
    });
  }, [iteration, loadTemplateCode]);

  const handleTemplateClick = (doc: Document) => {
    const templateType = getTemplateType(doc.name);
    trackTemplateUsage(doc.name, templateType);
    
    if (iteration === "v3") {
      // Navigate to template editor page for V3
      const encodedName = encodeURIComponent(doc.name);
      navigate(`/prototypes/order-printer/${encodedName}?iteration=v3`);
    } else {
      // Open modal for V1/V2
      setSelectedTemplate({
        name: doc.name,
        type: templateType,
      });
    }
  };

  // Format date/time for template name
  const formatDateTime = (): string => {
    const now = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    
    // Add ordinal suffix to day
    const getOrdinal = (n: number): string => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
    };
    
    return `${month} ${getOrdinal(day)}, ${year} at ${hours}:${minutesStr} ${ampm}`;
  };

  // Handle template creation from popover
  const handleCreateFromTemplate = (templateType: "packing-slip" | "invoice" | "pick-list") => {
    const templateNames = {
      "packing-slip": "Packing slip",
      "invoice": "Invoice",
      "pick-list": "Pick list",
    };
    
    const templateName = `${templateNames[templateType]} - ${formatDateTime()}`;
    
    if (iteration === "v3") {
      // Navigate to template editor page for V3
      const encodedName = encodeURIComponent(templateName);
      navigate(`/prototypes/order-printer/${encodedName}?iteration=v3`);
    } else {
      // Open modal for V1/V2
      setSelectedTemplate({
        name: templateName,
        type: templateType,
      });
    }
    setIsPopoverOpen(false);
  };

  // Handle custom template - opens modal with custom template mode
  const handleCreateCustomTemplate = () => {
    const templateName = `Custom template - ${formatDateTime()}`;
    
    if (iteration === "v3") {
      // Navigate to template editor page for V3
      const encodedName = encodeURIComponent(templateName);
      navigate(`/prototypes/order-printer/${encodedName}?iteration=v3`);
    } else {
      // Open modal for V1/V2
      setSelectedTemplate({
        name: templateName,
        type: "custom",
      });
    }
    setIsPopoverOpen(false);
  };

  // Load metadata for default documents
  useEffect(() => {
    const updatedDocs = documents.map((doc) => {
      const templateType = getTemplateType(doc.name);
      const metadata = loadTemplateMetadata(doc.name, templateType);
      return {
        ...doc,
        lastEdited: metadata.lastEdited || doc.lastEdited || doc.created,
        usageCount: metadata.usageCount || doc.usageCount || 0,
      };
    });
    // Note: We don't update documents array directly, but use it in render with metadata
  }, [loadTemplateMetadata]);

  // Combine all templates with metadata
  const getAllTemplates = useCallback((): Document[] => {
    // Load metadata for default documents
    const defaultDocsWithMetadata = documents.map((doc) => {
      const templateType = getTemplateType(doc.name);
      const metadata = loadTemplateMetadata(doc.name, templateType);
      return {
        ...doc,
        lastEdited: metadata.lastEdited || doc.lastEdited || doc.created,
        usageCount: metadata.usageCount || doc.usageCount || 0,
      };
    });
    
    return [...defaultDocsWithMetadata, ...customTemplates];
  }, [customTemplates, loadTemplateMetadata]);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    }

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <>
      {/* App Header */}
      <div className="bg-[#f1f1f1] border-[#e1e3e5] border-[0px_0px_0.778px] border-solid box-border content-stretch flex gap-[6px] h-[44px] items-center pl-[16px] pr-[12px] py-[7.002px] relative shrink-0 w-full">
        <div className="relative shrink-0 size-[20px]">
          <img 
            src="/Order_printer_proto/icons/orderprinter.svg" 
            alt="Order Printer" 
            className="w-full h-full"
          />
        </div>
        <p className="basis-0 font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#202223] text-[14px]">
          Order Printer
        </p>
        <div className="content-stretch flex gap-[9.336px] items-start relative shrink-0">
          <div className="relative shrink-0 size-[20px]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 14 3">
              <circle cx="2" cy="1.5" r="1.5" fill="#4a4a4a"/>
              <circle cx="7" cy="1.5" r="1.5" fill="#4a4a4a"/>
              <circle cx="12" cy="1.5" r="1.5" fill="#4a4a4a"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <PolarisPage
        heading="Documents"
        inlineSize="base"
        primaryAction={
          <div className="relative" ref={popoverRef}>
            <div ref={buttonRef}>
              <s-button
                variant="primary"
                disclosure
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                Create new
              </s-button>
            </div>
            
            {/* Popover */}
            {isPopoverOpen && (
              <div
                className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-[8px] shadow-[0px_5px_5px_-2.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.02),0px_2px_2px_-1px_rgba(0,0,0,0.02),0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_0.5px_0.5px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] min-w-[200px] z-50"
                style={{ opacity: 1 }}
              >
                {/* From template section */}
                <div className="py-1">
                  <div className="px-3 py-2">
                    <p className="text-[11px] font-[600] text-[#6d7175] uppercase tracking-[0.5px]">
                      From template
                    </p>
                  </div>
                  <button
                    onClick={() => handleCreateFromTemplate("packing-slip")}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#202223] hover:bg-gray-50 transition-colors"
                  >
                    Packing slip
                  </button>
                  <button
                    onClick={() => handleCreateFromTemplate("pick-list")}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#202223] hover:bg-gray-50 transition-colors"
                  >
                    Pick list
                  </button>
                  <button
                    onClick={() => handleCreateFromTemplate("invoice")}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#202223] hover:bg-gray-50 transition-colors"
                  >
                    Invoice
                  </button>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200"></div>
                
                {/* Build your own section */}
                <div className="py-1">
                  <div className="px-3 py-2">
                    <p className="text-[11px] font-[600] text-[#6d7175] uppercase tracking-[0.5px]">
                      Build your own
                    </p>
                  </div>
                  <button
                    onClick={handleCreateCustomTemplate}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#202223] hover:bg-gray-50 transition-colors"
                  >
                    Custom template
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      >
        {iteration === "v1" || iteration === "v3" ? (
          /* Card-based layout for v1 and v3 - Fixed size cards: 225px x 314px */
          <div 
            className="flex flex-wrap gap-4"
            style={{
              gap: "16px",
            }}
          >
            {getAllTemplates().map((doc) => {
              const templateType = doc.name.toLowerCase().includes("custom") ? "custom" : getTemplateType(doc.name);
              const actualStatus = templateType === "custom" 
                ? doc.status 
                : getTemplateStatus(doc.name, templateType);
              
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    trackTemplateUsage(doc.name, templateType);
                    if (iteration === "v3") {
                      const encodedName = encodeURIComponent(doc.name);
                      navigate(`/prototypes/order-printer/${encodedName}?iteration=v3`);
                    } else {
                      // v1 - open modal
                      setSelectedTemplate({
                        name: doc.name,
                        type: templateType,
                      });
                    }
                  }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-shadow"
                  style={{ 
                    width: "225px",
                    height: "314px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0px 5px 5px -2.5px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.02), 0px 2px 2px -1px rgba(0,0,0,0.02), 0px 1px 1px -0.5px rgba(0,0,0,0.03), 0px 0.5px 0.5px 0px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Preview Image Container with Badge Overlay */}
                  <div 
                    className="relative w-full bg-white flex-shrink-0"
                    style={{ 
                      height: "270px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={doc.thumbnail}
                      alt={doc.name}
                      className="w-full h-full object-contain"
                      style={{
                        padding: "8px",
                      }}
                    />
                    {/* Status Badge - Bottom Right Corner, overlaying preview */}
                    <div 
                      className="absolute bottom-2 right-2 z-10"
                      style={{
                        pointerEvents: "none",
                      }}
                    >
                      <s-badge 
                        color="base" 
                        tone={actualStatus === "Active" ? "success" : "info"}
                      >
                        {actualStatus}
                      </s-badge>
                    </div>
                  </div>
                  
                  {/* Template Name */}
                  <div 
                    className="px-3 border-t border-gray-200 flex items-center"
                    style={{
                      height: "44px",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    <span 
                      style={{ 
                        color: "#000000", 
                        fontSize: "13px", 
                        lineHeight: "20px",
                        fontWeight: "500",
                      }}
                    >
                      {doc.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table layout for v1 and v2 */
          <s-section padding="none" accessibilityLabel="Documents table section">
            <s-table>
              <s-table-header-row>
                <s-table-header listSlot="primary" style={{ textAlign: "left" }}></s-table-header>
                <s-table-header>Status</s-table-header>
                <s-table-header listSlot="secondary">Created</s-table-header>
                <s-table-header listSlot="secondary">Last edited</s-table-header>
                <s-table-header></s-table-header>
              </s-table-header-row>
              <s-table-body>
                {getAllTemplates().map((doc) => {
                  const templateType = doc.name.toLowerCase().includes("custom") ? "custom" : getTemplateType(doc.name);
                  const actualStatus = templateType === "custom" 
                    ? doc.status 
                    : getTemplateStatus(doc.name, templateType);
                  const lastEdited = doc.lastEdited || doc.created;
                  
                  return (
                    <s-table-row 
                      key={doc.id}
                      onClick={() => {
                        trackTemplateUsage(doc.name, templateType);
                        if (templateType === "custom") {
                          setSelectedTemplate({
                            name: doc.name,
                            type: "custom",
                          });
                        } else {
                          handleTemplateClick(doc);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <s-table-cell>
                        <span 
                          style={{ 
                            color: "#000000", 
                            fontSize: "13px", 
                            lineHeight: "20px",
                            cursor: "pointer"
                          }}
                        >
                          {doc.name}
                        </span>
                      </s-table-cell>
                      <s-table-cell>
                        <s-badge color="base" tone={actualStatus === "Active" ? "success" : "info"}>
                          {actualStatus}
                        </s-badge>
                      </s-table-cell>
                      <s-table-cell>{doc.created}</s-table-cell>
                      <s-table-cell>{lastEdited}</s-table-cell>
                      <s-table-cell>
                        <button
                          onClick={(e) => handleDeleteTemplate(doc.id, templateType === "custom", e)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label={`Delete ${doc.name}`}
                          style={{ cursor: "pointer" }}
                        >
                          <img 
                            src="/Order_printer_proto/icons/delete_Desktop.svg" 
                            alt="Delete" 
                            className="w-4 h-4"
                          />
                        </button>
                      </s-table-cell>
                    </s-table-row>
                  );
                })}
              </s-table-body>
            </s-table>
          </s-section>
        )}
      </PolarisPage>

      {/* Template Editor Modal */}
      {selectedTemplate && (
        <TemplateEditorModal
          isOpen={!!selectedTemplate}
          onClose={() => {
            setSelectedTemplate(null);
            // Reset unsaved changes when modal closes
            setHasUnsavedChanges(false);
            setSaveHandler(null);
            setDiscardHandler(null);
          }}
          templateName={selectedTemplate.name}
          templateType={selectedTemplate.type}
          iteration={iteration}
          onSaveCustomTemplate={selectedTemplate.type === "custom" ? handleSaveCustomTemplate : undefined}
          onUnsavedChangesChange={setHasUnsavedChanges}
          onSaveHandlerChange={setSaveHandler}
          onDiscardHandlerChange={setDiscardHandler}
        />
      )}

      {/* Preview Modal - v1 and v2 only */}
      <AnimatePresence>
        {previewTemplate && iteration !== "v3" && (
          <>
            {/* Scrim overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setPreviewTemplate(null)}
            />
            
            {/* Preview Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div 
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {previewTemplate.name}
                  </h2>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Preview Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                  <div className="bg-white p-8 rounded shadow-sm max-w-full">
                    <TemplatePreview
                      code={previewTemplate.code}
                      templateType={previewTemplate.type}
                      simpleUIState={null}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

