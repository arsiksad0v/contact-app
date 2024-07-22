import React from 'react';
import styles from './ContactModal.module.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactModalProps {
  contact: Contact;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ contact, onClose, onDelete, onEdit }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{contact.name}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className={styles.contactDetails}>
          <p>{contact.phone}</p>
          <p>{contact.email}</p>
          {contact.photo && <img src={contact.photo} alt={contact.name} />}
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={() => onEdit(contact)}>Edit</button>
          <button className={`${styles.button} ${styles.danger}`} onClick={() => onDelete(contact.id)}>Delete</button>
          <button className={`${styles.button} ${styles.secondary}`} onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ContactModal;