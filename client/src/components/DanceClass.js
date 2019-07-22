import React, { Component } from 'react';
import axios from 'axios'

class DanceClass extends Component {

    state = {
        danceClass: {}
    }

    getClass = () =>{
        axios.get(`/api/dancestudio/${this.props.match.params.studioId}/danceclass/${this.props.match.params.classId}`)
                    .then((classes) => {
                        this.setState({ danceClasses: classes.data })
                    })
    }

    componentDidMount() {
        this.getClass()
    }
    render() {
        return (
            <div>
                <h1>this is for a single dance class</h1>
            </div>
        );
    }
}

export default DanceClass;