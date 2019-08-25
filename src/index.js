import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExposed: false,
            value: ''
        };
    }

    render() {
        return (
            <button
                className={`square ${this.state.isExposed ? 'exposed' : ''}`}
                onClick={() => this.setState({isExposed: true})}
                >
                {/*{this.state.isExposed ? this.props.value : ''}*/}
                {this.props.isBomb ? '\u2714' :  ''}
                {this.props.number > 0 &&  !this.props.isBomb?  this.props.number : ''}
            </button>
        );
    }
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 10,
			columns: 10,
            bombs: 10
		};
	}
	
	renderSquare(i, isBomb, number) {
		return <Square
            key={i}
            value={i}
            isBomb={isBomb}
            number={number}/>;
	}

	render() {
        const board = [];
        //make board and place bombs?
        //place bombs atskritai padaryti?
        var bombsToPlace = this.state.bombs;
        for (var i = 0; i < this.state.rows; i++) {
            const row = [];
            for (var j = 0; j < this.state.columns; j++) {
                row.push(
                    {
                        row: i,
                        column: j,
                        isBomb: bombsToPlace > 0,
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
                var newRowIndex = Math.floor(Math.random() * this.state.rows);
                var newColumnIndex = Math.floor(Math.random() * this.state.columns);
                var tempSquareCopy1 = board[newRowIndex][newColumnIndex];

                tempSquareCopy1.row = square.row;
                tempSquareCopy1.column = square.column;

                square.row = newRowIndex;
                square.column = newColumnIndex;

                board[rowIndex][columnIndex] = tempSquareCopy1;
                board[newRowIndex][newColumnIndex] = square;
            });
        });

        //shuffle
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
        
        const dataRow = board.map((row, rowIndex) => {
            return (
                <div key={rowIndex}>
                    {
                        row.map((square, columnIndex) => {
                            return (
                                this.renderSquare(square.row * 10 + square.column, square.isBomb, square.number)
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
