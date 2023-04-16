import React from "react";
import { useState } from "react";
import { PrimaryButton } from "../../components/Common/Buttons";
import Pagination from "../Common/Pagination";
import Table from "../Table";
import AddEditUserModal from "./AddEditUserModal";
import { useSelector } from "react-redux"

const Index = () => {
  const users = useSelector((state) => state.users)
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState({});
  // const [disableNext, setDisableNext] = useState(false);
  // const [disablePrev, setDisablePrev] = useState(false);
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   if (filter.page === 0) {
  //     setPage(LIMIT / filter.limit);
  //   } else {
  //     setPage((filter.page / filter.limit) + 1);
  //   }
  // }, [data, filter]);

  // useEffect(() => {
  //   setDisableNext(false);
  //   setDisablePrev(false);
  //   if (page === Math.round(total / LIMIT)) {
  //     setDisableNext(true);
  //   }
  //   if (page === 1) {
  //     setDisablePrev(true);
  //   }
  // }, [page]);

  // const onNextClick = () => {
  //   if (filter.page) {
  //     setFilter({
  //       ...filter,
  //       page: filter.page + LIMIT
  //     })
  //   }
  // };
  // const onPreviousClick = () => {
  //   setFilter({
  //     ...filter,
  //     page: filter.page - LIMIT
  //   });
  // };
  // const changePage = (i) => {
  //   setFilter({
  //     ...filter,
  //     page: i * LIMIT
  //   });
  // };

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/3"></div>
        <h6 className="text-center mt-3 mb-2 w-1/3 text-black-100 text-3xl">
          User's Data
        </h6>
        <div className="text-right mt-3 mb-2 mr-6 w-1/3">
          <PrimaryButton
            className="py-2 px-4 rounded justify-end"
            onClick={() => setShowModal(true)}
            title='Add User'
          >
          </PrimaryButton>
        </div>
      </div>
      {showModal ? (
        <AddEditUserModal
          title="Add User"
          setUserData={setUserData}
          setShowModal={setShowModal}
          userData={userData}
        />
      ) : null}
      <Table showModal={showModal} data={users} />
      {/* <div className="float-right mb-6 mr-6">
        <Pagination
          onNextClick={onNextClick}
          disableNext={disableNext}
          disablePrev={disablePrev}
          data={data || []}
          changePage={changePage}
          total={total}
          onPreviousClick={onPreviousClick}
        />
      </div> */}
    </>
  );
};

export default Index;
