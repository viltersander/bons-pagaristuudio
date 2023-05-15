import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-start justify-between p-4 rounded">
      <div>
        <h2 className="text-xl-semi">Kasutaja juba olemas?</h2>
        <p className="text-base-regular text-gray-700 mt-2">
          Logi sisse parema kogemuse jaoks.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a>
            <Button variant="secondary">Logi sisse</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
