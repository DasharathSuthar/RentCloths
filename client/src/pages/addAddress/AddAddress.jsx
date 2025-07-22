import { useEffect, useState } from "react"
import { assets } from "../../assets/assets"
import { useAppContext } from "../../context/AppContext"
import { toast, ToastContainer } from "react-toastify"

const InputField = ({ type, placeHolder, name, handleChange, address }) => (
    <input
        className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500"
        type={type} placeholder={placeHolder} onChange={handleChange} name={name} value={address[name]} required />
)


const AddAddress = () => {

    const { axios, user, navigate } = useAppContext()

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAddress(prevAddress => ({
            ...prevAddress, [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('/api/addresses/add', address)
            if (data.data) {
                toast.success(data.message)
                console.log(data.message);
                
                navigate("/cart")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/cart')
        }
    }, [])

    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="mt-16 pb-16">
                <p className="text-2xl md:text-3xl text-secondary underline">Add Shipping <span className="font-semibold">Address</span></p>
                <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                    <div className="flex-1 max-w-md">
                        <form onSubmit={onSubmitHandler} className="gap-2 flex flex-col">

                            <div className="grid grid-cols-2 gap-4">
                                <InputField handleChange={handleChange} address={address} name={"firstName"} type={"text"} placeHolder={"First Name"} />
                                <InputField handleChange={handleChange} address={address} name={"lastName"} type={"text"} placeHolder={"Last Name"} />
                            </div>

                            <InputField handleChange={handleChange} address={address} name={"email"} type={"email"} placeHolder={"Email Address"} />
                            <InputField handleChange={handleChange} address={address} name={"street"} type={"text"} placeHolder={"Street"} />

                            <div className="grid grid-cols-2 gap-4">
                                <InputField handleChange={handleChange} address={address} name={"city"} type={"text"} placeHolder={"City"} />
                                <InputField handleChange={handleChange} address={address} name={"state"} type={"text"} placeHolder={"State"} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField handleChange={handleChange} address={address} name={"zipcode"} type={"number"} placeHolder={"Zip code"} />
                                <InputField handleChange={handleChange} address={address} name={"country"} type={"text"} placeHolder={"Country"} />
                            </div>

                            <InputField handleChange={handleChange} address={address} name={"phone"} type={"number"} placeHolder={"Phone"} />

                            <button className="w-full mt-6 bg-secondary text-white py-3 hover:bg-primary transition cursor-pointer uppercase">
                                Save Address
                            </button>
                        </form>
                    </div>
                    <img src={assets.add_address_iamge} alt="Add Address" className="md:mr-16 mb-16 md:mt-0" />
                </div>
            </div>
        </>
    )
}

export default AddAddress