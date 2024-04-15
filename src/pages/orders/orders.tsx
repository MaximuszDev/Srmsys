import React, { useState, useEffect } from "react";
import "./orders.scss";

function OrdersPage() {
  const ordersData = [
    {
      id: 1,
      productName: "Pro-Strong",
      description: "Увелечение простата",
      fullDescription: "Полное описание продукта 1",
      category: "pro-strong",
      image: "https://www.script.potideo.pw/img/tovar.webp",
    },
    {
      id: 2,
      productName: "BE CLEAN",
      description: "",
      fullDescription: "Полное описание продукта 2",
      category: "beclean",
      image: "https://www.script.potideo.pw/img/beclean.jpeg",
    },
    // Добавьте данные для других заказов
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h1>Страница заказов</h1>
      <div className="order-list">
        {ordersData.map((order) => (
          <div key={order.id} className="order-item">
            <img src={order.image} alt={order.productName} />
            <h2>{order.productName}</h2>
            <p>Краткое описание: {order.description}</p>
            <button onClick={() => handleProductDetails(order)}>Подробнее</button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <h2>Подробная информация</h2>
          <p>{selectedProduct.fullDescription}</p>
          <p>Цена: {selectedProduct.price}</p>
          <button onClick={() => setSelectedProduct(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
