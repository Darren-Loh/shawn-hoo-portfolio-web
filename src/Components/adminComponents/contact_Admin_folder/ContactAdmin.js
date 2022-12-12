import React from 'react'
import './ContactAdmin.css';
import ContactPageRight from '../../contact/ContactPageRight';
import ContactAdminLeft from './ContactAdminLeft';

function ContactAdmin() {

  return (
    <div className='contactPageOuter'>
        <div className='contactPageContainer'>
            <ContactAdminLeft/>
            <ContactPageRight/>
        </div>
    </div>
  )
}

export default ContactAdmin
