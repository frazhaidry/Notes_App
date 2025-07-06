import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import NoteCard from '../../component/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import moment from 'moment'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    })
  }

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error fetching notes");
    }
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.status === 200) {
        console.log("Note deleted successfully");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      console.log("Error deleting note");
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
  <>
    <Navbar userInfo={userInfo} />

    {/* Main Container */}
    <div className="container  mx-auto px-4 md:px-8 mt-12">
      {/* Fancy Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight leading-tight">
          Your Smart Note Space
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-lg mx-auto">
          Capture. Organize. Remember.<br className="hidden md:block" />
          Your ideas, always at your fingertips.
        </p>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allNotes.map((item) => (
          <NoteCard
            key={item._id}
            title={item.title}
            date={moment(item.createdAt).format("MMM DD, YYYY")}
            content={item.content}
            tags="#Meeting"
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => {}}
          />
        ))}
      </div>
    </div>

    {/* Floating Add Button */}
    <button
      className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-2xl fixed right-6 bottom-6 z-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
      title="Add New Note"
      onClick={() =>
        setOpenAddEditModal({
          isShown: true,
          type: "add",
          data: null,
        })
      }
    >
      <MdAdd className="text-3xl text-white" />
    </button>

    {/* Modal */}
    <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={() =>
        setOpenAddEditModal({ isShown: false, type: "add", data: null })
      }
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1000,
        },
      }}
      contentLabel="Add or Edit Note"
      className="animate-fadeIn w-[90%] md:w-[40%] max-h-[85vh] bg-white rounded-lg mx-auto mt-20 p-6 overflow-y-auto outline-none shadow-lg"
    >
      <AddEditNotes
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          });
        }}
        getAllNotes={getAllNotes}
      />
    </Modal>
  </>
);

}

export default Home;
