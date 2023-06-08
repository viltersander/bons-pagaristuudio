import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Address } from "@medusajs/medusa"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Edit from "@modules/common/icons/edit"
import Spinner from "@modules/common/icons/spinner"
import Trash from "@modules/common/icons/trash"
import clsx from "clsx"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  first_name: string
  last_name: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
}

type EditAddressProps = {
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  address,
  isActive = false,
}) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: address.first_name || undefined,
      last_name: address.last_name || undefined,
      city: address.city || undefined,
      address_1: address.address_1 || undefined,
      address_2: address.address_2 || undefined,
      country_code: address.country_code || undefined,
      postal_code: address.postal_code || undefined,
      phone: address.phone || undefined,
      company: address.company || undefined,
      province: address.province || undefined,
    },
  })

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "Personal",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "None",
      metadata: {},
    }

    medusaClient.customers.addresses
      .updateAddress(address.id, payload)
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        close()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Aadressi uuendamisel tekkis viga, palun proovi uuesti.")
      })
  })

  const removeAddress = () => {
    medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
      refetchCustomer()
    })
  }

  return (
    <>
      <div
        className={clsx(
          "border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-gray-900": isActive,
          }
        )}
      >
        <div className="flex flex-col">
          <span className="text-left text-base-semi">
            {address.first_name} {address.last_name}
          </span>
          {address.company && (
            <span className="text-small-regular text-gray-700">
              {address.company}
            </span>
          )}
          <div className="flex flex-col text-left text-base-regular mt-2">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code}, {address.city}
            </span>
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-gray-700 flex items-center gap-x-2"
            onClick={open}
          >
            <Edit size={16} />
            Muuda
          </button>
          <button
            className="text-small-regular text-gray-700 flex items-center gap-x-2"
            onClick={removeAddress}
          >
            <Trash />
            Eemalda
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>Muuda aaderssi</Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 gap-x-2 xsf:flex xsf:flex-col ">
              <Input
                label="Eesnimi"
                {...register("first_name", {
                  required: "Eesnimi on nõutud",
                })}
                required
                errors={errors}
                autoComplete="given-name"
              />
              <div className="xsf:mt-2">
              <Input
                label="Perekonnanimi"
                {...register("last_name", {
                  required: "Perekonnanimi on nõutud",
                })}
                required
                errors={errors}
                autoComplete="family-name"
              />
              </div>
            </div>
            <Input label="Firma" {...register("company")} errors={errors} />
            <Input
              label="Aadress"
              {...register("address_1", {
                required: "Aadress on nõutud",
              })}
              required
              errors={errors}
              autoComplete="address-line1"
            />
            <Input
              label="Korterid, sviidid jne."
              {...register("address_2")}
              errors={errors}
              autoComplete="address-line2"
            />
            <div className="grid grid-cols-[144px_1fr] gap-x-2 xsf:flex xsf:flex-col">
              <Input
                label="Postiindeks"
                {...register("postal_code", {
                  required: "Postiindeks on nõutud",
                })}
                required
                errors={errors}
                autoComplete="postal-code"
              />
              <div className="xsf:mt-2">
              <Input
                label="Linn"
                {...register("city", {
                  required: "Linn on nõutud",
                })}
                errors={errors}
                required
                autoComplete="locality"
                />
              </div>
            </div>
            {/* <Input
              label="Province / State"
              {...register("province")}
              errors={errors}
              autoComplete="address-level1"
            />
            <CountrySelect
              {...register("country_code", { required: true })}
              autoComplete="country"
            /> */}
            <Input
              label="Telefon"
              {...register("phone", {
                required: "Telefon on nõutud",
              })}
              errors={errors}
              autoComplete="phone"
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <div className="xsf:flex xsf:justify-center  xsf:mt-4 mt-2">
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Tühista
          </Button>
          <Button onClick={submit} disabled={submitting}>
            Salvesta
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default EditAddress
