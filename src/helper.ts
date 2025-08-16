import sneaker1 from "./assets/sneakers/sneakers-1.jpg";
import sneaker2 from "./assets/sneakers/sneakers-2.jpg";
import sneaker3 from "./assets/sneakers/sneakers-3.jpg";
import sneaker4 from "./assets/sneakers/sneakers-4.jpg";
import sneaker5 from "./assets/sneakers/sneakers-5.jpg";
import sneaker6 from "./assets/sneakers/sneakers-6.jpg";
import sneaker7 from "./assets/sneakers/sneakers-7.jpg";
import sneaker8 from "./assets/sneakers/sneakers-8.jpg";
import sneaker9 from "./assets/sneakers/sneakers-9.jpg";
import sneaker10 from "./assets/sneakers/sneakers-10.jpg";
import sneaker11 from "./assets/sneakers/sneakers-11.jpg";
import sneaker12 from "./assets/sneakers/sneakers-12.jpg";

const sneakerImages = {
  "sneakers-1": sneaker1,
  "sneakers-2": sneaker2,
  "sneakers-3": sneaker3,
  "sneakers-4": sneaker4,
  "sneakers-5": sneaker5,
  "sneakers-6": sneaker6,
  "sneakers-7": sneaker7,
  "sneakers-8": sneaker8,
  "sneakers-9": sneaker9,
  "sneakers-10": sneaker10,
  "sneakers-11": sneaker11,
  "sneakers-12": sneaker12,
};

type SneakerKey = keyof typeof sneakerImages;

export const getImageSource = (url?: string) => {
  if (!url) return undefined;
  const sneakerKey = url.split("/").pop() as SneakerKey;

  if (sneakerKey && sneakerKey in sneakerImages) {
    return sneakerImages[sneakerKey];
  }

  return undefined;
};
