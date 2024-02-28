import React, { useState } from 'react'; // Asegúrate de importar useState de 'react'
import './AllGalleryByProduct.css';
import { useApi } from "../../../../../../../context/ApiContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

function AllGalleryByProduct({ onClose }) {
    const { productos } = useApi();
    const { id } = useParams(); // Obtener el id de la URL
    const filteredProduct = productos.find(producto => producto.id === Number(id)); // Convertir el id a un número

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredProduct.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredProduct.images.length) % filteredProduct.images.length);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="gallery-header">
                    <FontAwesomeIcon icon={faTimes} onClick={onClose} className="close-icon" />
                </div>
                <div className="gallery-content">
                    {filteredProduct && (
                        <div id="gallery-section" key={filteredProduct.id} className="gallery-container">
                            <FontAwesomeIcon icon={faChevronLeft} onClick={prevImage} className="gallery-icon prev-icon" />
                            <img
                                src={`data:image/jpeg;base64,${filteredProduct.images[currentImageIndex].imageData}`}
                                alt={`${filteredProduct.name}-imagen-${currentImageIndex}`}
                                className="gallery-image"
                            />
                            <FontAwesomeIcon icon={faChevronRight} onClick={nextImage} className="gallery-icon next-icon" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllGalleryByProduct;
