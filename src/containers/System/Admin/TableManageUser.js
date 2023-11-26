import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux:[]
        };
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            // let arrGenders = this.props.listUsers;
            this.setState({
                usersRedux:this.props.listUsers
                // genderArr: arrGenders,
                // gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key: ' '

            })
        } 
        // if (prevProps.positionRedux !== this.props.positionRedux) {
        //     let arrPositions = this.props.positionRedux;
        //     this.setState({
        //        positionArr: arrPositions,
        //         position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key:''

        //     })
        // } 
        // if (prevProps.roleRedux !== this.props.roleRedux) {
        //     let arrRoles = this.props.roleRedux;
        //     this.setState({
        //         roleArr: arrRoles,
        //        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key:''

        //     })
        // } 
      }
      handleDeleteUser = (user)=>{
        this.props.deleteAUserRedux(user.id)
      }
      handleEditUser= (user)=>{
        this.props.handleEditUserFromParent(user)
      }
    render() {
        
        let arrUsers = this.props.listUsers;
        return (
            <>
            <table id='TableManageUser' >
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        
                            {arrUsers && arrUsers.length>0 && arrUsers.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button 
                                            className="btn-edit"
                                            onClick={()=>{
                                                this.handleEditUser(item)
                                            }}
                                            ><i className='fas fa-pencil-alt'></i></button>
                                            <button 
                                            className="btn-delete"
                                            onClick={()=>{
                                                this.handleDeleteUser(item)
                                            }}
                                            ><i className='fas fa-trash'></i></button>

                                        </td>
                                        
                                    </tr>
                                )
                            })}
                            
                        
                    </tbody>
                 
                
            </table>
            <MdEditor style={{ height: '500px', paddingTop: '13px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=>dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id)=>dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
