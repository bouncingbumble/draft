import React, {Component} from 'react'

class App extends Component {
    state = {
        value: '78'
    }

    constructor(props){
        super(props)
    }

    handleChange = e => {
        this.setState({value: e.target.value})
    }

    render() {
        let temps = []
        for(let i=65; i<90; i++) {
            temps.push(<option value={i}>{i}°</option>)
        }
        return (
            <form class="form-signin text-center mt-5">
                <div className="heading">
                    <strong className="logo">Draft </strong><i className="fas fa-wind fa-lg"></i>
                </div>
                <h1 className='lead' style={{color: '#46494C'}}>select the temperature your thermostat is set to </h1>
                <div className="form-group mt-4 d-flex justify-content-center">
                    <select className="form-control form-control-lg text-center" value={this.state.value} onChange={this.handleChange} size={2} style={{width:'100px'}}>
                        {temps}
                    </select>
                </div>
                <p className="text-secondary">we'll alert you when it's time to open and close your windows</p>
                <button id='lad' className="btn btn-lg btn-primary btn-block" style={{ marginTop: '35px', backgroundColor: '#00A8E8', color: '#FAFAFA' }} type="submit">
                    SUBMIT
                </button>
                <p class="mt-5 mb-3 text-muted">© 2018-2019</p>
            </form>
        )
    }
}

export default App
