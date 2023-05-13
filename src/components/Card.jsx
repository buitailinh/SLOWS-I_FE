import React from 'react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, user, prompt, photos }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photos}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {user.avatar ? (
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              <img src={user.avatar} alt="prompt" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{user.username[0]}</div>
          )
          }
          <div>
          <p className="text-white text-sm">{user.firstName} {user.lastName}</p>
          <p className="text-white text-[10px]">@{user.username}</p>
         
          </div>
        </div>
        <div className='w-[40%] flex items-center justify-between'>
        <button type="button"  className="outline-none bg-transparent border-none text-white">
        <FavoriteOutlined  sx={{ color:'white'}}/>   luot thich
          </button>
        <button type="button" onClick={() => downloadImage(_id, photos[0])} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;