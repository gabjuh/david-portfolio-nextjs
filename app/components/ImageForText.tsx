import IImageForText from "@/interfaces/IImageForText";
import Image from "next/image";
import convertStringToUrlFriendly from "@/helpers/convertStringToUrlFriendly";

const ImageForText: React.FC<IImageForText> = ({
  fileName,
  driveId,
  alt,
  classNameForImg,
}) => {

  const friendlyFileName = convertStringToUrlFriendly(fileName ?? '');

  return (
    <>
      <div className="w-full lg:w-[40%]">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${friendlyFileName}`}
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