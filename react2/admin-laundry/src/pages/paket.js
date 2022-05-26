import React from "react"
import Navbar from "../component/navbar"
import PaketList from "../component/paketlist"
import { base_url } from "../config"

// import axios
import axios from "axios"

// import jquery
import $ from"jquery"


export default class Paket extends React.Component{
       constructor(){
        super()
        this.state = {
            paket: [],
            token: "",
            action: "",
            jenis: "",
            harga: 0,
            id_paket: ""
        }

        /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
           if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.role = JSON.parse(localStorage.getItem("user")).role


        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    // header config -> untuk memberikan header berupa 'beare token' sebagai request API
    // sebelum mengakses data
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    // getPaket -> untuk mengakses API get paket
    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({paket: response.data})
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
                this.getPaket()
            }
// function add -> untuk memberikan inisialisasi data dan menampilkan modal untuk menambah data
Add = () => {
    $("#modal_paket").modal("show")
    this.setState({
        action: "insert",
        id_paket: 0,
        jenis: "",
        harga: 0
    })
}

// function edit -> untuk memberikan inisialisasi data dan menampilkan modal untuk mengedit data
Edit = selectedItem => {
    $("#modal_paket").modal("show")
    this.setState({
        action: "update",
        id_paket: selectedItem.id_paket,
        jenis: selectedItem.jenis,
        harga: selectedItem.harga            
    })
}
// function savePaket -> untuk menyimpan data pada db dengan mngakses API
savePaket = event => {
    event.preventDefault()
    $("#modal_paket").modal("hide")
    let form = {
        id_paket: this.state.id_paket,
        jenis: this.state.jenis,
        harga: this.state.harga
    }

    let url = base_url + "/paket"
    if(this.state.action === "insert") {
        axios.post(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPaket()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
        axios.put(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPaket()
        })
        .catch(error => console.log(error))
    }
}
// dropPaket -> untuk menghapus data paket
dropPaket = selectedItem => {
    if (window.confirm("Yakin mau dihapus ?")) {
        let url = base_url + "/paket/" + selectedItem.id_paket
        axios.delete(url, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPaket()
        })
        .catch(error => console.log(error))
    }
}
        render(){
            return(
                <div>
                    <Navbar role={this.state.role}/>
                    <div className="container">
                        <h3 className="text-bold text-dark font-weight-bold mt-2">
                            Paket List
                            <button className="btn btn-success" style={{marginLeft:"886px", marginTop:"1px"}} onClick={() => this.Add()}>Add Paket </button>
                        </h3>
                        <div className="row">
                            { this.state.paket.map( item => (
                                <PaketList
                                key = {item.id_paket} 
                                jenis = {item.jenis}
                                harga = {item.harga}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropPaket(item)}
                                />
                            )) }
                        </div>
                    </div>
    
                    {/* modal paket */}
                    <div className="modal fade" id="modal_paket">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header text-white" style={{backgroundColor:"#1B4965"}}>
                                    <h4>Form Paket</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePaket(ev)}>
                                        Jenis Paket
                                        <input type="text" className="form-control mb-1"
                                         value={this.state.jenis}
                                         onChange={ev => this.setState({jenis: ev.target.value})}
                                         required
                                         />
    
                                        Harga
                                        <input type="number" className="form-control mb-1"
                                         value={this.state.harga}
                                         onChange={ev => this.setState({harga: ev.target.value})}
                                         required
                                         />
    
                                         <button type="submit" className="btn btn-sm text-white"  style={{backgroundColor:"#1B4965"}}>
                                             Simpan
                                         </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }