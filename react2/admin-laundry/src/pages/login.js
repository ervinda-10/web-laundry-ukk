import React from "react"
import axios from "axios"
import { base_url } from "../config.js"
import illustration from "../assets/londri.png"

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/auth"

        axios.post(url, sendData)
            .then(res => {
                this.setState({ logged: res.data.logged })
                if (this.state.logged) {
                    console.log(res.data.data)
                    let user = res.data.data
                    let token = res.data.token
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", res.data.data.role)
                    this.props.history.push("/")
                    window.location = "/"
                } else {
                    this.setState({ message: res.data.message })
                }
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            // <div className="container d-flex h-100 justify-content-center align-items-center">
            //     <div className="col-sm-6 card my-5">
            //         <div className="card-header bg-primary text-white text-center">
            //             <h4>Laundry</h4>
            //             <strong className="text-white">Sign In</strong>
            //         </div>
            //         <div className="card-body">
            //             { !this.state.logged ? 
            //             (
            //                 <div className="alert alert-danger mt-1">
            //                     { this.state.message }
            //                 </div>
            //             ) : null }
            //             <form onSubmit={ev => this.Login(ev)}>
            //                 {/* username */}
            //                 <input type="text" className="form-control mb-1" value={this.state.username}
            //                 onChange={ev => this.setState({username: ev.target.value})} />

            //                 {/* password */}
            //                 <input type="password" className="form-control mb-1" value={this.state.password}
            //                 onChange={ev => this.setState({password: ev.target.value})}
            //                 autoComplete="false" />
            //                 <button className="btn btn-block btn-primary mb-1" type="submit">
            //                     Sign In
            //                 </button>
            //             </form>
            //         </div>
            //     </div>
            // </div>
            <div>
                <div className="contai" style={{ display: "flex", marginTop: "100px", padding: "24px" }}>
                    <div className="left" style={{ padding: "18px", marginLeft: "120px" }}>
                        <h3 className="font font-weight-bold" style={{ fontFamily: 'roboto', color: "#1B4965", padding: "16px", marginLeft: "45px", marginTop: "50px" }}>Login to Laundry.</h3>
                        <form onSubmit={ev => this.Login(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} placeholder="Username" style={{ width: "320px", height: "40px", borderRadius: "20px", margin: "16px", padding: "8px", paddingLeft: "16px" }} ></input>
                            <input type="password" className="form-control mb-1" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} placeholder="Password" autoComplete="false" style={{ width: "320px", height: "40px", borderRadius: "20px", margin: "16px", padding: "8px", paddingLeft: "16px" }}></input>
                            <button type="submit" style={{ padding: "8px", backgroundColor: "#1B4965", color: "white", width: "120px", border: "none", borderRadius: "20px", margin: "16px", marginLeft: "120px" }}>Login</button>
                        </form>

                    </div>
                    <div className="right" style={{ padding: "18px" }}>
                        <img src={illustration} style={{ width: "90%" }} />
                    </div>
                </div>
            </div>
        )
    }
}