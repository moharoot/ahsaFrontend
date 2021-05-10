import React, {useState} from 'react' 
import AddClient from './AddClient';
import CustomersLogic from './CustomersLogic';
import EditCustomer from './EditCustomer';
import SearchCustomerWR from './SearchCustomer'
function Customers(props) {
    const [state, updateState] = useState({ 
        showAddForm: false,
        showUpdateForm: false,
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
  

    return (
        <div>
            <h3 className="heading">CUSTOMERS</h3>
            <div className="customers_wrapper">
                <SearchCustomerWR />  
                {/* <button className="btn submit">Export to Excel</button> */}
                <button className="btn add" onClick={() => {showAddOverlay()}}>New Customer</button>
            </div>
            {/* <h4 className="title">A total of 36 customers loaded</h4> */}

            { state.showAddForm && <AddClient closeAddOverlay={closeAddOverlay}  /> } 
            
            <table>
                <thead> 
                    <tr>
                        <th>SNO</th> 
                        <th>FULLNAME</th> 
                        <th>PHONE NUMBER</th>
                        <th>ID/PASSPORT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <CustomersLogic history = {props.history} showUpdateOverlay={ showUpdateOverlay }/>
                </tbody>
            </table>
           { state.showUpdateForm && <EditCustomer closeUpdateOverlay={ closeUpdateOverlay }  /> }
        </div>
    )
}

export default Customers
