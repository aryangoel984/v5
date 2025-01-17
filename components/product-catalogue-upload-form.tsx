'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import ProductCategory from './steps/product-category'
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
    specifications: [{ type: '', description: '' }],
    variants: [{ sku: '', name: '', price: '' }],
  })

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form or navigate to a success page
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
      <CurrentStepComponent formData={formData} handleInputChange={handleInputChange} />
      <div className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  )
}

