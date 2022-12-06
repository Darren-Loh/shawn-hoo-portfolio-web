import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';

function ContactPageRight() {

  const form = useRef();

  // function to relevant information to owner via email
  const handleSendEmail = (event) => {
    event.preventDefault()

    // use emailJS to send email with relevant data
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
          // show the user a success message
          alert('Succesfully sent!')
      }, (error) => {
          // show the user an error
          alert('Unsuccessful, please try again.')
      });
  }

  return (
    <form ref={form} className='contactPageRight' onSubmit={handleSendEmail}>

      {/* name */}
      <div className='nameInput'>
        <div className='nameLeft'>
          <label className='contactRightLabels' htmlFor="fname" >first name</label>
          <input type="text" id="fname" name="fname"/>
        </div>
        <div className='nameRight'>
          <label className='contactRightLabels' htmlFor="lname">last name</label>
          <input type="text" id="lname" name="lname"/>
        </div>
      </div>

      {/* email */}
      <div className='emailInput'>
        <label className='contactRightLabels' htmlFor="email">email</label>
        <input type="text" id="email" name="email"/>
      </div>

      {/* msg input */}
      <div className='msgInput'>
        <label className='contactRightLabels' htmlFor="msg">message</label>
        <textarea className='msgInputBox' type="text" id="msg" name="msg" rows="10" cols="50"/>
      </div>

      {/* submit button */}
      <button className='submitBtn' id='contactButton' type='submit'>
          SUBMIT
      </button>

    </form>
  )
}

export default ContactPageRight
