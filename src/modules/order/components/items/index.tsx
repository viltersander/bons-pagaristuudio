import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items";
import { LineItem, Region } from "@medusajs/medusa";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import Thumbnail from "@modules/products/components/thumbnail";
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item";
import Link from "next/link";

type ItemsProps = {
  items: LineItem[];
  region: Region;
  cartId: string;
};

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId);

  return (
    <div className="p-10 border-b border-gray-200 gap-y-5 flex flex-col">
      {enrichedItems?.length ? (
        enrichedItems.map((item, index) => (
          <div key={item.id}>
            <div className="grid sm:grid-cols-[122px_1fr] grid-cols-[110px_1fr]  xsf:flex-col  xsf:flex gap-x-4">
              <div className="sm:w-[122px] xsf:w-[136px] w-[110px] rounded">
                <Thumbnail thumbnail={item.thumbnail} size="full" />
              </div>
              <div className="flex flex-col justify-between flex-1 xsf:pt-2">
                <div className="flex flex-col flex-1 text-small-regular">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="sm:text-base-regular text-[13px] overflow-hidden whitespace-normal mr-4 xsf:whitespace-normal">
                        <Link href={`/products/${item.variant.product.handle}`}>
                          <a className="xsf:break-words">{item.title}</a>
                        </Link>
                      </h3>
                      <LineItemOptions variant={item.variant} />
                      <span>Kogus: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex justify-start sm:justify-between mt-12 xsf:mt-2 sm:mt-14 gap-x-4 xsf:justify-between">
                    Summa: <LineItemPrice region={region} item={item} />
                  </div>
                </div>
              </div>
            </div>
            {index !== enrichedItems.length - 1 && <hr className="mt-4 w-full" />}
          </div>
        ))
      ) : (
        Array.from(Array(items.length).keys()).map((i) => <SkeletonLineItem key={i} />)
      )}
    </div>
  );
};

export default Items;
