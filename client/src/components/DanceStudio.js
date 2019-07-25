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
        addClass: false,

    }

    getStudio = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}`)
            .then((res) => {

                this.setState({ danceStudio: res.data, editForm: false, addClass: false })
                this.getClass()


            })
    }

    getClass = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}/danceclass`)
            .then((classes) => {
                this.setState({ danceClasses: classes.data })
            })

    }

    componentDidMount() {
        this.getStudio()
    }

    updateDanceStudio = (event) => {
        event.preventDefault()
        axios.put(`/api/dancestudio/${this.props.match.params.studioId}`, this.state.danceStudio)
            .then(() => {
                this.setState({editForm: false})
                this.getClass()
            })
    }

    deleteDanceStudio = () => {
        axios.delete(`/api/dancestudio/${this.props.match.params.studioId}`)
            .then(() => {
                this.setState({ redirectToHome: true })
            })
    }

    addDanceClass = (event) => {
        event.preventDefault()
        axios.post(`/api/dancestudio/${this.props.match.params.studioId}/danceclass`, this.state.newDanceClass)
            .then(() => {
                this.setState({addClass: false})
                this.getClass()
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
                <Link key={index} to={`/dancestudio/${this.props.match.params.studioId}/danceclass/${dance._id}`}>
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
            <div className='single-studio-container backgroundImg'>
                {this.state.editForm ?
                    <div className='edit-studio'>
                        <form className='form edit-studio-form ' onSubmit={this.updateDanceStudio}>
                            <label htmlFor='name'>Studio Name:</label>
                            <input type='text' name='name' onChange={this.handleInputChange} value={this.state.danceStudio.name}></input>
                            <label htmlFor='address'>Address:</label>
                            <input type='text' name='address' onChange={this.handleInputChange} value={this.state.danceStudio.address}></input>
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                            <input type='tel' name='phoneNumber' onChange={this.handleInputChange} value={this.state.danceStudio.phoneNumber}></input>
                            <label htmlFor='hoursOfOperation'>Hours of Operation:</label>
                            <input type='text' name='hoursOfOperation' onChange={this.handleInputChange} value={this.state.danceStudio.hoursOfOperation}></input>
                            <label htmlFor='description'>Description:</label>
                            <textarea name='description' onChange={this.handleInputChange} value={this.state.danceStudio.description}></textarea>
                            <input className='btn' type='submit' value='Submit'></input>

                        </form>
                    </div>
                    : this.state.addClass ?
                        <div className='new-class'>
                            <h1>Add New Dance Class</h1>
                            <form className='form new-class-form' onSubmit={this.addDanceClass}>
                                <label htmlFor='name'>Class Name:</label>
                                <input type='text' name='name' onChange={this.handleInputChangeOnClass}></input>
                                <label htmlFor='instructor'>Instructor:</label>
                                <input type='text' name='instructor' onChange={this.handleInputChangeOnClass}></input>
                                <label htmlFor='classSize'>Class Size:</label>
                                <input type='number' name='classSize' onChange={this.handleInputChangeOnClass}></input>
                                <input  className='btn' type='submit' value='Submit'></input>
                            </form>

                        </div>
                        : <div className='studio-info-container'>
                            <h1 className='studio-info-container-title'>{this.state.danceStudio.name}</h1>
                            <p><span className='formal-text'>ADDRESS: </span>{this.state.danceStudio.address}</p>
                            <p><span className='formal-text'>TELEPHONE: </span>{this.state.danceStudio.phoneNumber}</p>
                            <p><span className='formal-text'>LOCATION: </span>{this.state.danceStudio.hoursOfOperation}</p>
                            <p><span className='formal-text'>ABOUT:  {this.state.danceStudio.description} </span></p>
                            <button className='btn' onClick={this.toggleForm}>Update</button>
                            <button className='btn' onClick={this.deleteDanceStudio}>Delete</button>
                            <button className='btn' onClick={this.addClassBtn}>Add Class</button>
                           
                            {newDance}
                        </div>
                }

            </div>
        );
    }
}

export default DanceStudio;