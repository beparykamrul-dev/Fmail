import { Email } from '../types';
import { formatEmailDate, classNames } from '../utils';

interface MailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
  title: string;
}

export default function MailList({ emails, selectedEmailId, onSelectEmail, title }: MailListProps) {
  return (
    <div className="flex flex-col w-[400px] border-r border-slate-200 bg-white h-full overflow-hidden shrink-0">
      <div className="p-4 border-b border-slate-100 h-16 flex items-center shrink-0">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight capitalize">{title}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No emails in this folder.
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              onClick={() => onSelectEmail(email.id)}
              className={classNames(
                selectedEmailId === email.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'border-l-4 border-transparent hover:bg-slate-50',
                'p-4 border-b border-slate-100 cursor-pointer transition-colors relative'
              )}
            >
              {!email.isRead && (
                <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
              )}
              <div className="flex justify-between items-baseline mb-1">
                <span className={classNames(
                  !email.isRead ? 'font-semibold text-slate-900' : 'font-medium text-slate-700',
                  "truncate pr-4 text-[15px]"
                )}>
                  {email.sender.name}
                </span>
                <span className={classNames(
                  !email.isRead ? 'font-semibold text-blue-600' : 'text-slate-500',
                  "text-xs flex-shrink-0"
                )}>
                  {formatEmailDate(email.date)}
                </span>
              </div>
              <div className={classNames(
                !email.isRead ? 'font-semibold text-slate-800' : 'text-slate-600',
                "text-sm mb-1 truncate pr-2"
              )}>
                {email.subject}
              </div>
              <div className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed">
                {email.preview}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
