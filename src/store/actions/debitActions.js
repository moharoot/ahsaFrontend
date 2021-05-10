export const ADD_DEBIT = "ADD_DEBIT"
export const POST_DEBIT = "POST_DEBIT"
export const REQUEST_DEBITS = "REQUEST_DEBITS"
export const SEARCH_DEBIT = "SEARCH_DEBIT"
export const DELETE_DEBIT = "DELETE_DEBIT"
export const EDIT_DEBIT = "EDIT_DEBIT" 
export const UPDATE_DEBIT = "UPDATE_DEBIT" 

export function requestDebits() {
   return{
       type: REQUEST_DEBITS
   }
}

export function searchDebit(query) {
    return{
        type: SEARCH_DEBIT,
        query
    }
}

export const postDebit = (debit) => {
    return {
        type: POST_DEBIT,
        debit
    }
}

export const addDebit = (client) => {
    return {
        type: ADD_DEBIT,
        client
    }
}

export const deleteDebit = (id) => {
    return {
        type: DELETE_DEBIT,
        id
    }
 }

 export const editDebit = (debit) => {
    return {
        type: EDIT_DEBIT,
        debit
    }
}

export const updateDebit = (debit) => {
    return {
        type: UPDATE_DEBIT,
        debit
    }
}