import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}

export default function InputData({ ...rest }: Iprops) {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outlline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
      {...rest}
    />
  );
}
