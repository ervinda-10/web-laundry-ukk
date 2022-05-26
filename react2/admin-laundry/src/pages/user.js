import React from "react"
import Navbar from "../component/navbar"
// import base_url dari file config.js
import { base_url } from "../config"

// import axios
import axios from "axios"

// import jquery
import $ from "jquery"
export default class User extends React.Component{
       constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            user: [],
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            fillPassword: true            
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("item")
            this.state.role = JSON.parse(localStorage.getItem("user")).role
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({user: response.data})
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }
    componentDidMount() {
        this.getUser()
    }

Add = () => {
        $("#modal_user").modal("show")        
        this.setState({
            action: "insert",
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            role: "",
            fillPassword: true
        })
    }
Edit = selectedItem => {
        $("#modal_user").modal("show")
        this.setState({
            action: "update",
            id_user: selectedItem.id_user,
            nama: selectedItem.nama,
            username: selectedItem.username,
            password: "",
            role: selectedItem.role,
            fillPassword: false
        })
    }
    saveUser = event => {
        event.preventDefault()
        $("#modal_user").modal("hide")
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            role: this.state.role,
            username: this.state.username
        }
        
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }

        let url = base_url + "/user"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        }
    }

    dropUser = selectedItem => {
        if (window.confirm("Yakin mau dihapus ?")) {
            let url = base_url + "/user/" + selectedItem.id_user
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        }
    }
         render(){
        return(
            <div>
                <Navbar role={this.state.role}/>
                <div className="container">
                    <h3 className="text-dark font-weight-bold mt-2">
                        User List
                        <button className="btn btn-success" style={{marginLeft:"890px", marginTop:"1px"}} onClick={() => this.Add()}>Add User </button>
                    </h3>
                    <table className="table table-striped">
                        <thead className="text-white font-weight-bold" style={{backgroundColor:"#1B4965"}}>
                            <tr>
                                <th>#</th>
                                <th>Nama User</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1" style={{borderRadius:"8px"}}
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger " style={{borderRadius:"8px"}}
                                        onClick={() => this.dropUser(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                    {/* Modal User */}
                    <div className="modal fade" id="modal_user">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header text-white"  style={{backgroundColor:"#1B4965"}}>
                                    <h4>Form User</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveUser(ev)}>
                                        Nama User
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({nama: ev.target.value})} 
                                        required
                                        />
                                        Role
                                        <div className="form-group">
                                            <select name="role" id="role" className="form-control"
                                            onChange={ev => this.setState({role: ev.target.value})}
                                            value={this.state.role}>
                                                <option>--- Pilih ---</option>     
                                                <option value="Admin">
                                                    Admin
                                                </option>
                                                <option value="Kasir">
                                                    Kasir
                                                </option>
                                            </select>
                                        </div>

                                        Username
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                        />

                                        { this.state.action === "update" && this.state.fillPassword === false ? (
                                            <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                                Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({password: ev.target.value})}
                                                required
                                                />
                                            </div>
                                        ) }

                                        <button type="submit" className="btn btn-sm text-white"  style={{backgroundColor:"#1B4965"}}>
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}