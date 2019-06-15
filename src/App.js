import React, { Component } from "react";
import { apiCall } from "./api";

class App extends Component {
    state = {
        lat: null,
        lng: null,
        outside: null,
        inside: "78",
        showButton: 'true'
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //get user's location
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            //get weather based on user's location
            apiCall('get', `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=340f3559bb20bb3f0ec04fe4ac89b969`, {})
                .then(data => {
                    this.setState({ outside: Math.round(data.main.temp) })
                })
                .catch(e => {
                    console.log(e)
                })
            setInterval(() => {
                apiCall('get', `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=340f3559bb20bb3f0ec04fe4ac89b969`, {})
                    .then(data => {
                        this.setState({ outside: Math.round(data.main.temp) })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }, 60 * 1000 * 15);

        })
    }

    handleChange = e => {
        this.setState({ inside: e.target.value });
    }

    //get inside temp from user
    handleSubmit = e => {
        this.setState({ showButton: !this.state.showButton })
        e.preventDefault()
    }


    //when outside temp is -2/+2 send notification

    render() {
        let { inside, outside } = this.state
        let temps = [];
        for (let i = 65; i < 90; i++) {
            temps.push(<option value={i}>{i}°</option>);
        }

        let button = this.state.showButton ? (<button
            id="lad"
            className="btn btn-lg btn-primary"
            style={{
                backgroundColor: "#00A8E8",
                color: "#FAFAFA"
            }}
            onClick={this.handleSubmit}
        >
            SUBMIT
    </button>) : null

        let content = this.state.showButton ? (
            <form class="form-signin text-center">
                <h1 className="lead" style={{ color: "#46494C" }}>
                    select the temperature your thermostat is set to{" "}
                </h1>
                <div className="form-group mt-4 d-flex justify-content-center">
                    <select
                        className="form-control form-control-lg text-center"
                        value={this.state.value}
                        onChange={this.handleChange}
                        size={2}
                        style={{ width: "100px" }}
                    >
                        {temps}
                    </select>
                </div>
            </form>
        ) : <h2 onClick={this.handleSubmit}>Set new inside temp</h2>

        let notification = null

        if (outside - 1 == inside) {
            notification = 'time to open your windows'
        } else if (outside + 1 == inside) {
            notification = 'time to close your windows'
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className='card p-5 border-0 bg-light d-flex d-row justify-content-center'>
                        <div className="heading d-flex d-row justify-content-center">
                            <strong className="logo">Draft </strong>
                            <i className="fas fa-wind fa-lg" />
                        </div>
                        {content}
                        <p className="text-secondary px-5">we'll alert you when it's time to open and close your windows</p>
                        {button}
                        <h2>{notification}</h2>
                        <p class="mt-5 mb-3 text-muted">© 2018-2019</p>
                    </div >
                </div>
            </div>
        )
    }
}

export default App
