import { takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'
import {  
    POST_CLIENT,
    REQUEST_CLIENTS, 
    UPDATE_CLIENT,
    VIEW_CLIENT,
    DELETE_CLIENT,
    SEARCH,
    REQUEST_ALL_CLIENTS,
} from '../actions/clientActions'  
 

// WORKER SAGAS
//Get ALL clients worker
function* getAllClientsAsync(){ 
    try{  
        const response = yield call(axios.get, "https://api.ahsaltd.net/bkapp/all-clients/")
        yield put({ type: "REQUEST_ALL_CLIENTS_SUCCESS", res:response.data });
        // console.log(response.data);
    }
    catch (e){ 
       // //console.log(e.message);
    }  
}

// Post client worker
function* postClientAsync(action){  
    try{  
       const response = yield call(axios.post, "https://api.ahsaltd.net/bkapp/all-clients/", {
        name: action.client.name,
        phone: action.client.phone,
        nationalId: action.client.idno
      });
        yield put({ type: "POSTING_SUCCESS", res:response.data});
        //console.log(action.client)
    }
    catch (e){ 
        //console.log(e) 
    }  
}


// Delete client worker
function* deleteClientAsync(action){ 
    try{   
        yield call(axios.delete, `https://api.ahsaltd.net/bkapp/all-clients/${action.id}/`);
        yield put({ type: "DELETE_SUCCESS",  payload:action.id});
        //console.log(action.id);  
    }
    catch (e){ 
        //console.log(e);
    }  
}

// Update client worker
function* updateClientAsync(action){   
    try{  
        const response = yield call(axios.patch, `https://api.ahsaltd.net/bkapp/all-clients/${action.client.clientId}/`, {
        name: action.client.name,
        phone: action.client.phone,
        nationalId: action.client.idno
      }); 
      yield put({ type: "UPDATING_SUCCESS", res:response.data}); 
      // console.log(action.client);  
    }
    catch (e){ 
        //console.log(e);
       // yield put({ type: "UPDATING_FAILED", message:"Item failed to update"});
    }  
}

// View  client worker
function* viewClientAsync(action){  
    try{  
       const response = yield call(axios.get, `https://api.ahsaltd.net/bkapp/all-clients/${action.clientId}/`); 
        yield put({ type: "REQUEST_CLIENT_TO_VIEW_SUCCESS", res:response.data});
        //console.log(action.clientId);
    }
    catch (e){ 
        //console.log(e) 
    }  
}

// Search client worker
function* searchDbAsync(action){ 
    const source = axios.CancelToken.source();
    try{  
        const response = yield call(axios.get, `https://api.ahsaltd.net/bkapp/all-clients/?search=${action.query}`, {
            cancelToken: source.token
          })
        yield put({ type: "SEARCH_SUCCESS", res:response.data }); 
        // console.log(response.data);
        // console.log(action.query);
    }
    catch (thrown){ 
        if (axios.isCancel(thrown)) {
            // console.log('Request canceled', thrown.message);
          }
          else{
              // handle error
            // console.log('not canceled', thrown.message);
          }
    }
    if (true) {
        source.cancel('Request canceled!');
      }
}

// WATCHER SAGAS
//Get all clients watcher
export function* watchGetAllClients(){
    yield takeLatest(REQUEST_ALL_CLIENTS, getAllClientsAsync)
}

//Post client watcher
export function* watchPostClient(){
    yield takeLatest(POST_CLIENT, postClientAsync)
}

//Delete client watcher
export function* watchDeleteClient(){
    yield takeLatest(DELETE_CLIENT, deleteClientAsync)
}

//Update clients watcher
export function* watchUpdateClient(){
    yield takeLatest(UPDATE_CLIENT, updateClientAsync)
}

//View client watcher
export function* watchViewClient(){
    yield takeLatest(VIEW_CLIENT, viewClientAsync)
}

//Search clients watcher
export function* watchSearch(){
    yield takeLatest(SEARCH, searchDbAsync)
}