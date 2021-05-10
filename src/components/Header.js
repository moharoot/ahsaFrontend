import React, {useEffect, useState} from 'react' 
import { NavLink } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/authActions' 

function Header() {
    const [state, updateState] = useState({ 
        dropdownVisibility: false,
    });
    
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authR); 
    const isAuthenticated = auth.isAuthenticated;
    const user = auth.user;

   
    // Hide the dropdown when anywhere else on the body is clicked
    const hideDropMenu = () => {
        const body = document.querySelector('body')
        body.addEventListener('click', function(e){
            let dropdown = document.querySelector('.dropdown') 
            let target = e.target 
            if(!target.classList.contains('droplink')){
                 dropdown.classList.remove('visible') 
                updateState({ 
                    dropdownVisibility: false, 
                })
            }
        })
    }
     useEffect(() => { 
        // Calling the hideDropDown menu function
            //hideDropMenu()
    }, []);

    // When droplink is clicked, toggle dropdown
    const toggleMenu = () =>{ 
        let dropdown = document.querySelector('.dropdown') 
        if(!state.dropdownVisibility){
            dropdown.classList.add('visible') 
            updateState({ 
                dropdownVisibility: true, 
            })
        }
        else{
            dropdown.classList.remove('visible')  
            updateState({ 
                dropdownVisibility: false, 
            })
        }
    }
    
    
    return (
        <header> 
            <nav className="header_nav">
                <ul className="header_nav_list">
                    {/* <li><NavLink to="/">Home</NavLink></li>  */}
                    <li><NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/Customers">Customers</NavLink></li>
                    <li><NavLink to="/credits">Credits</NavLink></li>
                    <li><NavLink to="/debits">Debits</NavLink></li>
                    <li><NavLink to="/transaction-report">Transaction Report</NavLink></li>
                    <li className="nav_dropdown"><span to="/#" className="droplink"  /* onClick={toggleMenu} */>System Settings</span>
                        <ul className="dropdown" >
                            <li><NavLink to="/exchange-rates">Exchange Rate</NavLink></li>
                           {/* <li><NavLink to="/users">Users</NavLink></li>
                            <li><NavLink to="/system-rights">System Rights</NavLink></li>
                            <li><NavLink to="/business-info">Business Info</NavLink></li>
                            <li><NavLink to="/change-password">Change Password</NavLink></li>
                            <li><NavLink to="/system-roles">System Roles</NavLink></li> */}
                        </ul>
                    </li>
                     <li className="user__name"><span>{user ? `Welcome ${user.username}`: ""}</span></li>
                    <li onClick = {() => {dispatch(logout())}}><span>Logout</span></li> 
                    {/* <li><NavLink to="/test">test</NavLink></li> */}
                </ul>
            </nav>
        </header>
    )
}

export default Header
