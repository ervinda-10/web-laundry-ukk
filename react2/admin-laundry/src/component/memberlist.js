import React from "react"

export default class MemberList extends React.Component{
    render() {
        return(
            <div className="col-lg-15 col-sm-10 p-20 " style={{marginLeft:"105px", marginTop:"40px"}}>
                <div className="card shadow-sm" style={{borderRadius:"10px", borderLeft:""}}>
                    <div className="card-body row ">

                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h4 style={{color:"#1B4965"}}>
                                Member Name: {this.props.nama}
                            </h4>
                            <h6 className="text-mute">Address: {this.props.alamat}</h6>
                            <h6 className="text-mute">Gander: {this.props.jenis_kelamin}</h6>
                            <h6 className="text-mute">Phone Number: {this.props.telpon}</h6>
                        </div>

                        {/* action */}
                        <div className="col-7">
                            <button className="btn btn-sm btn-primary" style={{marginRight:"10px", borderRadius:"8px"}}
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

                            <button className="btn btn-sm btn-danger" style={{borderRadius:"8px"}}
                            onClick={this.props.onDrop}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}