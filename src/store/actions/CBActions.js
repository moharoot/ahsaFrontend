export const POST_CB = "POST_CB"
export const REQUEST_CB = "REQUEST_CB"  


export function requestCB() {
   return{
       type: REQUEST_CB
   }
}


export const postCB = (cb) => {
    return {
        type: POST_CB,
        cb
    }
}
