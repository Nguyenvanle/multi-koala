import { Button } from "@/components/ui/button";
import { H2, H3, H4, P } from "@/components/ui/typography";
import Link from "next/link";

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
    <div className="flex flex-1 flex-row justify-between">
      <div className="flex flex-0 flex-col justify-center">
        <H4>
          <span
            className={`font-bold text-destructive ${className}`}
          >{`$ ${discountedPrice.toFixed(2)} `}</span>
          {discount !== 0 ? (
            <span className="line-through text-foreground">{`/${originalPrice.toFixed(
              2
            )}`}</span>
          ) : null}
        </H4>
      </div>

      <Button onClick={onClick}>
        <Link href={"/login"}>Enroll Now</Link>
      </Button>
    </div>
  );
};

export default PriceButton;
