import React, {useEffect} from 'react'   
import { requestAllClients } from '../store/actions/clientActions'
import { useSelector, useDispatch } from 'react-redux' 
import { requestRate } from '../store/actions/rateActions' 
import moment from 'moment'
import { viewClient } from '../store/actions/clientActions'
import { withRouter } from "react-router-dom";

const TodayCredits = (props) => {
    const dispatch = useDispatch();

    // When the component is mounted, retrieve the data
    useEffect(() => {   
        dispatch(requestAllClients());
        dispatch(requestRate());
    }, []);

    
        // Get the selected date
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
        
        let allKshDeposits = 0; 
        let allUsdDeposits = 0; 
        let totalDeposits = 0; 
        let allDeposits = 0; 
        let all_kshs = 0;
        let all_usds = 0;
        let all_usds_to_ksh = 0
    // Today's Credits
    const clients = useSelector(state => state.clientR.clients);  

    const withCredits = clients.filter(client =>{
        return client.deposits.length !== 0 
    } )
    //console.log(credits)

    const creditsList = withCredits.length ? (
        withCredits.map(client =>{
            let deposits = client.deposits; 
            let name = client.name 
            let today = moment().format('YYYY-MM-DD');
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

            // console.log(_todayDeposits)

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

            // Add comma to thousands 
            allKshDeposits = all_kshs.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            allUsdDeposits = all_usds.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            allDeposits = totalDeposits.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          /********* END OF DEPOSITS/CREITS ************/
            

            
            const depositHistory = _todayDeposits.map(deposit =>{
                const viewOnClick = (e) =>{  
                    dispatch(viewClient(deposit.client));   
                    props.history.push({
                    pathname: '/client-transaction',
                    search: `?client=${deposit.client}`,  
                    })    
                 }
                let amountDep = parseFloat(deposit.amount_deposited);  
                let amount_deposited = amountDep.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return(  
                 <tr className="cl" key={deposit.id}> 
                     <td className="client-name" onClick={viewOnClick}>{name}</td>    
                     <td>{deposit.currency}</td>   
                     <td>{amount_deposited}</td> 
                    </tr>
                )
            }) 
           
            return(   
                depositHistory  
            )
        //})
        })
    ) : (
        <tr>
            <td>No credits to display for today.</td>
        </tr>
    )


    return (
            <div>
                <h3>Credits</h3>
                <div className="totals">
                    <h5>Total KSH In: {allKshDeposits} </h5>
                    <h5>Total USD In: {allUsdDeposits}</h5>
                    <h5>Total Credits In KSH: {allDeposits}</h5>
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
                        {creditsList}
                    </tbody>
                </table> 
            </div>
    )
} 

const TodayCreditsWR = withRouter(TodayCredits);
export default TodayCreditsWR;          
