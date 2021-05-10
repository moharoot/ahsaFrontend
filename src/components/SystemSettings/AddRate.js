import React, { useState, useEffect } from 'react'; 
import { postRate } from '../../store/actions/rateActions'
import { useDispatch } from 'react-redux' 
import Rates from './Rates';

const AddRate = (props) => { 
    const dispatch = useDispatch();
    
    //console.log(debit)
    const [state, updateState] = useState({ 
        rate:null, 
    });  
    
    // onChange 
    const handleChange = (e) => {  
        updateState({  
            rate: document.querySelector('#rate').value, 
        }) 
    }; 

    // Add Client
    const submitRate = (e) =>{ 
        e.preventDefault();  
        const {rate} = state;
        const todayRate = {rate}; 
        console.log(todayRate)  
        dispatch(postRate(todayRate)); 
        e.target.querySelector('#rate').value=""; 

     }

        return (
            <div className="closing-balance"> 
                <div>
                    <Rates/>
                    <div className="rates__container">
                        <p className="heading">Add Rate</p> 
                        <form onSubmit={submitRate} className="rates__form"> 
                            <label>Rate</label>
                            <input type="text" required name="rate" id="rate" onChange={handleChange}/> 
                            <input type="submit" value="Add" id="add"/>
                        </form> 
                    </div> 
                </div>
            </div> 
        )
}

export default AddRate; 
             
           