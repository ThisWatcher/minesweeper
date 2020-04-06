export const surroundingSquares = [
    {x:-1, y:1},  {x:0, y:1},  {x:1, y:1},
    {x:-1, y:0},               {x:1, y:0},
    {x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1}
];

export default class {
    constructor(height, width, bombs) {
        this.height = height;
        this.width = width;
        this.bombs = bombs;
        this.board = [];
    }

    createBoard() {
        this.makeBoard(() => {
            this.placeBombs(() => {
                this.shuffleBoard(() => {
                    this.calculateNumbersForSquares(() => {});
                });
            })
        });
        return this.board;
    }

    makeBoard(callback) {

        for (let i = 0; i < this.height; i++) {
            const row = [];
            for (let j = 0; j < this.width; j++) {
                row.push(
                    {
                        row: i,
                        column: j,
                        isExposed: false,
                        isMarkedAsBomb: false,
                        isBomb: false,
                        number: 0
                    }
                );
            }
            this.board.push(row);
        }
        callback();
    }

    placeBombs(callback) {
        let bombs = this.bombs;
        parent:
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width ; j++) {
                    this.board[i][j].isBomb = true;
                    bombs--;
                    if (bombs <= 0) {
                        break parent;
                    }
                }
            }
        callback();
    }

    shuffleBoard(callback) {

        this.board.map((row, rowIndex) => {
            row.map((square, columnIndex) => {
                const newRowIndex = Math.floor(Math.random() * this.height);
                const newColumnIndex = Math.floor(Math.random() * this.width);
                const tempSquareCopy = this.board[newRowIndex][newColumnIndex];

                tempSquareCopy.row = square.row;
                tempSquareCopy.column = square.column;

                square.row = newRowIndex;
                square.column = newColumnIndex;

                this.board[rowIndex][columnIndex] = tempSquareCopy;
                this.board[newRowIndex][newColumnIndex] = square;
            });
        });
        callback();
    }

    calculateNumbersForSquares(callback) {

        this.board.map((row) => {
            row.map((square) => {
                if (square.isBomb) {
                    // increment surrounding squares numbers
                    surroundingSquares.map((numberOffset) => {
                        const surroundingSquareRowIndex = square.row + numberOffset.x;
                        const surroundingSquareColumnIndex = square.column + numberOffset.y;
                        if (typeof this.board[surroundingSquareRowIndex] !== 'undefined'
                            && typeof this.board[surroundingSquareRowIndex][surroundingSquareColumnIndex] !== 'undefined') {
                            this.board[surroundingSquareRowIndex][surroundingSquareColumnIndex].number++;
                        }
                    });
                }
            });
        });

        callback();
    }
}