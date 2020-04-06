import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game.js';

import 'bootstrap/dist/css/bootstrap.min.css';

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bombs: 5,
            height: 10,
            width: 10,
            isSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    handleChange(event) {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change)
    }

    handleSubmit(event) {
        this.setState({isSubmitted: true, gameIsLive: true});
        event.preventDefault();
    }

    resetGame() {
        this.setState({isSubmitted: false});
    }

    render() {
        return (
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
                </div>
                {this.state.isSubmitted && <Game bombs={this.state.bombs}
                                                 height={this.state.height}
                                                 width={this.state.width}
                                                 resetGame={this.resetGame}/>}
            </div>
        )
    }
}

ReactDOM.render(
    <GameForm />,
    document.getElementById('root')
);