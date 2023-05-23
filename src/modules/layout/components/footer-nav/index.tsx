import clsx from "clsx"
import { useCollections } from "medusa-react"
import Link from "next/link"
import Image from 'next/image'

const FooterNav = () => {
  const { collections } = useCollections()

  return (
    <div className="bg-black flex flex-col gap-y-8 pt-16 pb-8 text-white p-8 ">
      <div className="flex flex-col gap-y-6 xsmall:flex-row items-center justify-center w-full text-center">
        <div className="flex text-center flex-col md:flex-row lg:flex-row gap-8">
          <Link href="/" passHref>
            <a className="text-regular">Korduvad küsimused</a>
          </Link>
          <Link href="/" passHref>
            <a className="text-regular">Blogi</a>
          </Link>
          <div className="flex align-center justify-center gap-8 order-5 lg:order-none md:order-none ">
            <Link href="https://www.instagram.com/bonspagaristuudio/?igshid=YmMyMTA2M2Y%3D&fbclid=IwAR0nqxZTa18PjQoF3vAsjFWxwERGTgFzYCYEBdfTk2i4lHbL3t-yEKmL8GE" passHref>
            <Image
                src="/images/instagram.png"
                alt="pagaristuudio logo"
                width={25}
                height={25}
                objectFit="contain"
                className="cursor-pointer"
              />
            </Link>
            <Link href="https://www.facebook.com/bonspagaristuudio" passHref>
            <Image
                src="/images/facebook.png"
                alt="pagaristuudio logo"
                width={28}
                height={28}
                objectFit="contain"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <Link href="/" passHref>
            <a className="text-regular">Tingimused</a>
          </Link>
          <Link href="/" passHref>
            <a className="text-regular">Privaatsuspoliitika</a>
          </Link>
        </div>
      </div>
      <hr className='color-white' />
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:justify-between text-center w-full">
        <span className="text-xsmall-regular text-gray-300 w-full text-center align-center">
          © Copyright 2023 Böns Pagarstuudio
        </span>
      </div>
    </div>
  )
}

export default FooterNav
