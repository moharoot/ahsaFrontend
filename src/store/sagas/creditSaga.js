import { takeLatest, put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import {   
    REQUEST_CREDITS,  
    SEARCH_CREDIT,
    POST_CREDIT,
} from '../actions/creditActions'  
 

// WORKER SAGAS
//Get clients worker
function* getCreditsAsync(){ 
    try{  
        const response = yield call(axios.get, "https://api.ahsaltd.net/bkapp/clients-with-credits/")
        yield put({ type: "REQUEST_CREDITS_SUCCESS", res:response.data });
    //    console.log(response.data);
    }
    catch (e){ 
       //console.log(e.message);
    }  
}

/* // Search credits worker
function* searchCreditsDbAsync(action){ 
    const source = axios.CancelToken.source();
    try{  
        const response = yield call(axios.get, `https://api.burunti.com/sarrifapp/api/clients/api/all-clients/?search=${action.query}`, {
            cancelToken: source.token
          })
        yield put({ type: "SEARCH_CREDIT_SUCCESS", res:response.data }); 
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
// const getItems = state => state.clientR.clientToView.id;
function* postCreditAsync(action){  
    try{  
        // Id of the client to view
        // const clientId = yield select(getItems); 
        ////console.log(clientId)

       const response = yield call(axios.post, "https://api.ahsaltd.net/bkapp/deposits/", {
        client: action.credit.clientId,
        amount_deposited: action.credit.creditAmount,
        currency: action.credit.cCurrency, 
        description: action.credit.cDescription,
      });  
     yield put({ type: "REQUEST_ALL_CLIENTS"}); 

    }
    catch (e){ 
        ////console.log(e) 
    }  
}

// WATCHER SAGAS
//Get clients watcher
export function* watchGetCredits(){
    yield takeLatest(REQUEST_CREDITS, getCreditsAsync)
}

//Search credits watcher
/* export function* watchSearchCredits(){
    yield takeLatest(SEARCH_CREDIT, searchCreditsDbAsync)
} */

//Post task watcher
export function* watchPostCredit(){
    yield takeLatest(POST_CREDIT, postCreditAsync)
}