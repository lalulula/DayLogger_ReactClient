import React  from 'react';


function Question({id,  text, handleDeleteQuestion}){
  
    return(
      <div className='qDiv'>
        <input type="text" name='qText' defaultValue={text} style={{marginBottom:"5px", width:"-webkit-fill-available"}}/>
        <br/>
        <div className='qContainer'>
          <select name="qType" id="qType">
            <option value="number">number</option>
            <option value="text">text</option>
            <option value="boolean">boolean</option>
            <option value="multipleChoice">multiple choice</option>
          </select>
          <span className="material-symbols-outlined" id = {id} onClick={handleDeleteQuestion}>delete</span>
        </div>
      </div>
    );
};
 
export default Question;