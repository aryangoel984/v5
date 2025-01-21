import React from "react";
import { SidebarDemo } from "@/components/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import ProductCatalogueUploadForm from "@/components/product-catalogue-upload-form";

const DashboardWithSidebar = () => {
  const links = [
    { label: "Dashboard", href: "/", icon: <IconBrandTabler className="icon-class" /> },
    { label: "Add Catalogue", href: "/addCatalogue?userId=1", icon: <IconUserBolt className="icon-class" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="icon-class" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="icon-class" /> },
  ];

  return (
    <SidebarDemo links={links}>
      <ProductCatalogueUploadForm/>
    </SidebarDemo>
  );
};

export default DashboardWithSidebar;