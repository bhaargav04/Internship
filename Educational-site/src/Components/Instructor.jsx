import course1 from '../assets/course1.avif';
import course2 from '../assets/course2.avif';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import { MdGroups } from "react-icons/md";
import { GiEvilBook } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";


export default function Instructor(){

return(
    <>
    <Navbar/>
    {/* Section 5 - What Is Skilline */}
          <div className="py-16 px-8 bg-white text-center">
            <h1 className="text-3xl font-bold mb-2">What Is Skilline?</h1>
            <p className="text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Skilline Is A Platform That Allows Educators To Create Online Classes Whereby They Can Store The Course Materials Online; Manage Assignments, Quizzes And Exams; Monitor Due Dates; Grade Results And Provide Students With Feedback All In One Place.
            </p>
    
            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto" >
              {/* Left Card - Online Learning */}
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl overflow-hidden w-full max-w-md h-80 shadow-xl" >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center" style={{ backgroundImage: `url(${course1})` }}>
                  <h2 className="text-2xl font-bold mb-6">Mostly Online Learning</h2>
                  <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 font-semibold">
                    Start a class today
                  </button>
                </div>
                {/* Background pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent" ></div>
                </div>
              </div>
    
              {/* Right Card - Become Instructor */}
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden w-full max-w-md h-80 shadow-xl">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center" style={{ backgroundImage: `url(${course2})` }}>
                  <h2 className="text-2xl font-bold mb-6">Become An Instructor</h2>
                  <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition duration-300 font-semibold">
                    Start a class today
                  </button>
                </div>
                {/* Background pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Section 6 - We Are Proud */}
          <div className="py-16 px-8 bg-gray-50 text-center">
            <h1 className="text-3xl font-bold mb-2">We Are Proud</h1>
            <p className="text-gray-600 mb-12">You Don't Have To Struggle Alone, You've Got Our Assistance And Help.</p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-16 max-w-4xl mx-auto">
              {/* Students Enrolled */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-transparent-500 rounded-full flex items-center justify-center">
                    <div className="text-black text-3xl"><MdGroups/></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">63</h3>
                <p className="text-gray-500">Students Enrolled</p>
              </div>
    
              {/* Total Courses */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-transparent-500 rounded-full flex items-center justify-center">
                    <div className="text-black text-3xl"><GiEvilBook/></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">20</h3>
                <p className="text-gray-500">Total Courses</p>
              </div>
    
              {/* Online Learners */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-transparent-500 rounded-full flex items-center justify-center">
                    <div className="text-black text-3xl"><FaGraduationCap/></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">4</h3>
                <p className="text-gray-500">Online Learners</p>
              </div>
    
              {/* Online Learners */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-transparent-500 rounded-full flex items-center justify-center">
                    <div className="text-black text-3xl"><FaGlobeAmericas/></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">4</h3>
                <p className="text-gray-500">Online Learners</p>
              </div>
            </div>
          </div>
    <Footer/>
    </>
)

}