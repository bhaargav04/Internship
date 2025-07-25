import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md font-sans sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-bold text-blue-600 m-0">educal</h2>
        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded">📚 Category</span>
      </div>

      {/* Menu */}
      <ul className="flex gap-6 list-none m-0 p-0">
        <li><Link to="/" className="text-gray-800 font-medium hover:text-blue-600">Home</Link></li>
        <li><Link to="/about" className="text-gray-800 font-medium hover:text-blue-600">About</Link></li>
        <li><Link to="/courses" className="text-gray-800 font-medium hover:text-blue-600">Courses</Link></li>
        <li><Link to="/instructor" className="text-gray-800 font-medium hover:text-blue-600">Instructor</Link></li>
        <li><Link to="/blog" className="text-gray-800 font-medium hover:text-blue-600">Blog</Link></li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <FaShoppingCart className="text-[18px] cursor-pointer" />
        <FaUser className="text-[18px] cursor-pointer" />
        <Link to="/login" className="text-gray-800 font-medium hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
}
