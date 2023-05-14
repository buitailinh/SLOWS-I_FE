import React,{ useState, useRef  } from 'react';
import PostForm from './PostForm';
import Notification from '../../utils/Notification';

function FloatingButton({ content, photo}) {
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);

    function handleClick() {
        if(!photo){
            setShowNotification(true)
            setTimeout(()=>setShowNotification(false), 1000);
            }
        else{
            setShowForm((prevState) => !prevState);
        }
    }

    function handleBlur(event) {
        if (formRef.current && !formRef.current.contains(event.target)) {
          setShowForm(false);
        }
      }
      
  

    return (
      <div className=" ml-2">
         <button 
            type='button'
            className="flex mt-3 mr-2 text-slate-800 bg-[#00FF00] font-medium rounded-md text-sm w-auto sm:w-auto px-5 py-2.5 text-center"
            style={{ flexShrink: 0 }} onClick={handleClick}
          >
            <img src="https://img.icons8.com/fluency/48/null/share-rounded.png" className='w-[1.2rem] h-[1.2rem]'/>
           Share with everyone
          </button>
        {showForm && <PostForm onClose={() => setShowForm(false)} ref={formRef} content={content} photo={photo} />}
        {showNotification && <Notification message='Please selecte a photo!' type='warning' />}
      </div>
    );
  
}

export default FloatingButton