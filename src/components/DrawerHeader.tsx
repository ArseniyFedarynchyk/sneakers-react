interface DrawerHeaderProps {
  toggleCart: () => void;
}

export default function DrawerHeader({ toggleCart }: DrawerHeaderProps) {
  return (
    <div className="flex items-center gap-5 mb-8">
      <svg
        className="rotate-180 hover:-translate-x-1 opacity-30 hover:opacity-100 transition cursor-pointer"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleCart}
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 className="text-2xl font-bold">Cart</h2>
    </div>
  );
}
