import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function Card({ title, image, price , id , rate}) {
    let navigate = useNavigate();

    return (
        <>
            <div>
                <div className='bg-white drop-shadow-xl rounded-lg overflow-hidden h-96'>
                    <Link to={`/product/${id}`}>
                        <img src={image} className=' w-full h-full cursor-pointer'/>
                    </Link>
                </div>
                <div className='p-3 relative'>
                    <Link to={`/product/${id}`}>
                        <h2 className='font-bold text-lg cursor-pointer'>{title}</h2>
                    </Link>
                    <div>
                        <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                        <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                        <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                        <FontAwesomeIcon icon={faStar} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                        <FontAwesomeIcon icon={faStarHalf} className='text-sm pl-1 text-yellow-300 cursor-pointer'/>
                        <span className="font-bold">{rate}/</span><span>5</span>
                    </div>
                    <p className='font-bold text-lg'>${price}</p>
                    <FontAwesomeIcon icon={faCartShopping} className='text-sky-400 cursor-pointer text-xl hover:text-yellow-300 transition-all hover:scale-110 duration-300' title='Add To Cart'/>
                    <FontAwesomeIcon icon={faHeart}  className='absolute top-6 right-5 text-2xl hover:text-red-600 cursor-pointer' title='Add To Favorites'/>
                </div>
            </div>
        </>
    );
}



export default Card;