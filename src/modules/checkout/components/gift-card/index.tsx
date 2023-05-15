import { Cart } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Trash from "@modules/common/icons/trash"
import { useCart } from "medusa-react"
import React, { useMemo } from "react"
import { useForm } from "react-hook-form"

type GiftCardFormValues = {
  gift_card_code: string
}

type GiftCardProps = {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">
}

const GiftCard: React.FC<GiftCardProps> = ({ cart }) => {
  const {
    updateCart: { mutate, isLoading },
    setCart,
  } = useCart()

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
    setError,
  } = useForm<GiftCardFormValues>()

  const appliedGiftCard = useMemo(() => {
    if (!cart || !cart.gift_cards?.length) {
      return undefined
    }

    return cart.gift_cards[0].code
  }, [cart])

  const onSubmit = (data: GiftCardFormValues) => {
    mutate(
      {
        gift_cards: [{ code: data.gift_card_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            "gift_card_code",
            {
              message: "Kood on kehtetu",
            },
            {
              shouldFocus: true,
            }
          )
        },
      }
    )
  }

  const onRemove = () => {
    mutate(
      {
        gift_cards: [],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
      }
    )
  }

  return (
    <div className="w-full bg-white p-6 flex flex-col">
      <div className="mb-4">
        <h3 className="text-base-semi">Kupong</h3>
      </div>
      <div className="text-small-regular">
        {appliedGiftCard ? (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Kood: </span>
              <span className="font-semibold">{appliedGiftCard}</span>
            </div>
            <div>
              <button
                className="flex items-center gap-x-2"
                onClick={onRemove}
                disabled={isLoading}
              >
                <Trash size={16} />
                <span className="sr-only">Eemalda kupong tellimuselt</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-[1fr_80px] gap-x-2">
              <Input
                label="Code"
                {...register("gift_card_code", {
                  required: "Kood on nõutud",
                })}
                errors={errors}
                touched={touchedFields}
              />
              <div>
                <Button
                  className="!min-h-[0] h-[46px] w-[80px]"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Lisa
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default GiftCard
