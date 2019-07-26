import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import DanceClasses from './DanceClasses';



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
                    <DanceClasses
                        key={dance._id}
                        studioId={dance.studioId}
                        name={dance.name}
                        instructor={dance.instructor}
                        classSize={dance.classSize}
                        id={dance._id}
                    >
                    </DanceClasses>
     


            )
        })


        return (
            <div className='single-studio-container backgroundImg'>
                {(this.state.editForm || this.state.addClass)?<p><a href={`/dancestudio/${this.props.match.params.studioId}`}><span><i class='fas fa-arrow-left'></i></span>  Back to Studio</a></p> :
                <p><a href='/'><span><i className='fas fa-arrow-left'></i></span>  Back to Studios</a></p>}
                {this.state.editForm ?
                    <div className='edit-studio'>
                        <h3>Update Dancers....</h3>
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
                            <label htmlFor='danceType'>Dance Style:</label>
                            <select name="danceType" onChange={this.handleInputChangeOnClass}>
                                <option value="African">African</option>
                                <option value="Hip Hop">HipHop</option>
                                <option value="Tap ">Tap</option>
                                <option value="Freestyle">Freestyle</option>
                                <option value="Ballet">Ballet</option>
                                <option value="Jazz">Jazz</option>
                                <option value="Contempary">Contempary</option>
                                <option value="Salsa">Salsa</option>
                                <option value="West Coast Swing">West Coast Swing</option>
                                <option value="Folk">Folk</option>
                                <option value="Modern">Modern</option>
                            </select>
                            <input  className='btn' type='submit' value='Submit'></input>
                        </form>

                    </div>
                    : <div className='studio-info-container'>
                        <div className='top'>
                        <h1 className='studio-info-container-title'>{this.state.danceStudio.name}</h1>
                        <p><span className='formal-text'>ADDRESS: </span>{this.state.danceStudio.address}</p>
                        <p><span className='formal-text'>TELEPHONE: </span>{this.state.danceStudio.phoneNumber}</p>
                        <p><span className='formal-text'>LOCATION: </span>{this.state.danceStudio.hoursOfOperation}</p>
                        <p><span className='formal-text'>ABOUT:  </span> {this.state.danceStudio.description}</p>
                        <button className='btn' onClick={this.toggleForm}>Update</button>
                        <button className='btn' onClick={this.deleteDanceStudio}>Delete</button>
                        <button className='btn' onClick={this.addClassBtn}>Add Class</button>
                       </div>
                       <div className='bottom'>
                        {newDance}
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default DanceStudio;