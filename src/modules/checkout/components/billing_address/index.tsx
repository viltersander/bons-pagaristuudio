import { CheckoutFormValues } from "@lib/context/checkout-context"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import CountrySelect from "../country-select"

const BillingAddress = () => {
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="Eesnimi"
              {...register("billing_address.first_name", {
                required: "First name is required",
              })}
              autoComplete="given-name"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Perekonnanimi"
              {...register("billing_address.last_name", {
                required: "Perekonnanimi on nõutud",
              })}
              autoComplete="family-name"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          <Input
            label="Firma"
            {...register("billing_address.company")}
            autoComplete="organization"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Aadress"
            {...register("billing_address.address_1", {
              required: "Aadress on nõutud",
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Korterid, sviidid jne."
            {...register("billing_address.address_2")}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postiindeks"
              {...register("billing_address.postal_code", {
                required: "Postiindeks on nõutud",
              })}
              autoComplete="postal-code"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Linn"
              {...register("billing_address.city", {
                required: "Linn on nõutud",
              })}
              autoComplete="address-level2"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          {/* <CountrySelect
            {...register("billing_address.country_code", {
              required: "Country is required",
            })}
            autoComplete="country"
            errors={errors}
            touched={touchedFields}
          /> */}
          {/* <Input
            label="State / Province"
            {...register("billing_address.province")}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
          /> */}
          <Input
            label="Telefon"
            {...register("billing_address.phone", {
              required: "Telefon on nõutud",
            })}
            autoComplete="tel"
            errors={errors}
            touched={touchedFields}
          />
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress
