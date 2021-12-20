import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'
import Seats from '../components/Seats'
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
class ChooseSeats extends Component {
    state = {
        arrSeats: [],
        deptSeats: []
    }
    handleConfirm() {
        const {arrSeats , deptSeats} = this.state ; 
        const {  adults, children } = JSON.parse(sessionStorage.getItem('deal')) ; 
        if (arrSeats.length < Number(adults) + Number(children) ||deptSeats.length < Number(adults) + Number(children)  ) {
            alert("you must choose all seats")
        }else{
            this.props.parentFunc(deptSeats , arrSeats , JSON.parse(sessionStorage.getItem('deal')))
        }
    
    }
    handleSeatsChange(att, seats) {
        console.log(seats)
        this.setState(
            {
                ...this.state,
                [att]: seats
            }
        )
    }
    render() {
        const { deptFlight, arrFlight, deptCabin, arrCabin, adults, children } = JSON.parse(sessionStorage.getItem('deal'))
       // console.log("seats are " , deptFlight[deptCabin].Seats) ; 
       // console.log("seats are " , arrFlight[arrCabin].Seats) ; 
        return (
            <div className="seats-page slide-left">
                {/* <MyHeader /> */}
                <div className="shuttles">
                    <Seats parentFunc={(att, num) => this.handleSeatsChange(att, num)} seats = {deptFlight[deptCabin].Seats} att="deptSeats" type="Departure flight" seatClass={deptCabin} passengers={Number(adults) + Number(children)} />
                    <Seats parentFunc={(att, num) => this.handleSeatsChange(att, num)} seats = {arrFlight[arrCabin].Seats} att="arrSeats" type="Return flight" seatClass={arrCabin} passengers={Number(adults) + Number(children)} />
                </div>
               
                    {/* <Button
                        onClick={this.handleConfirm.bind(this)}
                        style={{
                            backgroundColor: "#447fcc",
                            width: "15em",
                            height: "7vh",
                            fontSize: "small",
                            marginBottom:"15px"
                        }}

                        variant="contained"
                    >
                        Confirm Seats
                    </Button> */}
                
            </div>
        )
    }
}

export default withRouter(ChooseSeats);
