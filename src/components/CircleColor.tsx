interface Iprops {
  color: string;
}

export default function CircleColor({ color }: Iprops) {
  return (
    <span className={`block w-5 h-5 cursor-pointer rounded-full`} style={{background:color}} />
  );
}
