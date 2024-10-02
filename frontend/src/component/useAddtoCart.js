import axios from "axios";
import { toast } from "react-toastify"; // Ensure you have this library installed
import { useNavigate } from "react-router-dom"; // Adjust based on your routing
import { useDispatch } from "react-redux"; // Adjust if you're using Redux
import { addToCart } from "./cartSlice.js";

function useAddToCart(cart, setCart, userId, accountType) {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  const handleAddToCart = async (product) => {
    const updatedCarts = cart.includes(product._id)
      ? cart.filter((id) => id !== product._id) // Remove from cart
      : [...cart, product._id]; // Add new item to cart
    setCart(updatedCarts); // Update local state
    // Perform the API call to update the cart on the server
    try {
      await axios.put(
        `http://localhost:5000/api/products/updateCart/${userId}`,
        {
          cart: updatedCarts,
        }
      );
      toast.success(
        cart.includes(product._id) ? "Removed from cart" : "Added to cart"
      );
    } catch (error) {
      console.error("Error updating cart", error);
      toast.error("Could not update cart");
      // Optionally reset the cart to the previous state if the update fails
      setCart(cart);
    }

    // Handle user login state and account type
    if (!userId) {
      navigate("/signin");
      return;
    } else if (userId && accountType === "business") {
      toast.warn("This is a business account!");
      return;
    }

    // Dispatch action to add item to cart in Redux store
    dispatch(
      addToCart({
        id: product._id,
        name: product.productName,
        description: product.description,
        price: product.offerPrice,
        image: product.imageUrl,
      })
    );
  };

  return { handleAddToCart }; // Return the function to use in components
}

export default useAddToCart;
