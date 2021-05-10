import React, { useState, useEffect } from 'react'; 
import { updateClient } from '../store/actions/clientActions'
import { useSelector, useDispatch } from 'react-redux'
const EditCustomer = (props) => { 
    const dispatch = useDispatch();
    // Retrieve details of the client to edit
    const client = useSelector(state => state.clientR.clientToEdit);
    let id = client.id;
    const [state, updateState] = useState({ 
        name:client.name,
        phone:client.phone, 
        idno:client.nationalId, 
    });  
    
    // onChange
    const handleChange = (e) =>{
        updateState({
            ...state, [e.target.id]:e.target.value
        })
    }

    const closeUpdateOverlay = props.closeUpdateOverlay;

    // Edit Client
    const updateClientDetails = (e) =>{ 
        e.preventDefault(); 
        const clientId = id;
        const {name, phone, idno} = state;
        const client = {clientId, name, phone, idno}; 
        // console.log(client)  
        dispatch(updateClient(client)); 
        /* e.target.querySelector('#name').value="";
        e.target.querySelector('#phone').value="";
        e.target.querySelector('#email').value="";
        e.target.querySelector('#idno').value=""; */

        // Close the overlay onSubmit
        closeUpdateOverlay()
     }
     
        
        return (
            <div className="container">   
                <div className="overlay">
                    <div className="wrapper">
                        <p className="heading">Edit Client</p> 
                        <form onSubmit={updateClientDetails} className="form">
                            <label>Fullname</label>
                            <input type="text" required name="name" id="name" defaultValue={state.name}  onChange={handleChange}/>
                            <label>Phone Number</label>
                            <input type="number" required name="phone" id="phone" defaultValue={state.phone} onChange={handleChange}/>
                            <label>National Id/Passport No.</label>
                            <input type="text" required name="idno" id="idno" defaultValue={state.idno} onChange={handleChange}/>
                            <input type="submit" value="Edit Client" id="add"/>
                        </form>
                        <div className="close">
                            <i onClick={props.closeUpdateOverlay} className="fa fa-close"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default EditCustomer; 
             
        