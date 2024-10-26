import React from "react";
import "./Profile.css";

const ModalAddFriend = ({ formData, handleChange, handleSubmit, closeModal}) => {

    return(
        <div className="modal" onClick={closeModal}>
            <div onClick={(e) => e.stopPropagation()}>
                <div className="modal">
                    <div className="modalContent">
                    <button className="close" onClick={closeModal}>
                        x
                    </button>
                    <h2>Add Friend</h2>
                    <input className="add-friend-input" type="text" placeholder="Agrega a tu amigo" />
                    <button className="Inside-modal-add-button">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ModalAddFriend;