import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; // Assuming you use a styled select component
import { FileVideo } from "lucide-react";

const StepOverview = ({ nextStep }) => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      productImages: [],
      productVideo: null,
      productName: "",
      category: "",
      sizeVariants: [],
      productVariant: "",
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleImageUpload = (filesImage) => {
    const fileArray = Array.from(filesImage);

    const previews = fileArray.map((fileImage) => {
      const url = URL.createObjectURL(fileImage);
      return { fileImage, previewImage: url };
    });

    setImagePreviews((prev) => [...prev, ...previews]);
    setValue("productImages", [...watch("productImages"), ...fileArray]);
  };

  const handleVideoUpload = (filesVideo) => {
    const fileArray = Array.from(filesVideo);

    const previews = fileArray.map((filesVideo) => {
      const url = URL.createObjectURL(filesVideo);
      return { file, previewVideo: url };
    });

    setImagePreviews((prev) => [...prev, ...previews]);
    setValue("productImages", [...watch("productVideo"), ...fileArray]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setValue("productImages", watch("productImages").filter((_, i) => i !== index));
  };

//   const handleVideoUpload = (file) => {
//     setVideoPreview(URL.createObjectURL(file));
//     setValue("productVideo", file);
//   };

  const removeVideo = () => {
    setVideoPreview(null);
    setValue("productVideo", null);
  };

  const onSubmit = (data) => {
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>

      {/* Product Images */}
      <div>
        <Label>Product Images *</Label>
        <div
          className="mt-2 border-dashed border-2 border-gray-300 rounded-md p-4 text-center cursor-pointer"
          onClick={() => document.getElementById("image-upload").click()}
        >
          <p className="text-sm text-gray-500">+ Drag or click to add images</p>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={(e) => handleImageUpload(e.target.files)}
        />
        <div className="mt-4 flex gap-4 flex-wrap">
          {imagePreviews.map((image, index) => (
            <div key={index} className="relative">
              <img src={image.previewImage} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Video */}
      <div>
        <Label>Product Video </Label>
        <div
          className="mt-2 border-dashed border-2 border-gray-300 rounded-md p-4 text-center cursor-pointer"
          onClick={() => document.getElementById("video-upload").click()}
        >
          <p className="text-sm text-gray-500">+ Drag or click to add video</p>
        </div>
        <input
          type="file"
          multiple
          accept="video/*"
          id="video-upload"
          className="hidden"
          onChange={(e) => handleVideoUpload(e.target.files)}
        />
        <div className="mt-4 flex gap-4 flex-wrap">
          {imagePreviews.map((video, index) => (
            <div key={index} className="relative">
              <img src={video.preview} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <Label>Product Name *</Label>
        <Controller
          name="productName"
          control={control}
          rules={{ required: "Product name is required" }}
          render={({ field, fieldState }) => (
            <div>
              <Input {...field} placeholder="e.g., Nike Air Jordan 1" />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category *</Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Size Variants */}
      <div>
        <Label>Size Variants *</Label>
        <Controller
          name="sizeVariants"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <label key={size} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size}
                    onChange={(e) => {
                      const newValue = [...field.value];
                      if (e.target.checked) newValue.push(size);
                      else newValue.splice(newValue.indexOf(size), 1);
                      field.onChange(newValue);
                    }}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Product Variant */}
      <div>
        <Label>Product Variant *</Label>
        <Controller
          name="productVariant"
          control={control}
          render={({ field }) => <Input {...field} placeholder="e.g., Black, White" />}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default StepOverview;
