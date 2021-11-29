import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../style/profile.css';
import EditIcon from '@mui/icons-material/Edit';
import { fontSize } from '@mui/system';
import MyHeader from '../components/MyHeader';
import Trip from '../components/Trip';

export default class Profile extends Component {

  state = {
    editName: false,
    editPassport: false,
    editEmail: false,
    fname: "",
    lname: "",
    email: "",
    passport: "",
  }

  handleEditName() {

    console.log(this.state.id)
    this.setState(
      {
        editName: !this.state.editName
      }
    )
  }

  handleEditPassport() {

    console.log(this.state.id)
    this.setState(
      {
        editPassport: !this.state.editPassport
      }
    )
  }
  handleEditEmail() {
    console.log(this.state.id)
    this.setState(
      {
        editEmail: !this.state.editEmail
      }
    )
  }

  handleSave() {

    window.location.reload();

  }

  handleEditChange(e) {
    // e.target byshoof anhi textbox .value => acesses the value getting from change event w7na bn7shrha tb2a bt3t textbox
    const value = e.target.value;
    this.setState({
      //spreading state 
      ...this.state,
      [e.target.name]: value,
    });
  }

  render() {


    const { editName, editPassport, editEmail, fname, lname, email, passport } = this.state;
    return (
      <div className="flex-col-profile" >
       
          <MyHeader />
        
        <div className="flex-row-profile" style={{marginTop:"25px"}}>

          <div className="profile-container">
            <div className="profile">
              <div className="account-icon"><AccountCircleIcon style={{ color: "#12228F", fontSize: "10rem" }} /></div>
              {
                !editName ?
                  <div className="name">Bill Gates <EditIcon className="icon" onClick={this.handleEditName.bind(this)} /></div> :
                  <div className="name">
                    <Form.Control style={{ width: '60%' }} size="sm" name="fname" type="text" placeholder="first name" value={fname} onChange={this.handleEditChange.bind(this)} />
                    <Form.Control style={{ width: '60%' }} size="sm" name="lname" type="text" placeholder="last name" value={lname} onChange={this.handleEditChange.bind(this)} />
                    <p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p>
                  </div>
              }

              <table>
                <div style={{ width: "90%" }}></div>
                <tr style={{ borderBottom: "2px solid black", borderTop: "2px solid black", marginTop: "50px", borderWidth: "90%" }}>
                  <th className="profile-th">Passport Number:</th>
                  {!editPassport ?
                    <>
                      <td className="profile-th">A13786F</td>
                      <td className="profile-th"><EditIcon className="icon" onClick={this.handleEditPassport.bind(this)} /></td>
                    </>
                    :
                    <>
                      <td className="profile-th"><Form.Control style={{ width: '60%' }} size="sm" name="passport" type="text" placeholder="Passport Number" value={passport} onChange={this.handleEditChange.bind(this)} /></td>
                      <td className="profile-th"> <p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>
                    </>
                  }

                </tr>
                <div></div>
                <tr>
                  <th className="profile-th"> Email:</th>
                  {!editEmail ?
                    <>
                      <td className="profile-th">bg@gmail.com</td>
                      <td className="profile-th"><EditIcon className="icon" onClick={this.handleEditEmail.bind(this)} /></td>
                    </>
                    :
                    <>
                      <td className="profile-th"><Form.Control style={{ width: '60%' }} size="sm" name="email" type="text" placeholder="Email" value={email} onChange={this.handleEditChange.bind(this)} /></td>
                      <td className="profile-th"><p onClick={this.handleSave.bind(this)} style={{ margin: '0', fontWeight: 'bold', fontSize: 'medium' }} className="icon"> save </p></td>
                    </>}

                </tr>
              </table>
            </div>
          </div>




        </div>
        
      </div>
    )
  }
}

