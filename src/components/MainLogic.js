import React, {useEffect} from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { requestAllClients } from '../store/actions/clientActions'

function MainLogic(props) {
    const dispatch = useDispatch();
    // When the component is mounted, retrieve the data
    useEffect(() => { 
        dispatch(requestAllClients());
    }, []);

    const clients = useSelector(state => state.clientR.clients);  

    const withCreditsAndDebits = clients.filter(client =>{
        return client.deposits.length !== 0 || client.borroweds.length !== 0 
    } )
    let counter = 0
    const clientList = withCreditsAndDebits.length ? (
        withCreditsAndDebits.map(client =>{
            const viewOnClick = (e) =>{  
                // dispatch(viewClient(client.id));   
                props.history.push({
                pathname: '/client-transaction',
                search: `?client=${client.id}`,  
                })   
             }
            let deposits = client.deposits 
            let borroweds = client.borroweds 
            // USD Credits
           const usdDep = deposits.filter(deposit => {
            return deposit.currency === "USD"
            }) 
            // Sum the USD Credits
            const totalUsdDep = usdDep.reduce((a, d) => a+parseInt(d.amount_deposited), 0)
        
            // USD Debits
            const usdBorr = borroweds.filter(borrowed => {
            return borrowed.currency === "USD"
            }) 
            // Sum the USD Debits
            const totalUsdBorr = usdBorr.reduce((a, b) => a+parseInt(b.amount_borrowed), 0)
            
            // USD Balance
            const usdBal = totalUsdDep - totalUsdBorr

            // KSH Deposits
            const kshDep = deposits.filter(deposit => {
            return deposit.currency === "KSH"
            }) 
            // Sum the USD Deposits
            const totalKshDep = kshDep.reduce((a, d) => a+parseInt(d.amount_deposited), 0)

            // KSH Debits
            const kshBorr = borroweds.filter(borrowed => {
            return borrowed.currency === "KSH"
            }) 
            // Sum the KSH Debits
            const totalKshBorr = kshBorr.reduce((a, b) => a+parseInt(b.amount_borrowed), 0)

            // KSH Balance
            const kshBal = totalKshDep - totalKshBorr

           let name = client.name
           let phone = client.phone
           let nationalId = client.nationalId
           counter++
            return(  
                 <tr className="cl" key={client.id}> 
                     <td>{counter}</td> 
                     <td>{name}</td> 
                     <td>{totalKshDep}</td> 
                     <td>{totalKshBorr}</td>    
                     <td>{kshBal}</td>  
                     <td>{totalUsdDep}</td> 
                     <td>{totalUsdBorr}</td>    
                     <td>{usdBal}</td>   
                     <td>{phone}</td>      
                     <td>{nationalId}</td>      
                     <td className="actions">  
                        <span><i  onClick={viewOnClick} className="fa fa-eye"></i></span>
                    </td>   
                </tr>
            )
        })

           
    ) : (
        <tr>        
            <td>
                No clients to display.
            </td>
        </tr>

    )

    return (
            <React.Fragment>
                {clientList}
            </React.Fragment>
    )
}

export default MainLogic
