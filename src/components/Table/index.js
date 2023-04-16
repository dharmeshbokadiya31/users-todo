import React from "react";
import { useState } from "react";
import { TableButton } from "../Common/Buttons";
import DeleteModal from "../ConfirmationModal/DeleteModal";
import AddEditUserModal from "../home/AddEditUserModal";
import Loader from "../Common/Loader";
import moment from "moment";
const HeaderFields = [
  "#",
  "Username",
  "Gender",
  "Hobbies",
  "Age",
  "Date",
  "Task Name",
  "Status",
  "Actions"
];

const dataField = [
  "id",
  "username",
  "gender",
  "hobbies",
  "age",
  "selectedDate",
  "taskname",
  "status"
];

export default function Table(props) {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  return (
    <>
      {showModal ? (
        <AddEditUserModal
          setShowModal={setShowModal}
          title="Edit User"
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        ""
      )}
      {showDeleteModal ? (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          id={id}
        />
      ) : (
        ""
      )}
      <div
        className={`relative flex flex-col focus:ring-4 focus:outline-none focus:ring-blue-300 ${showDeleteModal || showModal || props?.showModal
          ? "blurBackground"
          : ""
          }`}
      >
        {props.loader && <Loader relative />}
        <div className="overflow-x-auto  border rounded-lg m-6">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {HeaderFields.map((ele) => {
                      return (
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          {ele}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {props?.data?.length ? props?.data?.map((ele) => {
                    return (
                      <>
                        <tr>
                          {dataField.map((i) => {
                            return (
                              <>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap capitalize">
                                  {i === "hobbies" ? 
                                     ele[i].map((item, index) => 
                                     <div className="capitalize">
                                       {item}
                                       {index !== ele[i].length - 1 && ","}
                                     </div>) : i === "selectedDate" ? 
                                     moment(ele[i]).format("DD/MM/YYYY") 
                                     : i === "status" ?
                                     <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-xs mr-2">{ele[i].label}</span> :
                                      i === "age" ? ele[i].label :
                                     ele[i]
                                  }
                                </td>
                              </>
                            );
                          })}
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <TableButton
                              onClick={() => {
                                setShowModal(true);
                                let newData = {
                                  ...ele,
                                  selectedDate: new Date(ele.selectedDate),
                                  status: ele.status
                                }
                                setUserData(newData);
                              }}
                              className="green"
                              title="Edit"
                              type="button"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <TableButton
                              onClick={() => {
                                setShowDeleteModal(true);
                                setId(ele.id);
                              }}
                              className="red"
                              title="Delete"
                              type="button"
                            />
                          </td>
                        </tr>
                      </>
                    );
                  }): ""
                  }
                </tbody>
              </table>
              {!props?.data?.length && 
                <div className="h-56 font-bold flex items-center justify-center mx-auto border-t">
                  NO DATA FOUND
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
