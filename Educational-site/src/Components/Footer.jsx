import { FaApple, FaGooglePlay } from "react-icons/fa";
import educational from '../assets/download.jpg'

export default function Footer() {
  return (
    <div className="mt-20 bg-[#f8f9fa] text-gray-800">
      {/* Download App Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative z-10 bg-gradient-to-r from-blue-600 to-[#fd735a] text-white rounded-xl px-10 py-12 overflow-hidden">
          {/* Circle shape */}
          <div className="absolute -bottom-24 -right-20 w-[300px] h-[300px] bg-[#fd735a] rounded-full z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-extrabold max-w-xl leading-tight">
              Start Learning By <br /> Downloading Apps.
            </h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 border border-white px-5 py-3 rounded-md hover:bg-white hover:text-[#fd735a] transition">
                <FaApple className="text-xl" />
                <span>App Store</span>
              </button>
              <button className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-md hover:bg-gray-100 transition">
                <FaGooglePlay className="text-xl" />
                <span>Play Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-20 pt-20 pb-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <img src={educational} alt="logo" className="w-10 h-10" />
              <span className="text-black">educal</span>
            </h3>
            <p className="text-gray-600">
              Great Lesson Ideas And Lesson Plans For ESL Teachers! Educators
              Can Customize Lesson Plans To Best.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-black mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Contact</li>
              <li>Portfolio</li>
              <li>Blog</li>
              <li>Our Team</li>
              <li>FAQ</li>
              <li>Get In Touch</li>
              <li>Latest News</li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-black mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Shop</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Landing</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-semibold text-black mb-4">Subscribe</h4>
            <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
              <li>Contact</li>
              <li>Reviews</li>
              <li>Services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
