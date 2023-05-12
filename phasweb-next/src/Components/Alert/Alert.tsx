import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Alert() {
  return (
    <div className="alert alert-info bg-secondary shadow-lg absolute text-left z-50 w-72 left-4 top-20">
      <div>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
        <div>
          <h3 className="font-bold">Thanks for testing!</h3>
          <div className="text-xs">
            Please report any bugs/improvements in the Discord or Issues page on
            GitHub! <br />
            ❤️ Sleepy
          </div>
        </div>
      </div>
    </div>
  );
}
