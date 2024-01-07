import React, { useEffect, useState } from "react";
import style from "./dash.module.css";

import CardBox from "./cardbox";
import withAsync from "@/utils/withasync";
import { getTotalGains, getTotalRevenue } from "@/utils/api";
import SlideKnob from "./slideknob";
import Stock from "./stock";

function Ddash() {
  const [analysis, setAnalysis] = useState([]);
  const [totals, setTotals] = useState([]);

  const handleAnalysis = async () => {
    // const totgain = await withAsync(getTotalGains);
    // const total = await withAsync(getTotalRevenue);

    Promise.all([withAsync(getTotalGains), withAsync(getTotalRevenue)]).then(
      (values) => {
        setTotals(values[0]?.response?.data);
        setAnalysis(
          values &&
            values?.map((v, index) => {
              if (index == 0) {
                return {
                  title: v.response.data.day?._id,
                  value: v.response.data.day?.total,
                };
              } else {
                return {
                  title: v.response.data[0]?._id,
                  value: v.response.data[0]?.total,
                };
              }
            })
        );
      }
    );
  };
  useEffect(() => {
    handleAnalysis();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row gap-4">
          {analysis?.map((el) => (
            <CardBox title={el.title} value={el.value} />
          ))}
        </div>
        <SlideKnob values={totals} />
        <div className="mt-5">
          <Stock></Stock>
        </div>
      </div>
    </>
  );
}

export default Ddash;

{
  /* <div className="col-md-4 col-12 ">
  <div className={`card widget-overview-box ${style.cardui}`}>
    <h6>Revenu Total</h6>
    <div className="d-flex  justify-content-between align-items-start">
      <div className="d-flex  justify-content-between align-items-center">
        <div
          className={
            "d-flex align-items-center " +
            style.badge +
            " " +
            style.boxred
          }
        >
          <i className="pi pi-arrow-down"></i>
          <span>0.06%</span>
        </div>

        <span className={style.number}>1985.00</span>
      </div>
      <div>
        <img src="/down.svg"></img>
      </div>
    </div>
  </div>
</div> */
}
