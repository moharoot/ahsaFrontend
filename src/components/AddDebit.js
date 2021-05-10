import React, { useState, useEffect } from 'react'; 
import { postDebit } from '../store/actions/debitActions'
import { useSelector, useDispatch } from 'react-redux'
const AddDebit = (props) => { 
    const dispatch = useDispatch();
    const debit = useSelector(state => state.debitR.debitToAdd);
    let id = debit[0].id;
    let name = debit[0].name; 

    const [state, updateState] = useState({ 
        debits:[{clientId:id, dCurrency:"", dDescription:"", debitAmount:""}]
    });

    // Function to append the inputs
    const addClick = () =>{
        updateState(prevState => ({ 
            debits: [...prevState.debits, {clientId:id, dCurrency:"", dDescription:"", debitAmount:"" }]
        }))
      }

    // Function to remove the inputs
      const removeClick = (i) =>{
        let debits = [...state.debits];
        debits.splice(i, 1);
        updateState({ debits });
    }

    // Onchange function
    const handleChange = (e, i) =>{
        const { name, value } = e.target;
        let debits = [...state.debits];
        debits[i] = {...debits[i], [name]: value};
        updateState({ debits });
    }

    // Inputs to append the form
    const createUI = () =>{
        return state.debits.map((el, i) => (
            <div className="inputs__group" key={i}>
                <div className="group">
                    <div>
                        <label>Currency</label>
                        <select required className="dCurrency" name="dCurrency" onChange={e => handleChange(e,i)}>
                            <option value="">Choose Currency</option>
                            <option value="KSH">KSH</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div>
                        <label>Amount</label>
                        <input type="text" required className="debitAmount" name="debitAmount" value={el.debitAmount ||''} onChange={e => handleChange(e,i)} />
                    </div>
                </div>
                <div className="textarea__group">     
                    <div>
                        <label>Description</label>
                        <textarea className="dDescription" name="dDescription" value={el.dDescription ||''} onChange={e => handleChange(e,i)}></textarea> 
                    </div>
                    <i className="fa fa-times" onClick={() => removeClick(i)}></i>
                </div>
            </div>         
        ))
     }


    const closeAddOverlay = props.closeAddOverlay;

     // Submit Client
     const handleSubmit = (e) =>{ 
        e.preventDefault(); 
        for(let debit of state.debits){
            console.log(debit)
            dispatch(postDebit(debit))
        }
        // Close the overlay onSubmit
        closeAddOverlay()
     }

        return (
            <div className="container"> 
                <div className="overlay">
                    <div className="wrapper">
                        <p className="heading">Add Credit</p> 
                        <form onSubmit={handleSubmit}>
                            <label>Fullname</label>
                            <input type="text" required name="name" readOnly value={name} />
                            <div className="inputs__container">
                                {createUI()}        
                            </div>
                            <div className="buttons">
                                <p className="add" onClick={addClick}><i className="fa fa-plus"></i></p>
                                <p><input type="submit" value="Add Debit"/></p>
                            </div>
                        </form>
                        <div className="close">
                            <i onClick={closeAddOverlay} className="fa fa-close"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default AddDebit; 
             
           