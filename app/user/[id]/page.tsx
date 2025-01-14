import React from "react";
import { SidebarDemo } from "@/components/sidebar";
import productsData from "@/data/products.json";
import ProductCarousel from "@/components/sellerCatalogue";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
// import { useRouter } from "next/router";

const DashboardWithSidebar = () => {
  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="icon-class" /> },
    { label: "Catalogue", href: "#", icon: <IconUserBolt className="icon-class" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="icon-class" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="icon-class" /> },
  ];

//   const router = useRouter();
//   const { id } = router.query; // Access the dynamic ID from the URL

  return (
    <SidebarDemo links={links}>
      <div className="max-w-lg mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4">Your Products | User ID:</h1>
        <ProductCarousel products={productsData} suppressHydrationWarning />
      </div>
    </SidebarDemo>
  );
};

export default DashboardWithSidebar;
