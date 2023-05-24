import React from 'react';
import * as ExpoContacts from '../custom-files/ExpoContacts';

const getContacts = async (Variables, setGlobalVariableValue) => {
  const sortType = Contacts.SortTypes.LastName;

  if (Variables.USER_CONTACTS_PERMISSION === false) {
    const { status } = await ExpoContacts.Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await ExpoContacts.Contacts.getContactsAsync({
        fields: [
          ExpoContacts.Contacts.Fields.ID,
          ExpoContacts.Contacts.Fields.Image,
          ExpoContacts.Contacts.Fields.FirstName,
          ExpoContacts.Contacts.Fields.LastName,
          ExpoContacts.Contacts.Fields.PhoneNumbers,
          ExpoContacts.Contacts.Fields.Emails,
          ExpoContacts.Contacts.Fields.Birthday,
          ExpoContacts.Contacts.Fields.Addresses,
        ],
        sort: sortType,
      });

      setGlobalVariableValue({ key: 'USER_CONTACTS_PERMISSION', value: true });
      setGlobalVariableValue({ key: 'USER_CONTACTS', value: data });

      return true;
    } else {
      alert('Contact permission was not granted');
      return false;
    }
  } else {
    const { data } = await ExpoContacts.Contacts.getContactsAsync({
      fields: [
        ExpoContacts.Contacts.Fields.ID,
        ExpoContacts.Contacts.Fields.Image,
        ExpoContacts.Contacts.Fields.FirstName,
        ExpoContacts.Contacts.Fields.LastName,
        ExpoContacts.Contacts.Fields.PhoneNumbers,
        ExpoContacts.Contacts.Fields.Emails,
        ExpoContacts.Contacts.Fields.Birthday,
        ExpoContacts.Contacts.Fields.Addresses,
      ],
      sort: sortType,
    });
    setGlobalVariableValue({ key: 'USER_CONTACTS', value: data });
  }
};

export default getContacts;
