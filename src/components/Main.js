import React, { useState } from 'react' 
import AddClient from './AddClient';
import MainLogic from './MainLogic';
import SearchCustomerWR from './SearchCustomer'

function Main(props) {
    const [state, updateState] = useState({ 
        showUpdateForm: false,
        showAddForm: false
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

    return (
        <div>
            <h3 className="heading">MAIN</h3>
            <div className="customers_wrapper">
                <SearchCustomerWR />  
                {/* <button className="btn submit">Export to Excel</button> */}
            </div>
            {/* <h4 className="title">A total of 36 customers loaded</h4> */}

            { state.showAddForm && <AddClient closeAddOverlay={closeAddOverlay}  /> } 
            
            <table>
                <thead> 
                    <tr>
                        <th>SNO</th> 
                        <th>FULLNAME</th> 
                        <th>KSH IN</th>
                        <th>KSH OUT</th>
                        <th>KSH BALANCE</th>
                        <th>DOLLAR IN</th>
                        <th>DOLLAR OUT</th>
                        <th>DOLLAR BALANCE</th>
                        <th>PHONE NUMBER</th>
                        <th>ID/PASSPORT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <MainLogic history = {props.history}/>
                </tbody>
            </table>
        </div>
    )
}

export default Main
