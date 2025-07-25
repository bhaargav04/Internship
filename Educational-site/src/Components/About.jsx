import professional from '../assets/professional.avif'
import { FaBookDead } from "react-icons/fa";

import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

export default function About(){
    return(
        <>
        <Navbar/>
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
       
        <Footer/>
        </>
    )
}