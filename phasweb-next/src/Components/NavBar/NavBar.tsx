const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shared-evidence",
    label: "Shared journal",
  },
  {
    href: "/0e0s",
    label: "0 Evidence, 0 Sanity",
  },
  {
    href: "/maps",
    label: "Map Browser",
  },
];

export default function NavBar() {
  return (
    <div className="navbar bg-base-300 fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-2xl font-bold bg-gradient-to-r from-slate-200 to-slate-500 bg-clip-text text-transparent">
          PhasWEB
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn" href="/login">
          LOGIN
        </a>
      </div>
    </div>
  );
}
