import React, { Component } from 'react';
import ItemSubject from './ItemSubject';
import { connect } from 'react-redux';
import {ListSubjectRequest} from './../../actions/index'

class ListSubject extends Component {

    // constructor(){
    //     super();
    //     this.state = {
    //         ListItems:[
                
    //         ]
    //     }
    // }
    componentDidMount(){
        this.props.ListSub()
    }

    showSubject = (ListItems) => {
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
        const { ListItems } = this.props;
        // console.log(ListItems)
        return (
            <div className="name-exam">
                <ul>{this.showSubject(ListItems)}</ul>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log(state.ListSubject);
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

export default connect(mapStateToProps,mapDispatchToProps)(ListSubject);