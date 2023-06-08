import { CheckoutProvider } from "@lib/context/checkout-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import FooterNav from "@modules/layout/components/footer-nav"
import Link from "next/link"
import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="bg-gray-100 relative small:min-h-screen">
        <div className="h-16 bg-white">
          <nav className="flex items-center h-full justify-between content-container">
            <Link href="/cart">
              <a className="text-small-semi text-gray-700 flex items-center gap-x-2 xsf:gap-x-0 uppercase flex-1 basis-0">
                <ChevronDown className="rotate-90" size={16} />
                <span className="mt-px hidden small:block">
                  Tagasi ostukorvi
                </span>
                <span className="mt-px block small:hidden">Tagasi</span>
              </a>
            </Link>
            <Link href="/">
              <a className="text-xl-semi">Böns</a>
            </Link>
            <div className="flex-1 basis-0" />
          </nav>
        </div>
        <div className="relative">
          <CheckoutLoader />
          <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] gap-y-8 content-container gap-x-8 py-12 ">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
        <div>
          <FooterNav />
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
