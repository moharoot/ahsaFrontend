const initialState = { 
    token:localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,  
  };

const authR  = (state = initialState, action) => {
    switch(action.type){ 
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }  
        case 'USER_LOADED_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload 
            } 
        case 'LOGIN_SUCCESS': 
            localStorage.setItem('token', action.payload.token);
            // console.log( action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            } 
           
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false, 
            }  
        default:
            return state;
    }
}

export default authR ;
