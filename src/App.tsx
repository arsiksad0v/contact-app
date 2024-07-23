import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'John Shepard', phone: '+996 555 555 555', email: 'john@normandy.space', photo: '' },
    { id: 2, name: 'Jack Daniels', phone: '+996 555 555 556', email: 'jack@whiskey.com', photo: '' },
    { id: 3, name: 'Johnny Walker', phone: '+996 555 555 557', email: 'johnny@scotch.com', photo: '' }
  ]);

  const addContact = (newContact: Contact) => {
    newContact.id = contacts.length + 1;
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (updatedContact: Contact) => {
    setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList contacts={contacts} onDelete={deleteContact} onEdit={editContact} />} />
        <Route path="/new-contact" element={<AddContact onSave={addContact} />} />
      </Routes>
    </Router>
  );
};

export default App;
