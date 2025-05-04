import React from 'react';

import ITitle from '@/interfaces/ITitle';

const Title: React.FC<ITitle> = ({ title, className, id }) => {
  return (
    <h2
      id={id ? id : 'asd'}
      className={`text-2xl font-semibold mt-5 mb-8 ${className ?? ''}`}
    >
      {title}
    </h2>
  )
}

export default Title