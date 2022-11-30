import React from 'react'

const PublicationType = ({title, publications}) => {
  return (
    <div>
        <h1>{title}</h1>
        {publications.map((publication) => (
            <div>
                {/* possibly has to change this to an a tag */}
                <text>{publication.first}. <i>{publication.second}</i>. </text>
            </div>
        ))}
    </div>
  )
}

export default PublicationType