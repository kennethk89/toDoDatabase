import React, { Component } from 'react';
import EachItem from './EachItem'

class ListItems extends Component {

    render() {
        let listItems = this.props.toDos.map((thing, i) => {
            return (
                <EachItem thing={thing}
                    key={i}
                    id={i}
                    checkBox={this.props.checkBox} />
            )
        })

        return (
            <div>
                <ul>{listItems}</ul>
            </div>
        );
    }
}

export default ListItems;
