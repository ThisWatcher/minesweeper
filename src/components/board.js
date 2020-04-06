import React from 'react';
import Square from "./square";


class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(square) {
        this.props.onClick(square);
    }

    onContextMenuClick(square) {
        this.props.onContextMenuClick(square);
    }

    renderSquare(square) {
        const squareNumber = square.row * 10 + square.column;
        return <Square
            key={squareNumber}
            value={squareNumber}
            number={square.number}
            isBomb={square.isBomb}
            isExposed={square.isExposed}
            isMarkedAsBomb={square.isMarkedAsBomb}
            onContextMenu={() => this.onContextMenuClick(square) }
            onClick={() => {this.onClick(square)} }/>;
    }

    render() {
        const dataRow = this.props.board.map((row, rowIndex) => {
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
                <div>{dataRow}</div>
            </div>
        );
    }
}

export default Board;