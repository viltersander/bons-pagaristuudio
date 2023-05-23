import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"

type ProductPreviewProps = ProductPreviewType & {
  onClick?: (e: React.MouseEvent) => void;
};

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  onClick,
}: ProductPreviewProps) => {
  return (
    <Link href={`/products/${handle}`}>
      <a onClick={onClick}>
        <div className="md:w-48 lg:w-60 sm:w-60">
          <Thumbnail thumbnail={thumbnail} size="full" />
          <div className="text-base-regular p-4 pt-4 border-2 rounded-b">
            <span className="break-words">{title}</span>
            <div className="flex items-center gap-x-2 mt-2">
              {price ? (
                <>
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
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductPreview
