import React, { useState, useEffect } from 'react' 
import AddDebit from './AddDebit';
import { useSelector, useDispatch } from 'react-redux'
import { requestAllClients } from '../store/actions/clientActions'
import { addDebit } from '../store/actions/debitActions'
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

    const withDebits = clients.filter(client =>{
        return client.borroweds 
       // return client.borroweds.length !== 0 
    } )
    let counter = 0
    const DebitsList = withDebits.length ? (
        withDebits.map(client =>{
            const viewOnClick = (e) =>{     
                props.history.push({
                pathname: '/client-transaction',
                search: `?client=${client.id}`,  
                })   
            }
            let borroweds = client.borroweds 
            // USD Credits
           const usdDep = borroweds.filter(borrowed => {
            return borrowed.currency === "USD"
            }) 
            // Sum the USD Credits
            const totalUsdDep = usdDep.reduce((a, d) => a+parseInt(d.amount_borrowed), 0)

            // KSH Borroweds
            const kshDep = borroweds.filter(borrowed => {
            return borrowed.currency === "KSH"
            }) 
            // Sum the USD Borroweds
            const totalKshDep = kshDep.reduce((a, d) => a+parseInt(d.amount_borrowed), 0)

           let name = client.name 
    
           counter++
            return(  
                 <tr className="cl" key={client.id}> 
                     <td>{counter}</td> 
                     <td>{name}</td> 
                     <td>{totalKshDep}</td>  
                     <td>{totalUsdDep}</td>       
                     <td className="actions"> 
                        <span><i className="fa fa-plus" onClick={() => { dispatch(addDebit(client)); showAddOverlay()}}></i></span>
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
            <h3 className="heading">DEBITS</h3>
            <div className="customers_wrapper">
                <SearchCustomerWR />  
                {/* <button className="btn submit">Export to Excel</button> */}
            </div>
            {/* <h4 className="title">A total of 36 customers loaded</h4> */}

            { state.showAddForm && <AddDebit closeAddOverlay={closeAddOverlay} /> } 
            
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
                    {DebitsList}
                </tbody>
            </table>
        </div>
    )
}

export default Credits
