import React, { Component } from 'react';
import ListExam from './ListExam';
import ListSubject from './../Subject/ListSubject';

class Exams extends Component {
    render() {
        var id = '';
        var { match } = this.props;
        if(match){
            id = match.params.id;
        }
        return (
            <div className="the_exam online-test">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 search-exam">
                        </div>
                        <div className="col-md-3 menu-exam">
                            <div className="title-exam">
                                <h4>Các dạng bài thi</h4>
                            </div>
                            <ListSubject  />
                        </div>
                        <ListExam id={id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Exams;