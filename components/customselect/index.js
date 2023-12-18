import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import axios from "@/utils/api";

export default function Cselect({ onSelectProducts }) {
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("api/v1/orders/products")
      .then((e) => {
        let newData = e.data.data.map((e, index) => ({
          id: ++index,
          ...e,
        }));

        setProducts(newData);
      })
      .catch((r) => console.error(r));
  }, []);

  const countryTemplate = (option) => {
    return (
      <div className="flex align-items-center flex-row ">
        <img
          alt={option.productName}
          //   src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          src={option.imageLink}
          //   className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: "50px" }}
        />
        <div style={{ display: "inline-block", fontSize: "16px" }}>
          {option.productName}
        </div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    const length = selectedCountries ? selectedCountries.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    );
  };

  return (
    <div>
      <MultiSelect
        value={selectedCountries}
        options={products}
        onChange={(e) => {
          console.log(e);
          setSelectedCountries(e.value);
          onSelectProducts(e.value);
        }}
        optionLabel="name"
        placeholder="Select Products"
        itemTemplate={countryTemplate}
        panelFooterTemplate={panelFooterTemplate}
        className="w-full md:w-20rem"
        maxSelectedLabels={3}
        display="chip"
      />
    </div>
  );
}
