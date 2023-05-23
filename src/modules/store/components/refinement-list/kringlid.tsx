import { StoreGetProductsParams, ProductCategory } from "@medusajs/medusa";
import { useEffect, useState, ChangeEvent } from "react";

type RefinementListProps = {
  refinementList: StoreGetProductsParams;
  setRefinementList: (refinementList: StoreGetProductsParams) => void;
};

const RefinementList = ({
  refinementList,
  setRefinementList,
}: RefinementListProps) => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductCategories = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://bons-pagaristuudio-backend-production.up.railway.app/store/product-categories?handle=kringlid&include_descendants_tree=true",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setCategories(data.product_categories);
      } catch (error) {
        console.error("Viga kategooriate toomisel:", error);
      }

      setIsLoading(false);
    };

    fetchProductCategories();
  }, []);

  const handleCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target;

    const categoryIds = refinementList.category_id || [];

    const exists = categoryIds.includes(id);

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        category_id: [...categoryIds, id],
      });
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        category_id: categoryIds.filter((c) => c !== id),
      });
    }
  };

  const renderSubcategories = (subcategories: ProductCategory[]) => {
    return subcategories.map((subcategory) => (
      <li key={subcategory.id}>
        <label className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={refinementList.category_id?.includes(subcategory.id)}
            onChange={(e) => handleCategoryChange(e, subcategory.id)}
            className="accent-amber-200"
          />
          {subcategory.name}
        </label>
      </li>
    ));
  };

  return (
    <div>
      <div className="px-8 py-4 small:pr-0 small:pl-8 small:min-w-[250px]">
        <div className="flex gap-x-3 small:flex-col small:gap-y-3">
          <span className="text-base-semi">Kringlid</span>
          <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
            {categories.length > 0 ? (
              <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
                {categories.map((category) => (
                  <ul key={category.id}>
                    {renderSubcategories(category.category_children)}
                  </ul>
                ))}
              </ul>
            ) : (
              <span>Pole kategooriaid</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RefinementList;




// import Head from "@modules/common/components/head"
// import Layout from "@modules/layout/templates"
// import Link from "next/link"
// import { ReactElement } from "react"
// import { NextPageWithLayout } from "types/global"
// import Button from "@modules/common/components/button"
// import Image from "next/image"

// const Kringlid: NextPageWithLayout = () => {
//   return (
//     <>
//       <Head
//         title="Kringlid"
//         description="Böns kringlid."
//       />
//       <div className="flex flex-col min-h-[calc(100vh-40px)] p-6">
//         <div style={{
//         //   backgroundImage: `url('/images/toodete-taust.png')`,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         }}>
//             <div className="content-container py-10" id="products">
//             <h1 className="text-center text-2xl-semi lg:text-3xl-semi text-center">Kringlid</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-12 lg:grid-cols-3 max-w-screen-lg w-full mx-auto flex-wrap px-6 mb-10">       
//                     <a href='/'>
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4 "> Parmesani-piprakringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/spinati-fetakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Spinati-fetakringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Kaneelikringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Kaneelikringel šokolaaditükkidega</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Kaneelikringel toorjuustukattega</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">20 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Kardemonikringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Kaneeli-kardemonikringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Kardemoni-pistaatsiakringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Moonikringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">15 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4">Moonikringel šokolaadiglasuuriga</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">20 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4"> Kookose-pekaanikringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">18 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="w-76 p-2 border drop-shadow-md rounded bg-white">
//                         <Image
//                         src="/images/parmesani-piprakringel.png"
//                         alt="Image 1"
//                         width={500}
//                         height={500}
//                         objectFit="cover"
//                         />
//                         <h1 className="text-center mt-4"> Bountykringel</h1>
//                         <p className="mt-2 p-4 pb-6 text-center">20 €/ kg</p>
//                         <Button>Tutvu lähemalt</Button>
//                     </div>
//                     </a>
//                     </div>
//                 {/* <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-8">
//                 {data
//                     ? data.map((product) => (
//                         <li key={product.id}>
//                         <ProductPreview {...product} />
//                         </li>
//                     ))
//                     : Array.from(Array(4).keys()).map((i) => (
//                         <li key={i}>
//                         <SkeletonProductPreview />
//                         </li>
//                     ))}
//                 </ul> */}
//             </div>
//         </div>
//       </div>
//     </>
//   )
// }

// Kringlid.getLayout = (page: ReactElement) => {
//   return <Layout>{page}</Layout>
// }

// export default Kringlid
