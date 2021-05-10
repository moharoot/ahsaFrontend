import React, { useState, useEffect } from 'react';   
import { requestAllClients } from '../store/actions/clientActions'
import { requestRate } from '../store/actions/rateActions' 
import { useSelector, useDispatch } from 'react-redux' 
import moment from 'moment'

const   TotalBalance = () => {
    const dispatch = useDispatch();

    // When the component is mounted, retrieve the data
    useEffect(() => {   
        dispatch(requestAllClients());
        dispatch(requestRate()); 
    }, []);  

    ///// Get the last rate //////
    const t_rate = useSelector(state => state.rateR.rate); 
    //console.log(t_rate)
    let last = [t_rate[t_rate.length-1]] 

    let obj3 = last[0] 

    const objectOptions = {
    ...obj3
    }; 

    let rate = objectOptions.rate || 0;  
   // Variables
    let totalDeposits = 0; 
    let allDeposits = 0; 
    let all_kshs = 0;
    let all_usds = 0;
    let all_usds_to_ksh = 0

    let totalBorroweds = 0; 
    let allBorroweds = 0; 
    let all_kshs_b = 0;
    let all_usds_b = 0;
    let all_usds_to_ksh_b = 0

    let credits_minus_debits = 0

    // Today's Credits
    const clients = useSelector(state => state.clientR.clients);  

    const withCredits = clients.filter(client =>{
        return client.deposits.length !== 0 
    } )

    const seletecdDate = useSelector(state => state.SbdR.date); 

    let today = moment().format('YYYY-MM-DD');
   // DEPOSITS/CREDITS
    withCredits.map(client =>{
        let deposits = client.deposits; 
        // Filter today's debits
        let _todayDeposits = deposits.filter(tdeb => {
            const checkdate = () => {
                if(seletecdDate !== null){
                    return moment(tdeb.date_deposited).format('YYYY-MM-DD') === seletecdDate
                }  
                else{
                    return moment(tdeb.date_deposited).format('YYYY-MM-DD') === today
                }
            }
            return ( 
                checkdate()
            )
        })
        /********* DEPOSITS/CREITS ************/
             // Get all USDs
             let c_usd = _todayDeposits.filter(b =>{
                return b.currency==="USD"
            })
            // Sum USDs
            for(let i = 0; i < c_usd.length; i++){
                all_usds += parseFloat(c_usd[i].amount_deposited);
                all_usds_to_ksh += parseFloat(c_usd[i].amount_deposited) * rate;
            }
            // console.log(all_usds_to_ksh)

            // Get all KSHs
            let c_ksh = _todayDeposits.filter(b =>{
                return b.currency==="KSH"
            })
            //# Sum KSHs  
            for(let i = 0; i < c_ksh.length; i++){
                all_kshs += parseFloat(c_ksh[i].amount_deposited);
            }
            /* all_kshs = c_ksh.reduce((sum, ksh) => {
                return sum + parseFloat(ksh.amount_deposited);
            },0); */

            // Add converted USDs plus KSHs
            totalDeposits = all_usds_to_ksh + all_kshs
    })

    // BORROWEDS/DEBITS
    const withDebits = clients.filter(client =>{
        return client.borroweds.length !== 0 
    } )
    withDebits.map(client =>{
        let borroweds =client.borroweds; 
        let name = client.name
        // Filter today's debits
        let _todayDebits = borroweds.filter(tdeb => {  
            const checkdate = () => {
                if(seletecdDate !== null){
                    return moment(tdeb.date_borrowed).format('YYYY-MM-DD') === seletecdDate
                }  
                else{
                    return moment(tdeb.date_borrowed).format('YYYY-MM-DD') === today
                }
            }
            return ( 
                checkdate()
            )
        }) 

        /********* BORROWEDS/DEBITS ************/ 
            
            // Get all USDs
            let bc_usd = _todayDebits.filter(b =>{
                return b.currency==="USD"
            }) 

            // Sum USDs
            for(let i = 0; i < bc_usd.length; i++){
                all_usds_b += parseFloat(bc_usd[i].amount_borrowed);
                all_usds_to_ksh_b += parseFloat(bc_usd[i].amount_borrowed) * rate;
            }

            // Get all KSHs
            let b_c_ksh = _todayDebits.filter(b =>{
                return b.currency==="KSH"
            })
            //# Sum KSHs  
            for(let i = 0; i < b_c_ksh.length; i++){
                all_kshs_b += parseFloat(b_c_ksh[i].amount_borrowed);
            }
            // Add converted USDs plus KSHs
            totalBorroweds = all_usds_to_ksh_b + all_kshs_b
    })

    credits_minus_debits = totalDeposits - totalBorroweds
     // Add comma to thousands 
     const c_credits_minus_debits = credits_minus_debits.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  
    
    
    return (
            <div className="closing-balance"> 
                <div>
                    <p>Total Balance (System)</p>
                    <div className="closing-bal"> KSH {c_credits_minus_debits} </div>
                </div>
            </div>
    )
}  

export default  TotalBalance;          
