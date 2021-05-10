import React, { useState, useEffect } from 'react';   
import { requestCredits } from '../store/actions/creditActions'
import { requestDebits } from '../store/actions/debitActions' 
import { useSelector, useDispatch } from 'react-redux' 
import { requestCB } from '../store/actions/CBActions' 
import moment from 'moment'

const   TodayBalance = () => {
    const dispatch = useDispatch();

    // When the component is mounted, retrieve the data
    useEffect(() => {   
        dispatch(requestCB());  
    }, []);  

    ///// Get today's Closing Balance //////
        const cb = useSelector(state => state.CBR.cb); 
        let today = moment().format('YYYY-MM-DD'); 
        let isToday = cb.filter(c => {  
            return ( 
                moment(c.today_date).format('YYYY-MM-DD') === today
            )
        }) 
        let last = [isToday[isToday.length-1]] 
        let obj = last[0] 
        const objectOptions = {
        ...obj
        }; 

        let totalBalanceToday = objectOptions.cbalance || 0;  
        //let cs_lastClosingBal = lastClosingBal.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        ///// Get the last Closing Balance  //////  
        let notToday = cb.filter(c => {  
            return ( 
                moment(c.today_date).format('YYYY-MM-DD') !== today
            )
        }) 
        let last2 = [notToday[notToday.length-1]] 
        let obj2 = last2[0] 
        const objectOptions2 = {
        ...obj2
        }; 

        let lastClosingBal = objectOptions2.cbalance || 0; 

        //Today's closing balane
        // Today's balance  = Today's closing balance - the opening sales
        let todayClosingBal = totalBalanceToday - lastClosingBal
    return (
            <div className="closing-balance"> 
                <div>
                    <p>Today Closing Balance:</p>
                    <div className="closing-bal"> KSH {todayClosingBal} </div>
                </div>
            </div>
    )
} 

export default  TodayBalance;          
