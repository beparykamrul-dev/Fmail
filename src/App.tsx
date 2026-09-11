import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MailList from './components/MailList';
import MailDetail from './components/MailDetail';
import { mockEmails } from './data';
import { Email } from './types';

export default function App() {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const filteredEmails = useMemo(() => {
    return emails
      .filter(email => email.folder === currentFolder)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [emails, currentFolder]);

  const selectedEmail = useMemo(() => {
    return emails.find(e => e.id === selectedEmailId) || null;
  }, [emails, selectedEmailId]);

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    
    // Mark as read
    setEmails(prevEmails => 
      prevEmails.map(email => 
        email.id === id && !email.isRead 
          ? { ...email, isRead: true } 
          : email
      )
    );
  };

  const unreadCounts = useMemo(() => {
    const counts: Record<string, number> = {
      inbox: 0,
      sent: 0,
      drafts: 0,
      spam: 0,
      trash: 0,
    };
    emails.forEach(email => {
      if (!email.isRead) {
        counts[email.folder] = (counts[email.folder] || 0) + 1;
      }
    });
    return counts;
  }, [emails]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-slate-900 font-sans">
      <Sidebar 
        currentFolder={currentFolder} 
        setFolder={(f) => { setCurrentFolder(f); setSelectedEmailId(null); }} 
        onCompose={() => alert('Compose feature would open here.')}
        unreadCounts={unreadCounts}
      />
      <MailList 
        emails={filteredEmails} 
        selectedEmailId={selectedEmailId} 
        onSelectEmail={handleSelectEmail} 
        title={currentFolder}
      />
      <MailDetail email={selectedEmail} />
    </div>
  );
}
