import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { deleteNotes, updateNotes } from "../Features/ApiActions";
import { Button, Modal } from "flowbite-react";
import userImg from "../assets/ProfileImg.jpg";
import nodata from "../assets/no data.jpg";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { setRespons, setUserNotes } from "../Features/Slice";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
  const notes = useSelector((state) => state.quesAppReducer.userNotes.data);
  const response = useSelector((state) => state.quesAppReducer.resposne);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (notes === undefined) {
      setLoading(true);
      timeoutId = setTimeout(() => {
        setOpenModal4(true);
        setLoading(false);
      }, 600);
    } else {
      setLoading(false);
      setOpenModal4(false);
    }
    return () => clearTimeout(timeoutId);
  }, [notes]);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
        </div>
      </>
    );
  }

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  const payload = { headers, dispatch };

  const handleSave = (event) => {
    event.preventDefault();

    if (!questions || !companyName || !role || !payment) {
      alert("Please fill in all required fields");
    } else {
      const payload = {
        headers,
        questions,
        companyName,
        role,
        package: payment,
        id: selectedItem._id,
      };
      updateNotes(payload, dispatch);
    }
  };

  const handleEdit = (items) => {
    setOpenModal2(true);
    setSelectedItem(items);
    setQuestions(items.questions);
    setCompanyName(items.companyName);
    setRole(items.role);
    setPayment(items.package);
  };

  const handleDelete = (id) => {
    deleteNotes(id, payload);
    const deletedNotes = notes.filter((item) => item._id !== id);
    dispatch(setUserNotes({ data: deletedNotes }));
    if (deletedNotes.length === 0) {
      window.location.reload();
    }
  };

  const handleClear = () => {
    setQuestions([""]);
    setCompanyName("");
    setRole("");
    setPayment("");
  };

  return (
    <div>
      <NavBar />
      {notes &&
        notes.length > 0 &&
        notes.map((items, index) => {
          return (
            <div
              key={index}
              className="rounded mt-20 bg-slate-300 flex justify-around flex-wrap -skew-x-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500 p-2 card-compact hover:bg-base-200 transition-all duration-200 border border-black p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-full md:w-2/4 shadow-lg shadow-red-500 p-3.5 rounded-2xl">
                <div className="flex items-center flex-wrap  justify-between">
                  <div>
                    <img
                      src="https://pic.onlinewebfonts.com/thumbnails/animations_371414.svg?width=2"
                      className="w-10 h-10 text-blue-500 filter brightness-0 saturate-100 mb-3"
                      alt=""
                    />
                  </div>
                  <div>
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Company Name:{"  "}
                      <span className="text-blue-500 transition duration-500 hover:text-blue-700">
                        {items.companyName}
                      </span>
                    </h5>
                  </div>
                  <div>
                    <img
                      src="https://pic.onlinewebfonts.com/thumbnails/animations_371414.svg?width=2"
                      className="w-10 h-10 text-blue-500 filter brightness-0 saturate-100 mb-3"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <h5 className="mb-2 text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                    PACKAGE:{" "}
                    <span className=" text-blue-900">{items.package} </span>
                  </h5>
                  <h5 className="mb-2 text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                    ROLE: <span className=" text-blue-900">{items.role} </span>
                  </h5>
                </div>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Ques:
                  <span className="font-extrabold text-teal-800 ml-4">
                    {items.questions[0]}
                  </span>
                </p>
                <div className="flex flex-wrap justify-between">
                  <a
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedItem(items);
                    }}
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    See All Ques
                    <svg
                      className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={() => {
                      handleEdit(items);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      setOpenModal3(true);

                      setSelectedItem(items._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <h4 className="text-right">
                    Posted on: <span>{items.date}</span>
                  </h4>
                </div>
              </div>

              <div className="w-full md:w-2/4 dark:bg-slate-800 gap-6 flex items-center justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 relative shadow-lg shadow-red-500 overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                  <div className="flex flex-wrap items-center gap-4">
                    <img
                      src={items.user.imageUrl || userImg}
                      className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                    />
                    <div className="w-fit transition-all transform duration-500">
                      <h4> Posted by</h4>
                      <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                        {items.user.username}
                      </h1>
                      <p className="text-gray-400">{items.user.email} </p>
                      <a className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
                        {items.user.email}
                      </a>
                    </div>
                  </div>

                  <div className="absolute group-hover:bottom-1 delay-300 -bottom-16 transition-all duration-500 bg-gray-600 dark:bg-gray-100 right-1 rounded-lg">
                    <div className="flex justify-evenly items-center gap-2 p-1 text-2xl text-white dark:text-gray-600">
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />
                      </svg>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                      <svg
                        viewBox="0 0 960 1000"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                      >
                        <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header> {selectedItem.companyName} </Modal.Header>
        <Modal.Body>
          {selectedItem.questions &&
            selectedItem.questions.length > 0 &&
            selectedItem.questions.map((ques, index) => (
              <div key={index} className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {index + 1}. {ques}
                </p>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Go Back</Button>
        </Modal.Footer>
      </Modal>
      {/* Model---2------------------------------------------------- */}
      <Modal show={openModal2} onClose={() => setOpenModal2(false)}>
        <Modal.Header>Edit Company Information And Questions</Modal.Header>
        <Modal.Body>
          <div className="rounded border border-gray-200 flex justify-center items-center">
            <form>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder={selectedItem.companyName}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="payment"
                      className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                      Payment
                    </label>
                    <input
                      type="text"
                      name="payment"
                      id="payment"
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      placeholder={selectedItem.package}
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="role"
                      className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      placeholder={selectedItem.role}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>

                {questions &&
                  questions.map((question, index) => (
                    <div key={index} className="relative ">
                      <label
                        htmlFor={`ques-${index}`}
                        className="text-sm text-gray-700 block mb-1 font-medium"
                      >
                        Question {index + 1}
                      </label>

                      <div className="relative flex">
                        <input
                          key={index}
                          type="text"
                          name={`ques-${index}`}
                          id={`ques-${index}`}
                          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 pr-10 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                          placeholder={question}
                          value={question}
                          onChange={(e) => handleQuestionChange(index, e)}
                        />

                        <button
                          type="button"
                          onClick={() => removeQuestion(index)}
                          className="border border-blue-700 h-ful hover:bg-blue-800 absolute top-1/2 right-2 w-8 transform -translate-y-1/2 text-red-500 focus:outline-none"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={addQuestion}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Update</Button>
          <Button onClick={handleClear}>Clear</Button>
          {response && response === "Notes update succesfully" && (
            <p className="text-green-500 text-xl">{response}</p>
          )}
          <Button
            onClick={() => {
              setOpenModal2(false);
              dispatch(setRespons(" "));
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete modal---------------------------- */}
      <Modal
        show={openModal3}
        size="md"
        onClose={() => setOpenModal3(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Info?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleDelete(selectedItem);
                  setOpenModal3(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal3(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* modal-4------ no data found --------------------- */}
      <Modal
        show={openModal4}
        size="md"
        onClose={() => setOpenModal4(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <img src={nodata} className="mx-auto mb-4 h-80 w-100 " alt="" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              No Data Available
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  navigate("/addnotes");
                  setOpenModal4(false);
                }}
              >
                {"Click To add data"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal4(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyNotes;
