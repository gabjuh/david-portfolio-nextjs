import IImageForText from "@/interfaces/IImageForText";
import Image from "next/image";

const ImageForText: React.FC<IImageForText> = ({
  fileName,
  driveId,
  alt,
  classNameForImg,
}) => {
  return (
    <>
      <div className="w-full lg:w-[40%]">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${fileName}`}
          // placeholder="blur"
          width="400"
          height="200"
          alt={alt}
          style={{
            width: '380px',
            height: 'auto',
          }}
          className={`${classNameForImg} mx-auto mb-6 lg:mb-0 rounded-md drop-shadow-xl`}
        />
      </div>
    </>
  );
};

export default ImageForText;