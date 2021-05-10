export const POST_RATE = "POST_RATE"
export const REQUEST_RATE = "REQUEST_RATE"  


export function requestRate() {
   return{
       type: REQUEST_RATE
   }
}


export const postRate = (todayRate) => {
    return {
        type: POST_RATE,
        todayRate
    }
}
