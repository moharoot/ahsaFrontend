export const SEARCH_BY_DATE = "SEARCH_BY_DATE"

export function searchByDate(date) {
    return{
        type: SEARCH_BY_DATE,
        date
    }
}


