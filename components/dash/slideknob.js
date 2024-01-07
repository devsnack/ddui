import React, { useEffect, useState } from "react";
import { Knob } from "primereact/knob";
import { SelectButton } from "primereact/selectbutton";
import withAsync from "@/utils/withasync";
import { getObjectif } from "@/utils/api";
function SlideKnob({ values }) {
  const options = ["Journaliere", "Mensuel"];
  const [value, setValue] = useState(options[0]);
  const [obj, setObjType] = useState([]);
  async function handleObjectif() {
    const usertype = localStorage.getItem("usertype");
    if (usertype) {
      const { response, error } = await withAsync(getObjectif, usertype);
      const types = response?.data.data[0];
      setObjType([types.dayObj, types.MonthObj]);
    }
  }
  useEffect(() => {
    handleObjectif();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-4">
        <SelectButton
          severity="info"
          value={value}
          onChange={(e) => setValue(e.value)}
          options={options}
        />
      </div>
      <div className="row">
        <div className="col-md-4 col-12 ">
          <Knob
            value={
              value == options[0]
                ? values?.day?.total ?? ""
                : values?.month?.total ?? ""
            }
            //   onChange={(e) => setValue(e.value)}
            valueTemplate={`  ${
              value == options[0]
                ? values?.day?.total ?? ""
                : values?.month?.total ?? ""
            } `}
            max={value == options[0] ? obj[0] : obj[1]}
            size={200}
            valueColor="#89cc93"
          />
        </div>
      </div>
    </>
  );
}

export default SlideKnob;
