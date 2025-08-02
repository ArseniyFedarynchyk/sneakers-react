import { useContext, useState, type FormEvent } from "react";
import CartItemList from "./CartItemList";
import Input from "./Input";
import { SneakerContext } from "../store/SneakerContext";
import InfoBlock from "./InfoBlock";
import type { ShippingDetails } from "../models/shippingDetails.model";

export default function CheckoutForm() {
  const { totalPrice, createOrder } = useContext(SneakerContext);
  const [form, setForm] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    streetNumber: "",
    apartment: "",
    postalCode: "",
    city: "",
  });

  function handleOnChange(key: string, value: string) {
    setForm((prevFormState) => {
      return {
        ...prevFormState,
        [key]: value,
      };
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createOrder(form);
  }

  return (
    <div>
      {totalPrice !== 0 ? (
        <div>
          <div>
            <h3 className="mb-3">Your Cart:</h3>
            <CartItemList />
            <p className="my-3 font-bold">Sum: {totalPrice} USD</p>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-3"
          >
            <Input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("firstName", e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("lastName", e.target.value)
              }
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("email", e.target.value)
              }
            />
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Street"
                value={form.street}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("street", e.target.value)
                }
              />
              <Input
                className="basis-1/5 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
                type="number"
                placeholder="No."
                value={form.streetNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("streetNumber", e.target.value)
                }
              />
              <Input
                className="basis-1/5 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
                type="number"
                placeholder="Apt No."
                value={form.apartment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("apartment", e.target.value)
                }
              />
            </div>
            <div className="flex gap-3">
              <Input
                className="basis-1/5 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("postalCode", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("city", e.target.value)
                }
              />
            </div>
            <Input
              type="tel"
              placeholder="Phone number"
              value={form.phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("phoneNumber", e.target.value)
              }
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="transition bg-slate-400 rounded-xl cursor-pointer p-3 text-white hover:bg-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="transition bg-lime-500 rounded-xl cursor-pointer p-3 text-white hover:bg-lime-600"
              >
                Checkout
              </button>
            </div>
          </form>
        </div>
      ) : (
        <InfoBlock
          title="Cart is empty"
          description="Add some sneakers to make an order"
          empty={true}
        />
      )}
    </div>
  );
}
