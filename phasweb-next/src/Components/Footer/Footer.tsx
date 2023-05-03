import React from "react";

export default function Footer() {
  return (
    <footer
      style={{ position: "fixed", bottom: 0, width: "100%" }}
      className="footer footer-center p-4 bg-base-300 text-base-content"
    >
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
        </p>
      </div>
    </footer>
  );
}
