import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // Ensure this is installed

function useAddFav(favorites, setFavorites, userId) {
  const { accountType } = useSelector((state) => state.auth);
  
  const handleFav = async (dealId) => {
    if (!userId) {
      toast.warn("Please sign in to add products to the cart.");
      navigate("/signin");
      return;
    } else if (accountType === "business") {
      toast.error("Please log in with a user account.");
      return;
    }
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
        `${REACT_APP_API_BASE_URL}/api/products/updateFavorites/${userId}`,
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
