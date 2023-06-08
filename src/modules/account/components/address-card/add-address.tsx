import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Plus from "@modules/common/icons/plus"
import Spinner from "@modules/common/icons/spinner"
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

const AddAddress: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const handleClose = () => {
    reset({
      first_name: "",
      last_name: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      province: "",
    })
    close()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "",
      metadata: {},
    }

    medusaClient.customers.addresses
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        handleClose()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Ei saanud aadressi lisada, palun proovi uuesti.")
      })
  })

  return (
    <>
      <button
        className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
      >
        <span className="text-base-semi">Uus aadress</span>
        <Plus size={24} />
      </button>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title>Lisa aadress</Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 gap-x-2 xsf:flex xsf:flex-col">
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
              required
              autoComplete="phone"
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <div className="xsf:flex xsf:justify-center xsf:mt-4 mt-2">
        <Modal.Footer>
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
            onClick={handleClose}
          >
            Tühista
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={submitting}>
            Salvesta
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default AddAddress
