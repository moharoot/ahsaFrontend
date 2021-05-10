export const ADD_CREDIT = "ADD_CREDIT"
export const POST_CREDIT = "POST_CREDIT"
export const REQUEST_CREDITS = "REQUEST_CREDITS"
export const SEARCH_CREDIT = "SEARCH_CREDIT"
export const DELETE_CREDIT = "DELETE_CREDIT"
export const EDIT_CREDIT = "EDIT_CREDIT" 
export const UPDATE_CREDIT = "UPDATE_CREDIT" 

export function requestCredits() {
   return{
       type: REQUEST_CREDITS
   }
}

export function searchCredit(query) {
    return{
        type: SEARCH_CREDIT,
        query
    }
}

export const postCredit = (credit) => {
    return {
        type: POST_CREDIT,
        credit
    }
}

export const addCredit = (client) => {
    return {
        type: ADD_CREDIT,
        client
    }
}

export const deleteCredit = (id) => {
    return {
        type: DELETE_CREDIT,
        id
    }
 }

 export const editCredit = (credit) => {
    return {
        type: EDIT_CREDIT,
        credit
    }
}

export const updateCredit = (credit) => {
    return {
        type: UPDATE_CREDIT,
        credit
    }
}