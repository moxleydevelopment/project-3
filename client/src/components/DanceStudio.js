import React, { Component } from 'react';
import axios from 'axios'

class DanceStudio extends Component {
    state = {
        danceStudio: {},
        editForm: false,
        danceClasses: []
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

    render() {


        return (
            <div>
                {this.state.editForm ?
                    <div>
                        <form>
                            <label htmlFor='name'>Studio Name:</label>
                            <input type='text' name='name' onChange={this.handleInputChange}></input>
                            <label htmlFor='address'>Address:</label>
                            <input type='text' name='address' onChange={this.handleInputChange}></input>
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                            <input type='number' name='phoneNumber' onChange={this.handleInputChange}></input>
                            <label htmlFor='hoursOfOperation'>Hours of Operation:</label>
                            <input type='text' name='hoursOfOperation' onChange={this.handleInputChange}></input>
                            <label htmlFor='description'>Description:</label>
                            <textarea name='description' onChange={this.handleInputChange}></textarea>
                            <input type='submit' value='Submit'></input>

                        </form>
                    </div>
                    : <div>
                        <h1>{this.state.danceStudio.name}</h1>
                        <p>{this.state.danceStudio.address}</p>
                        <p>{this.state.danceStudio.phoneNumber}</p>
                        <p>{this.state.danceStudio.hoursOfOperation}</p>
                        <p>{this.state.danceStudio.description}</p>
                    </div>
                }

            </div>
        );
    }
}

export default DanceStudio;