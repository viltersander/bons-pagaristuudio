import { Order } from "@medusajs/medusa";
import Button from "@modules/common/components/button";
import Thumbnail from "@modules/products/components/thumbnail";
import { formatAmount } from "medusa-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items.length;
  }, [order]);

  const formatDate = (date: string | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  
    const dateString = typeof date === "string" ? date : date.toISOString();
    return new Date(dateString).toLocaleDateString("et-EE", options);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 414);
    };

    handleResize(); // Check initial screen size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white flex flex-col">
      <div className="uppercase text-large-semi mb-1">#{order.display_id}</div>
      <div className="flex items-center divide-x divide-gray-200 text-small-regular text-gray-700">
        <span className="pr-2">
        <span>{formatDate(order.created_at)}</span> {/* Update this line */}
        </span>
        <span className="px-2">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "toodet" : "toode"
        }`}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, isMobile ? 1 : 3).map((i, index) => {
          return (
            <div
              key={i.id}
              className={`flex flex-col gap-y-2 w-36 xsf:w-28 ${
                index === 2 && numberOfProducts > (isMobile ? 1 : 3)
                  ? "mx-auto"
                  : ""
              }`}
            >
              <Thumbnail
                thumbnail={i.thumbnail} // Use `i.thumbnail` instead of `order.items[0].thumbnail`
                images={[]}
                size="full"
              />
              <div className="flex xsf:flex-wrap items-center text-small-regular text-gray-700">
                <span className="text-gray-900 font-semibold">{i.title}</span>
                <span className="ml-2">x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > (isMobile ? 1 : 3) && (
          <div className="flex flex-col justify-center align-center w-36 xsf:w-24 mx-auto">
            <span className="text-small-regular text-gray-700">
              + {numberOfLines - (isMobile ? 1 : 3)} veel
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Link href={`/order/details/${order.id}`}>
          <a>
            <Button variant="secondary">Vaata detaile</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
