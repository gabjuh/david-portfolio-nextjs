import ITitle from '@/interfaces/ITitle'
import React from 'react'

const Title: React.FC<ITitle> = ({ title, className, id }) => {
  return (
    <div
      id={id ? id : 'asd'}
      className={`text-2xl font-semibold mt-5 mb-8 ${className ?? ''}`}
    >
      {title}
    </div>
  )
}

export default Title