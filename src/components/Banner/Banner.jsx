import React from 'react';
import heroImage from '../../assets/heroimage.png';

const Banner = () => {
  return (
    <section className="bg-[#fcfcfc]">
      <div className="w-11/12 mx-auto min-h-[80vh] flex flex-col-reverse lg:flex-row items-center gap-10">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Organize Your Tasks <br />
            <span className="text-[#cf3520]">Boost Your Productivity</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl mx-auto lg:mx-0">
            Btracker helps you manage daily tasks, stay focused, and track your progress effortlessly.
            Simple, fast, and designed for productivity.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <button className="btn bg-[#cf3520] hover:bg-[#b92f1d] text-white border-none px-8">
              Get Started
            </button>
            <button className="btn btn-outline border-[#cf3520] text-[#cf3520] hover:bg-[#cf3520] hover:text-white px-8">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={heroImage}
            alt="Task Management Illustration"
            className="max-w-full lg:max-w-full"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;
