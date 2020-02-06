import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function GameWon(props) {
    if (props.gameWon) {
        return <h1>You won</h1>;
    }
   return null;
}

function GameLost(props) {
    if (props.gameLost) {
        return <h1>You Lost</h1>;
    }
    return null;

}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bombs: 5,
            height: 10,
            width: 10,
            isSubmitted: false,
            gameWon: false,
            gameLost: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVictory = this.handleVictory.bind(this);
        this.handleDefeat = this.handleDefeat.bind(this);
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

    handleVictory() {
        this.setState({gameWon: true});
    }

    handleDefeat() {
        this.setState({gameLost: true});
    }

    render() {
        return (
            <div className="container">
                <GameWon gameWon={this.state.gameWon} />
                <GameLost gameLost={this.state.gameLost} />
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
                                                              width={this.state.width}
                                                              onVictory={this.handleVictory}
                                                              onDeafeat={this.handleDefeat}/>}
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