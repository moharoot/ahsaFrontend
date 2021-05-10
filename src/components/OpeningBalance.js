import React, { useEffect } from 'react';   
import { useSelector, useDispatch } from 'react-redux' 
import { requestCB } from '../store/actions/CBActions'
import moment from 'moment'

const OpeningBalance = () => {
    const dispatch = useDispatch();

    // When the component is mounted, retrieve the data
    useEffect(() => {   
        dispatch(requestCB());  
    }, []);  

    ///// Get the last Closing Balance  //////
    const cbs = useSelector(state => state.CBReducer.cb); 
    
    // date selected
    const seletecdDate = useSelector(state => state.SbdR.date); 
    console.log(seletecdDate)
    let today = moment().format('YYYY-MM-DD'); 
    // Filter today's debits
    let selectedDateCB = cbs.filter(cb => {
        const checkdate = () => {
            if(seletecdDate !== null){
                return moment(cb.today_date).format('YYYY-MM-DD') === seletecdDate
            }  
            else{
                return moment(cb.today_date).format('YYYY-MM-DD') === today
            }
        }
        return ( 
            checkdate()
        )
    }) 
    
    let lastCb = [selectedDateCB[selectedDateCB.length-1]]
    let obj3 = lastCb[0]
    
    const objectOptions = {
        ...obj3
    }; 

    let lastClosingBal = objectOptions.cbalance;

    return (
            <div className="closing-balance"> 
                <div>
                    <p>Opening Balance</p>
                    <div className="closing-bal"> KSH {lastClosingBal} </div>
                </div>
            </div>
    )
} 

export default OpeningBalance;          
