import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?:"w-full" |"w-fit";
  height?:""
}

export default function Button({ children, className,width='w-full',...rest }: Iprops) {
  return (
    <button className={`${className} ${width} onClick rounded-md text-white  p-2 w-full mb-5`} {...rest}>
      {children}
    </button>
  );
}
