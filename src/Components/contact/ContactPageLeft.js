import React from 'react'
import twitLogo from './contactImages/twitter_logo.jpg';
import indeedLogo from './contactImages/indeed_logo.jpg';
import msgLogo from './contactImages/msg_logo.jpg';

function ContactPageLeft() {
  return (
    <div className='contactPageLeft'>
        <div className='contactPageDesc'>
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros sit amet velit consequat fermentum. Quisque nec elit lorem. Nunc sit amet metus eu elit rutrum elementum vitae quis lectus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros sit amet velit consequat fermentum. Quisque nec elit lorem. Nunc sit amet metus eu elit rutrum elementum vitae quis lectus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros sit amet velit consequat fermentum. Quisque nec elit lorem. Nunc sit amet metus eu elit rutrum elementum vitae quis lectus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros sit amet velit consequat fermentum. Quisque nec elit lorem. Nunc sit amet metus eu elit rutrum elementum vitae quis lectus.</p>
            
        </div>
        <div className='contactPageIcons'>
            <img className='twitlogo' src={twitLogo} alt="TwitterLogo" />
            <img className='indeedlogo' src={indeedLogo} alt="IndeedLogo" />
            <img className='msglogo' src={msgLogo} alt="MessagegLogo" />
        
        </div>
    </div>
  )
}

export default ContactPageLeft
