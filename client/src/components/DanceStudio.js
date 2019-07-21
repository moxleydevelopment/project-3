import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class DanceStudio extends Component {
    state = {
        danceStudio: {},
        editForm: false,
        danceClasses: [],
        redirectToHome: false
    }

    getStudio = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}`)
            .then((res) => {

                this.setState({ danceStudio: res.data, editForm: false })
            })
    }

    componentDidMount() {
        this.getStudio()
    }

    updateDanceStudio = (event) => {
        event.preventDefault()
        axios.put(`/api/dancestudio/${this.props.match.params.studioId}`, this.state.danceStudio)
            .then(() => {
                this.getStudio()
            })
    }

    deleteDanceStudio = () => {
        axios.delete(`/api/dancestudio/${this.props.match.params.studioId}`)
            .then(() => {
                this.setState({ redirectToHome: true })
            })
    }



    handleInputChange = (event) => {
        const copiedStudio = { ...this.state.danceStudio }
        copiedStudio[event.target.name] = event.target.value
        this.setState({ danceStudio: copiedStudio })


    }
    toggleForm = () => {
        if (this.state.editForm) {
            this.setState({ editForm: false })
        } else {
            this.setState({ editForm: true })
        }
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }


        return (
            <div>
                {this.state.editForm ?
                    <div>
                        <form className='form' onSubmit={this.updateDanceStudio}>
                            <label htmlFor='name'>Studio Name:</label>
                            <input type='text' name='name' onChange={this.handleInputChange} value={this.state.danceStudio.name}></input>
                            <label htmlFor='address'>Address:</label>
                            <input type='text' name='address' onChange={this.handleInputChange} value={this.state.danceStudio.address}></input>
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                            <input type='number' name='phoneNumber' onChange={this.handleInputChange} value={this.state.danceStudio.phoneNumber}></input>
                            <label htmlFor='hoursOfOperation'>Hours of Operation:</label>
                            <input type='text' name='hoursOfOperation' onChange={this.handleInputChange} value={this.state.danceStudio.hoursOfOperation}></input>
                            <label htmlFor='description'>Description:</label>
                            <textarea name='description' onChange={this.handleInputChange} value={this.state.danceStudio.description}></textarea>
                            <input type='submit' value='Submit'></input>

                        </form>
                    </div>
                    : <div>
                        <h1>{this.state.danceStudio.name}</h1>
                        <p>{this.state.danceStudio.address}</p>
                        <p>{this.state.danceStudio.phoneNumber}</p>
                        <p>{this.state.danceStudio.hoursOfOperation}</p>
                        <p>{this.state.danceStudio.description}</p>
                        <button onClick={this.toggleForm}>Update</button>
                        <button onClick={this.deleteDanceStudio}>Delete</button>
                    </div>
                }

            </div>
        );
    }
}

export default DanceStudio;