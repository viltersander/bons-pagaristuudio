import Image from "next/image"

const FooterCTA = () => {
  return (
    <div className="w-full">
      <hr />
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-12 relative">
        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36] md:min-w-[30%] lg:min-w-[30%] lg:order-2 ">
            <Image
              src="/images/sisevaade.png"
              alt="sisevaade"
              layout="fill"
              objectFit="cover"
              quality={90}
              className="absolute inset-0 sm:pt-6 md:pt-6 rounded-md"
            />
          </div>
        <div className="w-full pt-2 md:pt-0 lg:pt-0 sm:pt-0">
          <Image
              src="/images/pagaristuudio-logo-kirjaga.png"
              alt="pagaristuudio logo"
              width={300}
              height={100}
              quality={90}
              objectFit="cover"
            />
          <div className="mt-6 w-full">
            <h2 className="lg:w-[70%]">Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
            </h2>
            <p className="mt-6 lg:w-[70%]">
            Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora. Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative text-center">
        <Image
              src="/images/böns-suhkur.png"
              alt="pagaristuudio logo"
              width={200}
              height={100}
              quality={90}
              objectFit="cover"
            />
        </div>
    </div>
  )
}

export default FooterCTA
