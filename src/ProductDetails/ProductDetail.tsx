import React from "react";

function ProductDetails({ product }) {
  return (
    <div>
      <h2>{product.productName}</h2>
      <p>Полное описание: {product.fullDescription}</p>
      <p>Цена: {product.price}</p>
      {/* Другие детали продукта */}
      <button>Закрыть</button>
    </div>
  );
}

export default ProductDetails;
