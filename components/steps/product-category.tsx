import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "books", label: "Books" },
]

const subcategories = {
  electronics: ["Smartphones", "Laptops", "Accessories"],
  clothing: ["Men's", "Women's", "Children's"],
  home: ["Furniture", "Decor", "Appliances"],
  books: ["Fiction", "Non-fiction", "Educational"],
}

export default function ProductCategory({ formData, handleInputChange }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleInputChange('category', value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {formData.category && (
        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select
            value={formData.subcategory}
            onValueChange={(value) => handleInputChange('subcategory', value)}
          >
            <SelectTrigger id="subcategory">
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              {subcategories[formData.category].map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

