import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import Button from "@modules/common/components/button"
import Image from "next/image"
import Link from "next/link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="py-12 mt-10" style={{
      backgroundImage: `url('/images/toodete-taust.png')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="content-container py-12" id="products">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12 lg:grid-cols-3 max-w-screen-lg w-full mx-auto flex-wrap px-10 mb-10 xsf:p-2">
          <Link href="/kringlid" passHref> 
          <div className="w-76 p-2 border drop-shadow-md rounded lg:mb-10 bg-white">
            <Image
              src="/images/magusad-kringlid.png"
              alt="Image 1"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded"
            />
            <h1 className="text-center mt-2 sm:mt-4 xsf:mt-1">Magusad kringlid</h1>
            <p className=" p-4 pb-4 sm:pb-6 text-start xsf:text-sm xsf:p-2 xsf:my-2 ">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia </p>
            <Button>Tutvu lähemalt</Button>
          </div>
          </Link>
          <Link href="/kringlid" passHref>
          <div className="w-76 p-2 border drop-shadow-md rounded lg:mt-10 bg-white">
            <Image
              src="/images/soolased-kringlid.png"
              alt="Image 1"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded"
            />
            <h1 className="text-center mt-2 sm:mt-4 xsf:mt-1">Soolased kringlid</h1>
            <p className=" p-4 pb-4 sm:pb-6 text-start xsf:text-sm xsf:p-2 xsf:my-2 ">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia </p>
            <Button>Tutvu lähemalt</Button>
          </div>
          </Link>
          <Link href="/store" passHref>
          <div className="w-76 p-2 border drop-shadow-md rounded lg:mb-10 bg-white">
            <Image
              src="/images/küpsised.png"
              alt="Image 1"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded"
            />
            <h1 className="text-center mt-2 sm:mt-4 xsf:mt-1">Küpsised</h1>
            <p className=" p-4 pb-4 sm:pb-6 text-start xsf:text-sm xsf:p-2 xsf:my-2 ">Meie küpsiseid saab tellida üle Eesti DPD või SmartPosti automaatidesse.</p>
            <Button>Tutvu lähemalt</Button>
          </div>
          </Link>
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
  )
}

export default FeaturedProducts
