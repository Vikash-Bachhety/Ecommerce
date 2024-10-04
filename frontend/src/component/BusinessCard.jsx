import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { categories } from "./category.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statesAndCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Naharlagun"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Korba", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Kullu", "Manali"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Dharwad"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha"],
  "Nagaland": ["Kohima", "Dimapur", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
  "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  "Sikkim": ["Gangtok", "Namchi", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Khammam", "Nizamabad"],
  "Tripura": ["Agartala", "Udaipur", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
  "West Bengal": ["Kolkata", "Siliguri", "Durgapur", "Asansol"]
};

const BusinessCard = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      state: "",
      city: "",
      address: "",
      shop: "",
      category: "",
      subcategory: "",
      productName: "",
      imageUrl: "",
      actualPrice: "",
      offerPrice: "",
      brand: "",
      description: "",
    },
  });

  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const selectedState = watch("state");
  const selectedCategory = watch("category");

  useEffect(() => {
    if (selectedState) {
      setCityOptions(statesAndCities[selectedState] || []);
    } else {
      setCityOptions([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCategory) {
      const selectedCat = categories.find(
        (cat) => cat.name === selectedCategory
      );
      setSubcategoryOptions(selectedCat ? selectedCat.subcategories : []);
    } else {
      setSubcategoryOptions([]);
    }
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/businesscards/add`,
        {
          category: data.category,
          subcategory: data.subcategory,
          products: [
            {
              productName: data.productName,
              imageUrl: data.imageUrl,
              actualPrice: Number(data.actualPrice),
              offerPrice: Number(data.offerPrice),
              state: data.state,
              city: data.city,
              address: data.address,
              shop: data.shop,
              brand: data.brand,
              description: data.description,
            },
          ],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Product successfully added");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="bg-slate-200 p-6 sm:p-10 w-full">
      <div className="bg-white rounded-md w-full sm:w-2/3 container mx-auto p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-rose-400 text-center mb-6 sm:mb-8">
          Product Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block mb-2">State</label>
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <select {...field} className="w-full p-2 sm:p-3 border rounded">
                    <option value="">Select State</option>
                    {Object.keys(statesAndCities).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">City</label>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-2 sm:p-3 border rounded"
                    disabled={!selectedState}
                  >
                    <option value="">Select City</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">Shop Address</label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    type="text"
                    className="w-full p-2 sm:p-3 border rounded resize-none"
                    placeholder="Enter Shop Address"
                  />
                )}
              />
            </div>

            <div>
              <label className="block mb-2">Shop Name</label>
              <Controller
                name="shop"
                control={control}
                rules={{ required: "Shop Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 sm:p-3 border rounded"
                    placeholder="Enter Shop Name"
                  />
                )}
              />
              {errors.shop && (
                <p className="text-red-500 text-sm">{errors.shop.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">Category</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <select {...field} className="w-full p-2 sm:p-3 border rounded">
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Subcategory</label>
              <Controller
                name="subcategory"
                control={control}
                rules={{ required: "Subcategory is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-2 sm:p-3 border rounded"
                    disabled={!selectedCategory}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategoryOptions.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.subcategory && (
                <p className="text-red-500 text-sm">
                  {errors.subcategory.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Product Name</label>
              <Controller
                name="productName"
                control={control}
                rules={{ required: "Product Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 sm:p-3 border rounded"
                    placeholder="Enter Product Name"
                  />
                )}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">
                  {errors.productName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Image URL</label>
              <Controller
                name="imageUrl"
                control={control}
                rules={{
                  required: "Image URL is required",
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: "Must be a valid URL",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 sm:p-3 border rounded"
                    placeholder="Enter Image URL"
                  />
                )}
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Actual Price</label>
              <Controller
                name="actualPrice"
                control={control}
                rules={{
                  required: "Actual Price is required",
                  min: {
                    value: 0,
                    message: "Price must be a positive number",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full p-2 sm:p-3 border rounded"
                    placeholder="Enter Actual Price"
                  />
                )}
              />
              {errors.actualPrice && (
                <p className="text-red-500 text-sm">
                  {errors.actualPrice.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Offer Price</label>
              <Controller
                name="offerPrice"
                control={control}
                rules={{
                  required: "Offer Price is required",
                  min: {
                    value: 0,
                    message: "Price must be a positive number",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full p-2 sm:p-3 border rounded"
                    placeholder="Enter Offer Price"
                  />
                )}
              />
              {errors.offerPrice && (
                <p className="text-red-500 text-sm">
                  {errors.offerPrice.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Brand</label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 sm:p-3 border rounded"
                    placeholder="Enter Brand"
                  />
                )}
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full p-2 sm:p-3 border rounded resize-none"
                    placeholder="Enter Product Description"
                  />
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full sm:w-1/3 bg-primary hover:bg-primary-dark text-white py-2 sm:py-3 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default BusinessCard;