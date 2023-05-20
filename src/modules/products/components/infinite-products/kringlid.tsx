import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { StoreGetProductsParams } from "@medusajs/medusa";
import { fetchProductsList } from "@lib/data";
import usePreviews from "@lib/hooks/use-previews";
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons";
import repeat from "@lib/util/repeat";
import ProductPreview from "@modules/products/components/product-preview";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
import { useCart, useCollections } from "medusa-react";

type InfiniteProductsType = {
  params: StoreGetProductsParams;
};

const InfiniteProducts = ({ params }: InfiniteProductsType) => {
  const { cart } = useCart();
  const { ref, inView } = useInView();

  const { collections } = useCollections();

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {};

    if (cart?.id) {
      p.cart_id = cart.id;
    }

    p.is_giftcard = false;

    const targetCollection = collections?.find((c) => c.handle === "kringlid");
    if (targetCollection) {
      p.collection_id = [targetCollection.id];
    }

    return {
      ...p,
      ...params,
    };
  }, [cart?.id, collections, params]);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const previews = usePreviews({ pages: data?.pages, region: cart?.region })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <div className="flex-1 content-container">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-x-12 gap-y-12 flex-1">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  );
};

export default InfiniteProducts;
