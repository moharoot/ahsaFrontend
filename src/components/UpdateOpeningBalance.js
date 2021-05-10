import React, { useState, useEffect } from 'react';   
import { requestCredits } from '../store/actions/creditActions'
import { requestDebits } from '../store/actions/debitActions' 
import { useSelector, useDispatch } from 'react-redux' 
import { requestRate } from '../store/actions/rateActions'
import { postCB } from '../store/actions/CBActions' 
import moment from 'moment'

const ClosingBalance = () => {
    const dispatch = useDispatch();

    // When the component is mounted, retrieve the data
    useEffect(() => {   
        dispatch(requestCredits());
        dispatch(requestRate());
        dispatch(requestDebits());
        //console.log("mounted")
    }, []);  

    
    ///// Get the last rate //////
        const t_rate = useSelector(state => state.rateR.rate); 

        let last = [t_rate[t_rate.length-1]] 

        let obj3 = last[0] 

        const objectOptions = {
        ...obj3
        }; 

        let rate = objectOptions.rate || 0;  
        let allDeposits = 0; 
        let allDebits = 0;
        
    ///// End of Rates ////

    // Today's Credits
    const credits = useSelector(state => state.creditR.credits);
        //console.log(credits)
        credits.map(credit =>{
            let deposits = credit.deposits;
            let today = moment().format('YYYY-MM-DD');
            // Filter today's credits
            let _todayDeposits = deposits.filter(tdeb => {  
                return ( 
                    moment(tdeb.date_deposited).format('YYYY-MM-DD') === today
                )
            })


             /********* DEPOSITS/CREITS ************/
             // Get all USDs
             let c_usd = _todayDeposits.filter(b =>{
                return b.currency==="USD"
            })
            // Convert all USDs into KSH
            let all_usds=0;
            for(let i = 0; i < c_usd.length; i++){
                all_usds += parseInt(c_usd[i].amount_deposited);
            }
            let total_usds = all_usds*rate;

            // Get all KSHs
            let c_ksh = _todayDeposits.filter(b =>{
                return b.currency==="KSH"
            })
            //# Sum KSHs  
            const all_kshs = c_ksh.reduce(function(sum, ksh){
                return sum = sum+parseInt(ksh.amount_deposited);
            },0);
           

            //Add the KSHs and the converted USDs
            allDeposits += total_usds+all_kshs
           
          /********* END OF DEPOSITS/CREITS ************/
            

           
            return(  
                <span></span>
            )
        //})

           
        }) 





    // Today's Debits
    const debits = useSelector(state => state.debitR.debits); 
    //console.log(debits) 
        debits.map(debit =>{
            let borroweds =debit.borroweds;
             // Filter today's debits
            let today = moment().format('YYYY-MM-DD'); 
            let _todayDebits = borroweds.filter(tdeb => {  
                return ( 
                    moment(tdeb.date_borrowed).format('YYYY-MM-DD') === today
                )
            })
            /********* BORROWEDS/DEBITS ************/ 
            
            // Get all USDs
            let bc_usd = _todayDebits.filter(b =>{
                return b.currency==="USD"
            }) 

            // Convert all USDs into KSH
            let b_all_usds=0;
            for(let i = 0; i < bc_usd.length; i++){
                b_all_usds += parseInt(bc_usd[i].amount_borrowed);
            }
            let b_total_usds = b_all_usds*rate; 

            // Get all KSHs
            let b_c_ksh = _todayDebits.filter(b =>{
                return b.currency==="KSH"
            })
            //# Sum KSHs  
            const b_all_kshs = b_c_ksh.reduce(function(sum, ksh){
                return sum = sum+parseInt(ksh.amount_borrowed);
            },0); 

            //Add the KSHs and the converted USDs
            allDebits += b_total_usds+b_all_kshs 


           /********* END OF BORROWEDS/DEBITS ************/  
            return(  
                <span></span>
            )
 
        })

        // Closing bal state
        const [state, updateState] = useState({ 
            balance:null, 
        }); 
        
        // onChange - handle closingBalance
        const handleChange = (e) => {
            updateState({ 
                balance: document.querySelector('#balance').value, 
            }) 
        };

        // submit closing balance
        const submitCB = (e) =>{ 
            e.preventDefault();  
            const cb = state.balance; 
            console.log(cb)  
            dispatch(postCB(cb));  
     
         }

        //console.log(allDebits)
        //console.log(allDeposits)
        //console.log(allDeposits - allDebits)
        let closingBalan = allDeposits-allDebits; 
        closingBalan = closingBalan.toFixed(2);
        //let closingBalance = closingBalan.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return (
            <div className="closing-balance"> 
                <div> 
                    <form onSubmit={submitCB}>
                        <input type="text" name="balance" id="balance" defaultValue={closingBalan} onChange={handleChange} />
                        <input type="submit" value="Update Opening Balance"/>
                    </form>
                    
                </div>
            </div>
    )
} 

export default ClosingBalance;          
