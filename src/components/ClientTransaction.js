import React, {useEffect, useState} from 'react'  
import { useSelector, useDispatch } from 'react-redux' 
import { addCredit } from '../store/actions/creditActions' 
import AddDebit from './AddDebit';
import AddCredit from './AddCredit';
import { addDebit } from '../store/actions/debitActions' 
// import PersonalizedConvertor from './PersonalizedConvertor';
import moment from 'moment'
import queryString from 'query-string';
import { viewClient } from '../store/actions/clientActions'
//import ClearFromBalances from './ClearFromBalances';

const ClientTransaction = (props) => {  
    const dispatch = useDispatch();

    const getQueryString = () =>{
        const queryValues = queryString.parse(props.location.search);
        let queryStr = queryValues.client || "";
        // console.log(queryStr) 
        dispatch(viewClient(queryStr));   
    }

    useEffect(() => { 
        // console.log('********* MOUNTED *********');
        getQueryString();
    }, []);


    const [state, updateState] = useState({  
        showAddCredit: false,
        showAddDebit: false,
        showPersonalizedCC: false,
        //showClear: false
    });  

    // When credit btn is clicked, show add credit form overlay
    const showAddCreditForm = () => {
        updateState({ 
            showAddCredit: true, 
        }) 
      } 
 
    // When close is clicked, remove add credit form overlay
    const closeAddCreditOverlay = () =>{
        updateState({ 
            showAddCredit: false, 
        })
    }

    // When debit is clicked, show add debit form overlay
    const showAddDebitForm = () => {
        updateState({ 
            showAddDebit: true, 
        }) 
      } 

    // When close is clicked, remove add credit form overlay
    const closeAddDebitOverlay = () =>{
        updateState({ 
            showAddDebit: false, 
        })
    }

    // When personalized btn is clicked, show personalized currency convertor form overlay
    const showCurrencyConvertorForm = () => {
        updateState({ 
            showPersonalizedCC: true, 
        }) 
      } 
 
    // When close btn is clicked, remove personalized currency convertor form overlay
    const closeCurrencyConvertorOverlay = () =>{
        updateState({ 
            showPersonalizedCC: false, 
        })
    }

   // When personalized btn is clicked, show personalized currency convertor form overlay
    const showClearForm = () => {
        updateState({ 
            showClear: true, 
        }) 
      } 
 
    // When close btn is clicked, remove personalized currency convertor form overlay
    const closeClearFormOverlay = () =>{
        updateState({ 
            showClear: false, 
        })
    } 

    const client = useSelector(state => state.clientR.clientToView);   
    // console.log(client)

    // Credit history
    let deposits = client.deposits 
    const creditObj = {
        ...deposits, 
    }; 

    // Get all USDs and KSHs
    let all_usds = 0;
    let all_kshs = 0;

    const creditHistory = Object.entries(creditObj).length ? (
        Object.entries(creditObj).map(([key, value]) => {
            if(value.currency=="USD"){
                all_usds+=parseFloat(value.amount_deposited)
            }
            else if(value.currency=="KSH"){
                all_kshs+=parseFloat(value.amount_deposited)
            }
            let dateDeposited =  moment(value.date_deposited).format('DD-MM-YYYY');
            let amountDep = parseFloat(value.amount_deposited); 
            let amount_deposited = amountDep.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return(  
            <tr className="cl" key={value.id}>  
                <td>{dateDeposited}</td>    
                <td>{value.description}</td> 
                <td>{value.currency}</td>
                <td>{amount_deposited}</td>
           </tr>
       ) 
    })
    ) : (
        <tr>
            <td>No credits to display.</td>
        </tr>
    )


     // Debit history 
     let debits = client.borroweds 
     const debitObj = {
        ...debits, 
    };
    // Get all USDs and KSHs
    let all_usds_debits = 0;
    let all_kshs_debits = 0; 
   
    const debitHistory = Object.entries(debitObj).length ? (
        Object.entries(debitObj).map(([key, value]) => {
            if(value.currency=="USD"){
                all_usds_debits+=parseFloat(value.amount_borrowed)
            }
            else if(value.currency=="KSH"){
                all_kshs_debits+=parseFloat(value.amount_borrowed)
            }

            let dateDebited =  moment(value.date_borrowed).format('DD-MM-YYYY');
            let amountBrwd = parseFloat(value.amount_borrowed); 
            let amount_borrowed = amountBrwd.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return(  
            <tr className="cl" key={value.id}> 
                <td>{dateDebited}</td>   
                <td>{value.description}</td>  
                <td>{value.currency}</td>
                <td>{amount_borrowed}</td> 
           </tr>
       ) 
    })
    ) : (
        <tr>
            <td>No debits to display.</td>
        </tr>
    )
    
        let usdBal = all_usds-all_usds_debits;
        let usdBal_com = usdBal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        let kshBal = all_kshs-all_kshs_debits
        let kshBal_com = kshBal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        let all_kshs_debits_com = all_kshs_debits.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        let all_usds_debits_com = all_usds_debits.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        let all_kshs_com = all_kshs.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        let all_usds_com = all_usds.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    const ClientInfo = () =>{
        return( 
            <section className="section-three">    
                <section className="table">
                    <p className="heading">TRANSACTION HISTORY</p> 
                   {/*  <div className="add-btns">
                    <p className="add-form"><span className="credit-btn" onClick={() => { dispatch(addCredit(client)); showAddCreditForm()}}><i className="fa fa-plus add"></i> Credit</span></p>
                    <p className="add-form"><span className="personalized-btn" onClick={() => {showCurrencyConvertorForm()}}><i className="fa fa-hourglass-1 add"></i> Personalized Convertor</span></p>
                    {/* <p className="add-form"><span className="clear-btn" onClick={() => {dispatch(addDebit(client)); showClearForm()}}><i className="fa fa-check-square-o add"></i> Clear From Balances</span></p> */}
                    {/* <p className="add-form"><span className="debit-btn" onClick={() => { dispatch(addDebit(client)); showAddDebitForm()}}><i className="fa fa-minus add"></i> debit</span></p> */}
                    {/* </div> */}
                       <section className="transaction__history"> 
                            <h3>Customer Information</h3>
                            <div className="details">
                                <div className="transaction__details">
                                    <div>
                                        <p>Client name</p>
                                        <h5>{client.name} </h5>
                                    </div>
                                    <div>
                                        <p>Telephone Number</p>
                                        <h5>{client.phone}</h5>
                                    </div> 
                                    <div>
                                        <p>National Id</p>
                                        <h5>{client.nationalId}</h5>
                                    </div>
                                </div>
                                <div className="transaction__details">
                                    <div>
                                        <p>Total credits in Ksh</p><h5>KSH {all_kshs_com} </h5>
                                    </div> 
                                    <div>
                                        <p>Total debits in Ksh</p><h5>KSH {all_kshs_debits_com} </h5>
                                    </div>
                                    <div>
                                        <p>Balance in Ksh</p><h5>KSH {kshBal_com} </h5>
                                    </div>  
                                </div> 
                                <div className="transaction__details">
                                <div>
                                        <p>Total credits in Dollars</p><h5>$ {all_usds_com} </h5>
                                    </div>
                                    <div>
                                        <p>Total debits in Dollars</p><h5>$ {all_usds_debits_com} </h5>
                                    </div>
                                    <div>
                                        <p>Balance in Dollars</p><h5>$ {usdBal_com} </h5>
                                    </div> 
                                </div>   
                            </div> 
                             <div className="table history-table">
                                <h3>Credit History</h3>
                                <table>
                                    <thead>
                                        <tr>  
                                            <th>Date Credited</th>  
                                            <th>Description</th>
                                            <th>Currency</th> 
                                            <th>Amount</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {creditHistory}
                                    </tbody>
                                </table> 
                            </div>
                            <div className="table history-table">
                                <h3>Debit History</h3>
                                <table>
                                    <thead>
                                        <tr> 
                                            <th>Date Debited</th>  
                                            <th>Description</th>
                                            <th>Currency</th> 
                                            <th>Amount</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {debitHistory}
                                    </tbody>
                                </table> 
                            </div>
                        </section>
                </section>
            </section>
        )
    }

    return (
        <div className="container">  
            {ClientInfo()}  
            { state.showAddCredit && <AddCredit closeAddCreditOverlay={closeAddCreditOverlay}  /> }
            {/* { state.showAddDebit && <AddDebit closeAddDebitOverlay={closeAddDebitOverlay}  /> } */}
            {/* { state.showPersonalizedCC && <PersonalizedConvertor closeCurrencyConvertorOverlay={closeCurrencyConvertorOverlay}  /> } */}
            {/* { state.showClear && <ClearFromBalances closeClearFormOverlay={closeClearFormOverlay}  /> } */}
        </div>
    )
} 

export default ClientTransaction;          
