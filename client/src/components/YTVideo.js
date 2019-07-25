import React, { Component } from 'react';

class YTVideo extends Component {
    render() {
        return (
            <div className='ytVideo'>
                <h4>{this.props.title}</h4>
                <div>
                    <iframe src={`https://www.youtube.com/embed/${this.props.videoURL}`}></iframe>
                </div>
                
            </div>
        );
    }
}

export default YTVideo;