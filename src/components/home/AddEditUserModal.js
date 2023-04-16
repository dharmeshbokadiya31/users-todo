import React, { useState } from "react";
import { SecondaryButton, SubmitButton } from "../Common/Buttons";
import RangePicker from "react-range-picker"
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { userAdded, userUpdated } from "../../reducer/reducer";
import { Input } from "../Common/Input";
import { successMessage } from "../../constants/constant";

const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

const genderArray = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
]

const hobbiesArray = [
  { value: 'sports', label: 'Sports' },
  { value: 'reading', label: 'Reading' },
  { value: 'music', label: 'Music' }
]

const ageArray = [];
for (let i = 18; i <= 55; i++) {
  ageArray.push({ label: i.toString(), value: i });
}
const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  control: (provided) => ({
    ...provided,
    borderColor: '#d1d4d8',
  })
}

const AddEditUserModal = (props) => {
  const { userData, setShowModal, setUserData, title } = props;
  const [msg, setMsg] = useState();

  const dispatch = useDispatch();
  const usersLength = useSelector((state) => state.users.length)

  const handleOnchange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    if (userData?.hobbies?.find(x => x === event.target.value)) {
      setUserData({
        ...userData,
        hobbies: userData.hobbies.filter(x => x !== event.target.value)
      })
    } else {
      setUserData({
        ...userData,
        hobbies: userData?.hobbies ? [...userData.hobbies, event.target.value] : [event.target.value]
      })
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setUserData({})

  }

  const onEditSubmit = (id) => {
    if (validate()) {
      dispatch(
        userUpdated({
          id: id,
          userData,
        })
      )
      closeModal()
      successMessage("User updated successfully")
    }
  };

  console.log(userData)
  const validate = () => {
    let obj = {};
    if (!userData?.username) {
      obj["username"] = "Username Is Required";
    }
    if (!userData?.gender) {
      obj["gender"] = "Select Gender";
    }
    if (!userData?.hobbies?.length) {
      obj["hobbies"] = "Select Hobby";
    }
    if (!userData?.age) {
      obj["age"] = "Select Age";
    }
    if (!userData?.selectedDate) {
      obj["selectedDate"] = "Select Date";
    }
    if (!userData?.taskname) {
      obj["taskname"] = "Task is required";
    }
    if (!userData?.status) {
      obj["status"] = "Select Status";
    }
    setMsg(obj);
    if (Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  };

  const onAddNewUser = async (data) => {
    if (validate()) {
      dispatch(
        userAdded({
          ...userData,
          id: usersLength + 1,
        })
      )
      closeModal()
      successMessage("User added successfully")
    }
  };

  return (
    <>
      <>
        <div className="flex justify-center backDrop items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-6 mx-auto lg:w-2/5 sm:w-full xl:w-2/5 md:w-2/3">
            <div className="rounded-lg shadow-lg relative bg-white-700 flex flex-col bg-white  focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid  rounded-t ">
                <h3 className="text-3xl text-black font=semibold">{title}</h3>
                <SecondaryButton
                  className="text-black text-xl float-right"
                  onClick={() => closeModal()}
                  title="X"
                />
              </div>
              <div className="relative p-6 flex-auto">
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <div className="grid grid-cols-12 items-start mb-4">
                    <Input
                      label="Username"
                      type="text"
                      name="username"
                      required
                      placeholder="Enter Username"
                      value={userData?.username}
                      maxLength={15}
                      onChange={(e) =>
                        handleOnchange("username", e.target.value.replace(/[^a-zA-Z\s]/g, ''))
                      }
                      className="shadow my-2 appearance-none border rounded w-full py-2 px-1 text-black"
                      msg={msg?.username}
                    />
                  </div>
                  <div className="grid grid-cols-12 items-start mb-4">
                    <label htmlFor="gender" className="col-span-3">Gender</label>
                    <div className="gap-3 col-span-9">
                      {genderArray.map(item =>
                        <label className="inline-flex items-center mr-2">
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-blue-600"
                            name="gender"
                            value={item.value}
                            checked={userData.gender === item.value}
                            onChange={(e) => handleOnchange("gender", e.target.value)}
                          />
                          <span className="ml-2 text-gray-700">{item.label}</span>
                        </label>)}
                        <p className="text-xs text-red">{msg?.gender}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-start mb-4">
                    <label htmlFor="hobbies" className="col-span-3">Hobby</label>
                    <div className="gap-3 col-span-9">
                      {hobbiesArray.map(item =>
                        <label className="inline-flex items-center mr-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            name={item.value}
                            value={item.value}
                            checked={userData && userData.hobbies && userData.hobbies.indexOf(item.value) !== -1}
                            onChange={handleCheckboxChange}
                          />
                          <span className="ml-2 text-gray-700">{item.label}</span>
                        </label>)}
                        <p className="text-xs text-red">{msg?.hobbies}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-start mb-4">
                    <label htmlFor="date" className="col-span-3">Age</label>
                    <div className="gap-3 col-span-9">
                      <Select
                        onChange={(value) => setUserData({
                          ...userData,
                          age: value
                        })}
                        value={userData?.age}
                        options={ageArray}
                        styles={customStyles}
                        placeholder="Select Age"
                      />
                      <p className="text-xs text-red">{msg?.age}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-start mb-4">
                    <label htmlFor="date" className="col-span-3">Date</label>
                    <div className="gap-3 col-span-9">
                      <DatePicker
                        placeholderText="Select Date"
                        selected={userData?.selectedDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setUserData({
                          ...userData,
                          selectedDate: date
                        })}
                      />
                      <p className="text-xs text-red">{msg?.selectedDate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-start mb-4">
                    <Input
                      label="Task Name"
                      type="text"
                      name="taskname"
                      required
                      placeholder="Enter Task Name"
                      value={userData?.taskname}
                      onChange={(e) =>
                        handleOnchange("taskname", e.target.value)
                      }
                      className="shadow my-2 appearance-none border rounded w-full py-2 px-1 text-black"
                      msg={msg?.taskname}
                    />
                  </div>
                  <div className="grid grid-cols-12 items-start">
                    <label htmlFor="date" className="col-span-3">Status</label>
                    <div className="gap-3 col-span-9">
                      <Select
                        onChange={(value) => setUserData({
                          ...userData,
                          status: value
                        })}
                        value={userData?.status}
                        options={options}
                        styles={customStyles}
                        placeholder="Select Status"
                      />
                      <p className="text-xs text-red">{msg?.status}</p>
                    </div>
                  </div>

                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-2">
                <SecondaryButton
                  title="Close"
                  type="button"
                  onClick={() => {
                    closeModal();
                  }}
                />
                <SubmitButton
                  title="Submit"
                  type="button"
                  className='gap-2 flex items-center'
                  onClick={() =>
                    title === "Edit User"
                      ? onEditSubmit(userData.id)
                      : onAddNewUser(userData)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40  bg-black"></div>
      </>
    </>
  );
};

export default AddEditUserModal;
