import React, { useState } from "react";
import "./Add.scss";
import { useQueryClient } from "@tanstack/react-query"; // Импортируем useQueryClient

interface Props {
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add: React.FC<Props> = (props) => {
  const [newItem, setNewItem] = useState({
    price: "",
    domain: "",
    file: null as File | null,
  });

  const queryClient = useQueryClient(); // Получаем queryClient

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewItem({ ...newItem, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { price, domain, file } = newItem;

    try {
      const formData = new FormData();
      formData.append("price", price);
      formData.append("domain", domain);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("http://31.129.106.235:5052/add_creative", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Данные успешно отправлены на сервер");
        setNewItem({
          price: "",
          domain: "",
          file: null,
        });

        // Обновляем таблицу после успешного добавления
        queryClient.invalidateQueries(["allproducts"]); // Здесь используйте правильный ключ запроса
        props.setOpen(false);
      } else {
        console.error("Ошибка при отправке данных на сервер");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Оффер</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Домен</label>
            <input
              type="text"
              name="domain"
              placeholder="Domain"
              value={newItem.domain}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Креатив</label>
            <input
              type="file"
              accept="image/*,video/*"
              name="file"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
