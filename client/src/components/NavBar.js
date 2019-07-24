import React, { Component } from 'react';

class NavBar extends Component {

    state = {
        prevScrollpos: window.pageYOffset,
        opacity: 0
       
      }

      handleScroll = ()=>{
        const { prevScrollpos } = this.state
        let opacity = this.state.opacity
        const currentScrollPos = window.pageYOffset
        const visible = prevScrollpos > currentScrollPos
        this.setState({
            prevScrollpos: currentScrollPos,
          });

          if (visible){
            opacity--
            this.setState({opacity})
          }else{
            opacity++
            this.setState({opacity})
              

          }
      }

      componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
      
      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }


    render() {
        return (
            <div className='nav-bar-container sticky'>
                <div className='nav-header'>
                    <h1>Dance Title</h1>
                </div>
                <div className='nav-links'>  
                    <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='#'>About</a></li>
                </ul>
                </div>
               
                
            </div>
        );
    }
}

export default NavBar;