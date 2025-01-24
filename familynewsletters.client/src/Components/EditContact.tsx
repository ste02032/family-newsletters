import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    firstName: string
    lastName: string
    emailAddress: string
    birthday: Date
    isContributor: boolean
    isRecipient: boolean
    isAdministrator: boolean
}

function EditContact() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)

        fetch("https://localhost:7014/contact", {
            method: 'POST',
            headers: {
                // DON'T overwrite Content-Type header
            },
            body: JSON.stringify(data)
        }).then(result => result.json()).then(
            (result) => {
                console.log(result);
            }
        );
    }

    const [isContributor, isRecipient, isAdministrator] = watch(["isContributor", "isRecipient", "isAdministrator"])

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
                        defaultValue="" {...register("firstName", { required: true, maxLength: 100 })} />
                    {errors.firstName && <span className="text-red-500">*</span>}
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="lastName">Last Name</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        {...register("lastName", { required: true, maxLength: 100 })} />
                    {errors.lastName && <span className="text-red-500">*</span>}
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="emailAddress">Email Address</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        {...register("emailAddress", { required: isContributor || isRecipient || isAdministrator ? true : false, maxLength: 150 })} />
                    {errors.emailAddress && <span className="text-red-500">*</span>}
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="birthday">Birthday</label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="datetime" placeholder="Birthday" {...register("birthday")} />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor="isContributor">
                    <input className="mr-2 leading-tight" type="checkbox" placeholder="Is Contributor" {...register("isContributor")} />
                    <span className="text-sm">Is Contributor</span>
                </label>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor="isRecipient">
                    <input className="mr-2 leading-tight" type="checkbox" placeholder="Is Recipient" {...register("isRecipient")} />
                    <span className="text-sm">Is Recipient</span>
                </label>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor="isAdministrator">
                    <input className="mr-2 leading-tight" type="checkbox" placeholder="Is Administrator" {...register("isAdministrator")} />
                    <span className="text-sm">Is Administrator</span>
                </label>
            </div>

            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" />
                </div>
            </div>
        </form>
    )
}

export default EditContact;