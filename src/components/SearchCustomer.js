// import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import queryString from 'query-string';
import React, { useState, useEffect } from 'react'; 
import { requestAllClients, searchAction } from '../store/actions/clientActions'
import { useSelector, useDispatch } from 'react-redux'

const SearchCustomer = (props) => {
    const dispatch = useDispatch();
    
    const [state, updateState] = useState({ 
        query:'', 
    });  
    
 
    
    const handleChange = (e) =>{ 
        let query = e.target.value.trim("");
        updateState({ 
            query: query, 
        })
        //console.log(state.query)
                     
        if(query.trim() !== ""){ 
            dispatch(searchAction(query));   
        }
        else{
            dispatch(requestAllClients());
        }  
    }
    return ( 
        <div> 
            <form className="search-form">
                {/* <i className="fa fa-search"></i> */}
                <input type="text" 
                id="search" 
                placeholder="Search Clients"
                name="search" 
                value={state.query}
                onChange={handleChange}/>
            </form> 
        </div>
    )
}


const SearchCustomerWR = withRouter(SearchCustomer);
export default SearchCustomerWR;            
           