interface Iprops {
  msg: string;
}

export default function ErrorMsg({ msg }: Iprops) {
  return msg ? (
    <span className="block text-red-700 font-semibold text-sm">{msg}</span>
  ) : null;
}
