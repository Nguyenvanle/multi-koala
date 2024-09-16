import { Muted } from "@/components/ui/typography";

type PriceProps = {
  discountedPrice: number;
  originalPrice: number;
};

export const Price: React.FC<PriceProps> = ({
  discountedPrice,
  originalPrice,
}) => (
  <>
    <span className="font-bold text-primary-foreground">{`$${discountedPrice.toFixed(
      2
    )}`}</span>
    <Muted className="line-through">{`/${originalPrice.toFixed(2)}`}</Muted>
  </>
);
