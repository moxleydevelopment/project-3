/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Studio from './Studio'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class DanceStudios extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        danceStudios: [],
        createNewStudio: false,
        newStudio: {}
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    allStudios = () => {
        axios.get('/api/dancestudio')
            .then((res) => {
                this.setState({ danceStudios: res.data, createNewStudio: false, newStudio: {} })
            })
    }

    componentDidMount() {
        this.allStudios()
    }

    createStudio = () => {
        const studio = { ...this.state.newStudio }
        axios.post('/api/dancestudio', studio)
            .then(this.allStudios())
    }

    handleInputChange = (event) => {
        const copiedStudio = { ...this.state.newStudio }
        copiedStudio[event.target.name] = event.target.value
        this.setState({ newStudio: copiedStudio })


    }
    toggleForm = () => {
        if (this.state.createNewStudio) {
            this.setState({ createNewStudio: false })
        } else {
            this.setState({ createNewStudio: true })
        }
    }

    render() {
        let studios = this.state.danceStudios.map((studio, index) => {
            return <Link key={index} to={`/dancestudio/${studio._id}`} >
                <Studio name={studio.name}
                    address={studio.address}
                /></Link>
        })
        return (
            <div className='studios-container'>
                {
                    this.state.createNewStudio ?
                        <div>
                            <form className='form' onSubmit={this.createStudio}>
                                <label htmlFor='name'>Studio Name:</label>
                                <input type='text' name='name' onChange={this.handleInputChange}></input>
                                <label htmlFor='address'>Address:</label>
                                <input type='text' name='address' onChange={this.handleInputChange}></input>
                                <label htmlFor='phoneNumber'>Phone Number:</label>
                                <input type='number' name='phoneNumber' onChange={this.handleInputChange}></input>
                                <label htmlFor='hoursOfOperation'>Hours of Operation:</label>
                                <input type='text' name='hoursOfOperation' onChange={this.handleInputChange}></input>
                                <label htmlFor='description'>Description:</label>
                                <textarea name='description' onChange={this.handleInputChange}></textarea>
                                <input type='submit' value='Submit'></input>

                            </form>
                        </div>

                        : <div className='home-container'>
                            <div class="videoContainer">
                                <iframe 
                                class="videoContainer__video" 
                                width="1920" 
                                height="1080" 
                                src="http://www.youtube.com/embed/IsBInsOj8TY?modestbranding=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=IsBInsOj8TY" 
                                frameborder="0">

                                </iframe>
                            </div>
                            <h1>Title For Home Page</h1>
                            {studios}
                            <button onClick={this.toggleForm}>Add Studio</button>
                        </div>

                }

            </div>
        )
    }
}
