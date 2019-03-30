import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemSubject extends Component {

    render() {
        var { SubName,id } = this.props;
        return (
            <li>
                <Link to={`/exam/${id}`}>
                    <i className="fa pad-right-10 fa-angle-double-right"></i>{SubName}
                </Link>
            </li>
        )
    }
}

export default ItemSubject;