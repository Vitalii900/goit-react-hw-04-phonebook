import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import '../components/App.css';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => {return JSON.parse(localStorage.getItem('contacts')) ?? []}
  );
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const contactsLocal = localStorage.getItem('contacts');
  //   const contactsParse = JSON.parse(contactsLocal);
  //   setContacts(contactsParse);
  // }, []);


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(state => {
      return state.filter(contact => contact.id !== contactId);
    });
  };

  const reset = () => {
    setFilter('');
  };

  const formSubmitHandler = (name, number) => {
    const findRepeateName = contacts.find(contact => {
      return contact.name.includes(name);
    });
    const contactId = nanoid();
    if (findRepeateName) {
      alert(`${findRepeateName.name} is already in contacts`);
      return;
    }

    setContacts(state => {
      return [...state, { id: contactId, name: name, number: number }];
    });
    reset();
  };

  const handleFilterInput = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler}></ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterInput}></Filter>
      {contacts.length !== 0 && (
        <ContactList
          deleteContact={deleteContact}
          filter={filter}
          contacts={contacts}
        ></ContactList>
      )}
    </div>
  );
};
