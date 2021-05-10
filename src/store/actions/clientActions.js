export const POST_CLIENT = "POST_CLIENT" 
export const REQUEST_ALL_CLIENTS = "REQUEST_ALL_CLIENTS"
export const DELETE_CLIENT = "DELETE_CLIENT"
export const EDIT_CLIENT = "EDIT_CLIENT" 
export const UPDATE_CLIENT = "UPDATE_CLIENT" 
export const VIEW_CLIENT = "VIEW_CLIENT"  
export const SEARCH = "SEARCH"

export function requestAllClients() {
   return{
       type: REQUEST_ALL_CLIENTS
   }
}

export function searchAction(query) {
    return{
        type: SEARCH,
        query
    }
}

export const postClient = (client) => {
   return {
       type: POST_CLIENT,
       client
   }
}

export const deleteClient = (id) => {
    return {
        type: DELETE_CLIENT,
        id
    }
 }

 export const viewClient = (clientId) => {
    return {
        type: VIEW_CLIENT,
        clientId
    }
}

export const editClient = (client) => {
    return {
        type: EDIT_CLIENT,
        client
    }
}
export const updateClient = (client) => {
    return {
        type: UPDATE_CLIENT,
        client
    }
}
 