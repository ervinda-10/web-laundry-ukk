import React from "react"
import Navbar from "../component/navbar"
import axios from "axios"
import { base_url } from "../config.js"
import illustration from "../assets/londrihome.png"

export default class Home extends React.Component{
    constructor(){
    super()
    this.state = {
        token: "",
        adminName: null,
        memberCount: 0,
        userCount: 0,
        paketCount: 0,
        transaksiCount: 0
    }

    if (localStorage.getItem("token")) {
        this.state.token = localStorage.getItem("token")
    } else {
        window.location = "/login"
    }
}

headerConfig = () => {
    let header = {
        headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
}

getPaket = () => {
    let url = base_url + "/paket"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({paketCount: res.data.length})
    })
    .catch(error => {
        if (error.res) {
            if (error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    })
}
getMember = () => {
    let url = base_url + "/member"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({memberCount: res.data.length})
    })
    .catch(error => {
        if(error.res) {
            if(error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    });
}
getUser = () => {
    let url = base_url + "/user"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({userCount: res.data.length})
    })
    .catch(error => {
        if (error.res) {
            if (error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    });
}
getTransaksi = () => {
    let url = base_url + "/transaksi"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({transaksiCount: res.data.length})
    })
    .catch(error => {
        if (error.res) {
            if (error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    });
}
getUsers = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({adminName: user.nama_user});
}

componentDidMount() {
    this.getMember()
    this.getUser()
    this.getPaket()
    this.getTransaksi()
    this.getUser()
}

    render(){
        return(
   <div>
     <Navbar role={localStorage.getItem("role")} />
        <div className="container mt-2">
        <div className="card-body shadow" style={{padding:"20px", borderRadius:"5px", marginTop:"75px"}}>
            <h1 className="text-dark font-weight-bold"> Welcome Back</h1>
            <h6 className="text-mute">Don't forget update your data.</h6>
            <h6 className="text-mute">Have a nice day</h6>
    
        </div>
        <div>
                <img src={illustration} style={{width:"40%", marginLeft:"662px", marginTop:"-246px"}}></img>
         </div>
        <div className="row" style={{marginTop:"20px"}}>
            {/* member count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-2" >
                <div className="card"> 
                    <div className="card-body" href="/Member" style={{backgroundColor:"#1B4965", borderRadius:"10px"}}>
                        <h4 className="text-light">
                            <strong>Member Count</strong>
                        </h4>
                        <h1 className="text-white">
                        <strong>{this.state.memberCount}</strong>
                        </h1>
                    </div>
                </div>
            </div>

            {/* user count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                <div className="card">
                    <div className="card-body" style={{backgroundColor:"#1B4965", borderRadius:"10px"}}>
                        <h4 className="text-light">
                            <strong>User Count</strong>
                        </h4>
                        <h1 className="text-white">
                          <strong>{this.state.userCount}</strong>
                        </h1>
                    </div>
                </div>
            </div>

            {/* paket count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                <div className="card">
                    <div className="card-body" style={{borderRadius:"10px", backgroundColor:"#1B4965"}}>
                        <h4 className="text-light">
                            <strong>Paket Count</strong>
                        </h4>
                        <h1 className="text-white">
                         <strong>{this.state.paketCount}</strong>
                        </h1>
                    </div>
                </div>
            </div>

            {/* transaksi count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                <div className="card">
                    <div className="card-body" style={{borderRadius:"10px", backgroundColor:"#1B4965"}}>
                        <h4 className="text-light">
                            <strong>Transaksi Count</strong>
                        </h4>
                        <h1 className="text-white">
                     <strong>{this.state.transaksiCount}</strong>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        )
    }
}