import { useEffect } from "react";

export default function PolarisLoader() {
  useEffect(() => {
    const scriptId = "polaris-web-components-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src = "https://cdn.shopify.com/shopifycloud/polaris.js";
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
