import React, { useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
interface Creative {
  id: number;
  img: string;
  title: string;
  color: string;
  price: string;
  producer: string;
  createdAt: string;
  inStock: boolean;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Фото/Видео",
    width: 200,
    renderCell: (params) => {
      if (params.row.img && params.row.img.endsWith(".mp4")) {
        // Если это видео, отображаем видео элемент
        return (
          <video width="200" controls>
            <source src={params.row.img} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else {
        // Если это изображение, отображаем изображение
        return <img src={params.row.img || "http://localhost:5173/noavatar.png"} alt="" />;
      }
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Домен",
    width: 250,
  },
  
  {
    field: "price",
    type: "string",
    headerName: "Оффер",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Арбитражник",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Создан",
    width: 200,
    type: "string",
  },
  
  
];
const sessionUsername = localStorage.getItem('sessionUsername')
const Products: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery<{
    success: boolean;
    creatives: Creative[];
  }>({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch("http://31.129.106.235:5052/get_creatives", {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionUsername }), 
      }).then((res) => res.json()),
  });
  

  return (
    <div className="products">
      <div className="info">
        <h1>Креативы</h1>
        <button onClick={() => setOpen(true)}>Добавить новый креатив</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        data && data.creatives ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={data.creatives.map((creative) => ({
              ...creative,
              createdAt: creative.createdAt,
            }))}
          />
        ) : (
          "No data available"
        )
      )}

      {open && <Add setOpen={setOpen} slug={""} columns={[]} />}
    </div>
  );
};

export default Products;
