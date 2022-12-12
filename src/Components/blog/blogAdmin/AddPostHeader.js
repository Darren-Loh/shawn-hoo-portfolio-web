import React, { useState } from 'react'
import BlogTagAdmin from './BlogTagAdmin.js'

function AddPostHeader({blogRecords, setBlogRecords}) {
    let [triggerAddPost, setTriggerAddPost] = useState(false);

    let [headerText, setHeaderText] = useState("");
    let [paraText, setParaText] = useState("");
    let [dateText, setDateText] = useState("");
    let [tagArr, setTagArr] = useState([]);
    let [addTagText, setAddTagText] = useState("");

    function handleHeaderChange(e){
        setHeaderText(e.target.value);
    }
    
    function handleBodyParaChange(e){
    setParaText(e.target.value);
    }

    function handleDateChange(e){
    setDateText(e.target.value);
    }

    let handleAddTagChange = (e) => {
        setAddTagText(e.target.value);
    }

    function resetAllText(){
        setHeaderText("");
        setParaText("");
        setDateText("");
        setTagArr([]);
        setAddTagText("");
    }

    let addToTagArr = (e) => {
        e.preventDefault();
        setTagArr(current => [...current, addTagText]);
        setAddTagText("");
    };

    let onAddPost = (e) => {
        e.preventDefault();
        //since arr is reversed, highest index will be the first one
        let newestID = blogRecords[0].id+1;
        let newRecord = {
            "id": newestID,
            "header": headerText,
            "tags": tagArr,
            "bodyPara": paraText,
            "date": dateText
        }

        addPostFunction(newRecord);
        setTriggerAddPost(false);
        resetAllText();
        
      };

      let onCancel = (e) => {
        e.preventDefault();
        setTriggerAddPost(false);
        resetAllText();
        
      };

    const addPostFunction = async (post) => {
        const res = await fetch('http://localhost:5000/blogPosts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        const data = await res.json();
        setBlogRecords([data,...blogRecords]);
    }

    function handleAddNewTag(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log(addTagText);
            // console.log(e.target.value);
            // setTagArr(oldArray => [...oldArray, "qweqwe"]);
            setTagArr(current => [...current, addTagText]);
            setAddTagText("");
            console.log(tagArr);
        }
    }

    // return here
    if(!triggerAddPost){
        return (
            <div className='addNewPostHeader' onClick={()=> setTriggerAddPost(true)}>
              {/* <div className='circle plus'></div> */}
              Create a new post
            </div>
          )
    }else{
        return (
            <form className='blogPostEditContainer'>
                <h2>Create Post</h2>
                <div className='editHeader'>
                    {/* <label className='editBlogPostLabels' htmlFor="editInnerHeader" >Header</label> */}
                    <input className='editInputs' type="text" id="editInnerHeader" name="editInnerHeader" value={headerText} onChange={handleHeaderChange} placeholder="Title"></input>
                </div> 

                <div className='editDate'>
                    {/* <label className='editBlogPostLabels' htmlFor="editInnerDate">Date</label> */}
                    <input className='editInputs' type="text" id="editInnerDate" name="editInnerDate" value={dateText} onChange={handleDateChange} placeholder="Date"/>
                </div>

                <div className='editTagsWrapper'>
                    <BlogTagAdmin tagArr = {tagArr} setTagArr={setTagArr}/>
                    <input className='blogTagAdminInput' type="text" name="addInnerTags" placeholder='Add tag here' value={addTagText} onChange={handleAddTagChange} onKeyDown={handleAddNewTag}></input>
                </div>

                {/* <div className='editTags'>
                    <BlogTagAdmin tagArr = {tagArr} setTagArr={setTagArr}/>
                    <div className='addTags'>
                    <input className='blogTagAdmin' type="text" name="addInnerTags" placeholder='Add tag here' value={addTagText} onChange={handleAddTagChange}></input>
                    <button className='editInputs blogTag' id='addTagBtn' onClick={addToTagArr}>Add</button>
                    </div>
                </div> */}
                
                <div className='editPara'>
                {/* <label className='editBlogPostLabels' htmlFor="editInnerPara">Description</label> */}
                <textarea className='editParaBox' type="text" id="editInnerPara" name="editInnerPara" rows="10" cols="50" value={paraText} onChange={handleBodyParaChange} placeholder="Write post description here..."/>
                </div>
        
                <div className='adminBlogBtmDiv'>
                    <div className='adminBlogEditBtnCollection'>
                        <button className='admingBlogCancelBtn' id='cancelButton' type='submit' onClick={onCancel}>
                            Cancel
                        </button>
                        <button className='admingBlogSaveBtn' id='saveButton' type='submit' onClick={onAddPost} >
                            Publish
                        </button>
                    </div>
        
                </div>
            
            </form>
          )
    }

}

export default AddPostHeader
