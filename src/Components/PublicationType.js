import React from 'react'

const PublicationType = ({title, publications}) => {
  // console.log(publications[0].second);
  return (
    <div>
        <h2 style={{paddingTop: 20}}>{title}</h2>
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