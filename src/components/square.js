import React from 'react';

class Square extends React.Component {
    preventRightClickEvent(e) {
        e.preventDefault();
    }

    text() {
        if (this.props.isExposed && this.props.isBomb) {
            return 'B';
        } else if (this.props.isMarkedAsBomb) {
            return '\u2714';
        } else if (this.props.isExposed && this.props.number > 0) {
            return this.props.number;
        }
    }

    cssClasses() {
        let classes = ['square'];
        if (this.props.isExposed) {
            classes.push('exposed');
        }
        return classes.join(' ');
    }

    render() {
        return (
            <button
                className={this.cssClasses()}
                onContextMenu={(e) => {this.props.onContextMenu(); this.preventRightClickEvent(e)}}
                onClick={() => {this.props.onClick()}}>
                {this.text()}
            </button>
        );
    }
}

export default Square;