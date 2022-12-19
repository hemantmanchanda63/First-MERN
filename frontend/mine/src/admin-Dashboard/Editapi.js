import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Editapi = (props) => {
    const { name, email, phone, occupation, onClose,handleinputs, id,setOpen,Hello } = props;
   
    const handleUpdate =async(id)=>{
        await axios.post(`/updateusers/${id}`, {name,email,phone,occupation},{
            headers: {
                "Content-Type": "application/json"
            }
        })
        setOpen(false)
        Hello()
    }

    return (
        <>
            <Modal
                open={props.open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>
                        Edit the Form
                    </h2>
                    <div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels">Name</label>
                                <input type="text" className="form-control" placeholder="Name"
                                    value={name}
                                    onChange={handleinputs}
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Mobile Number</label>
                                <input type="text" className="form-control" placeholder="enter phone number"
                                    value={phone}
                                    onChange={handleinputs}
                                    name="phone"

                                />
                                </div>
                            <div className="col-md-12">
                                <label className="labels">Email ID</label>
                                <input type="text" className="form-control" placeholder="enter email id"
                                    value={email}
                                    onChange={handleinputs}
                                    name="email"
                                />
                                </div>
                            <div className="col-md-12">
                                <label className="labels">Occupation</label>
                                <input type="text" className="form-control" placeholder="Occupation"
                                    value={occupation}
                                    onChange={handleinputs}
                                    name="occupation"
                                />
                                </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="btn btn-primary profile-button" onClick={()=>handleUpdate(id)} type="button">Update
                            </button>
                            <button className="ml-2 btn btn-primary profile-button" onClick={() => onClose()} type="button">Cancel</button></div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Editapi


