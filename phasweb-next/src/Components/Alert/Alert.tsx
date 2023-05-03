import React from "react";

export default function Alert() {
  return (
    <div className="alert alert-info shadow-lg absolute text-right pt-5 z-50 w-72 right-1 top-20">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
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
