import { fetchProductsList } from "@lib/data";
import usePreviews from "@lib/hooks/use-previews";
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons";
import repeat from "@lib/util/repeat";
import { Product, StoreGetProductsParams } from "@medusajs/medusa";
import Button from "@modules/common/components/button";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
import { useCart } from "medusa-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductPreview from "../product-preview";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type RelatedProductsProps = {
  product: PricedProduct;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
  const { cart } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayFrameRef = useRef<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollStep, setScrollStep] = useState(1);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);

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

  const { data, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    [`infinite-products-${product.id}`, queryParams, cart],
    ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const previews = usePreviews({ pages: data?.pages, region: cart?.region });

  // Function to sort the previews array so that "Välja müüdud" products appear last
  const sortedPreviews = useMemo(() => {
    const soldOutPreviews = previews.filter((preview) => !preview.inStock);
    const inStockPreviews = previews.filter((preview) => preview.inStock);
    return [...inStockPreviews, ...soldOutPreviews];
  }, [previews]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize immediately to set the initial value
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) {
      return;
    }

    const sliderWidth = sliderElement.offsetWidth;
    const contentWidth = sliderElement.scrollWidth;

    if (contentWidth <= sliderWidth) {
      return; // No need to autoplay if the content fits within the slider
    }

    const scrollDistance = contentWidth - sliderWidth;
    const scrollStep = isMobile ? sliderWidth / 1000 : sliderWidth / 3500; // Adjust the scroll step as needed

    const scroll = () => {
      if (!isHovered && isSlideshowPlaying) {
        const remainingDistance = scrollDistance - scrollPosition;
        let step = scrollStep;
    
        if (remainingDistance < scrollStep) {
          step = remainingDistance; // Adjust the step to the remaining distance if it's smaller than the scroll step
        }
    
        let newPosition = scrollPosition + step;
    
        if (newPosition >= scrollDistance) {
          const distanceToFirst = newPosition - scrollDistance;
          newPosition = step - distanceToFirst; // Calculate the new position to create a smooth transition
        }
    
        setScrollPosition(newPosition);
        sliderElement.scrollTo(newPosition, 0);
    
        if (newPosition === 0) {
          // Slideshow reached the end, delay before restarting
          setIsSlideshowPlaying(false);
          setTimeout(() => {
            setIsSlideshowPlaying(true);
          }, 2000); // Adjust the delay duration as needed
        } else {
          autoplayFrameRef.current = requestAnimationFrame(scroll);
        }
      }
    };

    if (isSlideshowPlaying) {
      autoplayFrameRef.current = requestAnimationFrame(scroll);
    }

    return () => {
      if (autoplayFrameRef.current) {
        cancelAnimationFrame(autoplayFrameRef.current);
      }
    };
  }, [isHovered, scrollPosition, isMobile, isSlideshowPlaying]);

  useEffect(() => {
    return () => {
      // Cancel the ongoing query when the component unmounts
      if (isFetchingNextPage) {
        fetchNextPage();
      }
    };
  }, [isFetchingNextPage, fetchNextPage]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovered(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovered(false);
    const touchEndX = e.changedTouches[0].clientX;
    const touchDistance = touchEndX - touchStartX;

    const sliderElement = sliderRef.current;
    if (!sliderElement) {
      return;
    }

    const sliderWidth = sliderElement.offsetWidth;
    const contentWidth = sliderElement.scrollWidth;

    if (Math.abs(touchDistance) < sliderWidth / 4) {
      return; // Swipe distance not long enough, ignore
    }

    const scrollDistance = contentWidth - sliderWidth;
    const newPosition = scrollPosition + (touchDistance > 0 ? -scrollStep : scrollStep);

    if (newPosition < 0) {
      setScrollPosition(newPosition + scrollDistance);
    } else if (newPosition > scrollDistance) {
      setScrollPosition(newPosition - scrollDistance);
    } else {
      setScrollPosition(newPosition);
    }

    sliderElement.scrollTo(newPosition, 0);
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

      <div className="relative">
        <div
          ref={sliderRef}
          className="flex overflow-hidden pb-2 gap-14"
          style={{
            scrollBehavior: "smooth",
            display: "flex",
            flexWrap: "nowrap",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {sortedPreviews.map((p, index) => (
            <div
              key={`${p.id}-${index}`}
              className={`flex-none ${isMobile ? "w-1/2" : "w-1/5"} ${
                isMobile ? "xsf" : ""
              }`}
              style={{
                minWidth: isMobile ? "50%" : "20%",
                maxWidth: isMobile ? "50%" : "20%",
              }}
            >
              <ProductPreview {...p} />
            </div>
          ))}

          {isLoading &&
            !sortedPreviews.length &&
            repeat(8).map((index) => (
              <div
                key={index}
                className={`flex-none ${isMobile ? "w-1/2" : "w-1/5"}`}
                style={{
                  minWidth: isMobile ? "50%" : "20%",
                  maxWidth: isMobile ? "50%" : "20%",
                }}
              >
                <SkeletonProductPreview />
              </div>
            ))}
          {isFetchingNextPage &&
            repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
              <div
                key={index}
                className={`flex-none ${isMobile ? "w-1/2" : "w-1/5"}`}
                style={{
                  minWidth: isMobile ? "50%" : "20%",
                  maxWidth: isMobile ? "50%" : "20%",
                }}
              >
                <SkeletonProductPreview />
              </div>
            ))}
        </div>
      </div>

      {data?.pages[data.pages.length - 1].nextPage && sortedPreviews.length > 0 && (
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










// import { fetchProductsList } from "@lib/data";
// import usePreviews from "@lib/hooks/use-previews";
// import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons";
// import repeat from "@lib/util/repeat";
// import { Product, StoreGetProductsParams } from "@medusajs/medusa";
// import Button from "@modules/common/components/button";
// import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
// import { useCart } from "medusa-react";
// import { useMemo, useState, useRef, useEffect } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import ProductPreview from "../product-preview";

// type RelatedProductsProps = {
//   product: Product;
// };

// const RelatedProducts = ({ product }: RelatedProductsProps) => {
//   const { cart } = useCart();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const autoplayFrameRef = useRef<number | null>(null);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [scrollStep, setScrollStep] = useState(1);

//   const queryParams: StoreGetProductsParams = useMemo(() => {
//     const params: StoreGetProductsParams = {};

//     if (cart?.id) {
//       params.cart_id = cart.id;
//     }

//     if (product.collection_id) {
//       params.collection_id = [product.collection_id];
//     }

//     if (product.tags) {
//       params.tags = product.tags.map((t) => t.value);
//     }

//     params.is_giftcard = false;

//     return params;
//   }, [product, cart?.id]);

//   const { data, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
//     [`infinite-products-${product.id}`, queryParams, cart],
//     ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//     }
//   );

//   const previews = usePreviews({ pages: data?.pages, region: cart?.region });

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
//     };

//     // Add event listener for window resize
//     window.addEventListener("resize", handleResize);

//     // Call handleResize immediately to set the initial value
//     handleResize();

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const sliderElement = sliderRef.current;
//     if (!sliderElement) {
//       return;
//     }

//     const sliderWidth = sliderElement.offsetWidth;
//     const contentWidth = sliderElement.scrollWidth;

//     if (contentWidth <= sliderWidth) {
//       return; // No need to autoplay if the content fits within the slider
//     }

//     const scrollDistance = contentWidth - sliderWidth;
//     setScrollStep(isMobile ? sliderWidth / 800 : sliderWidth / 2400); // Adjust the scroll step as needed

//     const scroll = () => {
//       if (!isHovered) {
//         let newPosition = scrollPosition + scrollStep;

//         if (newPosition > scrollDistance) {
//           newPosition = 0;
//         }

//         setScrollPosition(newPosition);
//         sliderElement.scrollTo(newPosition, 0);

//         autoplayFrameRef.current = requestAnimationFrame(scroll);
//       }
//     };

//     autoplayFrameRef.current = requestAnimationFrame(scroll);

//     return () => {
//       if (autoplayFrameRef.current) {
//         cancelAnimationFrame(autoplayFrameRef.current);
//       }
//     };
//   }, [isHovered, scrollPosition, isMobile]);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   const handleTouchStart = () => {
//     setIsHovered(true);
//   };

//   const handleTouchEnd = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div className="product-page-constraint">
//       <div className="flex flex-col items-center text-center mb-16">
//         <span className="text-base-regular text-gray-600 mb-6">
//           Sarnased tooted
//         </span>
//         <p className="text-2xl-regular text-gray-900 max-w-lg">
//           Soovitame ka neid tooteid vaadata.
//         </p>
//       </div>

//       <div className="relative">
//         <div
//           ref={sliderRef}
//           className="flex overflow-hidden pb-2"
//           style={{
//             scrollBehavior: "smooth",
//           }}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {previews.map((p) => (
//             <div
//               key={p.id}
//               className={`flex-none ${
//                 isMobile ? "w-1/2" : "w-1/5"
//               } flex justify-center`}
//               style={{
//                 minWidth: "20%",
//               }}
//             >
//               <ProductPreview {...p} />
//             </div>
//           ))}

//           {isLoading &&
//             !previews.length &&
//             repeat(8).map((index) => (
//               <div
//                 key={index}
//                 className={`flex-none ${
//                   isMobile ? "w-1/2" : "w-1/5"
//                 } product-preview-wrapper`}
//               >
//                 <SkeletonProductPreview />
//               </div>
//             ))}
//           {isFetchingNextPage &&
//             repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
//               <div
//                 key={index}
//                 className={`flex-none ${
//                   isMobile ? "w-1/2" : "w-1/5"
//                 } product-preview-wrapper`}
//               >
//                 <SkeletonProductPreview />
//               </div>
//             ))}
//         </div>
//       </div>

//       {data?.pages[data.pages.length - 1].nextPage && previews.length > 0 && (
//         <div className="flex items-center justify-center mt-8">
//           <Button
//             isLoading={isLoading}
//             onClick={() => fetchNextPage()}
//             className="w-72"
//           >
//             Lae veel
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RelatedProducts;
