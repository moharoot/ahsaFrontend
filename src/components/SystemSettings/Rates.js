import React, { useState, useEffect } from 'react'; 
import { requestRate, postRate } from '../../store/actions/rateActions'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import AddRate from './AddRate';
const Rates = (props) => { 
    const dispatch = useDispatch();
    

    // When the component is mounted, retrieve the data
    useEffect(() => { 
        dispatch(requestRate());
    }, []);

    // Get the last rate 
    const t_rate = useSelector(state => state.rateR.rate); 
    // console.log(t_rate)
    const seletecdDate = useSelector(state => state.SbdR.date); 
    // console.log(seletecdDate)
    let today = moment().format('YYYY-MM-DD');
    
    // if seletecdDate !== null, retrieve rate whose date === seletecdDate 
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
    let last = [selectedDateRate[selectedDateRate.length-1]] 
    // console.log(selectedDateRate)
    // console.log(last)
    let obj3 = last[0] 

    const objectOptions = {
    ...obj3
    };

    let rate = objectOptions.rate || 0; 
    // console.log(rate)
    return ( 
        <div className="container"> 
            <h3 className="rate-heading">Rate: { rate }</h3>  
        </div>
    )
}

export default Rates; 
             
           