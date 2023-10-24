// import SliderImage from '../SliderImage';
import getElementWidth from '../../helpers/getElementWidth';
import IData from '../../interfaces/IData';
import Image from 'next/image';

const ImageSlider = ({ data } : {data: IData}) => {

  const slider = data.slider;

  return (
    <>
      <div className="carousel" id="gallery">
        {slider.map((item, index) => {
          return (
            <div
              key={`slider-img-${index}`}
              id={`carousel-item-${index}`}
              className={`carousel-item w-full drop-shadow-md`}
            >
              <Image 
                src={`https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${item.fileName}`}
                // placeholder="blur"
                alt={`Slider Image ${index}`}
                height="600"
                width="600"
                className="mx-auto mt-28"
                style={{
                  height: '500px',
                  objectFit: 'contain'
                }}
              />  
            </div>
          );
        })
        }
      </div>

      {/* Buttons */}
      <div className="flex justify-center w-full py-10 gap-2">
        {slider.map((_, index) => {
          return (
            <a key={`slider-button-${index}`} href={`#carousel-item-${index}`} className="btn btn-xs">{index + 1}</a>
          );
        }
        )}
      </div>
    </>
  );
};

export default ImageSlider;