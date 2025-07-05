import PackageIcon from "../assets/package-icon.png";

interface InfoBlockProps {
  imageUrl?: string;
  title: string;
  description: string;
}

export default function InfoBlock({ title, description }: InfoBlockProps) {
  return (
    <div className="flex flex-col items-center text-center w-72 mx-auto">
      <img height="80" width="80" src={PackageIcon} alt="Info image" />
      <h2 className="mt-4 text-2xl font-medium">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}
