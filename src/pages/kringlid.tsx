import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import Button from "@modules/common/components/button"
import Image from "next/image"

const Kringlid: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Kringlid"
        description="Böns kringlid."
      />
      <div className="flex flex-col min-h-[calc(100vh-40px)] p-6">
        <div style={{
        //   backgroundImage: `url('/images/toodete-taust.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
            <div className="content-container py-10" id="products">
            <h1 className="text-center text-2xl-semi lg:text-3xl-semi text-center">Kringlid</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12 lg:grid-cols-3 max-w-screen-lg w-full mx-auto flex-wrap px-6 mb-10">       
                    <a href='/'>
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4 "> Parmesani-piprakringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/spinati-fetakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Spinati-fetakringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Kaneelikringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Kaneelikringel šokolaaditükkidega</h1>
                        <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Kaneelikringel toorjuustukattega</h1>
                        <p className="mt-2 p-4 pb-6 text-center">20 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Kardemonikringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Kaneeli-kardemonikringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Kardemoni-pistaatsiakringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Moonikringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4">Moonikringel šokolaadiglasuuriga</h1>
                        <p className="mt-2 p-4 pb-6 text-center">20 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4"> Kookose-pekaanikringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    <a href="/">
                    <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
                        <Image
                        src="/images/parmesani-piprakringel.png"
                        alt="Image 1"
                        width={500}
                        height={500}
                        objectFit="cover"
                        />
                        <h1 className="text-center mt-4"> Bountykringel</h1>
                        <p className="mt-2 p-4 pb-6 text-center">20 €/ kg</p>
                        <Button>Tutvu lähemalt</Button>
                    </div>
                    </a>
                    </div>
                {/* <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-8">
                {data
                    ? data.map((product) => (
                        <li key={product.id}>
                        <ProductPreview {...product} />
                        </li>
                    ))
                    : Array.from(Array(4).keys()).map((i) => (
                        <li key={i}>
                        <SkeletonProductPreview />
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
      </div>
    </>
  )
}

Kringlid.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Kringlid
