import BasketComp from "@/components/basket/Basket";
import Stepper from "@/components/basket/Stepper";

export default function BasketPage() {
  return (
    <div className="p-10">
      <Stepper currentStep={1} />
      <BasketComp />
    </div>
  );
}
