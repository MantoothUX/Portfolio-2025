
import { Link, useSearchParams } from "react-router-dom";

// Sidebar Navigation component matching Figma design exactly
// Icons are 20x20px with 8px gap to text

export default function SidebarNavigation() {
  const [searchParams] = useSearchParams();
  const iteration = searchParams.get("iteration") || "v1";
  
  // Helper function to create links with iteration query param
  const createLink = (path: string) => {
    return `${path}?iteration=${iteration}`;
  };
  
  return (
    <div className="bg-[#ebebeb] box-border content-stretch flex flex-col items-start justify-between px-0 py-[16px] relative size-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
        {/* Core Navigation */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {/* Home */}
          <Link to={createLink("/prototypes/order-printer")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Homefilled_Desktop.svg" alt="Home" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Home</p>
              </div>
            </div>
          </Link>

          {/* Orders */}
          <Link to={createLink("/prototypes/order-printer/orders")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Orderfilled_desktop.svg" alt="Orders" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Orders</p>
              </div>
              <div className="bg-[rgba(0,0,0,0.06)] box-border content-stretch flex gap-[0px] h-[20px] items-center justify-center px-[8px] py-[2px] relative rounded-[8px] shrink-0">
                <p className="font-medium leading-[16px] relative shrink-0 text-[#616161] text-[12px] text-nowrap">15</p>
              </div>
            </div>
          </Link>

          {/* Products */}
          <Link to={createLink("/prototypes/order-printer/products")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Productfilled_Desktop.svg" alt="Products" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Products</p>
              </div>
            </div>
          </Link>

          {/* Customers */}
          <Link to={createLink("/prototypes/order-printer/customers")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Customerfilled_Desktop.svg" alt="Customers" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Customers</p>
              </div>
            </div>
          </Link>

          {/* Marketing */}
          <Link to={createLink("/prototypes/order-printer/marketing")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Targetfilled_Desktop.svg" alt="Marketing" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Marketing</p>
              </div>
            </div>
          </Link>

          {/* Discounts */}
          <Link to={createLink("/prototypes/order-printer/discounts")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Discountfilled_Desktop.svg" alt="Discounts" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Discounts</p>
              </div>
            </div>
          </Link>

          {/* Content */}
          <Link to={createLink("/prototypes/order-printer/content")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/Contentfilled_Desktop.svg" alt="Content" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Content</p>
              </div>
            </div>
          </Link>

          {/* Markets */}
          <Link to={createLink("/prototypes/order-printer/markets")} className="box-border content-stretch cursor-pointer flex flex-col items-start p-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
              <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
                <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                  <img src="/Order_printer_proto/icons/Marketsfilled_Desktop.svg" alt="Markets" className="w-full h-full" />
                </div>
                <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                  <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Markets</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Finance */}
          <Link to={createLink("/prototypes/order-printer/finance")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/BankFilled_Desktop.svg" alt="Finance" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Finance</p>
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link to={createLink("/prototypes/order-printer/analytics")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[20px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/ChartVerticalFilled_Desktop.svg" alt="Analytics" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Analytics</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Sales Channels */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div className="box-border content-stretch flex items-center justify-between pl-[20px] pr-[16px] py-[4px] relative shrink-0 w-[240px]">
            <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#616161] text-[12px]">
              <p className="leading-[16px]">Sales channels</p>
            </div>
            <div className="relative shrink-0 w-[14px] h-[14px] flex items-center justify-center">
              <img 
                src="/Order_printer_proto/icons/Chevright_Desktop.svg" 
                alt="Chevron" 
                className="w-full h-full"
                style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(89%)' }}
              />
            </div>
          </div>
          
          {/* Online Store */}
          <Link to={createLink("/prototypes/order-printer/online-store")} className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[14px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/onlinestore.svg" alt="Online Store" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Online Store</p>
              </div>
            </div>
          </Link>

        </div>

        {/* Apps */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div className="box-border content-stretch flex items-center justify-between pl-[20px] pr-[16px] py-[4px] relative shrink-0 w-[240px]">
            <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#616161] text-[12px]">
              <p className="leading-[16px]">Apps</p>
            </div>
            <div className="relative shrink-0 w-[14px] h-[14px] flex items-center justify-center">
              <img 
                src="/Order_printer_proto/icons/Chevright_Desktop.svg" 
                alt="Chevron" 
                className="w-full h-full"
                style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(89%)' }}
              />
            </div>
          </div>
          
          {/* Order Printer - Active */}
          <Link to={createLink("/prototypes/order-printer")} className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="bg-[#fafafa] box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[14px] flex items-center justify-center">
                <img src="/Order_printer_proto/icons/orderprinter.svg" alt="Order Printer" className="w-full h-full" />
              </div>
              <div className="basis-0 flex flex-col font-[550] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Order Printer</p>
              </div>
            </div>
          </Link>
          
          {/* Order list sub-item */}
          <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
            <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[36px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
              <div className="basis-0 flex flex-col font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#616161] text-[13px] text-nowrap">
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Order list</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <Link to={createLink("/prototypes/order-printer/settings")} className="box-border content-stretch cursor-pointer flex flex-col items-start px-[12px] py-0 relative shrink-0 w-[240px]">
          <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] pr-[4px] py-[4px] relative rounded-[8px] shrink-0 w-full">
            <div className="relative shrink-0 size-[20px] flex items-center justify-center">
              <img src="/Order_printer_proto/icons/settingsfilled_Desktop.svg" alt="Settings" className="w-full h-full" />
            </div>
            <div className="basis-0 flex flex-col font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#303030] text-[13px] text-nowrap">
              <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[13px]">Settings</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

