import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
      <Link to="/" className="hover:opacity-80 transition">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">🔗 TinyLink</h1>
      </Link>
      <p className="text-gray-600 text-lg">
        Shorten your URLs and track clicks
      </p>
    </header>
  );
};

export default Header;
