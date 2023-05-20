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
          "http://localhost:9000/store/product-categories?handle=kupsised&include_descendants_tree=true",
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
          <span className="text-base-semi">Küpsised</span>
          <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
            {isLoading ? (
              <span>Laeb...</span>
            ) : categories.length === 0 ? (
              <span>Pole kategooriaid</span>
            ) : (
              categories.map((category) => (
                <ul key={category.id}>
                  {renderSubcategories(category.category_children)}
                </ul>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RefinementList;
