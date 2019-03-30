import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {ListSubjectRequest} from './../../actions/index';
import item_img from '../../img/shop-item-1.jpg';

class HeaderSearch extends Component {
    render() {
        return (
            <Row className="justify-content-center text-center">
                <Col md={8} className="page__heading">
                    <h1>Chủ đề trắc nghiệm</h1>
                    <div className="form__search">
                        <div className="input-group pad10 padLR15">
                            <input className="form-control Border0" placeholder="Tìm kiếm chủ đề" />
                            <div className="input-group-btn">
                                <Button className="Border0"><i className="fa fa-search"></i></Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

class ListSubject extends Component {
    ShowSubject = (ListItems) =>{
        var result = null;
        if(ListItems.length > 0){
            result = ListItems.map((Item,index) => {
                return (
                    <ItemSubject 
                        key={index}
                        SubName={Item.SUBTEXT}
                        id = {Item.SUBID}
                    />
                )
            })
        }
        return result;
    }
    render() {
        var {ListItems} = this.props;
        return (
            <Row className="justify-content-center">
                <Col md={8}>
                    <Row className="list__subject">
                        { this.ShowSubject(ListItems)}
                    </Row>
                </Col>
            </Row>
        )
    }
}
class ItemSubject extends Component {
    render() {
        var { SubName,id } = this.props;
        return (
            <Col md={3} className="item__subject">
                    <div className="item_item green">
                        
                        <div className="item__brief-wrapper">
                            <h3>{SubName}</h3>
                            <Link to={`/chu-de-trac-nghiem/${id}`}>Chi tiết</Link>
                        </div>
                        <div className="item_img__cover">
                            <img src={item_img} alt="" />
                        </div>
                    </div>
            </Col>
        )
    }
}
class Subject extends Component {
    componentDidMount(){
        this.props.ListSub();
    }
    render() {
        var { ListItems } = this.props;
        return (
            <div className="vk-content" data-layout="full-height">
                <Container>
                    <div className="page__wrapper">
                        <HeaderSearch />
                        <ListSubject ListItems={ListItems} />
                    </div>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        ListItems:state.ListSubject
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        ListSub: () =>{
            dispatch(ListSubjectRequest())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Subject);