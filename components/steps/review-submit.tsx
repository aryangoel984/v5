'use client'

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ReviewSubmitProps {
  formData: {
    images: string[];
    productName: string;
    productDescription: string;
    category: string;
    specifications: { type: string; description: string }[];
    variants: { sku: string; name: string; price: string }[];
  };
}

export default function ReviewSubmit({ formData }: ReviewSubmitProps) {
  const [currentImage, setCurrentImage] = React.useState<string>("")

  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem>
          <Card className="w-full">
            <CardContent className="flex flex-col p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <Image
                    src={currentImage || formData.images[0] || "/placeholder.svg"}
                    alt={formData.productName}
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.images.slice(0, 3).map((image, index) => (
                      <Image
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${formData.productName} - Image ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-auto rounded-md object-cover cursor-pointer"
                        onMouseEnter={() => setCurrentImage(image)}
                        onMouseLeave={() => setCurrentImage("")}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2">{formData.productName}</h2>
                  <p className="text-gray-600 mb-4">{formData.productDescription}</p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge>{formData.category}</Badge>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="variants">
                      <AccordionTrigger>Variants</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                          {formData.variants.map((variant, index) => (
                            <Badge key={index} variant="outline" className="justify-between">
                              <span>{variant.name}</span>
                              <span>${parseFloat(variant.price).toFixed(2)}</span>
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="specifications">
                      <AccordionTrigger>Specifications</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside">
                          {formData.specifications.map((spec, index) => (
                            <li key={index} className="mb-1">
                              <span className="font-semibold">{spec.type}:</span>{' '}
                              {spec.description}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

