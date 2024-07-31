import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?:"w-full" |"w-fit";
  height?:""
}

export default function Button({ children, className,width='w-full',...rest }: Iprops) {
  return (
    <button className={`${className} ${width}  rounded  py-2 px-4 text-sm text-white`} {...rest}>
      {children}
    </button>
  );
}
