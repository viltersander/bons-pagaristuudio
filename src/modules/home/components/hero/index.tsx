import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] lg:h-[100vh] w-full relative top-16">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-left pl-4 text-start small:text-left small:justify-end small:items-start small:p-32 lg:mb-16 absolute top-52">
        <h1 className="text-2xl-semi lg:text-3xl-semi mb-4 drop-shadow-md shadow-black w-[50%]">
          Südamega küpsetatud!
        </h1>
        <p className="lg:text-1xl-regular text-md w-[50%]  max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          Hubane kodune pagaristuudio Kuressaare kesklinnas
        </p>
        <UnderlineLink href="#products">Vaata tooteid</UnderlineLink>
      </div>
      <Image
        src="/images/pagarikoda.png"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectFit="cover"
        alt="Pagarikoda"
        className="absolute inset-0 w-full h-full"
        draggable="false"
      />
    </div>
  )
}

export default Hero
