import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestAllClients, editClient, deleteClient } from '../store/actions/clientActions'
function CustomersLogic(props) {
    const dispatch = useDispatch();

     // When the component is mounted, retrieve the data
     useEffect(() => { 
        dispatch(requestAllClients());
    }, []);

    const runShowUpdateOverlayFunc = () =>{
        props.showUpdateOverlay()
    }

    const clients = useSelector(state => state.clientR.clients);  
    let counter = 0
    const clientList = clients.length ? (
        clients.map(client =>{
            const viewOnClick = (e) =>{    
                props.history.push({
                pathname: '/client-transaction',
                search: `?client=${client.id}`,  
                })   
             }
             
           let name = client.name
           let phone = client.phone
           let nationalId = client.nationalId
           counter++
            return(  
                 <tr className="cl" key={client.id}> 
                     <td>{counter}</td> 
                     <td>{name}</td>    
                     <td>{phone}</td>      
                     <td>{nationalId}</td>      
                     <td className="actions"> 
                        <span><i onClick={() => {dispatch(editClient(client)); runShowUpdateOverlayFunc()}} className="fa fa-edit"></i></span>
                        <span><i  onClick={viewOnClick} className="fa fa-eye"></i></span>
                        <span onClick={(e) => {if(window.confirm('Are you sure you wish to delete this item?')) dispatch(deleteClient(client.id)) }}><i className="fa fa-trash-o delete"></i></span>
                    </td>   
                </tr>
            )
        })
    ) : (
        <tr>        
            <td>
                No clients to display.
            </td>
        </tr>
    )
    return (
        <React.Fragment>
           {clientList}
        </React.Fragment>
    )
}

export default CustomersLogic
