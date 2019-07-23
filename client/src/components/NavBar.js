import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div className='nav-bar-container'>
                <div className='nav-header'>
                    <h1>Dance Title</h1>
                </div>
                <div className='nav-links'>  
                    <ul>
                    <li>Home</li>
                    <li>About</li>
                </ul>
                </div>
               
                
            </div>
        );
    }
}

export default NavBar;