import { takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {   
    REQUEST_CB, 
    POST_CB,
} from '../actions/CBActions'  
 

// WORKER SAGAS
//Get clients worker
function* getCBAsync(){ 
    try{  
        const response = yield call(axios.get, "https://api.ahsaltd.net/bkapp/closing-balance/")
        yield put({ type: "REQUEST_CB_SUCCESS", res:response.data });
       // console.log(response.data);
    }
    catch (e){ 
       // console.log(e.message);
    }  
}


// Post task worker
function* postCBAsync(action){  
    try{  
       const response = yield call(axios.post, "https://api.ahsaltd.net/bkapp/closing-balance/", {
        cbalance: action.cb, 
      });
        yield put({ type: "POSTING_CB_SUCCESS", res:response.data });
        // console.log(action.cb);
    }
    catch (e){ 
        //console.log(e) 
    }  
}

// WATCHER SAGAS
//Get clients watcher
export function* watchGetCB(){
    yield takeLatest(REQUEST_CB, getCBAsync) 
}


//Post task watcher
export function* watchPostCB(){
    yield takeLatest(POST_CB, postCBAsync)
}