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
import {ProductCarousel} from "@/components/sellerCatalogue";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import ProductCatalogueUploadForm from "@/components/product-catalogue-upload-form";
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
      {/* <div className="max-w-lg mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4">Your Products | User ID:</h1>
        <ProductCarousel products={productsData} suppressHydrationWarning />
      </div> */}
      {/* <div className="max-w-lg mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-4">Your Product Catalogue</h1>
      <ProductCarousel products={productsData} />
    </div> */}
      <ProductCatalogueUploadForm/>
    </SidebarDemo>
  );
};

export default DashboardWithSidebar;

// 'use client'

// import { useState } from 'react'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Plus, Trash2, Upload } from 'lucide-react'
// import Image from "next/image"

// // Helper function to upload image to Cloudinary
// const uploadImageToCloudinary = async (file: File) => {
//   try {
//     // Get signature and timestamp from the backend API route
//     const response = await fetch('/api/products/1', { method: 'POST' })
//     const { signature, timestamp } = await response.json()

//     const formData = new FormData()
//     formData.append('file', file)
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '')
//     formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '')
//     formData.append('signature', signature)
//     formData.append('timestamp', timestamp.toString())

//     // Upload to Cloudinary
//     const uploadResponse = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     )

//     const data = await uploadResponse.json()

//     if (uploadResponse.ok) {
//       console.log('Image uploaded successfully:', data.secure_url)
//       return { success: true, url: data.secure_url }
//     } else {
//       console.error('Error uploading image:', data)
//       return { success: false, error: data.error.message }
//     }
//   } catch (error) {
//     console.error('Error uploading image:', error)
//     return { success: false, error: error.message }
//   }
// }

// export default function FileUpload({ formData, handleInputChange }) {
//   const [images, setImages] = useState<string[]>([])
//   const [selectedSizes, setSelectedSizes] = useState<number[]>([])
//   const [variants, setVariants] = useState<string[]>(['White Black Lines'])

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (files) {
//       // Process each file and upload to Cloudinary
//       const newImages: string[] = []
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         const result = await uploadImageToCloudinary(file)
//         if (result.success && result.url) {
//           newImages.push(result.url)
//         }
//       }
//       setImages(prev => [...prev, ...newImages])
//     }
//   }

//   const sizes = Array.from({ length: 8 }, (_, i) => i + 25)

//   const toggleSize = (size: number) => {
//     setSelectedSizes(prev =>
//       prev.includes(size)
//         ? prev.filter(s => s !== size)
//         : [...prev, size]
//     )
//   }

//   return (
//     <div className="space-y-8">
//       {/* Product Images */}
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <Label className="text-lg font-semibold">
//             Product Images<span className="text-red-500">*</span>
//           </Label>
//           <span className="text-sm text-gray-500">Make your fashion products look more attractive with 3:4 size photos.</span>
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           {images.map((image, index) => (
//             <div key={index} className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
//               <Image
//                 src={image || "/placeholder.svg"}
//                 alt={`Product ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//               <Button
//                 variant="destructive"
//                 size="icon"
//                 className="absolute top-2 right-2 h-8 w-8"
//                 onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           ))}
//           <label className="aspect-[3/4] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
//             <Plus className="h-8 w-8 text-gray-400" />
//             <span className="text-sm text-gray-500 mt-2">Add more({6 - images.length})</span>
//             <Input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//             />
//           </label>
//         </div>
//       </div>

//       {/* Other form fields */}
//       {/* Product Video */}
//       <div className="space-y-4">
//         <Label className="text-lg font-semibold">Product Video</Label>
//         <div className="text-sm text-gray-500">Size Max: 30MB, Resolution:1×1, 10-60 sec, Format: MP4</div>
//         <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
//           <Upload className="h-8 w-8 text-gray-400 mb-2" />
//           <label className="cursor-pointer">
//             <span className="text-primary">+ Drag or click to add video</span>
//             <Input type="file" accept="video/mp4" className="hidden" />
//           </label>
//         </div>
//       </div>

//       {/* Product Name */}
//       <div className="space-y-4">
//         <Label htmlFor="productName" className="text-lg font-semibold">
//           Product Name<span className="text-red-500">*</span>
//         </Label>
//         <div className="text-sm text-gray-500">Add product title that buyers would likely use to search.</div>
//         <Input
//           id="productName"
//           placeholder="Nike Air Jordan 1 retro High OG University Blue ..."
//           className="w-full"
//         />
//       </div>

//       {/* Product Description */}
//       <div className="space-y-4">
//         <Label htmlFor="productName" className="text-lg font-semibold">
//           Product Description<span className="text-red-500">*</span>
//         </Label>
//         <div className="text-sm text-gray-500">Add product title that buyers would likely use to search.</div>
//         <Input
//           id="productName"
//           placeholder="Product Description ..."
//           className="w-full"
//         />
//       </div>

//       {/* Category */}
//       <div className="space-y-4">
//         <Label className="text-lg font-semibold">
//           Category<span className="text-red-500">*</span>
//         </Label>
//         <div className="text-sm text-gray-500">Choose the category and sub-category most suitable for the product.</div>
//         <div className="flex gap-4">
//           <Select defaultValue="fashion">
//             <SelectTrigger>
//               <SelectValue placeholder="Fashion" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Apparael">Apparael</SelectItem>
//               <SelectItem value="Electronics">Electronics</SelectItem>
//               <SelectItem value="FnB">FnB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   )
// }
