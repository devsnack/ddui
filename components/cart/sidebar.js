import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useCart } from "react-use-cart";
import { InputText } from "primereact/inputtext";
export default function SideCart({ onConfirm }) {
  const [visible, setVisible] = useState(false);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const handleConfirmation = () => {
    if (items.length === 0) return;
    onConfirm();
  };

  //   if (isEmpty) return <p> Cart est vide</p>;

  return (
    <div className=" flex justify-content-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2>Sidebar</h2>
        <div className=" xl:flex xl:justify-content-center">
          {items?.map((p) => (
            <div className=" mt-4 card flex flex-wrap p-2 align-items-center gap-3">
              <img
                style={{ width: "180px" }}
                className=" shadow-2 flex-shrink-0 border-round"
                src={p.imageLink}
                alt={p.productName}
              />
              <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                <span className="font-bold">{p.productName}</span>
                <div className="flex align-items-center gap-2">
                  {/* <i className="pi pi-tag text-sm"></i> */}
                  <div className="d-flex justify-content-around">
                    <Button
                      className="rounded"
                      label="+"
                      onClick={() => updateItemQuantity(p.id, p.quantity + 1)}
                    />
                    <InputText
                      style={{ maxWidth: "80px" }}
                      type="text"
                      className="font-bold text-900"
                      defaultValue={p.quantity}
                      onBlur={
                        (e) => {
                          e.target.value != ""
                            ? updateItemQuantity(p.id, parseInt(e.target.value))
                            : updateItemQuantity(p.id, null);
                        }
                        // updateItemQuantity(p.id, parseInt(e.target.value))
                      }
                    />
                    <Button
                      className="rounded"
                      label="-"
                      severity="warning"
                      onClick={() => updateItemQuantity(p.id, p.quantity - 1)}
                    />
                  </div>

                  <span>{p.category}</span>
                </div>
              </div>
              <span className="font-bold text-900">QTE {p.quantity}</span>
            </div>
          ))}

          <div className="d-flex justify-content-around mt-3">
            <strong>Total : {parseFloat(cartTotal).toFixed(2)}</strong>
            {/* <span>{items.length}</span> */}
          </div>
        </div>
        <button
          className="btn btn-warning p-2 rounded-0 mt-5"
          onClick={handleConfirmation}
        >
          <i className="pi pi-check-circle mx-1"></i>
          <span>Confirmer La Commande</span>
        </button>
      </Sidebar>
      <Button
        icon="pi pi-shopping-cart"
        onClick={(e) => {
          e.preventDefault();
          setVisible(true);
        }}
      />
    </div>
  );
}
