const initialState = { 
    rate: [],  
  };

const rateR = (state = initialState, action) => {
    switch(action.type){ 
        case 'REQUEST_RATE_SUCCESS':
            return {
                ...state,
                rate:action.res
            }
        case 'POSTING_RATE_SUCCESS':
            return {
                ...state,
                rate: [...state.rate, action.res]
            }  
    
        default:
            return state;
    }
}

export default rateR;
