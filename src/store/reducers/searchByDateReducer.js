const initialState = { 
    date: null,  
  };

const Sbdr  = (state = initialState, action) => {
    switch(action.type){ 
        case 'SEARCH_BY_DATE':
            return {
                ...state,
                date: action.date
            } 
        default:
            return state;
    }
}

export default Sbdr ;
