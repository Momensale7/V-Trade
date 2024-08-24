import { useSelector } from "react-redux";
import Card from "../Components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";


function Favorites(){
    const favorites = useSelector((state) => state.favorites.favoriteProducts);
    const favoritesNumber = favorites.length;


    // return (
    //     <div className="container mx-auto my-8 px-4">
    //         {favorites.length < 1 ? (
    //             <div className="flex flex-col items-center justify-center w-full h-[50vh] bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg shadow-lg">
    //                 <p className="text-white font-extrabold text-4xl mb-4">
    //                     No Favorite Products
    //                 </p>
    //             </div> 
    //         ) : (
    //             <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
    //                 {favorites.map((favorite) => (
    //                     <div key={favorite.id}>
    //                         <Card 
    //                             image={favorite.images[1]}
    //                             title={favorite.title}
    //                             price={favorite.price}
    //                             id={favorite.id}
    //                             rate={favorite.ratingsAverage}
    //                             currentProduct={favorite}
    //                         />
    //                     </div>
    //                 ))}
    //             </div>
    //         )}
    //     </div>
    // );

    return(
        <>
        
        <div className="customContainer my-10">
            <h1 className="text-3xl my-7 dark:text-white">My Favorites</h1>
            {favorites.length < 1 ? <div className="text-center w-full font-extrabold text-3xl font-mono text-indigo-400 py-28">No Favorite Products</div> : 
                <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-x-8 gap-y-8">
                {favorites.map((favorite) => (
                    <Card 
                        key={favorite.id}
                        image={favorite.images[1]}
                        title={favorite.title}
                        price={favorite.price}
                        id={favorite.id}
                        rate={favorite.ratingsAverage}
                        currentProduct={favorite}
                        />
                    ))}
            </div>}
                    </div>
        </>
    )

}

export default Favorites;