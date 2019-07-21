import React, { Component } from 'react';
import axios from 'axios'

class DanceStudio extends Component {
    state = {
        danceStudio : {},
        editForm : false,
        danceClasses : []
    }

    getStudio = () => {
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}`)
            .then((res) => {
                
                this.setState({ danceStudio: res.data, editForm: false})
            })
    }

    componentDidMount() {
        this.getStudio()
    }

    render() {

        
        return (
            <div>
                <div>
                    <h1>{this.state.danceStudio.name}</h1>
                    <p>{this.state.danceStudio.address}</p>
                    <p>{this.state.danceStudio.phoneNumber}</p>
                    <p>{this.state.danceStudio.hoursOfOperation}</p>
                    <p>{this.state.danceStudio.description}</p>
                </div>
            </div>
        );
    }
}

export default DanceStudio;