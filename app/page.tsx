// import { SidebarDemo } from "@/components/sidebar";

// export default function Home() {
//   return (
//     <div>
//       <SidebarDemo/>
//     </div>
//       );
// }


// Type 1

// import MultiStepForm from "@/components/MultiStepForm";

// export default function Page() {
//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <MultiStepForm />
//     </div>
//   );
// }


// Type 2

// import ProductCatalogueUploadForm from "@/components/product-catalogue-upload-form"

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-4  ">
//       <ProductCatalogueUploadForm />
//     </main>
//   )
// }


// import  ProductCarousel  from "@/components/sellerCatalogue"
// import productsData from "@/data/products.json"

// export default function CataloguePage() {
//   return (
//     <SidebarDemo/>
//     <div className="max-w-lg mx-auto mt-6">
//       <h1 className="text-3xl font-bold">Your Product Catalogue</h1>
//       <ProductCarousel products={productsData} suppressHydrationWarning/>
//     </div>
//   )
// }

import React from "react";
import { SidebarDemo } from "@/components/sidebar";
import productsData from "@/data/products.json";
import ProductCarousel from "@/components/sellerCatalogue";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
// import { useRouter } from "next/router";

const DashboardWithSidebar = () => {
  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="icon-class" /> },
    { label: "Catalogue", href: "/user/111", icon: <IconUserBolt className="icon-class" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="icon-class" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="icon-class" /> },
  ];

  // const router = useRouter();
  // const { id } = router.query; // Access the dynamic ID from the URL

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
