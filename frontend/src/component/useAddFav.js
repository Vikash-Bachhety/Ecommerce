import axios from "axios";
import { toast } from "react-toastify"; // Ensure this is installed

function useAddFav(favorites, setFavorites, userId) {

  const handleFav = async (dealId) => {
    // Determine if we're adding or removing the item
    const isFavoriting = !favorites.includes(dealId);
    const updatedFavorites = isFavoriting
      ? [...favorites, dealId] // Add to favorites
      : favorites.filter((id) => id !== dealId); // Remove from favorites

    // Optimistically update the local favorites state
    setFavorites(updatedFavorites);

    // Perform the API call to update the favorites on the server
    try {
      await axios.put(
        `https://omnimart.up.railway.app/api/products/updateFavorites/${userId}`,
        { favorites: updatedFavorites }
      );

      // Show a toast message based on the action
      toast.success(isFavoriting ? "Added to favorites" : "Removed from favorites");
    } catch (error) {
      console.error("Error updating favorites", error);
      toast.error("Could not update favorites");

      // Revert to the previous favorites state in case of failure
      setFavorites(favorites);
    }
  };

  return { handleFav };
}

export default useAddFav;
