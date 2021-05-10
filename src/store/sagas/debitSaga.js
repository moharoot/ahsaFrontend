import { takeLatest, put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import {   
    REQUEST_DEBITS,  
    SEARCH_DEBIT,
    POST_DEBIT,
} from '../actions/debitActions'  
 

// WORKER SAGAS
//Get clients worker
function* getDebitsAsync(){ 
    try{  
        const response = yield call(axios.get, "https://api.ahsaltd.net/bkapp/clients-with-debits/")
        yield put({ type: "REQUEST_DEBITS_SUCCESS", res:response.data });
        //console.log(response.data);
    }
    catch (e){ 
       //console.log(e.message);
    }  
}
/* 
// Search credits worker
function* searchDebitsDbAsync(action){ 
    const source = axios.CancelToken.source();
    try{  
        const response = yield call(axios.get, `https://api.burunti.com/sarrifapp/api/clients/api/all-clients/?search=${action.query}`, {
            cancelToken: source.token
          })
        yield put({ type: "SEARCH_DEBIT_SUCCESS", res:response.data }); 
       // console.log(action.query);
       // console.log(response.data);
        
    }
    catch (thrown){ 
        if (axios.isCancel(thrown)) {
            //console.log('Request canceled', thrown.message);
          }
          else{
              // handle error
            //console.log('not canceled', thrown.message);
          }
    }
    if (true) {
        source.cancel('Request canceled!');
      }
} */

// Post task worker
function* postDebitAsync(action){  
    try{
        console.log(action.debit)
        const response = yield call(axios.post, "https://api.ahsaltd.net/bkapp/borroweds/", {
        client: action.debit.clientId,
        amount_borrowed: action.debit.debitAmount,
        currency: action.debit.dCurrency, 
        description: action.debit.dDescription,
      });  
     yield put({ type: "REQUEST_ALL_CLIENTS"}); 

    }
    catch (e){ 
        ////console.log(e) 
    }  
}

// WATCHER SAGAS
//Get clients watcher
export function* watchGetDebits(){
    yield takeLatest(REQUEST_DEBITS, getDebitsAsync)
}

//Search Debits watcher
/* export function* watchSearchDebits(){
    yield takeLatest(SEARCH_DEBIT, searchDebitsDbAsync)
} */

//Post task watcher
export function* watchPostDebit(){
    yield takeLatest(POST_DEBIT, postDebitAsync)
}