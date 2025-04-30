import { useEffect, useState } from 'react';

const useImageExists = (url: string) => {
  const [exists, setExists] = useState<boolean | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = url
    img.onload = () => setExists(true)
    img.onerror = () => setExists(false)
  }, [url])

  return exists
}

export default useImageExists
