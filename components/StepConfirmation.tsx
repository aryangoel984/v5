import { Button } from "@/components/ui/button";

const StepConfirmation = ({ prevStep, formData, handleSubmit }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Confirm Your Details</h2>
    <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(formData, null, 2)}</pre>
    <div className="flex justify-between">
      <Button variant="ghost" onClick={prevStep}>
        Back
      </Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  </div>
);

export default StepConfirmation;
