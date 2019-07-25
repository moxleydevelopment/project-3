import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import YTVideo from './YTVideo'

class DanceClass extends Component {

    state = {
        danceClass: {},
        isUpdateFormDisplayed: false,
        redirectToHome: false,
        danceClassVideos: [],
        ytKey: 'AIzaSyBCNZVjEok8dh8D2yBmxxl5Xbfwk1GbWzU'
    }

    getClass = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}/danceclass/${this.props.match.params.classId}`)
            .then((classes) => {
                this.setState({ danceClass: classes.data })
            })
    }
    getYTVideos = ()=>{
        
        let finalURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=hiphop+choreography&type=video&videoDefinition=high&key=${this.state.ytKey}`
         axios.get(finalURL)
         .then((res)=>{
            let results = [...res.data.items]
            this.setState({danceClassVideos: results})
            console.log(this.state.danceClassVideos)
         })

         }

    componentDidMount() {
        this.getClass()
        this.getYTVideos()
    }

  

    updateDanceClass = (event) => {
        event.preventDefault()
        axios.put(`/api/dancestudio/${this.props.match.params.studioId}/danceclass/${this.props.match.params.classId}`, this.state.danceClass)
            .then(() => {
                this.setState({ isUpdateFormDisplayed: false })
                this.getClass()
            })
    }

    deleteDanceClass = () => {
        axios.delete(`/api/dancestudio/${this.props.match.params.studioId}/danceclass/${this.props.match.params.classId}`)
            .then(() => {
                this.setState({ redirectToHome: true })
            })
    }

    handleInputChange = (event) => {
        const copiedClass = { ...this.state.danceClass }
        copiedClass[event.target.name] = event.target.value
        this.setState({ danceClass: copiedClass })
    }

    toggleForm = () => {
        if (this.state.createNewStudio) {
            this.setState({ isUpdateFormDisplayed: false })
        } else {
            this.setState({ isUpdateFormDisplayed: true })
        }
    }
    render() {

        if (this.state.redirectToHome) {
            return <Redirect to={`/dancestudio/${this.state.danceClass.studioId}`} />
        }

        let videos = this.state.danceClassVideos.map((video)=>{
            return (<YTVideo
                key={video.id.videoId}
                title={video.snippet.title}
                videoImage={video.snippet.thumbnails.medium.url}
                videoURL={video.id.videoId} />)
        })


        return (
            <div className='backgroundImg' >
                {this.state.isUpdateFormDisplayed ?
                    <div className='edit-class'>
                        <form className='form edit-class-form' onSubmit={this.updateDanceClass}>
                            <label htmlFor='name'> Class Name:</label>
                            <input type='text' name='name' onChange={this.handleInputChange} value={this.state.danceClass.name}></input>
                            <label htmlFor='address'>Instructor:</label>
                            <input type='text' name='instructor' onChange={this.handleInputChange} value={this.state.danceClass.instructor}></input>
                            <label htmlFor='phoneNumber'>Class Size:</label>
                            <input type='number' name='classSize' onChange={this.handleInputChange} value={this.state.danceClass.classSize}></input>
                            <input className='btn' type='submit' value='Submit'></input>

                        </form>

                    </div>
                    :
                    <div className='class-div' >
                       <p className='back'><a href={`/dancestudio/${this.state.danceClass.studioId}`}><span><i class='fas fa-arrow-left'></i>  Back to Studio</span></a></p>
                        <div className='class-info-container' >
                          <h1>{this.state.danceClass.name}</h1>
                        <p>Instructor:  {this.state.danceClass.instructor}</p>
                        <button className='btn' onClick={this.toggleForm}>Update</button>
                        <button className='btn' onClick={this.deleteDanceClass}>Delete</button>  
                        </div>
                         <div className='youTube-container'>
                        {videos}
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default DanceClass;