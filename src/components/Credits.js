import React, { useState, useEffect } from 'react' 
import AddCredit from './AddCredit';
import { useSelector, useDispatch } from 'react-redux'
import { requestAllClients } from '../store/actions/clientActions'
import {  addCredit } from '../store/actions/creditActions'
import SearchCustomerWR from './SearchCustomer'

function Credits(props) {
    const [state, updateState] = useState({ 
        showUpdateForm: false,
        showAddForm: false,
    }); 
    // When add is clicked, show add form overlay
     const showAddOverlay = () => {
        updateState({ 
            showAddForm: true, 
        }) 
      }

    // When close is clicked, remove overlay
    const closeAddOverlay = () =>{
        updateState({ 
            showAddForm: false, 
        })
    }

    const showUpdateOverlay = () => {
        updateState({ 
            showUpdateForm: true, 
        }) 
      }

    // When close is clicked, remove overlay
    const closeUpdateOverlay = () =>{
        updateState({ 
            showUpdateForm: false, 
        })
    }
    const dispatch = useDispatch();
    // When the component is mounted, retrieve the data
    useEffect(() => { 
        dispatch(requestAllClients());
    }, []);

    const clients = useSelector(state => state.clientR.clients);  

    const withCredits = clients.filter(client =>{
        return client.deposits
        // return client.deposits.length !== 0 
    } )
    let counter = 0
    const CreditsList = withCredits.length ? (
        withCredits.map(client =>{
            const viewOnClick = (e) =>{     
                props.history.push({
                pathname: '/client-transaction',
                search: `?client=${client.id}`,  
                })   
            }
            let deposits = client.deposits 
            // USD Credits
           const usdDep = deposits.filter(deposit => {
            return deposit.currency === "USD"
            }) 
            // Sum the USD Credits
            const totalUsdDep = usdDep.reduce((a, d) => a+parseInt(d.amount_deposited), 0)

            // KSH Deposits
            const kshDep = deposits.filter(deposit => {
            return deposit.currency === "KSH"
            }) 
            // Sum the USD Deposits
            const totalKshDep = kshDep.reduce((a, d) => a+parseInt(d.amount_deposited), 0)

           let name = client.name 
    
           counter++
            return(  
                 <tr className="cl" key={client.id}> 
                     <td>{counter}</td> 
                     <td>{name}</td> 
                     <td>{totalKshDep}</td>  
                     <td>{totalUsdDep}</td>       
                     <td className="actions"> 
                        <span><i className="fa fa-plus" onClick={() => { dispatch(addCredit(client)); showAddOverlay()}}></i></span>
                        {/* <span><i onClick={() => {dispatch(editCredit(client)); showUpdateOverlay()}} className="fa fa-edit"></i></span> */}
                        <span><i  onClick={viewOnClick} className="fa fa-eye"></i></span>
                        {/* <span onClick={(e) => {if(window.confirm('Are you sure you wish to delete this item?')) dispatch(deleteCredit(client.id)) }}><i className="fa fa-trash-o delete"></i></span> */}
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
        <div>
            <h3 className="heading">CREDITS</h3>
            <div className="customers_wrapper">
                <SearchCustomerWR />  
                {/* <button className="btn submit">Export to Excel</button> */}
            </div>
            {/* <h4 className="title">A total of 36 customers loaded</h4> */}

            { state.showAddForm && <AddCredit closeAddOverlay={closeAddOverlay} /> } 
            
            <table>
                <thead> 
                    <tr>
                        <th>SNO</th> 
                        <th>FULLNAME</th> 
                        <th>KSH IN</th>  
                        <th>DOLLAR IN</th>  
                        <th>ACTION</th> 
                    </tr>
                </thead>
                <tbody>
                    {CreditsList}
                </tbody>
            </table>
        </div>
    )
}

export default Credits
