'use client'

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
import { Product } from "@/types/product"

interface ProductCarouselProps {
  products: Product[];
};

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentImage, setCurrentImage] = React.useState<string>("")
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id}>
            <Card className="w-full">
              <CardContent className="flex flex-col p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                    <Image
                      src={currentImage || product.imageUrl}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {product.images.slice(0, 3).map((image) => (
                        <Image
                          key={image.id}
                          src={image.url}
                          alt={image.alt}
                          width={100}
                          height={100}
                          className="w-full h-auto rounded-md object-cover cursor-pointer"
                          onMouseEnter={() => setCurrentImage(image.url)}
                          onMouseLeave={() => setCurrentImage("")}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                      <Badge>{product.category.name}</Badge>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="variants">
                        <AccordionTrigger>Variants</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-2">
                            {product.variants.map((variant) => (
                              <Badge key={variant.id} variant="outline" className="justify-between">
                                <span>{variant.name}</span>
                                <span>${variant.price.toFixed(2)}</span>
                              </Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="specifications">
                        <AccordionTrigger>Specifications</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <li key={key} className="mb-1">
                                <span className="font-semibold">{key}:</span>{' '}
                                {Array.isArray(value) ? value.join(', ') : value}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Seller: {product.sellerCompany}</p>
                      <p className="text-sm text-gray-500">Created: {new Date(product.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
                    </div>
                    {product.videoUrl && (
                      <div className="mt-4">
                        <a href={product.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Watch Product Video
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

