import { takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {   
    REQUEST_RATE, 
    POST_RATE,
} from '../actions/rateActions'  
 

// WORKER SAGAS
//Get clients worker
function* getRateAsync(){ 
    try{  
        const response = yield call(axios.get, "https://api.ahsaltd.net/bkapp/rates/")
        yield put({ type: "REQUEST_RATE_SUCCESS", res:response.data });
    //    console.log(response.data);
    }
    catch (e){ 
       // console.log(e.message);
    }  
}


// Post task worker
function* postRateAsync(action){  
    try{  
       const response = yield call(axios.post, "https://api.ahsaltd.net/bkapp/rates/", {
        rate: action.todayRate.rate, 
      });
        yield put({ type: "POSTING_RATE_SUCCESS", res:response.data });
        //console.log(action.todayRate);
    }
    catch (e){ 
        //console.log(e) 
    }  
}

// WATCHER SAGAS
//Get clients watcher
export function* watchGetRate(){
    yield takeLatest(REQUEST_RATE, getRateAsync) 
}


//Post task watcher
export function* watchPostRate(){
    yield takeLatest(POST_RATE, postRateAsync)
}