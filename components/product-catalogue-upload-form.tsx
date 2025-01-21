'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import ProductCategory from './steps/product-category'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import FileUpload from './steps/file-upload'
import SpecificationsVariants from './steps/specification-varients'
import ReviewSubmit from './steps/review-submit'

const steps = [
  // { title: 'Product Category', component: ProductCategory },
  { title: 'Product Details', component: FileUpload },
  { title: 'Specifications & Variants', component: SpecificationsVariants },
  { title: 'Review and Submit', component: ReviewSubmit },
]

export default function ProductCatalogueUploadForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    images: [],
    productName: '',
    productDescription: '',
    stockQuantity: '',
    specifications: [{ type: '', description: '' }],
    variants: [{ sku: '', name: '', price: '' }],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { toast } = useToast()

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Product has been successfully submitted.",
    })
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (jsonResponse: string) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonResponse,
      })

      if (!response.ok) {
        throw new Error('Failed to submit product')
      }

      const result = await response.json()
      console.log('Product submitted successfully:', result)
      // Handle successful submission (e.g., show success message, reset form, etc.)
      toast({
        title: "Success",
        description: "Product has been successfully submitted.",
      })
    } catch (error) {
      console.error('Error submitting product:', error)

      toast({
        title: "Error",
        description: "Failed to submit product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
      <CurrentStepComponent 
        formData={formData} 
        handleInputChange={handleInputChange} 
        onSubmit={currentStep === steps.length - 1 ? handleSubmit : undefined} 
      />
      <div className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        {currentStep < steps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
      {submitError && (
        <div className="text-red-500 mt-4">{submitError}</div>
      )}
      <Toaster />
    </div>
  )
}

