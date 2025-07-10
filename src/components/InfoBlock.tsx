import PackageIcon from "../assets/package-icon.png";
import OrderSuccessIcon from "../assets/order-success-icon.png";

interface InfoBlockProps {
  imageUrl?: string;
  title: string;
  description: string;
  empty: boolean;
}

export default function InfoBlock({
  title,
  description,
  empty,
}: InfoBlockProps) {
  return (
    <div className="flex flex-col items-center text-center w-72 mx-auto">
      <img
        height="80"
        width="80"
        src={empty ? PackageIcon : OrderSuccessIcon}
        alt="Info image"
      />
      <h2 className="mt-4 text-2xl font-medium">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}
