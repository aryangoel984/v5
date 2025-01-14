'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ProductCategory from './steps/product-category'
import FileUpload from './steps/file-upload'
import ReviewSubmit from './steps/review-submit'

const steps = [
  { title: 'Product Category', component: ProductCategory },
  { title: 'File Upload', component: FileUpload },
  { title: 'Review and Submit', component: ReviewSubmit },
]

export default function ProductCatalogueUploadForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    file: null,
  })

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form or navigate to a success page
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CurrentStepComponent formData={formData} handleInputChange={handleInputChange} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  )
}

