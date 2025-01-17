'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface Specification {
  type: string
  description: string
}

interface Variant {
  sku: string
  name: string
  price: string
}

export default function SpecificationsVariants({ formData, handleInputChange }) {
  const [specifications, setSpecifications] = useState<Specification[]>([
    { type: '', description: '' }
  ])
  const [variants, setVariants] = useState<Variant[]>([
    { sku: '', name: '', price: '' }
  ])

  const addSpecification = () => {
    setSpecifications([...specifications, { type: '', description: '' }])
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }

  const updateSpecification = (index: number, field: keyof Specification, value: string) => {
    const newSpecifications = [...specifications]
    newSpecifications[index][field] = value
    setSpecifications(newSpecifications)
    handleInputChange('specifications', newSpecifications)
  }

  const addVariant = () => {
    setVariants([...variants, { sku: '', name: '', price: '' }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const updateVariant = (index: number, field: keyof Variant, value: string) => {
    const newVariants = [...variants]
    newVariants[index][field] = value
    setVariants(newVariants)
    handleInputChange('variants', newVariants)
  }

  return (
    <div className="space-y-8">
      {/* Specifications */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">
            Specifications<span className="text-red-500">*</span>
          </Label>
          <Button variant="outline" onClick={addSpecification}>
            <Plus className="h-4 w-4 mr-2" />
            Add new specification
          </Button>
        </div>
        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Label htmlFor={`type-${index}`}>Type</Label>
                    <Input
                      id={`type-${index}`}
                      value={spec.type}
                      onChange={(e) => updateSpecification(index, 'type', e.target.value)}
                      placeholder="e.g., Material"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Input
                      id={`description-${index}`}
                      value={spec.description}
                      onChange={(e) => updateSpecification(index, 'description', e.target.value)}
                      placeholder="e.g., Premium leather"
                    />
                  </div>
                  {specifications.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-6"
                      onClick={() => removeSpecification(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">
            Variants<span className="text-red-500">*</span>
          </Label>
          <Button variant="outline" onClick={addVariant}>
            <Plus className="h-4 w-4 mr-2" />
            Add new variant
          </Button>
        </div>
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Label htmlFor={`sku-${index}`}>SKU</Label>
                    <Input
                      id={`sku-${index}`}
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      placeholder="e.g., SHOE-001"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={variant.name}
                      onChange={(e) => updateVariant(index, 'name', e.target.value)}
                      placeholder="e.g., Blue/White"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      placeholder="e.g., 199.99"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {variants.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-6"
                      onClick={() => removeVariant(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

