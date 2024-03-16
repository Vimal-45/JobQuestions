import React, { useEffect, useState } from "react";
import { userAddNotes } from "../Features/ApiActions";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setRespons } from "../Features/Slice";
import { Button, Modal, Spinner } from "flowbite-react";
import markImg from "../assets/sucess.png";

const AddNotes = () => {
  const [questions, setQuestions] = useState([""]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [payment, setPayment] = useState("");
  const dispatch = useDispatch();
  const response = useSelector((state) => state.quesAppReducer.resposne);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (response && response.length > 0) {
      setTimeout(() => {
        setLoading(false);
        setOpenModal(true);
      }, 1000);
    }
  }, [response]);

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const handleClear = (event) => {
    event.preventDefault();

    setQuestions([""]);
    setCompanyName("");
    setRole("");
    setPayment("");
    dispatch(setRespons(""));
    setLoading(false);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!questions || !companyName || !role || !payment) {
      alert("Please fill in all required fields");
    } else {
      setLoading(true);
      const token = localStorage.getItem("token");
      const payload = {
        token,
        questions,
        companyName,
        role,
        package: payment,
      };

      userAddNotes(payload, dispatch);
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-8 mt-14 rounded border border-gray-200 flex justify-center items-center">
        <form onSubmit={handleSave}>
          <div className="mt-8 space-y-6">
            {loading ? (
              <div className="flex flex-wrap gap-2">
                <Spinner color="info" aria-label="Info spinner example" />
                <Spinner color="success" aria-label="Success spinner example" />
                <Spinner color="failure" aria-label="Failure spinner example" />
                <Spinner color="warning" aria-label="Warning spinner example" />
                <Spinner color="pink" aria-label="Pink spinner example" />
                <Spinner color="purple" aria-label="Purple spinner example" />
              </div>
            ) : (
              <h1 className="font-medium text-blue-950 text-3xl">
                Add Company Information And Questions
              </h1>
            )}

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
                placeholder="Enter Conpany name"
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
                  placeholder="Enter package in LPA"
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
                  placeholder="Enter company role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            {questions.map((question, index) => (
              <div key={index} className="relative ">
                <label
                  htmlFor={`ques-${index}`}
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Question {index + 1}
                </label>
                <div className="relative flex">
                  <input
                    type="text"
                    name={`ques-${index}`}
                    id={`ques-${index}`}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 pr-10 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Enter the question"
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

          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>

            <button
              onClick={handleClear}
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <img
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
              src={markImg}
              alt=""
            />
            {response && response.length > 0 && (
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-black-400">
                {response}
              </h3>
            )}
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  setOpenModal(false);
                  dispatch(setRespons(""));
                }}
              >
                Go Back
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddNotes;
