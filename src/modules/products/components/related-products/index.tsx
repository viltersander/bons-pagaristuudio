import { fetchProductsList } from "@lib/data";
import usePreviews from "@lib/hooks/use-previews";
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons";
import repeat from "@lib/util/repeat";
import { Product, StoreGetProductsParams } from "@medusajs/medusa";
import Button from "@modules/common/components/button";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
import { useCart } from "medusa-react";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductPreview from "../product-preview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type RelatedProductsProps = {
  product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const { cart } = useCart();
  const [isDragging, setIsDragging] = useState(false);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  const queryParams: StoreGetProductsParams = useMemo(() => {
    const params: StoreGetProductsParams = {};

    if (cart?.id) {
      params.cart_id = cart.id;
    }

    if (product.collection_id) {
      params.collection_id = [product.collection_id];
    }

    if (product.tags) {
      params.tags = product.tags.map((t) => t.value);
    }

    params.is_giftcard = false;

    return params;
  }, [product, cart?.id]);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-${product.id}`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const previews = usePreviews({ pages: data?.pages, region: cart?.region });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default number of slides to show
    slidesToScroll: 5, // Default number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Delay between slides in milliseconds
    draggable: true, // Enable dragging
    swipe: true, // Enable swiping
    beforeChange: () => setIsDragging(true),
    afterChange: (currentSlide: number) => {
      setIsDragging(false);
      setIsClickDisabled(currentSlide !== 0);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Number of slides to show on mobile
          slidesToScroll: 2, // Number of slides to scroll on mobile
          autoplaySpeed: 3000, // Delay between slides in milliseconds
        },
      },
    ],
  };

  const handleProductClick = (e: React.MouseEvent, productId: string) => {
    if (isDragging) {
      e.preventDefault();
    } else if (isClickDisabled) {
      setIsClickDisabled(false); // Reset the click disabled state
      e.preventDefault();
    } else {
      // Handle the click event as usual
    }
  };

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-gray-600 mb-6">
          Sarnased tooted
        </span>
        <p className="text-2xl-regular text-gray-900 max-w-lg">
          Soovitame ka neid tooteid vaadata.
        </p>
      </div>

      <Slider {...sliderSettings}>
        {previews.map((p) => (
          <div key={p.id} className="px-4 break-words">
              <ProductPreview {...p} onClick={(e) => handleProductClick(e, p.id)} />
          </div>
        ))}
        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <div key={index}>
                <SkeletonProductPreview />
            </div>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
            <div key={index}>
                <SkeletonProductPreview />
            </div>
          ))}
      </Slider>

      {hasNextPage && (
        <div className="flex items-center justify-center mt-8">
          <Button
            isLoading={isLoading}
            onClick={() => fetchNextPage()}
            className="w-72"
            >
            Lae veel
            </Button>
        </div>
      )}
    </div>
  );
};
            
export default RelatedProducts;
