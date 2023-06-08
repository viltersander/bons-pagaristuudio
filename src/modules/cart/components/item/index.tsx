import { useStore } from "@lib/context/store-context";
import { LineItem, Region } from "@medusajs/medusa";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import NativeSelect from "@modules/common/components/native-select";
import Trash from "@modules/common/icons/trash";
import Thumbnail from "@modules/products/components/thumbnail";

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore();

  return (
    <div className="grid grid-cols-[122px_1fr] xs:flex xs:flex-col gap-x-4">
      <div className="w-[122px] xsf:w-full xsf:p-0 xs:w-full xs:px-10 xs:py-2">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="text-base-regular flex flex-col xs:gap-y-4 gap-y-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[0.8rem] sm:text-[1rem] xs:mt-2">{item.title}</span>
            <LineItemOptions variant={item.variant} />
            <div className="sm:hidden mt-2">
              <NativeSelect
                value={item.quantity}
                onChange={(value) =>
                  updateItem({
                    lineId: item.id,
                    quantity: parseInt(value.target.value),
                  })
                }
                className="max-h-[30px] w-[75px] xs:max-h-[30px]"
              >
                {Array.from(
                  [
                    ...Array(
                      item.variant.inventory_quantity > 0
                        ? item.variant.inventory_quantity
                        : 10
                    ),
                  ].keys()
                )
                  .slice(0, 10)
                  .map((i) => {
                    const value = i + 1;
                    return (
                      <option value={value} key={i}>
                        {value}
                      </option>
                    );
                  })}
              </NativeSelect>
            </div>
          </div>
          <div className="hidden sm:block">
            <NativeSelect
              value={item.quantity}
              onChange={(value) =>
                updateItem({
                  lineId: item.id,
                  quantity: parseInt(value.target.value),
                })
              }
              className="max-h-[35px] w-[75px]"
            >
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10
                  ),
                ].keys()
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1;
                  return (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  );
                })}
            </NativeSelect>
          </div>
        </div>
        <div className="flex items-end justify-between text-small-regular flex-1 sm:mb-2 mb-0">
          <div>
            <button
              className="flex items-center gap-x-1 text-red-500"
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={14} />
              <span>Eemalda</span>
            </button>
          </div>
          <div className="text-small-regular">
            <LineItemPrice item={item} region={region} />
          </div>
        </div>
        <hr className="sm:block hidden xsf:block" />
      </div>
    </div>
  );
};

export default Item;
