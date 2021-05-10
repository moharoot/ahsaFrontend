const initialState = { 
    credits: [],  
    creditToAdd:[] 
  };

const creditR = (state = initialState, action) => {
    switch(action.type){ 
        case 'REQUEST_CREDITS_SUCCESS':
            return {
                ...state,
                credits:action.res
            } 
        case 'SEARCH_CREDIT_SUCCESS':
            return {
                ...state,
                credits:action.res
            }
        case 'ADD_CREDIT':   
            return {
                ...state,  
                creditToAdd:[action.client]
            }
        default:
            return state;
    }
}

export default creditR;
