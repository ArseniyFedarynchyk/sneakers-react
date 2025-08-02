import { useContext, useState, type FormEvent } from "react";
import Input from "./Input";
import { SneakerContext } from "../store/SneakerContext";
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
    <form className="flex flex-col gap-3">
      <Input type="text" placeholder="First Name" />
      <Input type="text" placeholder="Last Name" />
      <Input type="email" placeholder="Email" />
      <div className="flex gap-3">
        <Input type="text" placeholder="Street" />
        <Input
          className="basis-1/5 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
          type="text"
          placeholder="No."
        />
        <Input
          className="basis-1/5 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
          type="text"
          placeholder="Apt No."
        />
      </div>
      <div className="flex gap-3">
        <Input
          className="basis-1/5 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
          type="text"
          placeholder="Postal Code"
        />
        <Input type="text" placeholder="City" />
      </div>
      <Input type="tel" placeholder="Phone number" />
      <div className="flex justify-between">
        <button className="transition bg-slate-400 rounded-xl cursor-pointer p-3 text-white hover:bg-slate-500">
          Cancel
        </button>
        <button className="transition bg-lime-500 rounded-xl cursor-pointer p-3 text-white hover:bg-lime-600">
          Checkout
        </button>
      </div>
    </form>
  );
}
