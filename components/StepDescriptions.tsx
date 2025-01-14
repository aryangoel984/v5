import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const StepDescriptions = ({ nextStep, prevStep, formData, handleInputChange }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Descriptions</h2>
    <Textarea
      name="productDetails"
      placeholder="Enter product details"
      value={formData.productDetails || ""}
      onChange={handleInputChange}
    />
    <div className="flex justify-between">
      <Button variant="ghost" onClick={prevStep}>
        Back
      </Button>
      <Button onClick={nextStep}>Next</Button>
    </div>
  </div>
);

export default StepDescriptions;
