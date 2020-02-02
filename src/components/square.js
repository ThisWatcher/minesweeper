import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    preventRightClickEvent(e) {
        e.preventDefault();
    }

    text () {
        if (/*this.props.isExposed &&*/ this.props.isBomb) {
            // debugging
            return 'B';
        } else if (this.props.isMarked) {
            return '\u2714';
        } else if (this.props.isExposed && this.props.number > 0) {
            return this.props.number;
        }
    }

    render() {
        return (
            <button
                className={`square ${this.props.isExposed ? 'exposed' : ''}`}
                onContextMenu={(e) => {this.props.onContextMenu(); this.preventRightClickEvent(e)}}
                onClick={() => {this.props.onClick()}}>
                {this.text()}
            </button>
        );
    }
}

export default Square;