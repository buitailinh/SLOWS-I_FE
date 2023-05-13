import React, { useState } from 'react';
import Modal from 'react-modal';
import ReplyIcon from '@mui/icons-material/Reply';
import { download } from '../../assets';
import { downloadImage } from '../../utils';
import styled from 'styled-components';


Modal.setAppElement("#root");

function SingleDalle({ _id, prompt, photos}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => prevIndex - 1);
      };
    
      const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => prevIndex + 1);
      };


  return (
    <>
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover"
        onClick={() => handleOpenModal(0)}
    >
    <img
      className="w-full h-auto object-cover rounded-xl cursor-pointer"
      src={photos[0]}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f]  m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-1 flex justify-between items-center gap-2">
      
       
        <button type="button"  className="outline-none bg-transparent border-none text-white">
        <ReplyIcon />
        Share
          </button>
        <button type="button" onClick={() => downloadImage(_id, photos[0])} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>

      </div>
    </div>
  </div>

  <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 bg-gray-800 z-50"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 rounded-md outline-none"
        
      >
        <img src={photos[currentPhotoIndex]} alt={prompt} />
        <div className="mt-10 flex justify-between">
          {currentPhotoIndex > 0 && (
            <button onClick={handlePrevPhoto}>Prev</button>
          )}
          {currentPhotoIndex < photos.length - 1 && (
            <button onClick={handleNextPhoto}>Next</button>
          )}
        </div>
      </Modal>
  </>
  )
}

const Container = styled.div`
.overlay {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    outline: none;
  }
  
  .modal-nav {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  
`

export default SingleDalle