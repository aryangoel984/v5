import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StepPricing = ({ nextStep, prevStep, formData, handleInputChange }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Pricing</h2>
    <Input
      name="productPrice"
      placeholder="Product Price"
      type="number"
      value={formData.productPrice || ""}
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

export default StepPricing;
