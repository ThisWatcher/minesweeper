import React from 'react';
import Square from "./square";

const surroundingSquares = [
    {x:-1, y:1},  {x:0, y:1},  {x:1, y:1},
    {x:-1, y:0},               {x:1, y:0},
    {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1}
];

class Board extends React.Component {
    constructor(props) {
        super(props);

        const gameIsLive = true;
        const bombs = this.props.bombs || 10;
        const rowsCount = this.props.height || 10;
        const columnsCount = this.props.width || 10;
        let board = [];

        board = makeBoard(rowsCount, columnsCount);
        board = placeBombs(board, bombs);
        board = shuffleBoard(board);
        board = calculateNumbersForSquares(board);

        this.state = {
            rows: rowsCount,
            columns: columnsCount,
            bombs: bombs,
            board: board,
            gameIsLive: gameIsLive,
            gameLost: false,
        };
    }


    renderSquare(square) {
        var squareNumber = square.row * 10 + square.column;
        return <Square
            key={squareNumber}
            value={squareNumber}
            isBomb={square.isBomb}
            number={square.number}
            isExposed={square.isExposed}
            isMarked={square.isMarked}
            onContextMenu={() => this.markSquare(square) }
            onClick={() => {this.handleClick(square)} }/>;
    }

    handleClick(square) {
        if (this.state.gameIsLive) {
            //refractor
            if (square.isBomb) {
                const board = this.state.board.slice();
                board[square.row][square.column].isExposed = true;
                this.setState({board: board});

                this.state.gameIsLive = false;
                this.state.gameLost = true;
            } else {
                const board = this.state.board.slice();
                board[square.row][square.column].isExposed = true;
                this.setState({board: board});

                if (!square.number) {
                    this.uncoverSquares(square);
                }
                if (calculateVictory(this.state.board.slice())) {
                    this.state.gameIsLive = false;
                }
            }
        }
    }

    markSquare(square) {
        if (this.state.gameIsLive) {
            const board = this.state.board.slice();
            board[square.row][square.column].isMarked = !square.isMarked;
            this.setState({board: board});
        }
    }

    uncoverSquares(square) {
        const board = this.state.board.slice();

        surroundingSquares.map((numberOffset) => {
            var surroundingSquareRowIndex = square.row + numberOffset.x;
            var surroundingSquareColumnIndex = square.column + numberOffset.y;
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
        var placedBombs = 0;
        this.state.board.map(function(row){
            placedBombs += row.filter( function (square) {
                return square.isMarked === true
            }).length;
        });
        return this.state.bombs - placedBombs;
    }


    render() {
        const isGameWon = calculateVictory(this.state.board);

        let status;
        if (isGameWon) {
            status = 'victory'
        } else if (this.state.gameLost) {
            status = 'defeat'
        }

        const dataRow = this.state.board.map((row, rowIndex) => {
            return (
                <div key={rowIndex} className="clearfix">
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
            <div>
                <div>{status}</div>
                <div>Remaining Bombs: {this.remainingBombsToPlace()}</div>
                <div>{dataRow}</div>
            </div>
        );
    }
}

function makeBoard(rows, columns) {

    var board = [];
    for (var i = 0; i < rows; i++) {
        const row = [];
        for (var j = 0; j < columns; j++) {
            row.push(
                {
                    row: i,
                    column: j,
                    isExposed: false,
                    isMarked: false,
                    isBomb: false,
                    number: 0
                }
            );
        }
        board.push(row);
    }
    return board;
}

function placeBombs(board, bombs) {

    parent:
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length ; j++) {
                board[i][j].isBomb = true;
                bombs--;
                if (bombs <= 0) {
                    break parent;
                }
            }
        }
    return board;
}

function shuffleBoard(board) {

    var rowCount = board.length;
    var columnCount = board[0].length;

    board.map((row, rowIndex) => {
        row.map((square, columnIndex) => {
            var newRowIndex = Math.floor(Math.random() * rowCount);
            var newColumnIndex = Math.floor(Math.random() * columnCount);
            var tempSquareCopy1 = board[newRowIndex][newColumnIndex];

            tempSquareCopy1.row = square.row;
            tempSquareCopy1.column = square.column;

            square.row = newRowIndex;
            square.column = newColumnIndex;

            board[rowIndex][columnIndex] = tempSquareCopy1;
            board[newRowIndex][newColumnIndex] = square;
        });
    });
    return board;
}

function calculateVictory(board) {
    var rowsWithUncoveredSquares = board.filter(function(row) {
        var remainingSquaresInARow = row.filter(function(square) {
            return square.isExposed === false && square.isBomb === false;
        });
        return remainingSquaresInARow.length;
    });

    return rowsWithUncoveredSquares.length === 0;
}

function calculateNumbersForSquares(board) {

    board.map((row) => {
        row.map((square) => {
            if (square.isBomb) {
                // increment surrounding squares numbers
                surroundingSquares.map((numberOffset) => {
                    var surroundingSquareRowIndex = square.row + numberOffset.x;
                    var surroundingSquareColumnIndex = square.column + numberOffset.y;
                    if (typeof board[surroundingSquareRowIndex] !== 'undefined'
                        && typeof board[surroundingSquareRowIndex][surroundingSquareColumnIndex] !== 'undefined') {
                            board[surroundingSquareRowIndex][surroundingSquareColumnIndex].number++;
                    }
                });
            }
        });
    });

    return board;
}


export default Board;