export const Navbar = () => {
  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2">
      <span></span>
      <a className="mr-5" href="/">LOGO AUDIOLIBRE</a>

    <div className="flex flex-1">
    </div>
      <a className="mr-5" href="/upload-audio">Cargar audio</a>
      <a className="mr-5" href="/samples">Samples</a>
      <a className="mr-5" href="/effects">Efectos</a>
      <a className="mr-5" href="/acapellas">Acapellas</a>
      <a className="mr-5" href="/favorites">Favoritos</a>
      <a className="mr-5" href="/cart">Carrito</a>
      <span className="mr-20"></span>
      <a className="mr-3" href="/my-profile">Mi Perfil</a>
      <a className="mr-3" href="/register">Iniciar sesión</a>
    </nav>
  );
};
