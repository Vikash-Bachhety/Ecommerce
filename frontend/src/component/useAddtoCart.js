import axios from "axios";
import { toast } from "react-toastify"; // Ensure you have this library installed
import { useNavigate } from "react-router-dom"; // Adjust based on your routing
import { useDispatch, useSelector } from "react-redux"; // Adjust if you're using Redux
import { addToCart, removeFromCart } from "./cartSlice.js"; // Ensure removeFromCart is imported

function useAddToCart(cart, setCart, userId) {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate
  const { accountType } = useSelector((state) => state.auth); // Retrieve accountType from Redux state

  const handleAddToCart = async (product) => {
    // Handle user login state and account type
    if (!userId) {
      toast.warn("Please sign in to add products to the cart.");
      navigate("/signin");
      return;
    } else if (accountType === "business") {
      toast.error("Please log in with a user account.");
      return;
    }

    // Check if the product is already in the cart
    const updatedCarts = cart.includes(product._id)
      ? cart.filter((id) => id !== product._id) // Remove from cart
      : [...cart, product._id]; // Add new item to cart

    // Update local state
    setCart(updatedCarts); 

    // Perform the API call to update the cart on the server
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/products/updateCart/${userId}`,
        {
          cart: updatedCarts,
        }
      );

      // Check if the action was a remove or add
      if (cart.includes(product._id)) {
        // Product was removed
        toast.success("Removed from cart");
        
        // Dispatch the remove action to update Redux store
        dispatch(removeFromCart(product._id));
      } else {
        // Product was added
        toast.success("Added to cart");

        // Dispatch the add action to update Redux store
        dispatch(
          addToCart({
            id: product._id,
            name: product.productName,
            description: product.description,
            price: product.actualPrice,
            image: product.imageUrl,
            quantity: 1, // Default quantity when adding to cart
          })
        );
      }
    } catch (error) {
      console.error("Error updating cart", error);
      toast.error("Could not update cart");

      // Optionally reset the cart to the previous state if the update fails
      setCart(cart);
    }
  };

  return { handleAddToCart };
}

export default useAddToCart;
