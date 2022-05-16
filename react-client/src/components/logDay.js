import React  from 'react';

function LogDay(){
    return(
        <div className='logDayContainer'>

            <form className='logDayContent'>

                <div className='logDayDate'>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                    <h2> 2/21/2021 </h2>                  
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </div>
     
                <div className='logDayDiv1'>
                    Number of pushups<br/><input type="text" name='pushup' style={{marginTop:"10px"}}/><br/>
                </div>

                <div className='logDayDiv2'>
                    Had a long walk today<br/>
                    <input type="radio"  name="true" value="true" style={{marginTop:"10px"}}/>
                    <label htmlFor="true" style={{marginRight:"50px"}}>True</label>
                    <input type="radio" name="false" value="false"/>
                    <label htmlFor="false">False</label><br/>
                </div>

                <div className='logDayDiv3'>
                    One great thing that happened today<br/><input type="text" name='onething' style={{marginTop:"10px", width:"-webkit-fill-available"}}/><br/>
                </div>

                <div className='logDayDiv4'>
                    Today was a:<br/>
                    <input type="radio"  name="Ok day" value="Ok day"/>
                    <label htmlFor="Ok day">Ok day</label><br/>
                    <input type="radio" name="Bad day" value="Bad day"/>
                    <label htmlFor="Bad day">Bad day</label><br/>
                    <input type="radio" name="Great day" value="Great day"/>
                    <label htmlFor="Great day">Great day</label>
                </div>

                <button className='submitBtn'>Submit</button>

            </form>
            
        </div>
    );
};
 
export default LogDay;