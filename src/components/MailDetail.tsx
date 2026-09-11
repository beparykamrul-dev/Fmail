import { Email } from '../types';
import { format } from 'date-fns';
import { Reply, MoreVertical, Archive, Trash2, Clock } from 'lucide-react';

interface MailDetailProps {
  email: Email | null;
}

export default function MailDetail({ email }: MailDetailProps) {
  if (!email) {
    return (
      <div className="flex-1 bg-slate-50 flex items-center justify-center">
        <div className="text-center text-slate-500 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 flex items-center justify-center text-slate-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-medium text-slate-600">Select an email to read</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white h-full flex flex-col overflow-hidden">
      {/* Action Bar */}
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Archive">
            <Archive className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Delete">
            <Trash2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Snooze">
            <Clock className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Reply">
            <Reply className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="More options">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 tracking-tight">{email.subject}</h1>
          
          <div className="flex items-start justify-between mb-10">
            <div className="flex items-center gap-4">
              {email.sender.avatar ? (
                <img src={email.sender.avatar} alt={email.sender.name} className="w-12 h-12 rounded-full border border-slate-200 shadow-sm" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold shadow-sm">
                  {email.sender.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div>
                <div className="font-semibold text-slate-900 text-lg">
                  {email.sender.name}
                </div>
                <div className="text-sm text-slate-500 flex items-center gap-1.5">
                  <span>&lt;{email.sender.email}&gt;</span>
                  <span>to</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium text-xs">me</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-slate-500 font-medium">
              {format(new Date(email.date), 'MMM d, yyyy, h:mm a')}
            </div>
          </div>

          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-[15px] prose-p:text-slate-800">
            {email.body.split('\\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
