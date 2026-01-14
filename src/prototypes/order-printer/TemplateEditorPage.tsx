// @ts-nocheck - Polaris web components are custom elements that need runtime registration

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, GripVertical } from "lucide-react";
import SimpleUIEditor, { SimpleUIEditorState } from "./SimpleUIEditor";
import TemplatePreview from "./TemplatePreview";
import { Toast } from "./Toast";
import StatusBadge from "./StatusBadge";
import { useUnsavedChanges } from "./UnsavedChangesContext";
import CodeModePreview from "./CodeModePreview";
import PolarisPage from "../shared/PolarisPage";

// Import TEMPLATE_CODE from TemplateEditorModal
const TEMPLATE_CODE: Record<string, string> = {
  "packing-slip": `<div>
<div class="columns">
   <h1>Packing slip</h1>
   <div>
      <p style="text-align: right; margin: 0;">
         Order {{ order.order_name }}<br />
         {{ order.created_at | date: "%B %e, %Y" }}
      </p>
   </div>
</div>
<div class="columns" style="margin-top: 1.5em;">
   <div class="address">
      <strong>From</strong><br/>
      {{ shop.name }}<br/>
      {{ shop.address | format_address }}
      {% if shop.phone %}{{ shop.phone }}{% endif %}
   </div>
   {% if order.shipping_address %}
   <div class="address">
      <strong>Ship to</strong>
      {{ order.shipping_address | format_address  }}
      {% if order.shipping_address.phone %}{{ order.shipping_address.phone }}{% endif %}
   </div>
   {% endif %}
</div>
<hr />
<h2>Order Details</h2>
<table class="table-tabular" style="margin: 1em 0 0 0;">
   <thead>
      <tr>
         <th>Qty</th>
         <th>Image</th>
         <th>Item</th>
         <th style="text-align: right;">SKU</th>
         <th style="text-align: right;">Price</th>
      </tr>
   </thead>
   <tbody>
      {% for line_item in order.line_items %}
      <tr>
         <td>{{ line_item.quantity }}</td>
         <td>{{ line_item.image | img_url: 'small' | img_tag }}</td>
         <td>{{ line_item.title }}</td>
         <td style="text-align: right;">{{ line_item.sku }}</td>
         <td style="text-align: right;">{{ line_item.final_price | money }}</td>
      </tr>
      {% endfor %}
   </tbody>
</table>
</div>`,
  "pick-list": `<div>
<div class="columns">
   <h1>Pick list</h1>
   <div>
      <p style="text-align: right; margin: 0;">
         Order {{ order.order_name }}<br />
         {{ order.created_at | date: "%B %e, %Y" }}
      </p>
   </div>
</div>
<div class="columns" style="margin-top: 1.5em;">
   <div class="address">
      <strong>From</strong><br/>
      {{ shop.name }}<br/>
      {{ shop.address | format_address }}
      {% if shop.phone %}{{ shop.phone }}{% endif %}
   </div>
   {% if order.shipping_address %}
   <div class="address">
      <strong>Ship to</strong>
      {{ order.shipping_address | format_address  }}
      {% if order.shipping_address.phone %}{{ order.shipping_address.phone }}{% endif %}
   </div>
   {% endif %}
</div>
<hr />
<h2>Order Details</h2>
<table class="table-tabular" style="margin: 1em 0 0 0;">
   <thead>
      <tr>
         <th>Qty</th>
         <th>Image</th>
         <th>Item</th>
         <th style="text-align: right;">SKU</th>
         <th style="text-align: right;">Bin</th>
      </tr>
   </thead>
   <tbody>
      {% for line_item in order.line_items %}
      <tr>
         <td>{{ line_item.quantity }}</td>
         <td>{{ line_item.image | img_url: 'small' | img_tag }}</td>
         <td>{{ line_item.title }}</td>
         <td style="text-align: right;">{{ line_item.sku }}</td>
         <td style="text-align: right;">A-12</td>
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
      {% if shop.phone %}{{ shop.phone }}{% endif %}
   </div>
   {% if order.billing_address %}
   <div class="address">
      <strong>Bill to</strong>
      {{ order.billing_address | format_address  }}
   </div>
   {% endif %}
   {% if order.shipping_address %}
   <div class="address">
      <strong>Ship to</strong>
      {{ order.shipping_address | format_address  }}
      {% if order.shipping_address.phone %}{{ order.shipping_address.phone }}{% endif %}
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
      <tr>
         <td colspan="2" style="text-align: right;">Subtotal</td>
         <td style="text-align: right;">{{ order.line_items_subtotal_price | money }}</td>
      </tr>
      <tr>
         <td colspan="2" style="text-align: right;">Tax</td>
         <td style="text-align: right;">{{ order.tax_price | money }}</td>
      </tr>
      {% if order.shipping_address %}
      <tr>
         <td colspan="2" style="text-align: right;">Shipping</td>
         <td style="text-align: right;">{{ order.shipping_price | money }}</td>
      </tr>
      {% endif %}
      <tr>
         <td colspan="2" style="text-align: right;"><strong>Total</strong></td>
         <td style="text-align: right;"><strong>{{ order.total_price | money }}</strong></td>
      </tr>
   </tbody>
</table>
</div>`,
};

