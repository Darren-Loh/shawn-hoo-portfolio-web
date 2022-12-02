import React from 'react'

function ContactPageRight() {
  return (
    <form className='contactPageRight'>

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


        <div className='emailInput'>
            <label className='contactRightLabels' htmlFor="email">email</label>
            <input type="text" id="email" name="email"/>
        </div>


        <div className='msgInput'>
            <label className='contactRightLabels' htmlFor="msg">message</label>
            <textarea className='msgInputBox' type="text" id="msg" name="msg" rows="10" cols="50"/>
        </div>

        <button className='submitBtn' id='contactButton' type='submit'>
            SUBMIT
        </button>

    </form>

  )
}

export default ContactPageRight
