import React from "react";
import "./Profile.css";

const ModalProfile = ({ formData, handleChange, handleSubmit, closeModal}) => {

    return (
        <div className="modal" onClick={closeModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
            <h2>Editar Perfil</h2>
            <button className="close-btn" onClick={closeModal}>
                ×
            </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="categories">UserName:</label>
                <input
                type="text"
                id="categories"
                name="categories"
                value={formData.userName}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Biografía:</label>
                <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                />
            </div>
            <div className="modal-footer">
                <button
                type="button"
                className="button-secondary"
                onClick={closeModal}
                >
                Cancelar
                </button>
                <button type="submit" className="button-primary">
                Guardar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};
export default ModalProfile;