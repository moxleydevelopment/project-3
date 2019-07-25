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
    getAllStudios = () => {
        axios.get('/api/dancestudio')
            .then((res) => {
                this.setState({ danceStudios: res.data, createNewStudio: false, newStudio: {} })
            })
    }

    componentDidMount() {
        this.getAllStudios()
    }

    createStudio = () => {
        const studio = { ...this.state.newStudio }
        axios.post('/api/dancestudio', studio)
            .then(this.getAllStudios())
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
            return <Link className='studio-title' key={index} to={`/dancestudio/${studio._id}`} >
                <Studio name={studio.name}
                    address={studio.address}
                /></Link>
        })
        return (
            <div className='studios-container'>
                {
                    this.state.createNewStudio ?
                        <div className='backgroundImg'>
                            <h1 className='rep-header'>Rep Your Dance Studio!!</h1>
                            <form className='form add-studio' onSubmit={this.createStudio}>
                                <label htmlFor='name'>Studio Name:</label>
                                <input type='text' name='name' onChange={this.handleInputChange}></input>
                                <label htmlFor='address'>Address:</label>
                                <input type='text' name='address' onChange={this.handleInputChange}></input>
                                <label htmlFor='phoneNumber'>Phone Number:</label>
                                <input type='tel' name='phoneNumber' onChange={this.handleInputChange}></input>
                                <label htmlFor='hoursOfOperation'>Hours of Operation:</label>
                                <input type='text' name='hoursOfOperation' onChange={this.handleInputChange}></input>
                                <label htmlFor='description'>Description:</label>
                                <textarea name='description' onChange={this.handleInputChange}></textarea>
                                <input className='btn' type='submit' value='Submit'></input>

                            </form>
                        </div>

                        :

                        <div className='home-container'>
                            <div className="bg-video">
                                <div className="overlay"></div>
                                <div id="player"></div>
                            </div>
                            <h1 className='home-studio-banner'>Dance Studio's</h1>
                            {studios}
                            <button className='btn' onClick={this.toggleForm}>Add Studio</button>
                            <p>Click too add your favorite dance studio...</p>
                        </div>

                }

            </div>
        )
    }
}
