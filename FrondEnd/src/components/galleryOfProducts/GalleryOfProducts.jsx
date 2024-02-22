import React, { useState } from 'react';
import { useApi } from "../../context/ApiContext.jsx";
import './GalleryOfProducts.css';

function GalleryOfProducts() {
    const { productos } = useApi();

    // Filtrar el producto con id igual a 2
    const filteredProduct = productos.find(producto => producto.id === 2);

    return (
        <div className="gallery-content">
            {filteredProduct && (
                <div id="gallery-section" key={filteredProduct.id}>
                    {/* Mostrar la primera imagen en un div separado */}
                    <div className="first-images-container">
                        {/* Mostrar las dos primeras imágenes */}
                        {filteredProduct.images.slice(0,1).map((image, index) => (
                            <img
                                key={index}
                                src={`data:image/jpeg;base64,${image.imageData}`}
                                alt={`${filteredProduct.name}-imagen-${index}`}
                            />
                        ))}
                    </div>
                    {/* Mostrar las otras imágenes en otro div */}
                    <div className="other-images-container">
                        <div>
                            {/* Mostrar las siguientes imágenes, empezando desde la tercera hasta la cuarta */}
                            {filteredProduct.images.slice(1, 3).map((image, index) => (
                                <img
                                    key={index + 2}
                                    src={`data:image/jpeg;base64,${image.imageData}`}
                                    alt={`${filteredProduct.name}-imagen-${index + 2}`}
                                />
                            ))}
                        </div>
                        <div>
                            {/* Mostrar las siguientes imágenes, empezando desde la quinta */}
                            {filteredProduct.images.slice(3,5).map((image, index) => (
                                <img
                                    key={index + 4}
                                    src={`data:image/jpeg;base64,${image.imageData}`}
                                    alt={`${filteredProduct.name}-imagen-${index + 4}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GalleryOfProducts;
