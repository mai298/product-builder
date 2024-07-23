
interface Iprops{
imgUrl:string;
alt:string;
className:string;
}

export default function Image({imgUrl,alt,className}:Iprops) {
  return (
    <div>

<img
        src={imgUrl}
        alt={alt}
        className={className}
      />
    </div>
  )
}
