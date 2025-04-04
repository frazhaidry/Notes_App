import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import NoteCard from '../../component/NoteCard'
import {MdAdd, MdOutlineAlarmAdd} from 'react-icons/md'
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
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
   }

   //Get All notes
   const getAllNotes = async () => {
    try{
       const response = await axiosInstance.get("/all-notes");
        if(response.data && response.data.notes){
           setAllNotes(response.data.notes);
        }
    } catch (error){
      console.log("Error fetching notes")
    }
   }

   // Delete Note
   const deleteNote = async (data) => {
    const noteId = data._id;
    try{
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.status === 200) {   // Check for successful response
        console.log("Note deleted successfully");
        getAllNotes();              
    }
      
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        console.log("Error fetching notes")
      }
    }
   }

   useEffect(()=> {
      getAllNotes();
      getUserInfo();
      return () => {}
   }, [])


   return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdAt).format("MMM DD, YYYY")}
              content={item.content}
              tags="#Meeting"
              isPinned={item.isPinned}
              onEdit={() => {handleEdit(item)}}
              onDelete={() => {deleteNote(item)}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>
    

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({
          isShown: true,
          type: "add",
          data: null,
        })
      }}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal 
       isOpen={openAddEditModal.isShown}
       onRequestClose={() => {}}
       style={{ 
           overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
           },
       }}
       contentLabel = ""
       className = "w-[40%] max-h-3/4 bg-white founded-md mx-auto mt-14 p-5 overflow-scroll"
      >
      <AddEditNotes 
      type={openAddEditModal.type}
      noteData = {openAddEditModal.data}
      onClose={()=> {
        setOpenAddEditModal({
          isShown: false,
          type: "add",
          data: null,
        })
      }} 
       getAllNotes = {getAllNotes}
      />
    </Modal>
    </>
  )
}

export default Home