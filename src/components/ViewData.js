import React  from 'react';


function ViewData(){
    return(
        <div className="view-data-container">
        <div>
            <h2>View Data</h2>
        </div>
        <div >
            <select className="view-data-select">
                <option value="">By date</option>
                <option value="">By value</option>
            </select>
        </div>
        </div>
    );
};
 
export default ViewData;