import React from 'react';
import { Users, GraduationCap, Code2, Award, BookOpen, Laptop, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const researchers = [
    {
      id: 'buban',
      name: 'Jhon Wesly T. Buban',
      role: 'Developer / Researcher',
      tag: 'Full-Stack Development & AI Integration',
      bio: 'Led the technical architecture, interactive game engines, local database telemetry, and AI Assistant integration for the CSSENTIAL web application.',
      initials: 'JB',
      color: 'bg-blue-600'
    },
    {
      id: 'calaputpu',
      name: 'Juliana Marizh B. Calaputpu',
      role: 'Researcher',
      tag: 'Curriculum & Instructional Design',
      bio: 'Spearheaded curriculum alignment, educational lesson structuring, and instructional material synthesis for computer system installation and configuration.',
      initials: 'JC',
      color: 'bg-indigo-600'
    },
    {
      id: 'colon',
      name: 'Charlotte Mae H. Colon',
      role: 'Researcher',
      tag: 'Intervention Activities & Assessment',
      bio: 'Formulated diagnostic troubleshooting scenarios, technical laboratory rubrics, and comprehensive evaluation quizzes for 3rd-Year BTLED-ICT students.',
      initials: 'CC',
      color: 'bg-cyan-600'
    },
    {
      id: 'timoteo',
      name: 'Precious Lara M. Timoteo',
      role: 'Researcher',
      tag: 'Educational Usability & Media Development',
      bio: 'Directed instructional media curation, usability testing frameworks, and pedagogical interface optimization for multi-intervention learning.',
      initials: 'PT',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
          RESEARCH DEVELOPMENT TEAM
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          RESEARCHERS BEHIND CSSENTIAL
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Meet the dedicated researchers and developer behind the design, technical formulation, and pedagogical engineering of the CSSENTIAL multi-intervention learning platform.
        </p>
      </div>

      {/* 4 Researcher Profile Cards (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {researchers.map((person) => (
          <div
            key={person.id}
            id={`researcher-card-${person.id}`}
            className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start"
          >
            {/* Initials Avatar */}
            <div
              className={`w-16 h-16 rounded-2xl ${person.color} text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md`}
            >
              {person.initials}
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  {person.role}
                </span>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  {person.name}
                </h3>
                <span className="inline-block text-xs font-semibold text-gray-500 mt-0.5">
                  3rd-Year BTLED-ICT
                </span>
              </div>

              <div className="p-2 bg-blue-50/60 rounded-md border border-blue-100 text-xs font-bold text-blue-900">
                {person.tag}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {person.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Research Background, Significance & Objectives */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="text-base font-black text-gray-900">Program Focus</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Engineered specifically for <strong>Bachelor of Technology and Livelihood Education (BTLED)</strong> students majoring in <strong>Information and Communications Technology (ICT)</strong>, bridging laboratory theory with interactive digital execution.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <h4 className="text-base font-black text-gray-900">The Intervention</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Offers a <strong>one-click consolidated hub</strong> synthesizing lesson presentations, safety checklists, diagnostic troubleshooting scenarios, interactive games, and automated AI assistance into a single unified web platform.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-base font-black text-gray-900">Research Integrity</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Incorporates real-time telemetry logging to observe student learning metrics, duration, quiz scores, and intervention efficacy without requiring complex third-party registrations.
          </p>
        </div>

      </div>

      {/* Institutional Note */}
      <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-md">
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest block">
          ACADEMIC RESEARCH &amp; DEVELOPMENT
        </span>
        <h3 className="text-xl sm:text-2xl font-black">
          CSSENTIAL: One-Click Multi-Intervention Learning Platform
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Designed and developed in fulfillment of research requirements for 3rd-Year BTLED-ICT. Dedicated to advancing computer hardware diagnostics, safety compliance, and technician competence.
        </p>
      </div>

    </div>
  );
};
