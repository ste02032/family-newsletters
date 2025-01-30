import { useForm, SubmitHandler } from "react-hook-form"
import { Contact } from "../Types/Contacts";
import { postRequest, putRequest } from "../hooks/useRequest";

type Inputs = {
    firstName: string
    lastName: string
    emailAddress: string
    birthday: Date
    isContributor: boolean
    isRecipient: boolean
    administrator: boolean
}

interface EditContactProps {
    setEditShown: (editShown: boolean) => void
    setContacts: (setContacts: Contact[]) => void
    contact: Contact
    contacts: Contact[]
}

function EditContact({ setEditShown, contact, setContacts, contacts }: EditContactProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const { post } = postRequest("/contact");
    const { put } = putRequest("/contact");

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)

        if (contact.id > 0) {
            console.log(contact);
            const updateContact = async () => {
                const result = await put(contact.id, data) as Contact;
                console.log(result);
                for (let i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === result.id) {
                        contacts[i] = result;
                        console.log("replacing item in contacts");
                    }
                }
                setContacts(contacts);
                setEditShown(false);
            };
            updateContact();
        }
        else {
            const addContact = async () => {
                const result = await post(data) as Contact;
                console.log(result);
                setContacts([
                    ...contacts,
                    {
                        id: result.id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        birthday: result.birthday,
                        isContributor: result.isContributor,
                        isRecipient: result.isRecipient,
                        administrator: result.administrator,
                        emailAddress: result.emailAddress,
                        isActive: result.isActive
                    },
                ]);
                setEditShown(false);
            };
            addContact();
        }
    }

    const onCancel = () => {
        setEditShown(false);
    }

    const formatDate = (date: Date): string => {
        if (date) {
            return new Date(date).toISOString().substring(0, 10);
        }
        else return "";
    };

    const [isContributor, isRecipient, administrator] = watch(["isContributor", "isRecipient", "administrator"])

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            {/* register your input into the hook by invoking the "register" function */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="firstName">First Name</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        defaultValue={contact?.firstName} {...register("firstName", { required: true, maxLength: 100 })} />
                    {errors.firstName && <span className="text-red-500">*</span>}
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="lastName">Last Name</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        defaultValue={contact?.lastName} {...register("lastName", { required: true, maxLength: 100 })} />
                    {errors.lastName && <span className="text-red-500">*</span>}
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="emailAddress">Email Address</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        defaultValue={contact.emailAddress} {...register("emailAddress", { required: isContributor || isRecipient || administrator ? true : false, maxLength: 150 })} />
                    {errors.emailAddress && <span className="text-red-500">*</span>}
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="birthday">Birthday</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        defaultValue={formatDate(contact.birthday)} type="date" placeholder="Birthday" {...register("birthday")} />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor="isContributor">
                    <input className="mr-2 leading-tight" type="checkbox" placeholder="Is Contributor" defaultChecked={contact.isContributor} {...register("isContributor")} />
                    <span className="text-sm">Is Contributor</span>
                </label>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor="isRecipient">
                    <input className="mr-2 leading-tight" type="checkbox" placeholder="Is Recipient" defaultChecked={contact.isRecipient} {...register("isRecipient")} />
                    <span className="text-sm">Is Recipient</span>
                </label>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor="isAdministrator">
                    <input className="mr-2 leading-tight" type="checkbox" placeholder="Is Administrator" defaultChecked={contact.administrator} {...register("administrator")} />
                    <span className="text-sm">Is Administrator</span>
                </label>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" />
                    <a href="#" onClick={onCancel} className="pl-4">Cancel</a>
                </div>
            </div>
        </form>
    )
}

export default EditContact;