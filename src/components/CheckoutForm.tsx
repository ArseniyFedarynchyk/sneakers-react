import { useContext, useState, type FormEvent } from "react";
import CartItemList from "./CartItemList";
import Input from "./Input";
import { SneakerContext } from "../store/SneakerContext";
import InfoBlock from "./InfoBlock";
import type { ShippingDetails } from "../models/shippingDetails.model";

export default function CheckoutForm() {
  const { totalPrice, createOrder } = useContext(SneakerContext);
  const [form, setForm] = useState({
    firstName: { value: "", didEdit: false },
    lastName: { value: "", didEdit: false },
    email: { value: "", didEdit: false },
    phoneNumber: { value: "", didEdit: false },
    street: { value: "", didEdit: false },
    streetNumber: { value: "", didEdit: false },
    apartment: { value: "", didEdit: false },
    postalCode: { value: "", didEdit: false },
    city: { value: "", didEdit: false },
  });
  const [error, setError] = useState<string | null>(null);

  const isFirstNameInvalid =
    form.firstName.didEdit && form.firstName.value === "";
  const isLastNameInvalid = form.lastName.didEdit && form.lastName.value === "";
  const isPhoneNumberInvalid =
    form.phoneNumber.didEdit && form.phoneNumber.value === "";
  const isStreetInvalid = form.street.didEdit && form.street.value === "";
  const isStreetNumberInvalid =
    form.streetNumber.didEdit && form.streetNumber.value === "";
  const isApartmentInvalid =
    form.apartment.didEdit && form.apartment.value === "";
  const isPostalCodeInvalid =
    form.postalCode.didEdit && form.postalCode.value === "";
  const isCityInvalid = form.city.didEdit && form.city.value === "";
  const isEmailInvalid = form.email.didEdit && !form.email.value.includes("@");

  function handleOnChange(key: keyof ShippingDetails, value: string) {
    setForm((prevFormState) => {
      return {
        ...prevFormState,
        [key]: { ...prevFormState[key], value },
      };
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const isFormValid =
      !isFirstNameInvalid &&
      !isLastNameInvalid &&
      !isEmailInvalid &&
      !isPhoneNumberInvalid &&
      !isStreetInvalid &&
      !isStreetNumberInvalid &&
      !isApartmentInvalid &&
      !isPostalCodeInvalid &&
      !isCityInvalid;
    if (!isFormValid) {
      setError("Please fill out all required fields correctly.");
      return;
    }
    const orderDetails: ShippingDetails = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      street: form.street.value,
      streetNumber: form.streetNumber.value,
      apartment: form.apartment.value,
      postalCode: form.postalCode.value,
      city: form.city.value,
    };
    createOrder(orderDetails);
  }

  function handleOnBlur(key: keyof ShippingDetails) {
    setForm((prevFormState) => ({
      ...prevFormState,
      [key]: { ...prevFormState[key], didEdit: true },
    }));
  }

  return (
    <div>
      {totalPrice !== 0 ? (
        <div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Your Cart</h3>
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
              value={form.firstName.value}
              isValid={isFirstNameInvalid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("firstName", e.target.value)
              }
              onBlur={() => handleOnBlur("firstName")}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={form.lastName.value}
              isValid={isLastNameInvalid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("lastName", e.target.value)
              }
              onBlur={() => handleOnBlur("lastName")}
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email.value}
              isValid={isEmailInvalid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("email", e.target.value)
              }
              onBlur={() => handleOnBlur("email")}
            />
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                type="text"
                placeholder="Street"
                value={form.street.value}
                isValid={isStreetInvalid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("street", e.target.value)
                }
                onBlur={() => handleOnBlur("street")}
              />
              <div className="flex sm:flex-row flex-col gap-3">
                <Input
                  type="number"
                  placeholder="No."
                  value={form.streetNumber.value}
                  isValid={isStreetNumberInvalid}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChange("streetNumber", e.target.value)
                  }
                  onBlur={() => handleOnBlur("streetNumber")}
                />
                <Input
                  type="number"
                  placeholder="Apt No."
                  value={form.apartment.value}
                  isValid={isApartmentInvalid}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChange("apartment", e.target.value)
                  }
                  onBlur={() => handleOnBlur("apartment")}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Input
                className="md:basis-1/3 border border-gray-200 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Postal Code"
                value={form.postalCode.value}
                isValid={isPostalCodeInvalid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("postalCode", e.target.value)
                }
                onBlur={() => handleOnBlur("postalCode")}
              />
              <Input
                type="text"
                placeholder="City"
                value={form.city.value}
                isValid={isCityInvalid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange("city", e.target.value)
                }
                onBlur={() => handleOnBlur("city")}
              />
            </div>
            <Input
              type="tel"
              placeholder="Phone number"
              value={form.phoneNumber.value}
              isValid={isPhoneNumberInvalid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange("phoneNumber", e.target.value)
              }
              onBlur={() => handleOnBlur("phoneNumber")}
            />
            {error && (
              <p className="text-red-500">
                Please fill out all required fields correctly
              </p>
            )}
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
