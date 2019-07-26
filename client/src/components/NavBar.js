import React, { Component } from 'react'




class NavBar extends Component {

  state = {
    prevScrollpos: window.pageYOffset,
    opacity: 1

  }



  handleScroll = () => {
    const { prevScrollpos } = this.state
    let opacity = this.state.opacity
    const currentScrollPos = window.pageYOffset
    const visible = prevScrollpos > currentScrollPos
    this.setState({
      prevScrollpos: currentScrollPos,
    });

    if ((this.state.opacity <= 1) && (this.state.opacity > 0)) {
      if (visible) {
        (opacity = opacity + .1)
        if(opacity <=1){this.setState({ opacity })}
        } else {
        (opacity = opacity - .1)
        if(opacity >= 0){this.setState({ opacity })}
         }
      console.log(this.state.opacity)
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
      <div style={{ opacity: this.state.opacity }} className='nav-bar-container sticky'>
        <div className='nav-header'>
          <h1>Dance Life  <i className='fas fa-music'></i></h1>
        </div>
        <div className='nav-links'>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/'>About</a></li>
          </ul>
        </div>


      </div>
    );
  }
}

export default NavBar;