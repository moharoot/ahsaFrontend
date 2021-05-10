import React from 'react'  
import TodayCreditsWR from './TodayCredits'
import TodayDebitsWR from './TodayDebits'
import TotalBalance from './TotalBalance' 
import OpeningBalance from './OpeningBalance' 
import ClosingBalance from './ClosingBalance' 
// import AddRate from './AddRate';
import SearchByDate from './SearchByDate'
import Rates from './SystemSettings/Rates'


const TransactionReport = (props) => { 
    return (
        <div className="container">  
         <section className="section-three">   
                    <section className="table">
                        <h3 className="heading">TRANSACTION REPORT</h3>  
                            <section className="transaction-history">  
                                <div className="closing-and-rate">
                                    <SearchByDate/> 
                                    <Rates/>
                                    <TotalBalance/>
                                    <OpeningBalance/> 
                                    <ClosingBalance/> 
                                     {/* <AddRate />  */}
                                </div>
                                <div className="balances"> 
                                    {/* <UpdateOpeningBalance/>
                                    <ClosingBalance/> */}
                                    {/* <OpeningBalance/> 
                                    <TotalBalance/>   
                                    <TodayBalance/> */}
                                    {/* <SearchByDate/>  */}
                                    {/* <AddRate />  */}
                                </div>
                                <div className="table history-table daily-tables"> 
                                   <TodayCreditsWR />
                                   <TodayDebitsWR />
                                </div>
                            </section>
                    </section>
                </section>
        </div>
    )
} 

export default TransactionReport;          
