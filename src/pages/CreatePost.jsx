import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { dalleRoute, dallePostRoute} from '../utils/APIRoutes'
import { AppContext } from '../utils/context';
import Notification from '../utils/Notification';
import formatFile from '../utils/formatFile';
import FloatingButton from '../components/post/FloatingButton';

const CreatePost = () => {
  const navigate = useNavigate();
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(undefined);
  const { info, auth} = useContext(AppContext)
  const [form, setForm] = useState({
    prompt: '',
    quantity: 1,
    photos: [],
  });

  useEffect(() => {
      if (!localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)) {
        navigate("/login");
      }
    }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(dalleRoute, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
            numb: Number(form.quantity)
          }),
        });

        // const data = await response.json();
        const data = await response.json();
        let image = data.photos.map((photo) => `data:image/jpeg;base64,${photo}`)
        setForm({ ...form, photos: image });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setShowNotification(true)
      setTimeout(()=>setShowNotification(false), 1000);
      // return <Notification message='Please provide proper prompt' type='warning' />
      // alert('Please provide proper prompt');
    
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photos && selectedPhoto !== undefined ) {
      setLoading(true);
      const file = formatFile(form.photos[selectedPhoto]);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prompt', form.prompt);
      try {
        const response = await fetch(dallePostRoute, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)}`,
          },
          body: formData,
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="h-screen mx-auto overflow-y-auto bg-cover bg-no-repeat bg-center bg-fixed" style={{ backgroundImage: "url('../../bgHeader2.jpg')" }}>
      <div className='p-20 pb-5'>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Search for the photos you want</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[450px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="max-w-6xl mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className='max-w-3xl mx-64'>
          <FormField
            labelName="The content of the photo you think"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

        <div  className='flex flex-row mt-4'>
          <div className= "basis-3/4">
          <FormField
            labelName="Number of photos"
            type="number"
            name="quantity"
            placeholder="1"
            min = "1"
            max = "4"
            value={form.quantity}
            handleChange={handleChange}
            
          />
          </div>

          <div className=" mt-10 mx-7 gap-5 basis-1/4">
          <button
            type="button"
            onClick={generateImage}
            className="flex text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-10 py-2 text-center"
          >
            <img src="https://img.icons8.com/cute-clipart/64/null/search-more.png" className='w-[1.5rem] h-[1.5rem] mr-2 text-white' />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 mr-2 text-white'>
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> */}
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        </div>
        </div>


         <div className='flex flex-wrap justify-center'>
            { form.photos.length ? (
              form.photos.map((item, index)=>
              <div className={`relative 
              ${
                selectedPhoto === index ? "border-4 border-solid border-purple-600 m-1" : ""
              }
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 grow-0 justify-center items-center`}>
                        <img
                          src={item}
                          alt={form.prompt}
                          onClick={() => setSelectedPhoto(index)}
                          className="w-full h-full object-contain"
                         />
              </div>
            )
            ) : (
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 m-auto"
              />
              </div>
            )}
          </div>

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader text='Searching...' />
              </div>
            )}
          </div>
    

       

        <div className="mt-10">
          <div className=' flex justify-center'>
          <button
            type="submit"
            className='flex mt-3 text-slate-800 bg-[#F5DEB3] font-medium rounded-md text-sm w-auto sm:w-auto px-5 py-2.5 text-center'
            style={{ flexShrink: 0 }}
          >
             <img src="https://img.icons8.com/fluency/48/null/cloud-file.png" className='w-[1.2rem] h-[1.2rem]' />
             {loading ? 'Save ...' : 'Save to cloud'}
          </button>

          <FloatingButton  content={form.prompt} photo={form.photos[selectedPhoto]}/>
          </div>
          <p className="mt-2  text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
        </div>
      </form>
      {showNotification && <Notification message='Please provide proper prompt!' type='warning' />}
    </section>
  );
};

export default CreatePost;