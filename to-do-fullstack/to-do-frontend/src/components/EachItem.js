import React, { Component } from 'react';

class EachItem extends Component {

    render() {
        return (
            <li className="EachItem">
                <input type="checkbox"
                    checked={this.props.thing.status}
                    onChange={() => {
                        this.props.checkBox(this.props.id)
                    }} />
                <label>{this.props.thing.todo}</label>
            </li>
        );
    }
}

export default EachItem;
