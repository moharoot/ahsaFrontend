import React, {useEffect} from 'react'  
import { requestAllClients } from '../store/actions/clientActions' 
import { useSelector, useDispatch } from 'react-redux' 
import { requestRate } from '../store/actions/rateActions' 
import moment from 'moment'
import { viewClient } from '../store/actions/clientActions'
import { withRouter } from "react-router-dom";

const TodayDebits = (props) => {
    const dispatch = useDispatch();

    // When the component is mounted, retrieve the data
    useEffect(() => {  
        dispatch(requestAllClients()); 
        dispatch(requestRate());
    }, []);

    // Get the last date
    const seletecdDate = useSelector(state => state.SbdR.date); 
    
    ///// Get the last rate //////
        const t_rate = useSelector(state => state.rateR.rate); 
        // console.log(t_rate)
      
        // if seletecdDate !== null, retrieve rate whose date === seletecdDate 
        let today = moment().format('YYYY-MM-DD');
        let selectedDateRate = [];
        if(seletecdDate !== null){
            selectedDateRate = t_rate.filter(t_r => {
                return moment(t_r.today_date).format('YYYY-MM-DD') === seletecdDate;
            })
        }
        else{
            selectedDateRate = t_rate.filter(t_r => {
                return moment(t_r.today_date).format('YYYY-MM-DD') === today;
            })
        }
        // console.log(selectedDateRate)
        let last = [selectedDateRate[selectedDateRate.length-1]] 

        let obj3 = last[0] 

        const objectOptions = {
        ...obj3
        };
        
        let rate = objectOptions.rate || 0; 
        console.log(rate)

        ///// End of Rates //// 
      
        //let d = moment(objectOptions.today_date).format('YYYY-MM-DD') 
        //console.log(d)
        let allKshBorroweds = 0;
        let allUsdBorroweds = 0;
        let totalBorroweds = 0; 
        let allBorroweds = 0; 
        let all_kshs = 0;
        let all_usds = 0;
        let all_usds_to_ksh = 0

    // Today's Debits
    const clients = useSelector(state => state.clientR.clients);  

    const withDebits = clients.filter(client =>{
        return client.borroweds.length !== 0 
    } )
    
    //console.log(debits)
    const debitsList = withDebits.length ? (
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
                all_usds += parseFloat(bc_usd[i].amount_borrowed);
                all_usds_to_ksh += parseFloat(bc_usd[i].amount_borrowed) * rate;
            }

            // Get all KSHs
            let b_c_ksh = _todayDebits.filter(b =>{
                return b.currency==="KSH"
            })
            //# Sum KSHs  
            for(let i = 0; i < b_c_ksh.length; i++){
                all_kshs += parseFloat(b_c_ksh[i].amount_borrowed);
            }
            // Add converted USDs plus KSHs
            totalBorroweds = all_usds_to_ksh + all_kshs

             // Add comma to thousands 
             allKshBorroweds = all_kshs.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
             allUsdBorroweds = all_usds.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
             allBorroweds = totalBorroweds.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

           /********* END OF BORROWEDS/DEBITS ************/ 


            const borrowedHistory = _todayDebits.map(borrowed =>{
                const viewOnClick = (e) =>{  
                    dispatch(viewClient(borrowed.client));   
                    props.history.push({
                    pathname: '/client-transaction',
                    search: `?client=${borrowed.client}`,  
                    })    
                 }  
                let amountDeb = parseFloat(borrowed.amount_borrowed);  
                let amount_borrowed = amountDeb.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return(  
                 <tr className="cl" key={borrowed.id}> 
                     <td className="client-name" onClick={viewOnClick}>{name}</td>   
                     <td>{borrowed.currency}</td>   
                     <td>{amount_borrowed}</td> 
                    </tr>
                )
            }) 
            return(  
                borrowedHistory 
            )
        //})

           
        })
    ) : (
        <div>
            No debits to display for today.
        </div>
    )


    return (
        <div>
            <h3>Debits</h3>
            <div className="totals">
            <h5>Total KSH Out: {allKshBorroweds} </h5>
            <h5>Total USD Out: {allUsdBorroweds}</h5>
            <h5>Total Debits In KSH: {allBorroweds}</h5>
            </div>
            <table>
                <thead>
                    <tr> 
                        <th>Name</th> 
                        <th>Currency</th> 
                        <th>Amount</th>     
                    </tr>
                </thead>
                <tbody>
                {debitsList}
                </tbody>
            </table> 
        </div>
    )
} 

const TodayDebitsWR = withRouter(TodayDebits);
export default TodayDebitsWR;          
