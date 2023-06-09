import clsx from "clsx";
import Link from "next/link";
import { ProductPreviewType } from "types/global";
import Thumbnail from "../thumbnail";
import Button from "@modules/common/components/button";

type ProductPreviewProps = ProductPreviewType & {
  onClick?: (e: React.MouseEvent) => void;
  inStock: boolean;
  collectionHandle: string;
};

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  inStock,
  onClick,
  collectionHandle,
}: ProductPreviewProps) => {
  const isKringlidProduct = collectionHandle === "kringlid";

  return (
    <Link href={`/products/${handle}`}>
      <a onClick={onClick} className="flex flex-col">
        <div className="md:w-48 lg:w-56 sm:w-48 flex-shrink-0">
          <Thumbnail thumbnail={thumbnail} size="full" />
          <div className="text-base-regular sm:p-4 xsf:pt-2 pt-3 sm:pt-4 p-3 xsf:p-[0.6rem] border-2 rounded-b max-w-[225px] mx-auto flex flex-col h-full">
            <span className="break-words">{title}</span>
            <div className="sm:flex sm:items-center justify-between items-start flex flex-col sm:flex-row xsf:items-start xsf:flex-col mt-2 xsf:mt-2">
              {price ? (
                <>
                  <div className="flex items-center gap-x-1 text-[14px] sm:text-sm sm:mb-0 mb-1">
                    {price.price_type === "sale" && (
                      <span className="line-through text-gray-500">
                        {price.original_price}
                      </span>
                    )}
                    <span
                      className={clsx("font-semibold", {
                        "text-rose-500": price.price_type === "sale",
                      })}
                    >
                      {price.calculated_price}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
              )}
              {!isKringlidProduct && (
                <div>
                  <div
                    className={clsx("border px-2 xsf:px-1 rounded-lg", {
                      "border-green-500": inStock,
                      "border-red-500 sm:hidden": !inStock,
                    })}
                  >
                    <span
                      className={clsx("sm:text-sm text-[13px]", {
                        "text-green-500": inStock,
                        "text-red-500 sm:hidden": !inStock,
                      })}
                    >
                      {!inStock ? "Läbi müüdud" : "Laos"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-0 sm:mt-4 xsf:mt-2">
              {isKringlidProduct ? (
                <Link href={`/products/${handle}`} passHref>
                  <Button>Telli</Button>
                </Link>
              ) : (
                <Button disabled={!inStock} className="sm:block xsf:text-xs hidden">
                  {!inStock ? "Läbi müüdud" : "Vaata lähemalt"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

// Function to sort the products array so that "Välja müüdud" products appear last
const sortProducts = (products: ProductPreviewType[]) => {
  const soldOutProducts = products.filter((product) => !product.inStock);
  const inStockProducts = products.filter((product) => product.inStock);
  return [...inStockProducts, ...soldOutProducts];
};

export default ProductPreview;
