import type React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isPrimary?: boolean;
  isFull?: boolean;
}

export default function Button({
  isPrimary = false,
  isFull = false,
  children,
  ...props
}: Props) {
  const classes = `font-bold py-2 px-4 rounded-xl cursor-pointer ${
    isPrimary
      ? "bg-lime-500 text-white hover:bg-lime-600 active:bg-lime-700"
      : "bg-gray-300 text-gray-800 hover:bg-gray-400"
  } ${isFull ? "w-full" : ""}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
