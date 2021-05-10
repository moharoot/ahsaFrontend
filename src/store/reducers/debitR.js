const initialState = { 
    debits: [],  
    debitToAdd:[] 
  };

const debitR = (state = initialState, action) => {
    switch(action.type){ 
        case 'REQUEST_DEBITS_SUCCESS':
            return {
                ...state,
                debits:action.res
            } 
        case 'SEARCH_DEBIT_SUCCESS':
            return {
                ...state,
                debits:action.res
            }
        case 'ADD_DEBIT':   
            return {
                ...state,  
                debitToAdd:[action.client]
            }
        default:
            return state;
    }
}

export default debitR;
