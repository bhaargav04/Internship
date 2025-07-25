import Navbar from '../Components/Navbar.jsx'
import Footer from '../Components/Footer.jsx'
import course1 from '../assets/course1.avif'
import course2 from '../assets/course2.avif'
import course3 from '../assets/course3.avif'
import course4 from '../assets/course4.jpg'
import course5 from '../assets/course5.jpg'
import course6 from '../assets/course6.jpg'



export default function Courses(){
    return(
        <>
        <Navbar/>
         {/* Section 4 */}
              <div className="py-16 px-8 bg-[#f3f6fa] text-center">
                <h1 className="text-3xl font-bold mb-2">Find The Right <br />Online Course For You</h1>
                <p className="text-gray-600 mb-10">You Don’t Have To Struggle Alone, You’ve Got Our Assistance And Help.</p>
        
                <div className="flex flex-wrap justify-center gap-8">
                  {[course1, course2, course3, course4, course5, course6].map((course, index) => (
                    <div key={index} className="bg-white rounded-xl w-72 overflow-hidden shadow-lg text-left relative transform transition duration-200 hover:-translate-y-1">
                      <img src={course} alt={`Course ${index + 1}`} className="w-full h-44 object-cover" />
                      <div className="absolute top-2 left-2 flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">Finance</span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-pink-500">Lifestyle</span>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>📘 10 Lessons</span>
                          <span>⭐ 4.5(2)</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{
                          index === 0 ? 'The Power Of Podcast For Storytelling' :
                          index === 1 ? 'Fashion And Luxury Fashion In A Changing' :
                          'Creative Writing Through Storytelling'
                        }</h3>
                        <p className="text-sm text-gray-500 mb-3">Sunil</p>
                        <div className="flex justify-between items-center font-semibold text-sm">
                          <span className="text-green-500">Free</span>
                          <span className="text-blue-600 cursor-pointer">Know Details →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Footer/>
        </>
    )
}