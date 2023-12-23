import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import FieldError from "../common.js/fielderror";
import wilaya from "@/utils/wilaya";
import cm from "@/utils/communes";
import withAsync from "@/utils/withasync";
import { addStore } from "@/utils/api";

import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

function AddStore() {
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

  useEffect(() => {
    setValue("dd", window.localStorage.getItem("dd"));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const { response, error } = await withAsync(addStore, data);
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
        <div class="card-header">Ajouter Boutique</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="mb-3">
              <label class="form-label">Nom Boutique</label>
              <input
                type="text"
                class="form-control"
                {...register("storeName", { required: true })}
              />
              {errors.storeName && <FieldError></FieldError>}
            </div>
            <div class="mb-3">
              <label class="form-label">Nom Proprietaire</label>
              <input
                type="text"
                class="form-control"
                {...register("storeOwnerName", { required: true })}
              />
              {errors.ownerName && <FieldError></FieldError>}
            </div>
            <div class="mb-3">
              <label class="form-label">adress Gps</label>
              <input
                type="text"
                class="form-control"
                {...register("storeGps", { required: true })}
              />
              {errors.storeGps && <FieldError></FieldError>}
            </div>
            <div class="mb-3">
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
            </div>
            <div class="mb-3">
              <label class="form-label">wilaya</label>
              <select
                class="form-select"
                {...register("wilaya", { required: true })}
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue("wilaya", e.target.value);
                  setCommune(cm.filter((c) => c.wilaya_name == e.target.value));
                }}
              >
                {wilaya?.map((e, index) => (
                  <option selected={index == 26 ? true : false} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
              {errors.wilaya && <FieldError></FieldError>}
            </div>
            <div class="mb-3">
              <label class="form-label">commune</label>
              <select
                class="form-select"
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
    </div>
  );
}

export default AddStore;
