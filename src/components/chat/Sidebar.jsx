import React,{ useState, useContext, useEffect } from 'react';
import { MdClose, MdMenu, MdAdd, MdOutlineLogout, MdOutlineQuestionAnswer, MdOutlineCoffee } from 'react-icons/md'
import { logo } from '../../assets';
import DarkMode from '../bgChat/DarkMode';
import MessageHistory from './MessageHistory';
import StoreButton from '../store/StoreButton';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    function handleNewChat() {
      navigate(`/chatAi`);
    }

    function handleResize() {
        window.innerWidth <= 720 ? setOpen(false) : setOpen(true)
      }
    
      useEffect(() => {
        window.addEventListener("resize", handleResize)
    
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }, [])

  return (
     <section className={` ${open ? "w-64" : "w-16"} flex flex-col gap-y-4 bg-slate-500 h-full p-2 pt-4 relative duration-300`}>
      <div className="flex justify-center gap-4 items-center">
        <div className={`cursor-pointer duration-300 text-white ${!open && "scale-0 hidden"}`}>
          <span className='w-8 h-8'><img className='w-8 h-8' src={logo} alt="" /></span>
        </div>
        <h1 className={`text-white font-medium text-xl duration-300 ${!open && "scale-0 hidden"}`}>
          Chat BOX
        </h1>
        <div className={`cursor-pointer duration-300 text-white justify-end`} onClick={() => setOpen(!open)}>
          {open ? <MdClose className='w-8 h-8' /> : <MdMenu className='w-8 h-8' />}
        </div>
      </div>
      <div className="flex justify-around">
        
        <button className='px-4 py-3 flex items-center gap-x-4 w-screen rounded-md cursor-pointer hover:bg-light-white text-base border-neutral-600 border'
          onClick={handleNewChat}
          // disabled={isLoading}

        >
        {/* <button className='flex relative inherit'> */}
          <div className='cursor-pointer duration-300 text-xl'>
            <MdAdd />
          </div>
          <h1 className={`${!open && "hidden"}`}>New chat</h1>
          </button>
        {/* </span> */}
      
      </div>
      {/* {limit >= 0 &&
        <div className={`nav__msg ${!open && "scale-0 hidden"}`}>
          <p className='nav__p'>
            you have {limit} requests left today.

          </p>
        </div>} */}
       <div className='flex'>
                 <MessageHistory  open={open}/>
        </div>



      <div className="flex flex-col justify-end h-screen">
        <DarkMode open={open} />
        <div className="flex justify-around">
          <a href='https://www.buymeacoffee.com/eyuel' rel="noreferrer" target='_blank' className=" px-4 py-3 flex items-center gap-x-4 w-screen 
    rounded-md cursor-pointer 
    hover:bg-light-white text-base">
            <div className="cursor-pointer duration-300 text-xl">
              <MdOutlineCoffee />
            </div>
            <h1 className={`${!open && "hidden"}`}>Support this project</h1>
          </a>
        </div>
        <div className="nav">
          <a href='https://github.com/EyuCoder/chatgpt-clone' className="px-4 py-3 flex items-center gap-x-4 w-screen 
    rounded-md cursor-pointer 
    hover:bg-light-white text-base">
            <div className="cursor-pointer duration-300 text-xl">
              <MdOutlineQuestionAnswer />
            </div>
            <h1 className={`${!open && "hidden"}`}>Update & FAQ</h1>
          </a>
        </div>
        <StoreButton open={open} />
        <div className="flex justify-around">
          <span className="px-4 py-3 flex items-center gap-x-4 w-screen 
    rounded-md cursor-pointer 
    hover:bg-light-white text-base">
            <div className="cursor-pointer duration-300 text-xl">
              <MdOutlineLogout />
            </div>
            <h1 className={`${!open && "hidden"}`}>Log out</h1>
          </span>
        </div>
      </div>
    </section >
  )
}

export default Sidebar