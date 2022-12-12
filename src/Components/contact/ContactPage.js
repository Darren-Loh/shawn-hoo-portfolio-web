import React from 'react'
import './ContactPage.css';
import ContactPageLeft from './ContactPageLeft';
import ContactPageRight from './ContactPageRight';

function ContactPage() {
  return (
    <div className='contactPageOuter'>
        <div className='contactPageContainer'>
            <ContactPageLeft/>
            <ContactPageRight/>
        </div>
    </div>
  )
}

export default ContactPage
