import OrderOverview from "../components/order-overview"

const OrdersTemplate = () => {
  return (
    <div className="w-full p-4">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Tellimused</h1>
        <p className="text-base-regular">
          Vaadake oma eelmisi tellimusi ja nende olekut. Saate vajadusel toote tagastada või vahetada tellimust, kui selleks on vajadust.
        </p>
      </div>
      <div>
        <OrderOverview />
      </div>
    </div>
  )
}

export default OrdersTemplate
