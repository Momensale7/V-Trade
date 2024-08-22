import { useSelector } from "react-redux";
import Card from "../Components/card";


function Favorites(){
    const favorites = useSelector((state) => state.favorites.favoriteProducts);
    const favoritesNumber = favorites.length;
    return(
        <>
            {favorites.length < 1 ? <div className="text-center w-full font-extrabold text-3xl font-mono bg-indigo-400 py-28">No Favorite Products</div> : 
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
            
        </>
    )
}

export default Favorites;