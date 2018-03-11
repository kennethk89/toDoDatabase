import React, { Component } from 'react';

class ClearItem extends Component {

    render() {
        return (
            <div className="ClearItem">
                <button type="button" onClick={() => { this.props.clearItem() }}>Delete task</button>
            </div>
        );
    }
}

export default ClearItem;
 