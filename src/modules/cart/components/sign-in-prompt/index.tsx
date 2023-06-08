import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-start justify-between p-4 rounded">
      <div>
        <h2 className="text-sm sm:text-xl-semi font-bold">Kasutaja juba olemas?</h2>
      </div>
      <div className='ml-6 sm:ml-0'>
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
