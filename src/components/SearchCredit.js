// import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import queryString from 'query-string';
import React, { useState, useEffect } from 'react'; 
import { searchCredit } from '../store/actions/creditActions'
import { useSelector, useDispatch } from 'react-redux'

const SearchCredit = (props) => {
    const dispatch = useDispatch();
    
    const [state, updateState] = useState({ 
        query:'', 
    });  
     

    const handleChange = (e) =>{ 
        let query = e.target.value.trim("");
        updateState({ 
            query: query, 
        })
                     
        if(query.trim() !== ""){ 
            dispatch(searchCredit(query));   
       
        }   
 
    }

  /*   //  This will run when the componenet is unmounted
    useEffect(() => {
        return () => {
            console.log('********* UNMOUNTED *********');
            let searchEl = document.getElementById('search');
               if(searchEl.value !== ""){
                searchEl.value = "";
               }
        };
    }, []); */

    return ( 
        <div> 
            {/* <form className="search-form">
                <input type="text" 
                id="search" 
                placeholder="Search With Credits"
                name="search" 
               // value={query}
                onChange={handleChange}/>
            </form> */} 
            <div className="customers_wrapper">
                <form>
                    <input type="text" placeholder="Search Customer"/>
                    <input type="submit" class="btn submit" value="Search"/>
                </form> 
            </div>
        </div>
    )
}


const SearchCreditWR = withRouter(SearchCredit);
export default SearchCreditWR;            
           