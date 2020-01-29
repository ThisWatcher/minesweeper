import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board.js';

import 'bootstrap/dist/css/bootstrap.min.css';

//pirmas ejimas visada ant tuscio?

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bombs: 10,
            height: 10,
            width: 10,
            isSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change)
    }

    handleSubmit(event) {
        this.setState({isSubmitted: true});
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 text-center">
                        {!this.state.isSubmitted &&
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>
                                        Bombs:
                                        <input className="form-control"
                                               type="number"
                                               name="bombs"
                                               onChange={this.handleChange.bind(this)}
                                               value={this.state.bombs}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Height:
                                        <input className="form-control"
                                               type="number"
                                               name="height"
                                               onChange={this.handleChange.bind(this)}
                                               value={this.state.height}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Width:
                                        <input className="form-control"
                                               type="number"
                                               name="width"
                                               onChange={this.handleChange.bind(this)}
                                               value={this.state.width}/>
                                    </label>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </form>
                        }
                        <div className="game-board">
                            {this.state.isSubmitted && <Board bombs={this.state.bombs}
                                                              height={this.state.height}
                                                              width={this.state.width}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);