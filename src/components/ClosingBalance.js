import React, { useState, useEffect } from 'react';   
import { useDispatch } from 'react-redux' 
import { postCB } from '../store/actions/CBActions' 

const ClosingBalance = () => {
    const dispatch = useDispatch();
    const [state, updateState] = useState({
        closingBalance:null
    })

    //  This will run when the componenet is unmounted
    useEffect(() => {
        return () => {
            // console.log('********* UNMOUNTED *********');
            // dispatch(searchByDate(state.date));
        };
    }, []);

    const handleChange = (e) => {
       updateState({
           closingBalance: e.target.value
       })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postCB(state.closingBalance));
     };

    return (
            <div className="closing-balance"> 
                <div>
                    <p>Closing Balance</p>
                    <form onSubmit={handleSubmit}>
                        <input type="number" id="closingBalance" onChange={handleChange} placeholder="Add closing balance" /> 
                        <input type="submit" value="Add" id="add"/>
                    </form>
                    
                </div>
            </div>
    )
} 

export default ClosingBalance;    
       