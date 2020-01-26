import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    preventRightClickEvent(e) {
        e.preventDefault();
    }

    render() {
        return (
            <button
                className={`square ${this.props.isExposed ? 'exposed' : ''}`}
                onContextMenu={(e) => {this.props.onContextMenu(); this.preventRightClickEvent(e)}}
                onClick={() => {this.props.onClick()}}>
                {/*this.props.isExposed &&*/ this.props.isBomb ? 'B' :  ''}
                {this.props.isMarked ? '\u2714' :  ''}
                {this.props.isExposed && this.props.number > 0 &&  !this.props.isBomb?  this.props.number : ''}
            </button>
        );
    }
}

export default Square;