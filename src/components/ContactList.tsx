import React, { useState } from 'react';
import ContactModal from './ContactModal';
import styles from './ContactList.module.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete, onEdit }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Contacts</h1>
        <button className={styles.button} onClick={() => (window.location.href = '/new-contact')}>
          Add new contact
        </button>
      </div>
      <ul className={styles.list}>
        {contacts.map((contact) => (
          <li key={contact.id} className={styles.listItem} onClick={() => handleSelectContact(contact)}>
            {contact.name}
          </li>
        ))}
      </ul>
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default ContactList;