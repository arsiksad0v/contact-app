import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AddContact.module.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface AddContactProps {
  onSave: (contact: Contact) => void;
}

const AddContact: React.FC<AddContactProps> = ({ onSave }) => {
  const location = useLocation();
  const { contact } = location.state || {};
  const [currentContact, setCurrentContact] = useState<Contact>(contact || { id: 0, name: '', phone: '', email: '', photo: '' });

  useEffect(() => {
    if (contact) {
      setCurrentContact(contact);
    }
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(currentContact);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>{contact ? 'Edit contact' : 'Add new contact'}</h1>
      <div className={styles.formGroup}>
        <input type="text" name="name" placeholder="Name" value={currentContact.name} onChange={handleChange} required className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <input type="text" name="phone" placeholder="Phone" value={currentContact.phone} onChange={handleChange} required className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <input type="email" name="email" placeholder="Email" value={currentContact.email} onChange={handleChange} required className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <input type="text" name="photo" placeholder="Photo URL" value={currentContact.photo} onChange={handleChange} className={styles.input} />
      </div>
      {currentContact.photo && <img src={currentContact.photo} alt="Preview" className={styles.previewImage} />}
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>Save</button>
        <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={() => (window.location.href = '/')}>Back to contacts</button>
      </div>
    </form>
  );
};

export default AddContact;