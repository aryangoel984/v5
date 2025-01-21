"use client"

import * as React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pencil, Trash2, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Product, ProductVariant } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import useSWR, { mutate } from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ProductCarousel() {
  const [currentImage, setCurrentImage] = React.useState<Record<number, string>>({})
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const closeDialogRef = useRef<HTMLButtonElement>(null)

  const { data: products, error } = useSWR<Product[]>("/api/GET/1", fetcher)

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const handleDelete = async (productId: number) => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/DELETE", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      })
      if (!response.ok) {
        throw new Error("Failed to delete product")
      }
      const data = await response.json()
      mutate("/api/DELETE") // Revalidate the products data
      toast({
        title: "Product Deleted",
        description: data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingProduct) {
      setIsEditing(true)
      try {
        const response = await fetch("/api/PUT", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editingProduct,
            updatedAt: new Date().toISOString(),
          }),
        })
        if (!response.ok) {
          throw new Error("Failed to update product")
        }
        const updatedProduct = await response.json()
        mutate("/api/PUT") // Revalidate the products data
        setEditingProduct(null)
        toast({
          title: "Changes Saved",
          description: `Product "${updatedProduct.name}" has been updated.`,
        })
        closeDialogRef.current?.click() // Close the dialog
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update product. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsEditing(false)
      }
    }
  }

  const handleVariantChange = (variantId: number, field: keyof ProductVariant, value: string) => {
    if (editingProduct) {
      const updatedVariants = editingProduct.variants.map((v) =>
        v.id === variantId ? { ...v, [field]: field === "price" ? Number.parseFloat(value) : value } : v,
      )
      setEditingProduct({ ...editingProduct, variants: updatedVariants })
    }
  }

  if (error) {
    return <div>Error loading products. Please try again later.</div>
  }

  if (!products) {
    return <div>Loading products...</div>
  }

  if (products.length === 0) {
    return <div>No products found.</div>
  }

  return (
    <>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <Card className="w-full">
                <CardContent className="flex flex-col p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <Image
                        src={currentImage[product.id] || product.images[0]?.url || "/placeholder.svg"}
                        alt={product.images[0]?.alt || product.name}
                        width={400}
                        height={400}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {product.images.map((image) => (
                          <Image
                            key={image.id}
                            src={image.url || "/placeholder.svg"}
                            alt={image.alt}
                            width={100}
                            height={100}
                            className="w-full h-auto rounded-md object-cover cursor-pointer"
                            onMouseEnter={() => setCurrentImage((prev) => ({ ...prev, [product.id]: image.url }))}
                            onMouseLeave={() => setCurrentImage((prev) => ({ ...prev, [product.id]: "" }))}
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
                                          value={editingProduct.sku}
                                          onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, sku: e.target.value })
                                          }
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="stockQuantity">Stock Quantity</Label>
                                        <Input
                                          id="stockQuantity"
                                          type="number"
                                          value={editingProduct.stockQuantity}
                                          onChange={(e) =>
                                            setEditingProduct({
                                              ...editingProduct,
                                              stockQuantity: Number.parseInt(e.target.value),
                                            })
                                          }
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
                                              onChange={(e) => handleVariantChange(variant.id, "name", e.target.value)}
                                              placeholder="Variant Name"
                                            />
                                            <Input
                                              type="number"
                                              value={variant.price}
                                              onChange={(e) => handleVariantChange(variant.id, "price", e.target.value)}
                                              placeholder="Price"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <Button type="submit" disabled={isEditing}>
                                      {isEditing ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Saving...
                                        </>
                                      ) : (
                                        "Save Changes"
                                      )}
                                    </Button>
                                  </>
                                )}
                              </form>
                              <DialogClose ref={closeDialogRef} className="hidden" />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge>{product.category.name}</Badge>
                        <span className="text-sm font-semibold">Stock: {product.stockQuantity}</span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="variants">
                          <AccordionTrigger>Variants</AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-2">
                              {product.variants.map((variant) => (
                                <Badge key={variant.id} variant="outline" className="justify-between">
                                  <span>{variant.name}</span>
                                  <span>₹{variant.price.toFixed(2)}</span>
                                </Badge>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="specifications">
                          <AccordionTrigger>Specifications</AccordionTrigger>
                          <AccordionContent>
                          <ul className="list-disc list-inside">
                            {product?.specifications?.map((specification) => (
                              <li key={specification.type} className="mb-1">
                                <span className="font-semibold">{specification.type}:</span>{' '}
                                {specification.description}
                              </li>
                            )) || (
                              <li>No specifications available.</li>
                            )}
                          </ul>
                        </AccordionContent>

                        </AccordionItem>
                      </Accordion>
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

