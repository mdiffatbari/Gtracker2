import React from 'react';
import { CheckCircle, Clock, BarChart3, Shield } from 'lucide-react';
import processImage from "../../assets/process.png"

const HomeSections = () => {
  return (
    <div className="space-y-28 mt-24">

      {/* Section 1 – Features */}
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Everything You Need to <span className="text-[#cf3520]">Stay Productive</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <CheckCircle size={32} />,
              title: 'Task Management',
              desc: 'Create, update, and complete tasks with a clean and simple interface.',
            },
            {
              icon: <Clock size={32} />,
              title: 'Time Focus',
              desc: 'Track progress and stay focused on what matters most each day.',
            },
            {
              icon: <BarChart3 size={32} />,
              title: 'Progress Tracking',
              desc: 'Visualize completed and pending tasks to boost motivation.',
            },
            {
              icon: <Shield size={32} />,
              title: 'Secure Access',
              desc: 'Your tasks are protected with authentication and secure access.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-[#cf3520] mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 – How It Works */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Simple Workflow, <span className="text-[#cf3520]">Powerful Results</span>
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li>✔ Sign in to your personal dashboard</li>
              <li>✔ Add and manage daily tasks</li>
              <li>✔ Mark tasks as completed</li>
              <li>✔ Track your productivity</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <img
              src={processImage}
              alt="Workflow Illustration"
              className="max-w-md w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Section 3 – Why Choose Btracker */}
      <section className="w-11/12 mx-auto">
        <div className="bg-[#cf3520] rounded-3xl p-10 lg:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose Btracker?
            </h2>
            <p className="text-white/90 mb-6">
              Designed for simplicity, speed, and real productivity. No clutter, no distractions—just
              results.
            </p>
            <button className="btn bg-white text-[#cf3520] hover:bg-gray-100 border-none">
              Start Managing Tasks
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <h3 className="text-4xl font-bold">⚡</h3>
              <p className="mt-2 text-sm">Fast & Simple</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">🔒</h3>
              <p className="mt-2 text-sm">Secure</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">📱</h3>
              <p className="mt-2 text-sm">Responsive</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">🎯</h3>
              <p className="mt-2 text-sm">Goal Focused</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 – CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Take Control of Your Tasks?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Start using Btracker today and experience a smarter way to manage your daily work.
        </p>
        <button className="btn bg-[#cf3520] hover:bg-[#b92f1d] text-white border-none px-10">
          Get Started
        </button>
      </section>

    </div>
  );
};

export default HomeSections;
