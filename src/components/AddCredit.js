import React, { useState, useEffect } from 'react'; 
import { postCredit } from '../store/actions/creditActions'
import { useSelector, useDispatch } from 'react-redux'
const AddCredit = (props) => { 
    const dispatch = useDispatch();
    const credit = useSelector(state => state.creditR.creditToAdd);
    let id = credit[0].id;
    let name = credit[0].name; 

    const [state, updateState] = useState({ 
        credits:[{clientId:id, cCurrency:"", cDescription:"", creditAmount:""}]
    });

    // Function to append the inputs
    const addClick = () =>{
        updateState(prevState => ({ 
            credits: [...prevState.credits, {clientId:id, cCurrency:"", cDescription:"", creditAmount:"" }]
        }))
      }

    // Function to remove the inputs
      const removeClick = (i) =>{
        let credits = [...state.credits];
        credits.splice(i, 1);
        updateState({ credits });
    }

    // Onchange function
    const handleChange = (e, i) =>{
        const { name, value } = e.target;
        let credits = [...state.credits];
        credits[i] = {...credits[i], [name]: value};
        updateState({ credits });
    }

    // Inputs to append the form
    const createUI = () =>{
        return state.credits.map((el, i) => (
            <div className="inputs__group" key={i}>
                <div className="group">
                    <div>
                        <label>Currency</label>
                        <select required className="cCurrency" name="cCurrency" onChange={e => handleChange(e,i)}>
                            <option value="">Choose Currency</option>
                            <option value="KSH">KSH</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div>
                        <label>Amount</label>
                        <input type="text" required className="creditAmount" name="creditAmount" value={el.creditAmount ||''} onChange={e => handleChange(e,i)} />
                    </div>
                </div>
                <div className="textarea__group">     
                    <div>
                        <label>Description</label>
                        <textarea className="cDescription" name="cDescription" value={el.cDescription ||''} onChange={e => handleChange(e,i)}></textarea> 
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
        for(let credit of state.credits){
            console.log(credit)
            dispatch(postCredit(credit))
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
                            <p><input type="submit" value="Add Credit"/></p>
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

export default AddCredit; 