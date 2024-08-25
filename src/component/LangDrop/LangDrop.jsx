/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../redux/Slicers/langSlicer';
import { useEffect, useState } from 'react';

export default function LangDrop() {
  const [currentLang, setCurrentLang] = useState('');
  const myLang = useSelector((state) => state.langSlicer.language);
  const dispatch = useDispatch();
  const handleLangChange = (lang) => {
    dispatch(changeLang(lang));
    setCurrentLang(lang);
    localStorage.setItem('language', lang);  
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      dispatch(changeLang(storedLang));  
      setCurrentLang(storedLang);        
    } else {
      setCurrentLang(myLang);          
    }
  }, [myLang, dispatch]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[transparent] px-3 py-2 text-sm font-semibold  shadow-sm ">
          <span className="text-white">
            <i className="fa-solid fa-globe"></i> {currentLang}
          </span>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="py-1">
          <MenuItem>
            <span
              onClick={() => handleLangChange('en')}
              className="block cursor-pointer px-9 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              EN
            </span>
          </MenuItem>
          <MenuItem>
            <span
              onClick={() => handleLangChange('ar')}
              className="block cursor-pointer px-9 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              AR
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
