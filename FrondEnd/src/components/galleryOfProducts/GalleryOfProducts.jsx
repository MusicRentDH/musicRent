import React, { useState } from 'react';
import { useApi } from "../../context/ApiContext.jsx";
import './GalleryOfProducts.css';
import AllGalleryByProduct from "../allGalleryByProduct/AllGalleryByProduct.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

function GalleryOfProducts() {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const openGallery = () => {
        setIsGalleryOpen(true);
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
    };

    const { productos } = useApi();

    // Filtrar el producto con id igual a 2
    const filteredProduct = productos.find(producto => producto.id === 2);

    return (
        <div className="gallery-content">
            <div id="gallery-section" key={filteredProduct.id} className="gallery-container">
                <div className="first-images-container">
                    {/* Mostrar la primera imágen */}
                    {filteredProduct.images.slice(0, 1).map((image, index) => (
                        <img
                            key={index}
                            src={`data:image/jpeg;base64,${image.imageData}`}
                            alt={`${filteredProduct.name}-imagen-${index}`}
                        />
                    ))}
                </div>
                {/* Mostrar las otras imágenes en otro div */}
                <div className="other-images-container">
                    <div className="side-images">
                        {filteredProduct.images.slice(1, 3).map((image, index) => (
                            <img
                                key={index + 2}
                                src={`data:image/jpeg;base64,${image.imageData}`}
                                alt={`${filteredProduct.name}-imagen-${index + 2}`}
                            />
                        ))}
                    </div>
                    <div className="side-images">
                        {/* Mostrar las siguientes imágenes, empezando desde la quinta */}
                        {filteredProduct.images.slice(3, 5).map((image, index) => (
                            <img
                                key={index + 4}
                                src={`data:image/jpeg;base64,${image.imageData}`}
                                alt={`${filteredProduct.name}-imagen-${index + 4}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Aquí colocamos la sección "Ver más" debajo de todas las imágenes */}
            <div className="see-more-images" id="images">
                <FontAwesomeIcon icon={faImage} />
                <a href="#" onClick={openGallery}>Ver más</a>
            </div>
            {isGalleryOpen && <AllGalleryByProduct onClose={closeGallery} />}
        </div>
    );
}

export default GalleryOfProducts;
