import React, { useState, useEffect } from 'react';   
import { useDispatch } from 'react-redux' 
import { searchByDate } from '../store/actions/SearchByDateActions' 

const SearchByDate = () => {
    const dispatch = useDispatch();
    const [state, updateState] = useState({
        date:null
    })

    //  This will run when the componenet is unmounted
    useEffect(() => {
        return () => {
            // console.log('********* UNMOUNTED *********');
            dispatch(searchByDate(state.date));
        };
    }, []);

    const handleChange = (e) => {
       let date = e.target.value;  
      dispatch(searchByDate(date));
    };

    return (
            <div className="closing-balance"> 
                <div>
                    <p>Search By Date</p>
                    <form>
                        <input type="date" name="searchByDate" id="searchByDate" onChange={handleChange} /> 
                    </form>
                    
                </div>
            </div>
    )
} 

export default SearchByDate;    
       