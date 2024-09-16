import { Button } from "@/components/ui/button";

type PriceButtonProps = {
  discountedPrice: number;
  originalPrice: number;
  discount: number;
  onClick: () => void;
};

const PriceButton: React.FC<PriceButtonProps> = ({
  discountedPrice,
  originalPrice,
  discount,
  onClick,
}) => {
  return (
    <Button
      className="flex-1 flex-grow self-stretch space-x-1"
      onClick={onClick}
    >
      <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
      {discount !== 0 ? (
        <span className="line-through text-foreground">{`/${originalPrice.toFixed(
          2
        )}`}</span>
      ) : null}
    </Button>
  );
};

export default PriceButton;
