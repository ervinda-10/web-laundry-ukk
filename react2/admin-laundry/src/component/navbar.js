import React from "react"
import {Link} from "react-router-dom"

class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        window.location = "/login"
    }
    render(){
        return(

            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#1B4965"}}>
                <a className="navbar-brand text-white font-weight-bold">
                     Laundry.
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link text-white" href="/">
             Dashboard
         <span class="sr-only">(current)</span></a>
        </li>
        {this.props.role === "Admin" ? <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Option
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/Member">               
                    Member  
            </a>

            <a class="dropdown-item" href="/User">
                    User                
            </a>
            <a class="dropdown-item" href="/Paket">
                    Paket
            </a>
            <a class="dropdown-item" href="/Transaksi">
                    Transaksi
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" onClick={() => this.Logout()}>Logout</a>
                </div>
             </li> : this.props.role === "Kasir" ? <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Option
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/Member">               
                    Member  
            </a>
            <a class="dropdown-item" href="/Transaksi">
                    Transaksi
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" onClick={() => this.Logout()}>Logout</a>
                </div>
             </li> : null }
        
            </ul>
          </div>
        </div>
        )
    }
}
export default Navbar;