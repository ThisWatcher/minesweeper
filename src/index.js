import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className={`square ${this.props.isExposed ? 'exposed' : ''}`}
                onClick={() => {this.props.onClick();}}>
                    {this.props.isBomb ? '\u2714' :  ''}
                    {this.props.isExposed && this.props.number > 0 &&  !this.props.isBomb?  this.props.number : ''}
            </button>
        );
    }
}

class Board extends React.Component {
	constructor(props) {
		super(props);

		const bombs = 10;
		const rows = 8;
		const columns = 8;
        const board = [];
        //make board and place bombs?
        //place bombs atskritai padaryti?
        var bombsToPlace = bombs;
        for (var i = 0; i < rows; i++) {
            const row = [];
            for (var j = 0; j < columns; j++) {
                row.push(
                    {
                        row: i,
                        column: j,
                        isBomb: bombsToPlace > 0,
                        isExposed: false,
                        number: 0
                    }
                );
                bombsToPlace--;
            }
            board.push(row);
        }

        //shuffle
        board.map((row, rowIndex) => {
            row.map((square, columnIndex) => {
                var newRowIndex = Math.floor(Math.random() * rows);
                var newColumnIndex = Math.floor(Math.random() * columns);
                var tempSquareCopy1 = board[newRowIndex][newColumnIndex];

                tempSquareCopy1.row = square.row;
                tempSquareCopy1.column = square.column;

                square.row = newRowIndex;
                square.column = newColumnIndex;

                board[rowIndex][columnIndex] = tempSquareCopy1;
                board[newRowIndex][newColumnIndex] = square;
            });
        });

        //numbers
        const numberOffsets = [
            {x:-1, y:1},  {x:0, y:1},  {x:1, y:1},
            {x:-1, y:0},               {x:1, y:0},
            {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1}
        ];
        board.map((row) => {
            row.map((square) => {
                if (square.isBomb) {
                    numberOffsets.map((numberOffset) => {
                        if (typeof board[square.row + numberOffset.x] !== 'undefined'
                            && typeof board[square.row + numberOffset.x][square.column + numberOffset.y] !== 'undefined') {
                            board[square.row + numberOffset.x][square.column + numberOffset.y].number =
                                board[square.row + numberOffset.x][square.column + numberOffset.y].number + 1;
                        }
                    });
                }
            });
        });

		this.state = {
			rows: rows,
			columns: columns,
            bombs: bombs,
            board: board
		};
	}
	
	renderSquare(square) {
		return <Square
            key={square.row * 10 + square.column}
            value={square.row * 10 + square.column}
            isBomb={square.isBomb}
            number={square.number}
            isExposed={square.isExposed}
            onClick={() => this.handleClick(square)}/>;
	}

    handleClick(square) {
        const board = this.state.board.slice();
        board[square.row][square.column].isExposed = true;
        this.setState({board: board});
        if (!square.number) {
            this.uncoverSquares(square);
        }
    }

    uncoverSquares(square) {
        const board = this.state.board.slice();
        const numberOffsets = [
            {x:-1, y:1},  {x:0, y:1},  {x:1, y:1},
            {x:-1, y:0},               {x:1, y:0},
            {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1}
        ];
        numberOffsets.map((numberOffset) => {
            if (typeof board[square.row + numberOffset.x] !== 'undefined'
                && typeof board[square.row + numberOffset.x][square.column + numberOffset.y] !== 'undefined'
                && !board[square.row + numberOffset.x][square.column + numberOffset.y].isBomb
                && !board[square.row + numberOffset.x][square.column + numberOffset.y].isExposed) {
                board[square.row + numberOffset.x][square.column + numberOffset.y].isExposed = true;
                this.setState({board: board});
                if (!board[square.row + numberOffset.x][square.column + numberOffset.y].number > 0) {
                    this.uncoverSquares(board[square.row + numberOffset.x][square.column + numberOffset.y]);
                }
            }
        });

    }

	render() {
        const dataRow = this.state.board.map((row, rowIndex) => {
            return (
                <div key={rowIndex}>
                    {
                        row.map((square) => {
                            return (
                                this.renderSquare(square)
                            );
                        })
                    }
                </div>
            )
        });

		return (
            <div>{dataRow}</div>
		);
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
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
