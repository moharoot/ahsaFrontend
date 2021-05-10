const initialState = { 
    clients:[], 
    clientToEdit:[],
    clientToView: [],
  };

const clientR = (state = initialState, action) => {
    switch(action.type){ 
        case 'REQUEST_ALL_CLIENTS_SUCCESS':
            // console.log(state.clients)
            return {
                ...state,
                clients:action.res
            }
        case 'POSTING_SUCCESS':
            return {
                ...state,
                clients: [...state.clients, action.res]
            }  
        case 'DELETE_SUCCESS':
            return {
                ...state,
                clients: state.clients.filter(client => client.id !== action.payload)
            }
        case 'EDIT_CLIENT': 
            return {
                ...state,  
                clientToEdit:action.client
            } 
        case 'UPDATING_SUCCESS':
            //console.log(action.res)
            let updatedList = state.clients.filter(client =>{
                if(client.id === action.res.id){ 
                    client.name = action.res.name
                    client.phone = action.res.phone
                    client.email = action.res.email
                    client.nationalId = action.res.nationalId
                }
                return client;
            }); 
            return {
                ...state,
                clients: updatedList,
            }
        case 'REQUEST_CLIENT_TO_VIEW_SUCCESS':
            // console.log(action.res)
            return {
                ...state,
                clientToView:action.res
            }
        case 'SEARCH_SUCCESS':
            return {
                ...state,
                clients:action.res
            }
        default: 
            return state;
    }
}

export default clientR;
