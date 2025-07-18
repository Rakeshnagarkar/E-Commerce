import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "./Title"

function CartTotal() {
  const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);

  return (
    <div className="w-full">
        <div className="text-2xl">
            <Title text1="Cart" text2="Total" />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Total</p>
                <p>{currency} {getCartAmount() === '0' ? 0 : getCartAmount() + delivery_fee}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal