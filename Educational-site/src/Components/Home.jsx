import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import bgImage from '../assets/image1.avif';
import professional from '../assets/professional.avif';
import course1 from '../assets/course1.avif';
import course2 from '../assets/course2.avif';
import course3 from '../assets/course3.avif';
import { FaBookDead } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GiEvilBook } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center px-5"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex flex-wrap justify-between items-center max-w-[1200px] w-full">
          <div className="max-w-xl text-black">
            <h1 className="text-4xl font-bold leading-snug mb-5">
              Launch Your <br /> Own Online Learning <br /> Platform
            </h1>
            <p className="text-lg mb-1">Unlimited Access To All 60+ Instructors.</p>
            <p className="text-sm text-gray-700 mb-5">2 Passes (With Access To All Classes) For $240</p>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="px-5 py-3 w-full max-w-md rounded-full border border-gray-300 text-base"
              />
            </div>
            <p className="text-sm text-gray-700">You're Guaranteed To Find Something That's Right For You.</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="py-16 px-8 text-center bg-white">
        <h1 className="text-3xl font-bold mb-2">Why An Scholercity Out Of The Ordinary</h1>
        <p className="text-gray-600 mb-10">You Don’t Have To Struggle Alone, You’ve Got Our Assistance And Help.</p>

        <div className="flex flex-wrap justify-center gap-6">
          {['bg-blue-500', 'bg-red-500', 'bg-purple-600', 'bg-green-500'].map((color, i) => (
            <div key={i} className={`text-white p-8 w-60 rounded-lg shadow-lg transform transition duration-200 hover:-translate-y-1 ${color}`}>
              <FaBookDead className="text-4xl mb-2" />
              <h3 className="text-lg font-semibold mb-1">4,000 Online Courses</h3>
              <p className="text-sm">You Don’t Have To Struggle Alone, You’ve</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 */}
      <div className="py-16 px-8 bg-gray-100">
        <div className="flex flex-wrap justify-center items-center gap-10 max-w-6xl mx-auto">
          <div className="flex-1 max-w-md">
            <img
              src={professional}
              alt="UX Master Course"
              className="rounded-2xl shadow-lg w-[70%] ml-[10%] h-[500px] object-cover"
            />
          </div>
          <div className="flex-1 max-w-md">
            <h2 className="text-3xl font-semibold mb-4">Achieve Your Goals With Educal</h2>
            <p className="text-gray-600 mb-4">
              Lorem, Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Magnam Officia, Reiciendis Sapiente Adipisci Nulla Non Consequuntur Eos Repellendus Laborum Veritatis Obcaecati Neque Est Id Porro Voluptatum. Fuga Iure Nulla Cum.
            </p>
            <ul className="mb-6 text-gray-700 space-y-2">
              <li>✔ Upskill Your Organization.</li>
              <li>✔ Access More Than 100K Online Courses</li>
              <li>✔ Learn The Latest Skills</li>
            </ul>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="py-16 px-8 bg-[#f3f6fa] text-center">
        <h1 className="text-3xl font-bold mb-2">Find The Right <br />Online Course For You</h1>
        <p className="text-gray-600 mb-10">You Don’t Have To Struggle Alone, You’ve Got Our Assistance And Help.</p>

        <div className="flex flex-wrap justify-center gap-8">
          {[course1, course2, course3].map((course, index) => (
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
      <Footer />
    </>
  );
}
