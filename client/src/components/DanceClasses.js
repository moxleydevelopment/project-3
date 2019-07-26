import React, { Component } from 'react';
import axios from 'axios'


class DanceClass extends Component {
      state = {
          bkImages: []
      }

    getBackground = ()=>{
            axios.get(`https://api.unsplash.com/photos/search?client_id=24cf3009b229ebaece09d9a5d96e5193838c23585fddea759d7a5589f4028c12&query=${this.props.danceType}+dance`)
            .then((res)=>{
                this.setState({bkImages: [...res.data]})
            })
    }

    componentDidMount(){
        this.getBackground()
    }

    getRandomInt = (min, max)=>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    

    getImage = ()=>{
       let index = this.getRandomInt(0 , this.state.bkImages.length)
       console.log(index)
            return {...this.state.bkImages[index]}

    }


    render() {
        let bkImage = this.getImage()
        let imageURL = {...bkImage.urls}
        console.log(imageURL.small)

        return (
            <div className='danceCard' style={{backgroundImage:`url(${imageURL.regular})`}}>
               <h1>{this.props.name}</h1> 
               <p>{this.props.instructor}</p>
               <form action={`/dancestudio/${this.props.studioId}/danceclass/${this.props.id}`}>
                   <input className='btn' type='submit' value='Sign Up'></input>
               </form>
              
            </div>
        );
    }
}

export default DanceClass;