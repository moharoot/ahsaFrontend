import React, { useState, useEffect } from 'react'; 
import { postClient } from '../store/actions/clientActions'
import { useSelector, useDispatch } from 'react-redux'
const AddClient = (props) => { 
    const dispatch = useDispatch();
    
    const [state, updateState] = useState({ 
        name:'',
        phone:'', 
        idno:'', 
    });  
    
    // onChange
    const handleChange = (e) =>{
        updateState({
            ...state, [e.target.id]:e.target.value
        })
    }

    const closeAddOverlay = props.closeAddOverlay;

    // Add Client
    const addClient = (e) =>{ 
        e.preventDefault(); 
        const {name, phone, idno} = state;
        const client = {name, phone, idno}; 

        dispatch(postClient(client)); 

     /*    e.target.querySelector('#name').value="";
        e.target.querySelector('#phone').value="";
        e.target.querySelector('#email').value="";
        e.target.querySelector('#idno').value=""; */

        // Close the overlay onSubmit
        closeAddOverlay()
     }

        return (
            <div className="container"> 
                <div className="overlay">
                        <div className="wrapper">
                    <p className="heading">Add Client</p> 
                    <form onSubmit={addClient}>
                        <label>Fullname</label>
                        <input type="text" required name="name" id="name"  onChange={handleChange}/>
                        <label>Phone Number</label>
                        <input type="text" required name="phone" id="phone" onChange={handleChange}/>
                        <label>National Id/Passport No.</label>
                        <input type="text" name="idno" id="idno" onChange={handleChange}/>
                        <input type="submit" value="Add Client" id="add"/>
                    </form>
                    <div className="close">
                        <i onClick={props.closeAddOverlay} className="fa fa-close"></i>
                    </div>
                </div>
            </div>
            </div>
        )
}

export default AddClient; 
             
           