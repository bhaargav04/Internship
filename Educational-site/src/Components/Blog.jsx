import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import course1 from '../assets/course1.avif';
import course2 from '../assets/course2.avif';
import course3 from '../assets/course3.avif';

export default function Blog() {
  return (
    <>
      <Navbar />

      {/* Blog Header Section */}
      <div className="py-16 px-8 bg-white text-center">
        <h1 className="text-4xl font-bold mb-2">We Share</h1>
        <h1 className="text-4xl font-bold mb-4">Our Thoughts On Design</h1>
        <p className="text-gray-600 mb-12">You Don't Have To Struggle Alone, You've Got Our Assistance And Help.</p>
      </div>

      {/* Blog Cards Section */}
      <div className="py-16 px-8 bg-gray-50">
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {/* Blog Card 1 */}
          <div className="bg-white rounded-xl w-80 overflow-hidden shadow-lg text-left transform transition duration-200 hover:-translate-y-1">
            <img src={course1} alt="Blog 1" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-snug">
                The Power Of Podcast For Storytelling
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Sunil</span>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Sep 16, 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white rounded-xl w-80 overflow-hidden shadow-lg text-left transform transition duration-200 hover:-translate-y-1">
            <img src={course2} alt="Blog 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-snug">
                Fashion And Luxury Fashion In A Changing
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Sunil</span>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Sep 16, 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white rounded-xl w-80 overflow-hidden shadow-lg text-left transform transition duration-200 hover:-translate-y-1">
            <img src={course3} alt="Blog 3" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-snug">
                Creative Writing Through Storytelling
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Sunil</span>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Sep 16, 2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 px-8 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Learning By</h2>
          <h2 className="text-3xl font-bold mb-8">Downloading Apps.</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-3 bg-black bg-opacity-20 hover:bg-opacity-30 transition duration-300 px-6 py-3 rounded-lg">
              <div className="text-2xl">🍎</div>
              <div className="text-left">
                <div className="text-xs opacity-80">Available on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 bg-black bg-opacity-20 hover:bg-opacity-30 transition duration-300 px-6 py-3 rounded-lg">
              <div className="text-2xl">▶️</div>
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="text-lg font-semibold">Play Store</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}