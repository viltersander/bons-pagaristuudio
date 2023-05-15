import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("Viga. Palun proovi hiljem uuesti.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-large-semi uppercase mb-6">Hakka Bönsi liikmeks</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        Tee omale Bönsi kasutaja täiustatud ostukogemuse saamiseks.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Eesnimi"
            {...register("first_name", { required: "Eesnimi on nõutud" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Perekonnanimi"
            {...register("last_name", { required: "Perekonnanimi on nõutud" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Email"
            {...register("email", { required: "Email on nõutud" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Telefon"
            {...register("phone", {
              required: "Telefon on nõutud",
            })}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Parool"
            {...register("password", {
              required: "Parool on nõutud",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              Sisestasite valed andmed
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          Kasutaja loomisel, nõustute Bönsi{" "}
          <Link href="/content/privacy-policy">
            <a className="underline">Privaatsuspoliitika</a>
          </Link>{" "}
          ja{" "}
          <Link href="/content/terms-of-use">
            <a className="underline">Tingimustega</a>
          </Link>
          .
        </span>
        <Button className="mt-6">Liitu</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Olete ju liitunud?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Logi sisse
        </button>
        .
      </span>
    </div>
  )
}

export default Register
