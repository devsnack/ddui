import React from "react";
import style from "./dash.module.css";
function CardBox({ title, value }) {
  return (
    <div className="col-md-4  col-12">
      <div className={`card widget-overview-box ${style.cardui}`}>
        <h6>{title?.toUpperCase()}</h6>
        <div className="d-flex  justify-content-between align-items-start">
          <div className="d-flex  justify-content-between align-items-center">
            <div
              className={
                "d-flex align-items-center " +
                style.badge +
                " " +
                style.boxgreen
              }
            >
              <i className="pi pi-arrow-up"></i>
              <span>0.06%</span>
            </div>

            <span className={style.number}>{value?.toFixed(2)}</span>
          </div>
          <div>
            <img src="/up.svg"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBox;
