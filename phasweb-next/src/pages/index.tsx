export default function Home() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("/images/bg.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
              PhasWEB
            </h1>
            <span className="mb-5">
              <b>THE</b> Phasmophobia utility that you've been waiting for!
              <br />
              We have multiple different functionalities that you will love!{" "}
              <br />
              <br />
              <b className="text-2xl">Are you looking for</b>
              <ul>
                <li>&bull; Shared Journal with friends</li>
                <li>&bull; 0 Evidence & Sanity guidance</li>
                <li>&bull; Map with spawn locations of cursed possessions</li>
              </ul>
              <br />
              Then this website is where you need to be!
            </span>
            <button className="btn btn-secondary">Shared Journal</button>{" "}
            <button className="btn btn-secondary">Join our Discord!</button>
          </div>
        </div>
      </div>
    </>
  );
}
