import React from "react"
import Navbar from "../component/navbar"

// import base_url dari file config.js
import { base_url } from "../config"

// import axios
import axios from "axios"

// import jquery
import $ from "jquery"

import MemberList from "../component/memberlist"

// import modal -> untuk versi bootstrap 5
// import { Modal } from "bootstrap"
// note : jika menggunakan bootstrap 4 tidak ush menambahkan script diatas

export default class Member extends React.Component{
    constructor(){
        super()
        // siapkan state --> untuk pembuatan halaman customer
        this.state = {
            member: [],
            token: "",
            action: "",
            id_member: "",
            nama: "",
            telpon: "",
            alamat: "",
            jenis_kelamin: "",
            
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
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // getMember -> untuk mengakses API get member
    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({member: response.data})
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
        this.getMember()
    }

    // function add -> untuk memberikan inisialisasi data dan menampilkan modal untuk menambah data
    Add = () => {
        // menampilkan modal versi bootstrap 5
        // let myModal = new Modal (document.getElementById("modal_member"))
        // myModal.show()
        // --------------------
        // Note : versi bootstrap 4
        $("#modal_member").modal("show")
        // ---------------------
        this.setState({
            action: "insert",
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telpon: ""
        })
    }

    // function edit -> untuk memberikan inisialisasi data dan menampilkan modal untuk mengedit data
    Edit = selectedItem => {
        // menampilkan modal versi bootstrap 5
        // let myModal = new Modal (document.getElementById("modal_member"))
        // myModal.show()
        // --------------------
        // Note : versi bootstrap 4
        $("#modal_member").modal("show")
        // ---------------------
        this.setState({
            action: "update",
            id_member: selectedItem.id_member,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            jenis_kelamin: selectedItem.jenis_kelamin,
            telpon: selectedItem.telpon
        })
    }

    // function saveMember -> untuk menyimpan data pada db dengan mngakses API
    saveMember = event => {
        event.preventDefault()
        // let myModal = new Modal (document.getElementById("modal_member"))
        // myModal.hide()
        $("#modal_member").modal("hide")
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            telpon: this.state.telpon
        }

        let url = base_url + "/member"
        if(this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        }
    }

    // function dropMember -> untuk menghapus data member
    dropMember = selectedItem => {
        if (window.confirm("Yakin mau dihapus?")) {
            let url = base_url + "/member/" + selectedItem.id_member
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                { <Navbar role={this.state.role} /> }
                <div className="container">
                    <h3 className="text-bold text-dark font-weight-bold" style={{marginLeft:"140px", marginTop:"15px"}}>
                        Member List
                        <button className="btn btn-success" style={{marginLeft:"580px", marginTop:"1px"}} onClick={() => this.Add()}>
                        Add Member
                    </button>
                    </h3>
                    
                    <div className="container" style={{marginTop:"-30px", borderRadius:"50px"}}>
                        { this.state.member.map(item => (
                            <MemberList
                                key = {item.id_member}
                                nama = {item.nama}
                                telpon = {item.telpon}
                                jenis_kelamin = {item.jenis_kelamin}
                                alamat = {item.alamat}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropMember(item)}
                            />
                        )) }
                    </div>
                </div>

                {/* modal member */}
                <div className="modal fade" id="modal_member">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-white" style={{backgroundColor:"#1B4965"}}>
                                <h4>Form Member</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveMember(ev)}>
                                    Member Name
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.nama}
                                    onChange={ev => this.setState({nama: ev.target.value})}
                                    required
                                    />
                                    Member Address
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.alamat}
                                    onChange={ev => this.setState({alamat: ev.target.value})}
                                    required
                                    />
                                    Jenis Kelamin
                                    <div className="form-group">
                                        <select name="jenis_kelamin" id="jenis_kelamin" className="form-control"
                                        onChange={ev => this.setState({jenis_kelamin: ev.target.value})}
                                        value={this.state.jenis_kelamin}>
                                            <option>--- Pilih ---</option>     
                                            <option value="Laki-Laki">
                                                Laki-Laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </select>
                                    </div>
                                    Member Phone
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.telpon}
                                    onChange={ev => this.setState({telpon: ev.target.value})}
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