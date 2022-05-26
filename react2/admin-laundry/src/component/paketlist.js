import React from "react";

export default class PaketList extends React.Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-12 p-2">
                <div className="card shadow">
                    <div className="card-body">
                        {/* menampilkan deskripsi */}
                        <div className="col-5">
                            <h5 className="text-weight-bold" style={{color:"#1B4965"}}>
                                {this.props.jenis}
                            </h5>
                            <h6 className="text-dark">
                                Harga: {this.props.harga}
                            </h6>

                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary " style={{borderRadius:"8px", marginRight:"4px"}}
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger " style={{borderRadius:"8px"}}
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