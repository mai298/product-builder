import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

export default function CircleColor({ color,...rest }: Iprops) {
  return (
    <span  className={`block w-5 h-5 cursor-pointer rounded-full`} style={{background:color}} {...rest} />
  );
}
