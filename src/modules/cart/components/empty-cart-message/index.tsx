import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">Sinu ostukorv on tühi.</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Sinu ostukorvis pole midagi. Toodetega saad lähemalt tuvuda siin.
      </p>
      <div>
        <UnderlineLink href="/store">Vaata tooteid</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
