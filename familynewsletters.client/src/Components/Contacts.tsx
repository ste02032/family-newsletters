import { useEffect, useState } from "react";
import EditContact from "./EditContact";
import { getRequest, deleteRequest } from "../hooks/useRequest";
import LoadingIndicator from "./LoadingIndicator";
import loadingStatus from "../helpers/LoadingStatus";
import { Contact } from "../Types/Contacts";

const TABLE_HEAD = ["First", "Last", "Email", "Birthday", "Admin", "Contributor", "Recipient", ""];

function Contacts() {
    const [editShown, setEditShown] = useState(false);

    const handleEditClick = (contact: Contact) => {
        setContact(contact);
        setEditShown(true);
    };

    const handleDeleteClick = (id: number) => {
        
        const deleteContact = async () => {
            await deleteReq(id);
            const contactsResult = await get({});
            setContacts(contactsResult);
        };

        deleteContact();
    };

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contact, setContact] = useState<Contact>();
    const { get, loadingState } = getRequest("/contact");
    const { deleteReq } = deleteRequest("/contact");

    useEffect(() => {
        const fetchContacts = async () => {
            const contactsResult = await get({});
            setContacts(contactsResult);
        };
        fetchContacts();
    }, [get]);

    const formatDate = (date: Date): string => {
        if (date) {
            const dateObj = new Date(date);
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');
            const year = dateObj.getFullYear().toString();
            return `${month}/${day}/${year}`;
        }
        else return "";
    };

    if (loadingState !== loadingStatus.loaded)
        return <LoadingIndicator loadingState={loadingState} />

    return (
        <>
            {editShown ? (
                <EditContact setEditShown={setEditShown} contact={contact!} setContacts={setContacts} contacts={contacts} />
            ) : (
                <div>
                    <div>
                            <button className="bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick({isActive: true} as Contact)}>Add</button>
                    </div>
                    <div className="h-full w-full">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                              <tr>
                                {TABLE_HEAD.map((head) => (
                                  <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                  >
                                    <span className="font-normal leading-none opacity-70">
                                      {head}
                                    </span>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                                <tbody>
                                    {contacts.map((contactRecord, index) => {
                                        const isLast = index === contacts.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={contactRecord.id} className="even:bg-blue-gray-50/50">
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {contactRecord.firstName}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {contactRecord.lastName}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {contactRecord.emailAddress}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {formatDate(contactRecord.birthday)}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <input type="checkbox" disabled checked={contactRecord.administrator} />
                                                </td>
                                                <td className={classes}>
                                                    <input type="checkbox" disabled checked={contactRecord.isContributor} />
                                                </td>
                                                <td className={classes}>
                                                    <input type="checkbox" disabled checked={contactRecord.isRecipient} />
                                                </td>
                                                <td className={classes}>
                                                    <a
                                                        href="#"
                                                        className="font-medium pr-4" onClick={() => handleEditClick(contactRecord)}
                                                    >
                                                        Edit
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="font-medium" onClick={() => handleDeleteClick(contactRecord.id)}
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contacts;