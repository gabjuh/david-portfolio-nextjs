import ITitle from '@/interfaces/ITitle'
import React from 'react'

const Title: React.FC<ITitle> = ({ title, className, id }) => {
  return (
    <div
      id={id ? id : 'asd'}
      className={`text-2xl font-semibold pt-20 md:mb-2 mb-0 text-center ${className ?? ''}`}
    >
      {title}
    </div>
  )
}

export default Title