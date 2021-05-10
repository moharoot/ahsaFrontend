import { takeLatest, put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import {  
    USER_LOADED, 
    AUTH_ERROR,
    LOG_IN,
    LOGOUT 
} from '../actions/authActions'  
 

//Check the token and load the user
 

// WORKER SAGAS
// 
const getItems = state => state.authR.token;
function* userLoadingWorker(){  
    try{  
        // user loading
        const token = yield select(getItems); 
        //console.log(token)
        
        //Headers
        const config = {
            headers: { 
                'Content-Type': 'application/json'
            }
        }

        // if token, add to headers config
        if(token){
            config.headers['Authorization'] = `Token ${token}`;
        }
        const res = yield call(axios.get, 'https://api.ahsaltd.net/users/user/', config);
        yield put({ type: "USER_LOADED_SUCCESS", payload: res.data});
            
    }
    catch (e){ 
        yield put({ type: AUTH_ERROR});
    }  
}

//login user

// WORKER SAGAS
// 
function* loginWorker(action){  
    try{  
        //Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
    
        const res = yield call(axios.post,'https://api.ahsaltd.net/users/login/', {
            username:action.user.username,
            password:action.user.password,
            }, config);
        yield put({ type: "LOGIN_SUCCESS", payload: res.data});
            
    }
    catch (e){ 
        yield put({ type: "LOGIN_FAIL"});
    }  
}

//logout 
function* logoutWorker(){  
    try{   
        const token = yield select(getItems);   

         //Headers
        const config = {
            headers: { 
                'Content-Type': 'application/json'
            }
        }

        // if token, add to headers config
        if(token){
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = yield call(axios.post, 'https://api.ahsaltd.net/users/logout/', null, config);
        yield put({ type: "LOGOUT_SUCCESS"});
            
    }
    catch (e){ 
        yield put({ type: AUTH_ERROR});
    }  
}


// WATCHER SAGAS
//Get clients watcher
export function* watchUserLoading(){
    yield takeLatest(USER_LOADED, userLoadingWorker)
}

export function* watchLogin(){
    yield takeLatest(LOG_IN, loginWorker)
}

export function* watchLogout(){
    yield takeLatest(LOGOUT, logoutWorker)
}