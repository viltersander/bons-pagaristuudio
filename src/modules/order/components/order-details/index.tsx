import { Order } from "@medusajs/medusa";

type OrderDetailsProps = {
  order: Order;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0);

  const formatStatus = (str: string) => {
    const translations = {
      not_fulfilled: "pole täidetud",
      awaiting: "ootel",
      canceled: "tühistatud",
      paid: "makstud",
      unpaid: "maksmata",
      shipped: "saadetud",
      captured: "kinnitatud"
    };

    return translations[str] || str;
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("et-EE", options);
  };

  return (
    <div className="p-10 border-b border-gray-200">
      <span className="text-gray-700 text-small-regular uppercase">
        Täname, teie tellimus sooritati edukalt
      </span>
      <h1 className="mt-2 uppercase xsf:text-large-semi sm:text-2xl-semi text-xl-semi">
        #{order.display_id}
      </h1>
      <span className="xsf:text-small-regular text-small-regular break-words">
        {order.id.split("order_")[1]}
      </span>
      <div className="flex text-gray-700 text-small-regular flex-wrap xsf:gap-x-1 gap-x-2 mt-4">
      <span>{formatDate(order.created_at.toISOString())}</span>
        <span className="border-l-2"></span>
        <div>{`${items} ${items !== 1 ? "toodet" : "toode"}`}</div>
      </div>
      {showStatus && (
        <div className="flex mt-2 xsf:flex-col xsf:gap-y-1 text-gray-700 text-small-regular gap-x-2">
          <div>Täitmine: {formatStatus(order.fulfillment_status)}</div>
          <span className="border-l-2"></span>
          <div>Makse olek: {formatStatus(order.payment_status)}</div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
