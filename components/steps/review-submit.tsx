export default function ReviewSubmit({ formData }) {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold">Review your information:</h3>
        <p>Category: {formData.category}</p>
        <p>Subcategory: {formData.subcategory}</p>
        <p>File: {formData.file ? formData.file.name : 'No file uploaded'}</p>
      </div>
    )
  }
  
  