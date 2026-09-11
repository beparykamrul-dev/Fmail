import { Inbox, Send, File, AlertCircle, Trash2, Tag, Plus } from 'lucide-react';
import { classNames } from '../utils';

interface SidebarProps {
  currentFolder: string;
  setFolder: (folder: string) => void;
  onCompose: () => void;
  unreadCounts: Record<string, number>;
}

const navItems = [
  { name: 'Inbox', icon: Inbox, id: 'inbox' },
  { name: 'Sent', icon: Send, id: 'sent' },
  { name: 'Drafts', icon: File, id: 'drafts' },
  { name: 'Spam', icon: AlertCircle, id: 'spam' },
  { name: 'Trash', icon: Trash2, id: 'trash' },
];

export default function Sidebar({ currentFolder, setFolder, onCompose, unreadCounts }: SidebarProps) {
  return (
    <div className="flex flex-col w-64 bg-slate-50 border-r border-slate-200 h-full p-4 shrink-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Send className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-semibold text-slate-800 tracking-tight">Mail Server</span>
      </div>
      
      <button 
        onClick={onCompose}
        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 mb-6 transition-colors shadow-sm font-medium"
      >
        <Plus className="w-5 h-5" />
        Compose
      </button>

      <div className="space-y-1 flex-1">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Folders</h3>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setFolder(item.id)}
            className={classNames(
              currentFolder === item.id 
                ? 'bg-blue-100/50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              'flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors group'
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={classNames(
                currentFolder === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600',
                "w-5 h-5"
              )} />
              <span className="font-medium">{item.name}</span>
            </div>
            {unreadCounts[item.id] > 0 && (
              <span className={classNames(
                currentFolder === item.id ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-600',
                "text-xs py-0.5 px-2 rounded-full font-semibold"
              )}>
                {unreadCounts[item.id]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
