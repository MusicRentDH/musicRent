import React, { useState } from 'react';
import './AllGalleryByProduct.css'; // Archivo CSS para estilos del modal
import { useApi } from "../../context/ApiContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

function AllGalleryByProduct({ onClose }) {
    const { productos } = useApi();
    const filteredProduct = productos.find(producto => producto.id === 2); // Obtener el primer producto con ID igual a 2

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
                            {/* Icono para navegar a la imagen anterior */}
                            <FontAwesomeIcon icon={faChevronLeft} onClick={prevImage} className="gallery-icon prev-icon" />
                            {/* Mostrar la imagen actual en el modal */}
                            <img
                                src={`data:image/jpeg;base64,${filteredProduct.images[currentImageIndex].imageData}`}
                                alt={`${filteredProduct.name}-imagen-${currentImageIndex}`}
                                className="gallery-image"
                            />
                            {/* Icono para navegar a la siguiente imagen */}
                            <FontAwesomeIcon icon={faChevronRight} onClick={nextImage} className="gallery-icon next-icon" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllGalleryByProduct;
