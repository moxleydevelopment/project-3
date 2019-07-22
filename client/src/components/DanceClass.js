import React, { Component } from 'react';
import axios from 'axios'

class DanceClass extends Component {

    state = {
        danceClass: {},
        isUpdateForm: false
    }

    getClass = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}/danceclass/${this.props.match.params.classId}`)
            .then((classes) => {
                this.setState({ danceClass: classes.data })
            })
    }

    componentDidMount() {
        this.getClass()
    }

    updateDanceClass = (event) => {
        event.preventDefault()
        axios.put(`/api/dancestudio/${this.props.match.params.studioId}/danceclass/${this.props.match.params.classId}`, this.state.danceClass)
            .then(() => {
                this.getClass()
            })
    }

    handleInputChange = (event) => {
        const copiedClass = { ...this.state.danceClass }
        copiedClass[event.target.name] = event.target.value
        this.setState({ danceClass: copiedClass })
    }

    toggleForm = () => {
        if (this.state.createNewStudio) {
            this.setState({ isUpdateForm: false })
        } else {
            this.setState({ isUpdateForm: true })
        }
    }
    render() {
        return (
            <div>
                {this.state.isUpdateForm ?
                    <div>
                        <form className='form' onSubmit={this.updateDanceClass}>
                            <label htmlFor='name'> Class Name:</label>
                            <input type='text' name='name' onChange={this.handleInputChange} value={this.state.danceClass.name}></input>
                            <label htmlFor='address'>Instructor:</label>
                            <input type='text' name='instructor' onChange={this.handleInputChange} value={this.state.danceClass.instructor}></input>
                            <label htmlFor='phoneNumber'>Class Size:</label>
                            <input type='number' name='classSize' onChange={this.handleInputChange} value={this.state.danceClass.classSize}></input>
                            <input type='submit' value='Submit'></input>

                        </form>

                    </div>
                    :
                    <div>
                    <h1>{this.state.danceClass.name}</h1>
                     <button onClick={this.toggleForm}>Update</button>
                    </div>
                }

            </div>
        );
    }
}

export default DanceClass;