import React from 'react';
import useDarkMode from './hooks/useDarkMode';
import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

function DarkMode(props) {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <div className="flex justify-around">
      <span className="px-4 py-3 flex items-center gap-x-4 w-screen 
    rounded-md cursor-pointer 
    hover:bg-light-white text-base" onClick={handleMode}>
        {darkTheme ? (
          <>
            <div className="cursor-pointer duration-300 text-xl">
              <MdOutlineWbSunny />
            </div>
            <h1 className={`${!props.open && "hidden"}`}>Light mode</h1>
          </>
        ) : (
          <>
            <div className="cursor-pointer duration-300 text-xl">
              <MdOutlineNightlight />
            </div>
            <h1 className={`${!props.open && "hidden"}`}>Night mode</h1>
          </>
        )}

      </span>
    </div>
  )
}

export default DarkMode