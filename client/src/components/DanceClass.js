import React, { Component } from 'react';

class DanceClass extends Component {

    componentDidMount() {
        this.getStudio()
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