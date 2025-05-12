'use client';

import { ArrowLeft, ArrowRight, X } from 'lucide-react'; // Install lucide-react
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast, Toaster } from 'react-hot-toast';

import IData from '@/interfaces/IData';
import IImagesData from '@/interfaces/IImagesData';

interface ImageDataI {
  imagesData: IImagesData[];
}

const AllImages: React.FC<ImageDataI> = ({imagesData = []}) => {

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}`;

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const handleCopy = (imgId: string, fileName: string) => {
    if (!imgId) {
      toast.error('No Drive ID found.');
      return;
    }
    navigator.clipboard.writeText(imgId).then(() => {
      toast.success(`Copied Image ID "${imgId}" for "${fileName}"`);
    }).catch(() => {
      toast.error('Failed to copy!');
    });
  };

  const modalImage = modalIndex !== null ? imagesData[modalIndex] : null;

  // ESC and Arrow key handling
  useEffect(() => {
    if (!imagesData || imagesData.length === 0) return;
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalIndex !== null) {
        if (e.key === 'Escape') {
          setModalIndex(null);
        } else if (e.key === 'ArrowRight') {
          setModalIndex((prev) => (prev! + 1) % imagesData.length);
        } else if (e.key === 'ArrowLeft') {
          setModalIndex((prev) => (prev! - 1 + imagesData.length) % imagesData.length);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, imagesData?.length]);
  

  return (
    <div className="mb-16">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#000000',
            fontSize: '14px'
          },
          success: {
            style: {
              background: '#d1fae5',
              color: '#065f46'
            }
          },
          error: {
            style: {
              background: '#fee2e2',
              color: '#991b1b'
            }
          }
        }}
      />

      <div className="flex flex-wrap gap-4 justify-center">
        {imagesData.map((image: IImagesData, index: number) => (
            <div 
              key={index}
              className={`
                relative 
                w-64 h-64 
                rounded-lg 
                overflow-hidden 
                shadow-md 
                bg-gray-100 
                flex 
                items-center 
                justify-center 
                group
                hover:shadow-lg
                transition
                cursor-pointer
              `}
              onClick={() => setModalIndex(index)}
            >
              {/* Image */}
              <Image 
                className="object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                src={apiUrl + '/img/' + image.fileName} 
                alt={image.fileName}
                fill 
              />

              {/* Overlay (hidden by default, shown on hover) */}
              <div className="
                absolute 
                bottom-0 left-0 right-0 
                bg-white/90 
                px-2 py-1 
                text-xs 
                flex flex-col 
                gap-1 
                z-10 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-300
                text-center
              " onClick={(e) => e.stopPropagation() /* prevent triggering modal */}>
                <a 
                  href={`https://api-davidbudai.web4musicians.eu/img/${image.fileName}`} 
                  target="_blank"
                  className="flex items-center gap-1 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {image.fileName}
                </a>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleCopy(image.imgId || '', image.fileName); }} 
                  className="text-[11px] bg-gray-300 rounded px-2 py-0.5 hover:bg-gray-400 transition"
                >
                  Copy Image ID
                </button>
              </div>
            </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[1501]"
          onClick={() => setModalIndex(null)}
        >
          <div 
            className="relative bg-white rounded-lg max-w-full max-h-full overflow-auto p-4 pt-10 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setModalIndex(null)} 
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>
            <Image 
              src={apiUrl + '/img/' + modalImage.fileName} 
              alt={modalImage.fileName}
              width={800} 
              height={800} 
              className="object-contain mx-auto max-h-[80vh] max-w-[90vw] rounded"
            />
            <div className="mt-4 flex gap-2 text-sm items-start">
              <div className="w-full text-center">
                <p
                  className="flex items-center gap-1 w-full"
                >
                  Filename: <span className="">{modalImage.fileName}</span>
                </p>
                <p
                  className="flex items-center gap-1 w-full"
                >
                  Image ID: <span className="">{modalImage.imgId}</span>
                </p>
              </div>
              <button 
                onClick={() => handleCopy(modalImage.imgId || '', modalImage.fileName)} 
                className="text-[11px] bg-primary text-white rounded px-2 py-0.5 hover:bg-gray-400 transition whitespace-nowrap"
              >
                Copy Image ID
              </button>
              <a 
                href={`https://api-davidbudai.web4musicians.eu/img/${modalImage.fileName}`}
                className="text-[11px] bg-primary text-white rounded px-2 py-0.5 hover:bg-gray-400 transition pr-6 relative whitespace-nowrap"
                target="_blank"
              >
                Open image in Google Drive <span className="absolute right-1.5 top-[-5px] text-xl">↗</span>
              </a>
            </div>

            {/* Left/Right arrows */}
            <button 
              onClick={() => {
                if (modalIndex !== null) {
                  setModalIndex((modalIndex - 1 + imagesData.length) % imagesData.length)
                }
              }}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={() => {
                if (modalIndex !== null) {
                  setModalIndex((modalIndex + 1) % imagesData.length)
                }
              }}              
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>, document.body
      )}


    </div>
  )
}

export default AllImages;
