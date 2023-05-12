import Link from "next/link";
import React, { useEffect, useState } from "react";
import OnlineUsers from "@/Components/OnlineUsers";

export default function Footer() {
  return (
    <footer
      style={{ position: "fixed", bottom: 0, width: "100%" }}
      className="footer footer-center p-4 bg-base-300 text-base-content overflow-visible"
    >
      {" "}
      <div className="modal absolute" id="special-thanks-modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-2">
            Special thanks to these specific people!
          </h3>
          <p className="text-xs">
            I really wanted to take the liberty of giving a special thanks to a
            few people that helped PhasWEB become where it is now!
            <br />
            <br />
          </p>
          <p className="font-bold text-lg">VIPs</p>
          <div>
            <div
              className="tooltip tooltip-bottom"
              data-tip="Please don't litter my GitHub issues page with 'WHEN IS THE BUILD READY'"
            >
              <li style={{ fontSize: "0.9rem" }}>
                edzown | For the continous motivation and idea's he's produced!
                ❤️
              </li>
            </div>
          </div>
          <br />
          <p className="font-bold text-lg">Earliest Alpha testers</p>
          <div>
            <li style={{ fontSize: "0.9rem" }}>
              HeadBodyScript | For the early support!
            </li>
            <li style={{ fontSize: "0.9rem" }}>
              NikaWarrior | For the many idea's and corrections!
            </li>
            <li style={{ fontSize: "0.9rem" }}>Critly | For testing early!</li>
          </div>
          <div className="modal-action">
            <a href="#" className="btn">
              Yay!
            </a>
          </div>
        </div>
      </div>
      <div className="items-center grid-flow-col absolute left-2">
        <OnlineUsers />
      </div>
      <div>
        <p>
          Copyright © 2023 &bull;{" "}
          <small>
            PhasWEB is a fan-made website and is in no way affiliated with
            Kinetic Games/Phasmophobia
          </small>{" "}
          &bull; Made by{" "}
          <a href="https://www.github.com/pgsleepy">
            <u>PGSleepy</u>
          </a>
          <br />
          <Link className="text-xs" href="#special-thanks-modal">
            <u>Special thanks</u>
          </Link>
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end absolute right-2">
        <small>Version 1.0.0</small>
      </div>
    </footer>
  );
}
