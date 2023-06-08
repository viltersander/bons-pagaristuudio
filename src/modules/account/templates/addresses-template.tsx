import { useAccount } from "@lib/context/account-context"
import AddressBook from "../components/address-book"

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full p-4">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-xl-semi sm:text-2xl-semi">Tarneaadressid</h1>
        <p className="text-base-regular">
          Saate vaadata ja värskendada oma tarneaadresse. Saate neid lisada nii palju kui soovite. Kui salvestate oma aadressid, on need kassasse minnes saadaval.
        </p>
      </div>
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
