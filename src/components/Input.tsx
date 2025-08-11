interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid: boolean;
}

export default function Input({ isValid, ...props }: Props) {
  const classes = isValid
    ? "border border-red-300 rounded-md py-2 px-4 outline-none focus:border-red-400 w-full"
    : "border border-gray-300 rounded-md py-2 px-4 outline-none focus:border-gray-400 w-full";

  return <input className={classes} {...props} />;
}
