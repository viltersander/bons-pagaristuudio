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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12 lg:grid-cols-3 max-w-screen-lg w-full mx-auto flex-wrap px-6 mb-10">
          <Link href="/kringlid"> 
          <div className="w-76 p-2 border drop-shadow-md rounded lg:mb-10 bg-white">
            <Image
              src="/images/magusad-kringlid.png"
              alt="Image 1"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded"
            />
            <h1 className="text-center mt-4 ">Magusad kringlid</h1>
            <p className="mt-4 p-4 pb-6 text-start">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia </p>
            <Button>Tutvu lähemalt</Button>
          </div>
          </Link>
          <Link href="/kringlid">
          <div className="w-76 p-2 border drop-shadow-md rounded lg:mt-10 bg-white">
            <Image
              src="/images/soolased-kringlid.png"
              alt="Image 1"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded"
            />
            <h1 className="text-center mt-4">Soolased kringlid</h1>
            <p className="mt-4 p-4 pb-6 text-start">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia </p>
            <Button>Tutvu lähemalt</Button>
          </div>
          </Link>
          <Link href="/store">
          <div className="w-76 p-2 border drop-shadow-md rounded lg:mb-10 bg-white">
            <Image
              src="/images/küpsised.png"
              alt="Image 1"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded"
            />
            <h1 className="text-center mt-4">Küpsised</h1>
            <p className="mt-4 p-4 pb-6 text-start">Meie küpsiseid saab tellida üle Eesti DPD või SmartPosti automaatidesse.</p>
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
