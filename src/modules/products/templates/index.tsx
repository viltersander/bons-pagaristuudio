import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import RelatedProducts from "@modules/products/components/related-products"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")

  // Check if the product belongs to the "kringel" collection
  const isKringelProduct = product.collection?.handle === "kringlid";

  return (
    <div className="pt-4">
    <ProductProvider product={product}>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
        <div className="flex flex-col gap-y-8  w-full sm:w-[70%] md:w-[50%] lg:w-[50%] content-container">
          <ImageGallery images={(product?.images || [])} />
        </div>
        <div
          className="small:sticky small:top-20 w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
          ref={info}
        >
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
      </div>
      {/* Render the related products section only if the product is not in the "kringel" collection */}
        <div className="content-container my-16 px-6 small:px-8 small:my-32">
        
          <RelatedProducts product={product} />
        
        </div>
      
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
    </div>
  )
}

export default ProductTemplate