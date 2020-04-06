import React from 'react';
import Board from './board';
import BoardCreator, {surroundingSquares} from '../utils/BoardCreator';

function GameWon(props) {
    if (props.gameWon) {
        return <h1 className={'text-center'}>You won</h1>;
    }
    return null;
}

function GameLost(props) {
    if (props.gameLost) {
        return <h1 className={'text-center'}>You Lost</h1>;
    }
    return null;

}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let board = new BoardCreator(this.props.height, this.props.width, this.props.bombs).createBoard();
        this.state = {
            gameWon: false,
            gameLost: false,
            board: board,
        };

        this.handleVictory = this.handleVictory.bind(this);
        this.handleDefeat = this.handleDefeat.bind(this);
        this.calculateVictory = this.calculateVictory.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenuClick = this.handleContextMenuClick.bind(this);
    }

    gameIsLive() {
        return !this.state.gameWon && !this.state.gameLost;
    }

    handleVictory() {
        this.setState({gameWon: true});
    }

    handleDefeat() {
        this.setState({gameLost: true});
    }

    handleReset() {
        this.setState({gameLost: false, gameWon: false});
        this.props.resetGame();
    }

    calculateVictory() {
        const rowsWithUncoveredSquares = this.state.board.filter(function(row) {
            const remainingSquaresInARow = row.filter(function(square) {
                return square.isExposed === false && square.isBomb === false;
            });
            return remainingSquaresInARow.length;
        });

        return rowsWithUncoveredSquares.length === 0;
    }

    handleContextMenuClick(square) {
        if (this.gameIsLive()) {
            this.markSquareAsBomb(square);
        }
    }

    handleClick(square) {
        if (this.gameIsLive()) {

            this.exposeSquare(square);

            if (square.isBomb) {
                this.handleDefeat();
            } else {
                if (!square.number) {
                    this.uncoverSquares(square);
                }
                if (this.calculateVictory(this.state.board.slice())) {
                    this.handleVictory();
                }
            }
        }
    }

    exposeSquare(square) {
        const board = this.state.board.slice();
        board[square.row][square.column].isExposed = true;
        this.setState({board: board});
    }

    markSquareAsBomb(square) {
        const board = this.state.board.slice();
        board[square.row][square.column].isMarkedAsBomb = !square.isMarkedAsBomb;
        this.setState({board: board});
    }

    uncoverSquares(square) {
        const board = this.state.board.slice();

        surroundingSquares.map((numberOffset) => {
            const surroundingSquareRowIndex = square.row + numberOffset.x;
            const surroundingSquareColumnIndex = square.column + numberOffset.y;
            if (typeof board[surroundingSquareRowIndex] !== 'undefined'
                && typeof board[surroundingSquareRowIndex][surroundingSquareColumnIndex] !== 'undefined'
                && !board[surroundingSquareRowIndex][surroundingSquareColumnIndex].isBomb
                && !board[surroundingSquareRowIndex][surroundingSquareColumnIndex].isExposed) {

                board[surroundingSquareRowIndex][surroundingSquareColumnIndex].isExposed = true;
                this.setState({board: board});
                if (!board[surroundingSquareRowIndex][surroundingSquareColumnIndex].number > 0) {
                    this.uncoverSquares(board[surroundingSquareRowIndex][surroundingSquareColumnIndex]);
                }
            }
        });
    }

    remainingBombsToPlace() {
        let placedBombs = 0;
        this.state.board.map(function(row){
            placedBombs += row.filter( function (square) {
                return square.isMarkedAsBomb === true
            }).length;
        });
        return this.props.bombs - placedBombs;
    }

    render() {
        return (
            <div className="container">
                {(this.state.gameWon || this.state.gameLost) &&
                <button className={'text-center'} onClick={() => this.handleReset()}>Play Again</button>
                }
                <GameWon gameWon={this.state.gameWon} />
                <GameLost gameLost={this.state.gameLost} />
                <div className="row justify-content-center">
                    <div className="text-center">
                        <div>Remaining Bombs: {this.remainingBombsToPlace()}</div>
                        <div className="game-board">
                            <Board board={this.state.board}
                                   onClick={this.handleClick}
                                   onContextMenuClick={this.handleContextMenuClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;