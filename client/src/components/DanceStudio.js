import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import DanceClasses from './DanceClasses';
import { Link } from 'react-router-dom'


class DanceStudio extends Component {
    state = {
        danceStudio: {},
        editForm: false,
        danceClasses: [],
        newDanceClass: {
            studioId: ''
        },
        redirectToHome: false,
        addClass: false
    }

    getStudio = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}`)
            .then((res) => {

                this.setState({ danceStudio: res.data, editForm: false, addClass: false })
                axios.get(`/api/dancestudio/${this.props.match.params.studioId}/danceclass`)
                    .then((classes) => {
                        this.setState({ danceClasses: classes.data })
                    })

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

    addDanceClass = () => {
        axios.post(`/api/dancestudio/${this.props.match.params.studioId}/danceclass`, this.state.newDanceClass)
            .then(() => {
                this.getStudio()
            })
    }



    handleInputChange = (event) => {
        const copiedStudio = { ...this.state.danceStudio }
        copiedStudio[event.target.name] = event.target.value
        this.setState({ danceStudio: copiedStudio })
    }

    handleInputChangeOnClass = (event) => {
        const copiedClass = { ...this.state.newDanceClass }
        copiedClass[event.target.name] = event.target.value
        copiedClass.studioId = this.state.danceStudio._id
        this.setState({ newDanceClass: copiedClass })
    }



    toggleForm = () => {
        if (this.state.editForm) {
            this.setState({ editForm: false })
        } else {
            this.setState({ editForm: true })
        }
    }

    addClassBtn = () => {
        this.setState({ editForm: false, addClass: true })
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        let dance = this.state.danceClasses.filter((dance) => {
            return dance.studioId === this.state.danceStudio._id

        })

        let newDance = dance.map((dance, index) => {
            return (
                <Link key={index}  to={`/dancestudio/${this.props.match.params.studioId}/danceclass/${dance._id}`}>
                    <DanceClasses
                        
                        studioId={dance.studioId}
                        name={dance.name}
                        instructor={dance.instructor}
                        classSize={dance.classSize}
                    >
                    </DanceClasses>
                </Link>


            )
        })


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
                    : this.state.addClass ?
                        <div>
                            <h1>Add New Dance Class</h1>
                            <form className='form' onSubmit={this.addDanceClass}>
                                <label htmlFor='name'>Class Name:</label>
                                <input type='text' name='name' onChange={this.handleInputChangeOnClass}></input>
                                <label htmlFor='instructor'>Instructor</label>
                                <input type='text' name='instructor' onChange={this.handleInputChangeOnClass}></input>
                                <label htmlFor='classSize'>Class Size:</label>
                                <input type='number' name='classSize' onChange={this.handleInputChangeOnClass}></input>
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
                            <button onClick={this.addClassBtn}>Add Class</button>
                            {newDance}
                        </div>
                }

            </div>
        );
    }
}

export default DanceStudio;