import React, { useState } from 'react';
import { UserCheck, Shield, BookOpen, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';
import { api } from '../services/api';

interface StudentEntryModalProps {
  isOpen: boolean;
  onRegister?: (student: StudentProfile) => void;
  onSubmit?: (name: string) => void;
}

export const StudentEntryModal: React.FC<StudentEntryModalProps> = ({
  isOpen,
  onRegister,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [section, setSection] = useState('3rd-Year BTLED-ICT');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter your full name to begin your session.');
      return;
    }

    setIsSubmitting(true);
    try {
      const studentProfile = await api.registerStudent(trimmedName, section);
      if (onRegister) {
        onRegister(studentProfile);
      }
      if (onSubmit) {
        onSubmit(trimmedName);
      }
    } catch (err) {
      console.warn('Student registration fallback:', err);
      const fallback: StudentProfile = {
        student_id: `std_${Date.now()}`,
        name: trimmedName,
        year_section: section,
        created_at: new Date().toISOString()
      };
      if (onRegister) {
        onRegister(fallback);
      }
      if (onSubmit) {
        onSubmit(trimmedName);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-blue-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Top Header Banner */}
        <div className="bg-blue-800 text-white px-6 py-6 text-center">
          <div className="w-14 h-14 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">WELCOME TO CSSENTIAL</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-sm mx-auto">
            One-Click Multi-Intervention Learning Platform for Computer System Installation & Configuration
          </p>
          <div className="mt-2 inline-block px-3 py-0.5 bg-blue-900/60 rounded-full text-xs font-semibold text-blue-200">
            Target Audience: 3rd-Year BTLED-ICT Students
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="student-name-input" className="block text-sm font-bold text-gray-900">
              Student Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="student-name-input"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Juan Dela Cruz"
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden transition-all text-gray-900 placeholder:text-gray-400"
            />
            {error && (
              <p className="text-xs font-medium text-red-600 mt-1">{error}</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Research Study Notice:</span> Your learning interactions, quiz scores, and practice exercise times are logged anonymously for research evaluation by the BTLED-ICT study team.
            </div>
          </div>

          <div className="pt-2">
            <button
              id="submit-student-name-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded-lg shadow-sm transition-all cursor-pointer active:scale-98"
            >
              <UserCheck className="w-5 h-5" />
              <span>START LEARNING SESSION</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Already registered? Entering your exact name will resume your previous progress.
          </p>
        </form>

      </div>
    </div>
  );
};
