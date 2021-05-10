const initialState = { 
    cb: [],  
  };

const CBReducer = (state = initialState, action) => {
    switch(action.type){ 
        case 'REQUEST_CB_SUCCESS':
            return {
                ...state,
                cb:action.res
            }
        case 'POSTING_CB_SUCCESS':
            return {
                ...state,
                cb: [...state.cb, action.res]
            }  
    
        default:
            return state;
    }
}

export default CBReducer;
