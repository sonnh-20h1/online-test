import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListExamRequest } from './../../actions/index';
import { Link } from 'react-router-dom';

class ItemExam extends Component {
    render() {
        const { Exam } = this.props;
        return (
            <li className="activity exam-item">
                <div className="quiz-detail">
                    <div className="quiz-name quiz">
                        <Link to={`/detail-exam/${Exam.IDEXAM}`}>{Exam.EXAMTEXT}</Link>
                    </div>
                    <div className="quiz quiz-detail-right">
                        <div className="summary-quiz">
                            <p className="pad-right-10">Môn: <span>{Exam.SUBTEXT} ,</span></p>
                            <p className="pad-right-10">Số câu: <span>{Exam.EXNUM} ,</span></p>
                            <p>Thời gian: <span>{Exam.EXTIME}</span> phút</p>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
class ListExam extends Component {
    componentDidMount() {
        this.props.ListExam();
    }
    showExams = (Exams, id) => {
        var result = null;
        if (Exams.length > 0) {
            if (id) {
                result = Exams.map((exam, index) => { // eslint-disable-next-line
                    if (id === exam.SUBID) { // eslint-disable-next-line
                        return (
                            <ItemExam
                                key={index}
                                Exam={exam}
                            />
                        )
                    }
                })
            } else {
                result = Exams.map((exam, index) => {
                    return (
                        <ItemExam
                            key={index}
                            Exam={exam}
                        />
                    )
                })
            }
        }
        return result;
    }
    render() {
        const { Exams } = this.props;
        const { id } = this.props;
        return (
            <div className="col-md-9 detail-exam">
                <div className="detial-exam-test">
                    <div className="title-all-exam">
                        <p>Tất cả các đề thi</p>
                    </div>
                    <div className="content-name-exam">
                        <ul className="exam-list">{this.showExams(Exams, id)}</ul>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        Exams: state.ListExam
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ListExam: () => {
            dispatch(ListExamRequest())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListExam);