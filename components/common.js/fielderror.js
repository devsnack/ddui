import React from "react";

function FieldError() {
  return (
    <span className="error" style={{ color: "rgb(232, 76, 76)" }}>
      *ce champ est obligatoire
    </span>
  );
}

export default FieldError;
