import { useState } from "react";
import EditContact from "./EditContact";

const TABLE_HEAD = ["First", "Last", "Email", "Birthday"];

const TABLE_ROWS = [
    {
        first: "John Michael",
        last: "Manager",
        email: "test@test.com",
        birthday: "23/04/18",
    },
    {
        first: "Alexa Liras",
        last: "Developer",
        email: "test@test.com",
        birthday: "23/04/18",
    },
    {
        first: "Laurent Perrier",
        last: "Executive",
        email: "test@test.com",
        birthday: "19/09/17",
    },
    {
        first: "Michael Levi",
        last: "Developer",
        email: "test@test.com",
        birthday: "24/12/08",
    },
    {
        first: "Richard Gran",
        last: "Manager",
        email: "test@test.com",
        birthday: "04/10/21",
    },
];

function Contacts() {
    const [editShown, setEditShown] = useState(false);

    const handleEditClick = () => {
        setEditShown(true);
    };

    return (
        <>
            {editShown ? (
                <EditContact setEditShown={setEditShown} />
            ) : (
                <div>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditClick}>Add</button>
                    </div>
                    <div className="h-full w-full overflow-scroll">
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
                                    {TABLE_ROWS.map(({ first, last, email, birthday }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={name} className="even:bg-blue-gray-50/50">
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {first}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {last}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {email}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <span className="font-normal"
                                                    >
                                                        {birthday}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <a
                                                        href="#"
                                                        className="font-medium"
                                                    >
                                                        Edit
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