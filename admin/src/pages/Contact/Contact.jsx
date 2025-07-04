import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Contacts = ({ url }) => {

    const [contacts, setContacts] = useState([]);

    // Fetch all contacts
    const fetchAllContacts = async () => {
        try {
            const response = await axios.get(url + '/api/contact/all');
            if (response?.data?.success) {
                setContacts(response?.data?.data);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch contacts.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching contacts.');
        }
    };

    // Update status of a contact
    const statusHandler = async (event, contactId) => {
        try {
            const response = await axios.put(url + '/api/contact/status', {
                id: contactId,
                status: event.target.value,
            });
            if (response?.data?.success) {
                toast.success('Status updated successfully.');
                await fetchAllContacts();
            } else {
                toast.error(response.data.message || 'Failed to update status.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating status.');
        }
    };

    useEffect(() => {
        fetchAllContacts();
    }, []);

    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 shadow-lg rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold dark:text-gray-300 text-gray-700">Contacts Page</h3>

            <div className="space-y-6">
                {contacts?.map((contact, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-4 items-center border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-slate-800"
                    >
                        <div className="space-y-2 text-center sm:text-left">
                            <p className="font-bold text-gray-800 dark:text-gray-300 capitalize">{contact.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.phone}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{contact.subject}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.message}</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="font-semibold text-gray-800 dark:text-gray-300">Status:</p>
                            <p className={`font-bold text-lg ${contact.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {contact.status}
                            </p>
                        </div>
                        <select
                            onChange={(event) => statusHandler(event, contact._id)}
                            value={contact.status}
                            className="bg-gray-100 dark:bg-gray-700 border border-tomato dark:border-gray-500 rounded-md px-4 py-2 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all mx-auto sm:mx-0"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contacts;