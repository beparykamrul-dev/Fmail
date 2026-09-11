export interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  recipient: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';
  labels: string[];
}
