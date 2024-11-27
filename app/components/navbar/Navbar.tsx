import Link from "next/link";

const pages = [
  { path: "/pages/test", text: "TEST" },
  { path: "/pages/upload-audio", text: "Carga nuevo audio" },
  { path: "/pages/samples", text: "Samples" },
  { path: "/pages/effects", text: "Effects" },
  { path: "/pages/acapellas", text: "Acapellas" },
  { path: "/pages/favorites", text: "Favorites" },
  { path: "/pages/cart", text: "Cart" },
  { path: "/pages/checkout", text: "Checkout" },
  { path: "/pages/admin", text: "Admin" },
];

const userMenus = [
  { path: "/pages/my-profile", text: "Mi perfil" },
  { path: "/pages/register", text: "Sign Up" },
];

export const Navbar = () => {
  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 justify-between">
      <span></span>
      <Link className="flex items-center" href="/">
        LOGO AUDIOLIBRE
      </Link>

      <div className="flex items-center ">
        {pages.map((page) => (
          <Link key={page.path} className="mr-2 m-5" href={page.path}>
            {page.text}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        {userMenus.map((menu) => (
          <Link key={menu.path} className="mr-2 m-5 " href={menu.path}>
            {menu.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};
