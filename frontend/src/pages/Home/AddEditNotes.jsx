import React, { useState } from 'react'
import TagInput from '../../component/TagInput'
import { MdClose } from 'react-icons/md'

const AddEditNotes = ({ type, noteData , onClose }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [error, setError] = useState(null);

    // Add Note 
    const AddNewNote = async () => {

    }

    // Edit Note
    const EditNote = async () => {

    }

    
    const handleAddNote = async () => {
        if(!title){
            setError("Please enter a title")
            return;
        }
        if(!content){
            setError("Please enter a content")
            return;
        }
        setError("");

        if(type == "edit"){
            EditNote();
        }
        else{
            AddNewNote();
        }
        //Add Note API call
    
    }


  return (
    <div className='relative'>
    <button 
        className='w-8 h-8 rounded-full flex items-center justify-center absolute -top-5 -right-5 hover:bg-slate-50' 
        onClick={onClose}>
        <MdClose className="text-xl text-slate-400"/>
    </button>

    <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go to the school'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    </div>

    <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea 
            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
            placeholder='Content'
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
    </div>

    <div className='mt-3'>
        <label className='input-label'>Tags</label>
        <TagInput/>
    </div>

    {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

    <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
        ADD
    </button>
</div>
  )
}

export default AddEditNotes