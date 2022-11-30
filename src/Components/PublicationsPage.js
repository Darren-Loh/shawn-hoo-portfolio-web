import React from 'react'
import PublicationType from './PublicationType'

const PublicationsPage = () => {

  return (
    <div style={containerStyle}>
        <div style={columnContainerStyle}>
            <PublicationType title={'Poetry'} publications={[{first: 'One Poem', second: 'ABC Journal'}, {first: 'One Poem', second: 'ABC Journal'}, {first: 'One Poem', second: 'ABC Journal'}, {first: 'One Poem', second: 'ABC Journal'}]}/>
            <PublicationType title={'Poetry'} publications={[{first: 'One Poem', second: 'ABC Journal'}]}/>
        </div>

        <div style={columnContainerStyle}>
            <PublicationType title={'Poetry'} publications={[{first: 'One Poem', second: 'ABC Journal'}, {first: 'One Poem', second: 'ABC Journal'}]}/>
            <PublicationType title={'Poetry'} publications={[{first: 'One Poem', second: 'ABC Journal'}]}/>
        </div>

        <div style={columnContainerStyle}>
            <PublicationType title={'Poetry'} publications={[{first: 'One Poem', second: 'ABC Journal'}]}/>
            <PublicationType title={'Poetry'} publications={[{first: 'One Poem', second: 'ABC Journal'}]}/>
        </div>

    </div>
  )
}

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  marginTop: 64,
  paddingTop: 20,
}

const columnContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}


export default PublicationsPage