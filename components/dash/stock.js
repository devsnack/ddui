import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import withAsync from "@/utils/withasync";
import { getStock } from "@/utils/api";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid");
  async function handleStock() {
    const dd = localStorage.getItem("dd");
    if (dd) {
      const { response, error } = await withAsync(getStock, dd);
      const stock = response?.data[0]?.stock;
      console.log(stock);
      setProducts(stock);
    }
  }
  useEffect(() => {
    handleStock();
  }, []);

  const getSeverity = (product) => {
    if (product.quantity > 5) return "success";
    if (product.quantity < 5 && product.quantity != 0) return "warning";
    if (product.quantity == 0) return "danger";
  };
  const getLabel = (product) => {
    if (product.quantity > 5) return "INSTOCK";
    if (product.quantity < 5 && product.quantity != 0) return "LOWSTOCK";
    if (product.quantity == 0) return "OUTOFSTOCK";
  };

  const itemTemplate = (product) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            style={{ width: "200px" }}
            className="w-4 sm:w-4rem xl:w-4rem shadow-2 block xl:block mx-auto border-round"
            src={product.imageLink}
            alt={product.productName}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className=" font-bold text-500">{product.productName}</div>
              {/* <Rating value={5} readOnly cancel={false}></Rating> */}
              <div className="flex align-items-center gap-3">
                {/* <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span> */}
                <Tag
                  value={getLabel(product)}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">
                QTE : {product.quantity}
              </span>
              {/* <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={getLabel(product) === "OUTOFSTOCK"}
              ></Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <DataView
        value={products}
        itemTemplate={itemTemplate}
        paginator
        rows={5}
      />
    </div>
  );
}
