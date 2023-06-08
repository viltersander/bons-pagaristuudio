import { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useMeCustomer } from "medusa-react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = () => {
  const { customer } = useMeCustomer()
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 bg-amber-100 p-4 xsf:text-small">
          <p className="text-small-regular">
            {"Kas tahad kasutada enda salvestatud aadressidest?"}
          </p>
          <div className="xsf:text-small-regular">
            <AddressSelect addresses={customer.shipping_addresses} />
          </div>
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label="Email"
              {...register("email", {
                required: "Email on nõutud",
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2 xsf:flex xsf:flex-col">
              <Input
                label="Eesnimi"
                {...register("shipping_address.first_name", {
                  required: "Eesnimi on nõutud",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <div className="xsf:mt-2">
              <Input
                label="Perekonnanimi"
                {...register("shipping_address.last_name", {
                  required: "Perekonnanimi on nõutud",
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
              </div>
            </div>
            <Input
              label="Firma"
              {...register("shipping_address.company")}
              autoComplete="organization"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Aadress"
              {...register("shipping_address.address_1", {
                required: "Aadress on nõutud",
              })}
              autoComplete="address-line1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Korterid, jne."
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-[122px_1fr] gap-x-2 xsf:flex xsf:flex-col">
              <Input
                label="Postiindeks"
                {...register("shipping_address.postal_code", {
                  required: "Postiindeks on nõutud",
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              />
              <div className="xsf:mt-2">
              <Input
                label="Linn"
                {...register("shipping_address.city", {
                  required: "Linn on nõutud",
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              />
              </div>
            </div>
            {/* <CountrySelect
              {...register("shipping_address.country_code", {
                required: "Riik on nõutud",
              })}
              autoComplete="country"
              errors={errors}
              touched={touchedFields}
            /> */}
            {/* <Input
              label="State / Province"
              {...register("shipping_address.province")}
              autoComplete="address-level1"
              errors={errors}
              touched={touchedFields}
            /> */}
            <Input
              label="Telefon"
              {...register("shipping_address.phone", {
                required: "Telefon on nõutud",
              })}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
            />
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
