import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import SaveBtn from "./SaveBtn";
import { EyeClosedIcon, EyeIcon, Trash2Icon, UserPenIcon, CopyIcon } from "@animateicons/react/lucide";
import { ToastContainer, toast } from 'react-toastify';


const Password = () => {
    const handlePasswords = () => {
        let tempArr = localStorage.getItem('passwords');
        return tempArr !== null ? JSON.parse(tempArr) : [];
    }

    const [form, setForm] = useState({
        website: '',
        username: '',
        password: '',
        uid: ''
    });
    const [editForm, setEditForm] = useState({
        website: '',
        username: '',
        password: '',
        uid: ''
    });
    const [deleteData, setDeleteData] = useState({
        website: 'Google',
        username: 'Ankit',
        password: 'Password',
        uid: ''
    });
    const [passArray, setPassArray] = useState(handlePasswords);
    const [hide, setHide] = useState(true)
    const passField = useRef()
    const [editSecVisibile, setEditSecVisible] = useState(false)
    const [deleteSecVisibile, setDeleteSecVisible] = useState(false)

    const handleSave = () => {
        if (form.website !== '' && form.password !== '' && form.password !== '') {
            toast('Saved')
            form.uid = uuidv4()
            setPassArray([...passArray, form]);
            setForm({
                website: '',
                username: '',
                password: '',
                uid: ''
            })

        }
        else {
            return;
        }
    }

    useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passArray))
    }, [passArray])

    useEffect(() => {
        hide ? passField.current.type = "password" : passField.current.type = "text";
    }, [hide])

    const toggleHide = () => {
        setHide(!hide)
    }

    const handleCopy = (text) => {
        toast('Copied to Clipboard')

        navigator.clipboard.writeText(text)
    }

    const handleDelete = (data) => {
        setDeleteData({
            website: data.website,
            username: data.username,
            password: data.password,
            uid: data.uid
        })

        setDeleteSecVisible(true)
    }

    const handleConfirm = () => {
        toast('Deleted')

        let tempArr = passArray.filter((data) => {
            return data.uid !== deleteData.uid
        })

        setPassArray(tempArr)
        setDeleteSecVisible(false)
    }

    const handleEdit = (data) => {
        setEditSecVisible(true)
        setEditForm({
            website: data.website,
            username: data.username,
            password: data.password,
            uid: data.uid
        })
    }

    const togglePass = (e, pass) => {
        let innerText = e.target.innerText;
        console.log(innerText)
        if (innerText === '********') {
            e.target.innerText = pass
        }
        else {
            e.target.innerText = '********'
        }
    }

    const handleUpdate = () => {
        toast('Updated')
        let updatedArr = passArray.map(item => {
            return item.uid === editForm.uid ? editForm : item
        });

        setPassArray(updatedArr)
        setEditSecVisible(false)
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target

        setEditForm({
            ...editForm,
            [name]: value
        })
    }

    const handleCancel = (e) => {

        const name = e.currentTarget.name;

        if (name === 'Edit') {
            toast('Cancelled Changes')
            setEditSecVisible(false)
        }
        else if (name === 'delete') {
            toast('Cancelled Deletion')
            setDeleteSecVisible(false)
        }

    }

    return (
        <div className="min-h-[78vh] mb-5">

            <ToastContainer />

            <div className="section-1 font-blackOps w-full h-[20%] text-[#bcc4db] text-shadow-[2px_1px_5px_black] flex items-center justify-center mt-5">
                <span className="text-6xl select-none">PassDB</span>
                <div className="flex flex-col items-start text-sm leading-2.5 select-none">
                    <span>Your</span>
                    <span>Own</span>
                    <span>Password</span>
                    <span>Manager</span>
                </div>
            </div>

            <div className="section-2 font-blackOps w-full flex flex-col items-center gap-2.5 mb-10">
                <div className="website-field flex items-center gap-2 w-1/2">
                    <label className="text-shadow-[2px_1px_5px_black] text-[#bcc4db]" htmlFor="website">Website</label>
                    <input
                        className="bg-white w-full rounded-lg px-2 py-px focus-within:outline-3 focus-within:outline-black"
                        placeholder="Enter Website Name"
                        type="text" id="website" name="website"
                        value={form.website}
                        onChange={(e) => { setForm({ ...form, website: e.target.value }) }}
                    />
                </div>
                <div className="user-pass flex gap-2.5 w-1/2">
                    <div className="user-field flex items-center gap-2 w-full">
                        <label className="text-shadow-[2px_1px_5px_black] text-[#bcc4db]" htmlFor="username">Username</label>
                        <input
                            className="bg-white w-full rounded-lg px-2 py-px focus-within:outline-3 focus-within:outline-black"
                            placeholder="Enter Username"
                            type="text" id="username" name="username"
                            value={form.username}
                            onChange={(e) => { setForm({ ...form, username: e.target.value }) }}
                        />
                    </div>
                    <div className="pass-field flex items-center gap-2 w-full">
                        <label className="text-shadow-[2px_1px_5px_black] text-[#bcc4db]" htmlFor="password">Password</label>
                        <div className="flex items-center bg-white rounded-lg overflow-hidden w-full h-fit px-2 py-px focus-within:outline-3 focus-within:outline-black">
                            <input
                                className="bg-white w-full p-0 rounded-lg focus:outline-none"
                                placeholder="Enter Password"
                                ref={passField}
                                type="password" id="password" name="password"
                                value={form.password}
                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                            />
                            <span className="cursor-pointer" onClick={toggleHide}>
                                {hide ? <EyeIcon
                                    size={18}
                                    duration={1}
                                    color="black" />
                                    : <EyeClosedIcon
                                        size={18}
                                        duration={1}
                                        color="black" />
                                }
                            </span>

                        </div>
                    </div>
                    <div className="save-btn">
                        {/* <div>
                            <SaveBtn />
                        </div> */}
                        <div className="git-btn cursor-pointer border-2 border-black bg-[#c0a9b0] pb-1 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-1 active:translate-y-1">
                            <button className="cursor-pointer bg-[#7880b5] text-[#bcc4db] text-shadow-[2px_1px_5px_black] flex items-enter gap-3 border border-white font-bold  p-1 py-0"
                                onClick={handleSave}
                            >
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-3 w-full flex flex-col items-center justify-center">

                <div className="w-1/2 bg-[#7880b5] my-2.5 border border-[#c0a9b0] text-center text-[#bcc4db] text-shadow-[2px_1px_5px_black]">
                    <div className="font-blackOps select-none">Your Passwords</div>
                </div>
                <div className="w-1/2 bg-[#7880b5] border border-[#c0a9b0]">
                    <table className="table-fixed border-separate w-full">
                        <thead>
                            <tr>
                                <th className="w-[30%] border-b-2 border-black text-[#bcc4db] text-shadow-[2px_1px_5px_black]">Website</th>
                                <th className="w-[30%] border-b-2 border-black text-[#bcc4db] text-shadow-[2px_1px_5px_black]">Username</th>
                                <th className="w-[30%] border-b-2 border-black text-[#bcc4db] text-shadow-[2px_1px_5px_black]">Password</th>
                                <th className="w-[10%] border-b-2 border-black text-[#bcc4db] text-shadow-[2px_1px_5px_black]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* Tables Starting from Here... */}
                            {passArray.length > 0 ? passArray.map((data) => {
                                return <tr key={data.uid} className="border-2 border-black select-none">
                                    <td className="w-[30%] text-center text-black font-semibold border-b-2 border-black py-1">
                                        <div className="flex items-center justify-center gap-2">
                                            <span>{data.website}</span>
                                            <CopyIcon
                                                className="cursor-pointer"
                                                size={16}
                                                duration={1}
                                                color="#ffffff"
                                                onClick={() => handleCopy(data.website)}
                                            />
                                        </div>
                                    </td>
                                    <td className="w-[30%] text-center text-black font-semibold border-b-2 border-black py-1">
                                        <div className="flex items-center justify-center gap-2">
                                            <span>{data.username}</span>
                                            <CopyIcon
                                                className="cursor-pointer"
                                                size={16}
                                                duration={1}
                                                color="#ffffff"
                                                onClick={() => handleCopy(data.username)}
                                            />
                                        </div>
                                    </td>
                                    <td className="w-[30%] text-center text-black font-semibold border-b-2 border-black py-1">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="cursor-pointer" onClick={(e) => togglePass(e, data.password)}>********</span>
                                            <CopyIcon
                                                className="cursor-pointer"
                                                size={16}
                                                duration={1}
                                                color="#ffffff"
                                                onClick={() => handleCopy(data.password)}
                                            />
                                        </div>
                                    </td>
                                    <td className="w-[10%] font-semibold border-b-2 border-black py-1">
                                        <div className="flex items-center justify-center gap-2.5">
                                            <UserPenIcon
                                                className="cursor-pointer"
                                                size={20}
                                                duration={1}
                                                color="#ffffff"
                                                onClick={() => handleEdit(data)}
                                            />
                                            <Trash2Icon
                                                className="cursor-pointer"
                                                size={20}
                                                duration={1}
                                                color="#ffffff"
                                                onClick={() => handleDelete(data)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            })
                                : <tr>
                                    <td colSpan={4} className="font-blackOps text-center p-7">
                                        Nothing To Show
                                    </td>
                                </tr>
                            }


                        </tbody>
                    </table>

                </div>
            </div>

            <div className={`delete-section ${deleteSecVisibile ? 'flex' : 'hidden'} font-blackOps w-full h-screen fixed inset-0 z-10 backdrop-blur-lg justify-center pt-28`}>
                <div className="w-1/2">
                    <div className="w-full text-center text-3xl font-bold text-red-600 underline">DELETE</div>
                    <div className="w-full flex flex-col items-center justify-center py-7">
                        <div className="w-1/2 flex gap-3.5">
                            <span>Website:</span>
                            <span className="text-red-600">{deleteData.website}</span>
                        </div>
                        <div className="w-1/2 flex gap-3.5">
                            <span>Username:</span>
                            <span className="text-red-600">{deleteData.username}</span>
                        </div>
                        <div className="w-1/2 flex  gap-3.5">
                            <span>Password:</span>
                            <span className="text-red-600">{deleteData.password}</span>
                        </div>

                        <div className="buttons flex items-center gap-5 mt-10">

                            {/* Confirm Button */}
                            <div className="Confirm-btn w-22 cursor-pointer border-4 border-black bg-[#c0a9b0] pb-2.5 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-2.5 active:translate-y-2.5">
                                <button className="cursor-pointer w-20 bg-[#7880b5] flex items-enter justify-center border-4 border-white  p-1 py-px" onClick={handleConfirm}>
                                    <span>Confirm</span>
                                </button>
                            </div>

                            {/* Cancel Button */}
                            <div className="Cancel-btn w-22 cursor-pointer border-4 border-black bg-[#c0a9b0] pb-2.5 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-2.5 active:translate-y-2.5" name='delete'>
                                <button className="cursor-pointer w-20 bg-[#7880b5] flex items-enter justify-center border-4 border-white  p-1 py-px" name="delete" onClick={handleCancel}>
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`editSection fixed inset-0 ${editSecVisibile ? 'flex' : 'hidden'} font-blackOps w-full h-screen z-10 backdrop-blur-lg justify-center pt-28`}>
                <div className="w-1/3 space-y-2.5">
                    <div className="flex items-center justify-between gap-2.5">
                        <label className="text-shadow-[2px_1px_5px_black] text-[#bcc4db]" htmlFor="website-edit">Website</label>
                        <input
                            className="bg-white w-[80%] rounded-lg px-2 py-px focus-within:outline-3 focus-within:outline-black "
                            type="text" id="website-edit" name="website"
                            value={editForm.website}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-2.5">
                        <label className="text-shadow-[2px_1px_5px_black] text-[#bcc4db]" htmlFor="username-edit">Username</label>
                        <input
                            className="bg-white w-[80%] rounded-lg px-2 py-px focus-within:outline-3 focus-within:outline-black"
                            type="text" id="username-edit" name="username"
                            value={editForm.username}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-2.5">
                        <label className="text-shadow-[2px_1px_5px_black] text-[#bcc4db]" htmlFor="password-edit">Password</label>
                        <input
                            className="bg-white w-[80%] rounded-lg px-2 py-px focus-within:outline-3 focus-within:outline-black"
                            type="text" id="password-edit" name="password"
                            value={editForm.password}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className="buttons flex items-center gap-5">

                        {/* Update Button */}
                        <div className="update-btn w-22 cursor-pointer border-4 border-black bg-[#c0a9b0] pb-2.5 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-2.5 active:translate-y-2.5">
                            <button className="cursor-pointer w-20 bg-[#7880b5] flex items-enter justify-center border-4 border-white  p-1 py-px" onClick={handleUpdate}>
                                <span>Update</span>
                            </button>
                        </div>

                        {/* Cancel Button */}
                        <div className="Cancel-btn w-22 cursor-pointer border-4 border-black bg-[#c0a9b0] pb-2.5 select-none transition-all duration-100 ease-in-out active:p-0 active:mb-2.5 active:translate-y-2.5" >
                            <button className="cursor-pointer w-20 bg-[#7880b5] flex items-enter justify-center border-4 border-white  p-1 py-px" name="Edit" onClick={handleCancel}>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Password;