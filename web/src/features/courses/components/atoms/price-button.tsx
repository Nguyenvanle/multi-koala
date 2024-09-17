import { Button } from "@/components/ui/button";

type PriceButtonProps = {
  discountedPrice: number;
  originalPrice: number;
  discount: number;
  className?: string;
  onClick: () => void;
};

const PriceButton: React.FC<PriceButtonProps> = ({
  discountedPrice,
  originalPrice,
  discount,
  className,
  onClick,
}) => {
  return (
    <Button className="flex-1 flex-grow  space-x-1" onClick={onClick}>
      <span className={`font-bold ${className}`}>{`$${discountedPrice.toFixed(
        2
      )}`}</span>
      {discount !== 0 ? (
        <span className="line-through text-foreground">{`/${originalPrice.toFixed(
          2
        )}`}</span>
      ) : null}
    </Button>
  );
};

export default PriceButton;
