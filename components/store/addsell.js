import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import FieldError from "../common.js/fielderror";
import wilaya from "@/utils/wilaya";
import cm from "@/utils/communes";
import withAsync from "@/utils/withasync";
import { availabelStores } from "@/utils/api";
import dynamic from "next/dynamic";

import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import Cselect from "../customselect";
import { useCart } from "react-use-cart";
import SideCart from "../cart/sidebar";
const Cart = dynamic(() => import("../cart"), { ssr: false });
function SellProducts() {
  const { setItems, emptyCart, items } = useCart();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const router = useRouter();
  const [commune, setCommune] = useState(cm.filter((e) => e.wilaya_code == 27));
  const [stores, setStores] = useState([]);
  // const [dd, setD] = useState(null);

  useEffect(() => {
    setValue("dd", window.localStorage.getItem("dd"));
    // return () => {
    //   let cart = window.localStorage.getItem("react-use-cart");
    //   cart.items = [];
    //   window.localStorage.setItem("react-use-cart", JSON.stringify(cart));
    // };
    return () => {
      emptyCart();
    };
  }, []);

  const getAvailabelStore = async () => {
    const { response, error } = await withAsync(
      availabelStores,
      getValues(["wilaya", "commune"])
    );
    setStores(response.data.data);
  };
  const handleSelectProducts = (e) => {
    setValue("products", e);
  };
  const handleAddProducts = (e) => {
    getValues("products") && setItems(getValues("products"));
    // ? "" : ;

    // .map((e) => addItem({ price: 1, quantity: 0, ...e }));
  };
  const onSubmit = async (data) => {
    //  DATA REARRANGE
    [data.storeId, data.storeName] = data.stores.split("-");
    delete data.stores;
    console.log(items);
    //
    return;
    setLoading(true);
    const { response, error } = await withAsync(visiteStore, data);
    if (response.status == 200) {
      setLoading(false);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Creation Avec Succee",
        life: 3000,
      });
      router.push("/");
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <Toast ref={toast} />
      <div className="card">
        <div class="card-header">Prospection</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div class="mb-3">
              <label class="form-label">Type Boutique</label>
              <select
                class="form-select"
                {...register("storeType", { required: true })}
              >
                <option selected value="parfumerie">
                  Parfumerie
                </option>
                <option value="superette">Superette</option>
                <option value="alimentationgenerale">
                  Alimentation Generale
                </option>
              </select>
              {errors.storeType && <FieldError></FieldError>}
            </div> */}
            <div className="row">
              <div className=" col col-sm-3 mb-3">
                <label className="form-label">wilaya</label>
                <select
                  className="form-select"
                  {...register("wilaya", { required: true })}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setValue("wilaya", e.target.value);
                    setCommune(
                      cm.filter((c) => c.wilaya_name == e.target.value)
                    );
                  }}
                >
                  {wilaya?.map((e, index) => (
                    <option
                      selected={index == 26 ? true : false}
                      value={e.name}
                    >
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.wilaya && <FieldError></FieldError>}
              </div>
              <div class="col col-sm-3 mb-3">
                <label class="form-label">commune</label>
                <select
                  className="form-select"
                  {...register("commune", { required: true })}
                  onChange={(e) => {
                    setValue("commune", e.target.value);
                  }}
                >
                  {commune?.map((e, index) => (
                    <option
                      key={e.commune_name}
                      selected={e.commune_name == "Mostaganem" ? true : false}
                      value={e.commune_name}
                    >
                      {e.commune_name}
                    </option>
                  ))}
                </select>
                {errors.commune && <FieldError></FieldError>}
              </div>
              <div className="col-3  col-xs-3  mt-4 pt-2">
                <button
                  className="btn btn-success  "
                  onClick={(e) => {
                    e.preventDefault();
                    getAvailabelStore();
                  }}
                >
                  Afficher Les Boutique
                </button>
              </div>
            </div>
            <div className="row">
              <div class="col col-sm-3 mb-3">
                <label class="form-label">Bouitque</label>
                <select
                  className="form-select"
                  {...register("stores", { required: true })}
                  onChange={(e) => {
                    setValue("stores", e.target.value);
                  }}
                >
                  {stores?.map((e, index) => (
                    <option key={e._id} value={e._id + "-" + e.storeName}>
                      {e.storeName}
                    </option>
                  ))}
                </select>
                {errors.commune && <FieldError></FieldError>}
              </div>
            </div>
            {/*  */}
            <label className="form-label">
              <strong>Situation</strong>
            </label>
            <div className="mb-4">
              <div className="form-check-inline">
                <input
                  class="form-check-input   form-check-inline"
                  type="radio"
                  // name="state"
                  {...register("state")}
                  value="clientferme"
                />
                <label class="form-check-label">Client Ferme</label>
              </div>
              <div className="form-check-inline">
                <input
                  class="form-check-input   form-check-inline"
                  type="radio"
                  // name="state"
                  {...register("state")}
                  value="gerantabsent"
                />
                <label class="form-check-label">Gérant Absent</label>
              </div>
              <div className="form-check-inline">
                <input
                  class="form-check-input  form-check-inline"
                  type="radio"
                  // name="state"
                  {...register("state")}
                  value="paddargent"
                />
                <label class="form-check-label">Pas D'argent</label>
              </div>
            </div>
            {/*  */}
            <div className="row">
              <div className="">
                <Cselect onSelectProducts={handleSelectProducts}></Cselect>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddProducts();
                }}
              >
                add
              </button>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Envoyer
            </button>
          </form>
        </div>
      </div>
      <Cart suppressHydrationWarning={true}></Cart>
      <SideCart></SideCart>
    </div>
  );
}

export default SellProducts;
