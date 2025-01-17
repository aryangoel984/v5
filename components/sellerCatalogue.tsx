'use client'

import * as React from "react"
import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"


interface ProductCarouselProps {
  products: Product[];
}

export  function ProductCarousel({ products: initialProducts }: ProductCarouselProps) {
  const [products, setProducts] = React.useState(initialProducts)
  const [currentImage, setCurrentImage] = React.useState<string>("")
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null)
  const { toast } = useToast()
  const closeDialogRef = useRef<HTMLButtonElement>(null)

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const handleDelete = (productId: number) => {
    const deletedProduct = products.find(p => p.id === productId)
    setProducts(products.filter(p => p.id !== productId))
    if (deletedProduct) {
      toast({
        title: "Product Deleted",
        description: `"${deletedProduct.name}" has been removed from the catalogue.`,
      })
    }
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        updatedAt: new Date().toISOString()
      }
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
      setEditingProduct(null)
      console.log('Updated Product:', JSON.stringify(updatedProduct, null, 2))
      toast({
        title: "Changes Saved",
        description: `Product "${updatedProduct.name}" has been updated.`,
      })
      closeDialogRef.current?.click() // Close the dialog
    }
  }

  const handleVariantChange = (variantId: number, field: string, value: string) => {
    if (editingProduct) {
      const updatedVariants = editingProduct.variants.map(v => 
        v.id === variantId ? { ...v, [field]: field === 'price' ? parseFloat(value) : value } : v
      )
      setEditingProduct({ ...editingProduct, variants: updatedVariants })
    }
  }

  const handleSpecificationChange = (key: string, value: string) => {
    if (editingProduct) {
      const updatedSpecs = { ...editingProduct.specifications, [key]: value }
      setEditingProduct({ ...editingProduct, specifications: updatedSpecs })
    }
  }

  return (
    <>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className=" overflow-y-auto">
              <Card className="w-full h-full">
                <CardContent className="flex flex-col p-6 h-full">
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
                            src={image.url || "/placeholder.svg"}
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
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleEditSubmit} className="space-y-4">
                                {editingProduct && (
                                  <>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="sku">SKU</Label>
                                        <Input
                                          id="sku"
                                          value={editingProduct.sku || ''}
                                          onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="stockQty">Stock Quantity</Label>
                                        <Input
                                          id="stockQty"
                                          type="number"
                                          value={editingProduct.stockQty || 0}
                                          onChange={(e) => setEditingProduct({ ...editingProduct, stockQty: parseInt(e.target.value) })}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Variants</Label>
                                      <div className="space-y-2 mt-2">
                                        {editingProduct.variants.map((variant) => (
                                          <div key={variant.id} className="flex gap-2">
                                            <Input
                                              value={variant.name}
                                              onChange={(e) => handleVariantChange(variant.id, 'name', e.target.value)}
                                              placeholder="Variant Name"
                                            />
                                            <Input
                                              type="number"
                                              value={variant.price}
                                              onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                                              placeholder="Price"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Specifications</Label>
                                      <div className="space-y-2 mt-2">
                                        {Object.entries(editingProduct.specifications).map(([key, value]) => (
                                          <div key={key} className="flex gap-2">
                                            <Input value={key} disabled className="w-1/3" />
                                            <Input
                                              value={Array.isArray(value) ? value.join(', ') : value}
                                              onChange={(e) => handleSpecificationChange(key, e.target.value)}
                                              className="w-2/3"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <Button type="submit">Save Changes</Button>
                                  </>
                                )}
                              </form>
                              <DialogClose ref={closeDialogRef} className="hidden" />
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
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
                        {product.sku && <p className="text-sm text-gray-500">SKU: {product.sku}</p>}
                        {product.stockQty !== undefined && <p className="text-sm text-gray-500">Stock: {product.stockQty}</p>}
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
    </>
  )
}

