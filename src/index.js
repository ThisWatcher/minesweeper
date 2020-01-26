import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board.js';

//pirmas ejimas visada ant tuscio?
// pirma forma su uzpildytais laukais
//islenda lenta

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div>
                    <input/>
                </div>
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);