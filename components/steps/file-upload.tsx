'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Upload } from 'lucide-react'
import Image from "next/image"

export default function FileUpload({ formData, handleInputChange }) {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploading(true)
      const uploadedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)

          try {
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData
            })

            if (!response.ok) {
              throw new Error('Upload failed')
            }

            const data = await response.json()
            return data.url
          } catch (error) {
            console.error('Upload error:', error)
            return null
          }
        })
      )

      const validImages = uploadedImages.filter(Boolean) as string[]
      setImages(prev => [...prev, ...validImages])
      handleInputChange('images', [...images, ...validImages])
      setUploading(false)

      if (validImages.length !== files.length) {
        alert('Some images failed to upload. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">
            Product Images<span className="text-red-500">*</span>
          </Label>
          <span className="text-sm text-gray-500">Make your fashion products look more attractive with 3:4 size photos.</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => {
                  const newImages = images.filter((_, i) => i !== index)
                  setImages(newImages)
                  handleInputChange('images', newImages)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <label className="aspect-[3/4] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            {uploading ? (
              <span className="text-sm text-gray-500">Uploading...</span>
            ) : (
              <>
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Add more({6 - images.length})</span>
              </>
            )}
            <Input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Product Video */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Product Video</Label>
        <div className="text-sm text-gray-500">Size Max: 30MB, Resolution:1×1, 10-60 sec, Format: MP4</div>
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <label className="cursor-pointer">
            <span className="text-primary">+ Drag or click to add video</span>
            <Input type="file" accept="video/mp4" className="hidden" />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="space-y-4">
        <Label htmlFor="productName" className="text-lg font-semibold">
          Product Name<span className="text-red-500">*</span>
        </Label>
        <div className="text-sm text-gray-500">Add product title that buyers would likely use to search.</div>
        <Input
          id="productName"
          placeholder="Nike Air Jordan 1 retro High OG University Blue ..."
          className="w-full"
          value={formData.productName || ''}
          onChange={(e) => handleInputChange('productName', e.target.value)}
        />
      </div>
      
      {/* Product Description */}
      <div className="space-y-4">
        <Label htmlFor="productDescription" className="text-lg font-semibold">
          Product Description<span className="text-red-500">*</span>
        </Label>
        <div className="text-sm text-gray-500">Add a detailed description of your product.</div>
        <Input
          id="productDescription"
          placeholder="Product Description ..."
          className="w-full"
          value={formData.productDescription || ''}
          onChange={(e) => handleInputChange('productDescription', e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">
          Category<span className="text-red-500">*</span>
        </Label>
        <div className="text-sm text-gray-500">Choose the category most suitable for the product.</div>
        <div className="flex gap-4">
          <Select 
            value={formData.category || ''}
            onValueChange={(value) => handleInputChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apparel">Apparel</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="FnB">FnB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

