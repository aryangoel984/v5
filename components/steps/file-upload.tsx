import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FileUpload({ formData, handleInputChange }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file">Upload Product Images</Label>
        <Input
          id="file"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleInputChange('file', e.target.files[0])}
        />
      </div>
      
      {formData.file && (
        <p className="text-sm text-gray-500">
          Selected file: {formData.file.name}
        </p>
      )}
    </div>
  )
}