interface TemplateEditorPageProps {
  templateName: string;
  templateType: "packing-slip" | "invoice" | "pick-list" | "custom";
}

export default function TemplateEditorPage({
  templateName,
  templateType,
}: TemplateEditorPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { hasUnsavedChanges, setHasUnsavedChanges, setSaveHandler, setDiscardHandler, triggerShake } = useUnsavedChanges();
  const [code, setCode] = useState(templateType === "custom" ? "" : TEMPLATE_CODE[templateType] || "");
  const [simpleUIState, setSimpleUIState] = useState<SimpleUIEditorState | null>(null);
  const [currentTemplateName, setCurrentTemplateName] = useState(templateName);
  const [savedTemplateName, setSavedTemplateName] = useState(templateName);
  const [templateStatus, setTemplateStatus] = useState<"Active" | "Draft">("Active");
  const [savedStatus, setSavedStatus] = useState<"Active" | "Draft">("Active");
  const [savedCode, setSavedCode] = useState<string>("");
  const [savedSimpleUIState, setSavedSimpleUIState] = useState<SimpleUIEditorState | null>(null);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [mode, setMode] = useState<"code" | "simple">(templateType === "custom" ? "code" : "simple");
  const [editorWidth, setEditorWidth] = useState(33.33); // Percentage - starts at 1/3 for simple mode
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);
  const isCustomTemplate = templateType === "custom";
  const modeChangeRef = useRef(false);
  const isUserChangeRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for editor/preview containers
  const resizeContainerRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Track screen size for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Parse code to SimpleUIState (simplified version)
  const parseCodeToSimpleUIState = (code: string, templateType: string): SimpleUIEditorState | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "text/html");
      
      const DEFAULT_LOGO = "/Order_printer_proto/Stellar Logo Final RGB.png";
      const isPickList = templateType === "pick-list";
      const defaultState: SimpleUIEditorState = {
        headerType: "title-only",
        title: currentTemplateName || "Stellar Interiors",
        titleAlign: "left",
        logoUrl: DEFAULT_LOGO,
        logoSize: 50,
        logoAlign: "left",
        dateType: "today",
        showShopAddress: true,
        showShippingAddress: true,
        addressOrder: ["shop", "shipping"],
        sortBy: "quantity-high",
        columns: isPickList ? {
          productImage: true,
          productTitle: true,
          variant: true,
          orderId: true,
          sku: true,
          quantity: true,
          binName: true,
          orderTag: false,
          productTag: false,
        } : {
          quantity: true,
          item: true,
          productImage: false,
          sku: false,
          itemPrice: false,
        },
        columnOrder: isPickList 
          ? ["productImage", "productTitle", "variant", "orderId", "sku", "quantity", "binName", "orderTag", "productTag"]
          : ["quantity", "item", "productImage", "sku", "itemPrice"],
        footerText: "Thanks for shopping with us! <br> {{ shop.email }}",
        footerAlign: "left",
      };

      const h1 = doc.querySelector("h1");
      if (h1) {
        defaultState.title = h1.textContent?.trim() || defaultState.title;
      }

      return defaultState;
    } catch (error) {
      console.error("Failed to parse code:", error);
      return null;
    }
  };

  // Load template data from localStorage
  useEffect(() => {
    const key = `template-${templateType}-${templateName}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const templateData = JSON.parse(saved);
        if (templateData.code) {
          setCode(templateData.code);
          setSavedCode(templateData.code);
        }
        if (templateData.simpleUIState) {
          setSimpleUIState(templateData.simpleUIState);
          setSavedSimpleUIState(templateData.simpleUIState);
        }
        if (templateData.status) {
          setTemplateStatus(templateData.status);
          setSavedStatus(templateData.status);
        }
        if (templateData.name) {
          setCurrentTemplateName(templateData.name);
          setSavedTemplateName(templateData.name);
        }
      } else {
        // Initialize with default code if no saved data
        const defaultCode = templateType === "custom" ? "" : TEMPLATE_CODE[templateType] || "";
        if (defaultCode) {
          setCode(defaultCode);
          setSavedCode(defaultCode);
        }
      }
    } catch (error) {
      console.error("Failed to load template:", error);
    }
  }, [templateName, templateType]);

  // Initialize simpleUIState from code
  const isInitializingRef = useRef(false);
  useEffect(() => {
    if (code && !simpleUIState && templateType !== "custom") {
      isInitializingRef.current = true;
      const parsedState = parseCodeToSimpleUIState(code, templateType);
      if (parsedState) {
        setSimpleUIState(parsedState);
        setSavedSimpleUIState(parsedState);
      }
      // Reset flag after state update
      setTimeout(() => {
        isInitializingRef.current = false;
      }, 0);
    }
  }, [code, simpleUIState, templateType, currentTemplateName]);

  const handleSimpleUIStateChange = useCallback((state: SimpleUIEditorState) => {
    // Skip if we're initializing to prevent loops
    if (isInitializingRef.current) {
      return;
    }
    isUserChangeRef.current = true;
    setSimpleUIState(state);
    // Convert simple UI state to code (would need full implementation)
  }, []);

  // Handle back button click
  const handleBack = () => {
    if (hasUnsavedChanges) {
      // Trigger shake animation in the unsaved changes banner
      triggerShake();
    } else {
      // Navigate back to main page, preserving iteration
      const iteration = searchParams.get("iteration") || "v3";
      navigate(`/prototypes/order-printer?iteration=${iteration}`);
    }
  };

  // Save handler
  const handleSaveTemplate = useCallback(() => {
    const key = `template-${templateType}-${templateName}`;
    const templateData = {
      name: currentTemplateName,
      code,
      simpleUIState,
      status: templateStatus,
    };
    localStorage.setItem(key, JSON.stringify(templateData));
    setSavedCode(code);
    setSavedSimpleUIState(simpleUIState);
    setSavedStatus(templateStatus);
    setSavedTemplateName(currentTemplateName);
    setHasUnsavedChanges(false);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  }, [code, simpleUIState, templateStatus, currentTemplateName, templateName, templateType, setHasUnsavedChanges]);

  // Discard handler
  const handleDiscardTemplate = useCallback(() => {
    isUserChangeRef.current = false; // Mark as system change to prevent triggering unsaved detection
    setCode(savedCode);
    setSimpleUIState(savedSimpleUIState);
    setTemplateStatus(savedStatus);
    setCurrentTemplateName(savedTemplateName);
    setHasUnsavedChanges(false);
    setTimeout(() => { isUserChangeRef.current = true; }, 100); // Reset after state updates
  }, [savedCode, savedSimpleUIState, savedStatus, savedTemplateName, setHasUnsavedChanges]);

  // Register save/discard handlers with context
  useEffect(() => {
    setSaveHandler(handleSaveTemplate);
    setDiscardHandler(handleDiscardTemplate);
    return () => {
      setSaveHandler(null);
      setDiscardHandler(null);
    };
  }, [handleSaveTemplate, handleDiscardTemplate, setSaveHandler, setDiscardHandler]);

  // Detect unsaved changes
  useEffect(() => {
    if (modeChangeRef.current) {
      return;
    }
    
    const hasChanges = 
      code !== savedCode ||
      JSON.stringify(simpleUIState) !== JSON.stringify(savedSimpleUIState) ||
      templateStatus !== savedStatus ||
      currentTemplateName !== savedTemplateName;
    
    if (hasChanges && isUserChangeRef.current) {
      setHasUnsavedChanges(true);
    } else if (!hasChanges) {
      setHasUnsavedChanges(false);
    }
  }, [code, simpleUIState, templateStatus, currentTemplateName, savedCode, savedSimpleUIState, savedStatus, savedTemplateName, setHasUnsavedChanges]);

  // Sync line numbers scroll with textarea scroll
  const handleTextareaScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle resize - matches V1 implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const containerWidth = window.innerWidth;
      const newWidth = (e.clientX / containerWidth) * 100;
      // Constrain between 20% and 80%
      const constrainedWidth = Math.max(20, Math.min(80, newWidth));
      setEditorWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Update editor width based on mode
  useEffect(() => {
    if (isCustomTemplate) return;
    
    if (mode === "simple") {
      setEditorWidth(33.33); // 1/3 width for simple UI
    } else {
      setEditorWidth(50); // 50/50 for code editor
    }
  }, [mode, isCustomTemplate]);

  return (
    <div className="flex flex-col w-full" style={{ minHeight: "100%" }}>
      {/* Page Header - matches DocumentsPage structure */}
      <div className="bg-[#f1f1f1] flex-shrink-0">
        <div className="w-full px-[24px] pt-[16px] pb-[16px]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className="p-1 hover:bg-gray-200 rounded text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-[650] leading-[24px] text-[#303030] tracking-[-0.2px]">
                {currentTemplateName}
              </h1>
              <StatusBadge
                status={templateStatus}
                isStatic={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - matches V1 implementation */}
      <div 
        ref={resizeContainerRef}
        className="flex py-4 relative flex-1 overflow-y-auto"
        style={{ minHeight: 0, paddingBottom: "24px" }}
      >
        {/* Editor Section */}
        <div
          ref={editorContainerRef}
          className="flex flex-col bg-white rounded-[12px] shadow-sm border border-gray-200 overflow-hidden ml-4 mr-2"
          style={{ 
            width: `calc(${editorWidth}% - 34px)`,
            transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            height: "100%"
          }}
        >
          {/* Editor Header */}
          <div className="flex items-center px-4 py-2 border-b border-gray-200 bg-gray-50 flex-shrink-0" style={{ justifyContent: "flex-start" }}>
            <div className="flex items-center gap-3">
              {!isCustomTemplate && (
                <div className="relative flex items-center gap-1 bg-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => {
                      modeChangeRef.current = true;
                      setMode("simple");
                      setTimeout(() => { modeChangeRef.current = false; }, 100);
                    }}
                    className={`p-1.5 rounded transition-all ${
                      mode === "simple"
                        ? "bg-white shadow-sm"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ opacity: 1 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#303030" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      modeChangeRef.current = true;
                      setMode("code");
                      setTimeout(() => { modeChangeRef.current = false; }, 100);
                    }}
                    className={`p-1.5 rounded transition-all ${
                      mode === "code"
                        ? "bg-white shadow-sm"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ opacity: 1 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#303030" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </button>
                </div>
              )}
              {isCustomTemplate && (
                <div className="relative flex items-center gap-1 bg-gray-200 rounded-lg p-1">
                  <div className="p-1.5 rounded bg-white shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#303030" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Editor Content */}
          <div 
            ref={editorContentRef}
            className={`bg-white relative overflow-y-auto ${isCustomTemplate ? 'rounded-[12px]' : 'rounded-b-[12px]'} flex flex-col flex-1`}
            style={{ 
              minHeight: 0
            }}
          >
            {mode === "simple" && !isCustomTemplate ? (
              <div className="px-4 pt-4 pb-4">
                {/* Settings Section */}
                <div className="mb-4">
                  <p className="font-bold text-[13px] leading-[20px] text-black mb-3">
                    Settings
                  </p>
                  
                  {/* Template Name */}
                  <div className="flex flex-col gap-1 mb-3">
                    <label className="font-medium text-[13px] leading-[20px] text-[#303030]">
                      Template name
                    </label>
                    <div className="bg-[#fdfdfd] border-[0.66px] border-[#8a8a8a] border-solid flex items-center px-3 py-1.5 rounded-[8px]">
                      <input
                        type="text"
                        value={currentTemplateName}
                        onChange={(e) => {
                          isUserChangeRef.current = true;
                          const newName = e.target.value;
                          setCurrentTemplateName(newName);
                          if (simpleUIState) {
                            setSimpleUIState({
                              ...simpleUIState,
                              title: newName,
                            });
                          }
                        }}
                        className="flex-1 font-medium text-[13px] leading-[20px] text-[#303030] bg-transparent border-0 outline-0"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-1 mb-3">
                    <label className="font-medium text-[13px] leading-[20px] text-[#303030]">
                      Status
                    </label>
                    <div className="bg-[#fdfdfd] border-[0.66px] border-[#8a8a8a] border-solid flex items-center px-3 py-1.5 rounded-[8px]">
                      <select
                        value={templateStatus}
                        onChange={(e) => {
                          isUserChangeRef.current = true;
                          setTemplateStatus(e.target.value as "Active" | "Draft");
                        }}
                        className="flex-1 font-medium text-[13px] leading-[20px] text-[#303030] bg-transparent border-0 outline-0 appearance-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <svg className="w-4 h-4 text-[#4a4a4a] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Order Data */}
                  <div className="flex flex-col gap-1 mb-3">
                    <label className="font-medium text-[13px] leading-[20px] text-[#303030]">
                      Order data
                    </label>
                    <div className="bg-[#fdfdfd] border-[0.66px] border-[#8a8a8a] border-solid flex items-center px-3 py-1.5 rounded-[8px]">
                      <select className="flex-1 font-medium text-[13px] leading-[20px] text-[#303030] bg-transparent border-0 outline-0 appearance-none">
                        <option>Sample</option>
                      </select>
                      <svg className="w-4 h-4 text-[#4a4a4a] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Print by default */}
                  <div className="flex items-center gap-2 pt-1 mb-4">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 bg-[#fdfdfd] border-[0.66px] border-[#8a8a8a] border-solid rounded-[4px] text-[#303030] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      style={{ accentColor: '#303030', opacity: 1 }}
                    />
                    <label className="text-[13px] font-medium leading-[20px] text-[#303030] cursor-pointer">
                      Print by default
                    </label>
                  </div>
                </div>

                {/* Design Section (SimpleUIEditor) */}
                <div>
                  <p className="font-bold text-[13px] leading-[20px] text-black mb-3">
                    Design
                  </p>
                  {simpleUIState && (
                    <SimpleUIEditor
                      templateType={templateType}
                      initialTitle={currentTemplateName}
                      initialState={simpleUIState}
                      onStateChange={handleSimpleUIStateChange}
                      hideDesignTitle={true}
                      noPadding={true}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 overflow-hidden">
                {/* Line Numbers */}
                <div 
                  ref={lineNumbersRef}
                  className="flex-shrink-0 bg-gray-50 border-r border-gray-200 px-3 py-4 text-right select-none overflow-y-auto"
                >
                  <div className="font-mono text-[13px] text-gray-500 leading-[19.5px]">
                    {(code || "").split('\n').map((_, index) => (
                      <div key={index} className="h-[19.5px] leading-[19.5px]">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Code Editor */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => {
                    isUserChangeRef.current = true;
                    setCode(e.target.value);
                  }}
                  onScroll={isMobile ? undefined : handleTextareaScroll}
                  className="flex-1 font-mono text-[13px] leading-[19.5px] p-4 border-0 resize-none focus:outline-none bg-white text-gray-900 overflow-y-auto"
                  placeholder="Enter your template code..."
                  style={{ opacity: 1, lineHeight: '19.5px' }}
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`flex items-center justify-center cursor-col-resize flex-shrink-0 group ${
            isResizing ? "bg-gray-100" : ""
          }`}
        >
          <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>

        {/* Preview Section - Expands with content */}
        <div
          ref={previewContainerRef}
          className="flex flex-col bg-white rounded-[12px] shadow-sm border border-gray-200 overflow-hidden ml-2 mr-4"
          style={{ 
            width: `calc(${100 - editorWidth}% - 34px)`,
            transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            height: "auto",
            alignSelf: "flex-start"
          }}
        >
          {/* Preview Content */}
          <div 
            ref={previewRef} 
            className="p-4"
            style={{ 
              width: "100%",
              boxSizing: "border-box",
              minHeight: isCustomTemplate && !code.trim() ? "400px" : undefined,
            }}
          >
            <div 
              className="bg-white rounded-[12px] p-4 shadow-sm"
              style={{
                boxShadow: "0px 5px 5px -2.5px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.02), 0px 2px 2px -1px rgba(0,0,0,0.02), 0px 1px 1px -0.5px rgba(0,0,0,0.03), 0px 0.5px 0.5px 0px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(0,0,0,0.06)",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
                minHeight: isCustomTemplate && !code.trim() ? "400px" : undefined,
                display: isCustomTemplate && !code.trim() ? "flex" : undefined,
                alignItems: isCustomTemplate && !code.trim() ? "center" : undefined,
                justifyContent: isCustomTemplate && !code.trim() ? "center" : undefined,
              }}
            >
              {isCustomTemplate && !code.trim() ? (
                <div className="text-center text-gray-500 text-[13px] leading-[20px] font-medium">
                  Waiting for input to render a preview
                </div>
              ) : (isResizingRef.current || isResizing) ? (
                <CodeModePreview code={code} />
              ) : mode === "simple" && simpleUIState ? (
                <TemplatePreview
                  code={code}
                  templateType={templateType}
                  simpleUIState={simpleUIState}
                  isResizing={isResizing}
                />
              ) : (
                <CodeModePreview code={code} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast - positioned at bottom center */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 pointer-events-none z-50">
        <div className="pointer-events-auto">
          <Toast isVisible={showSaveToast} message="Template saved" onClose={() => setShowSaveToast(false)} />
        </div>
      </div>
    </div>
  );
}
