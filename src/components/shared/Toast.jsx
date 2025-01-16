import React, { useRef } from "react";
import { Toast } from "primereact/toast";

const ToastMessage = React.forwardRef((props, ref) => {
  return (
    <div>
      <Toast ref={ref} position="top-right" />
    </div>
  );
});

export default ToastMessage;
