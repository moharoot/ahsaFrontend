import { fork, all } from 'redux-saga/effects'
import { watchGetAllClients, watchPostClient, watchDeleteClient, watchUpdateClient, watchViewClient, watchSearch } from './clientSaga'  
import { watchGetCredits, watchPostCredit } from './creditSaga'  
import { watchGetDebits, watchPostDebit } from './debitSaga'  
import { watchGetRate, watchPostRate } from './rateSaga'  
import { watchGetCB, watchPostCB} from './CBSaga'  
import { watchUserLoading, watchLogin, watchLogout } from './authSagas'


//ROOT SAGA
export default function* RootSaga(){
    yield all([ 
        ////////// CLIENTS ////////////
        // Getting client watcher
        fork(watchGetAllClients), 
        // Posting client watcher
        fork(watchPostClient) ,
         // Delting client watcher
         fork(watchDeleteClient) ,
        // Update client watcher
         fork(watchUpdateClient),
        // View client watcher
        fork(watchViewClient),
        // Search Clients
        fork(watchSearch),

        ////////// CREDITS ////////////
        fork(watchGetCredits),
        fork(watchPostCredit),

        ////////// DEBITS ////////////
        fork(watchGetDebits),
        fork(watchPostDebit),

         ////////// RATES ////////////
         fork(watchGetRate),
         fork(watchPostRate),

         ////////// Closing Balance Saga ////////////
         fork(watchGetCB),
         fork(watchPostCB),

        ////////// AUTH ////////////
        fork(watchUserLoading),
        
        fork(watchLogin),

        fork(watchLogout),
    ])
}
