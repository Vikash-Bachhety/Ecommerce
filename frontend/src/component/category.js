import food from "../assets/CategoryImages/food.jpg";
import vehicle from "../assets/CategoryImages/vehicle.jpg";
import electronic from "../assets/CategoryImages/mob.jpg";
import fitness from "../assets/CategoryImages/fitness.jpg";
import cloth from "../assets/CategoryImages/cloth.jpg";
import library from "../assets/CategoryImages/library.jpg";
import tourism from "../assets/CategoryImages/tourism.jpg";
import concert from "../assets/CategoryImages/concert.jpg";
import courier from "../assets/CategoryImages/courier.jpg";
import decor from "../assets/CategoryImages/decor.jpg";
import groceries from "../assets/subcategoryImages/groceries.jpg";
import street from "../assets/subcategoryImages/street.jpg";
import cafes from "../assets/subcategoryImages/cafes.jpg";
import restaurant from "../assets/subcategoryImages/restaurant.jpg";
import accessories from "../assets/subcategoryImages/accessories.jpg";
import jwelry from "../assets/subcategoryImages/jwelry.jpg";
import clothes from "../assets/subcategoryImages/clothes.jpg";
import footwear from "../assets/subcategoryImages/footwear.jpg";
import backries from "../assets/subcategoryImages/backries.jpg";
import spa from "../assets/subcategoryImages/spa.jpg";
import cinema from "../assets/subcategoryImages/cinema.jpg";
import theater from "../assets/subcategoryImages/theater.jpg";
import gym from "../assets/subcategoryImages/gym.jpg";
import yoga from "../assets/subcategoryImages/yoga.jpg";
import festival from "../assets/subcategoryImages/festival.jpg";
import clinic from "../assets/subcategoryImages/clinic.jpg";
import car from "../assets/subcategoryImages/car.jpg";
import bike from "../assets/subcategoryImages/bike.jpg";
import rent from "../assets/subcategoryImages/rent.jpg";
import repair from "../assets/subcategoryImages/repair.jpg";
import laptop from "../assets/subcategoryImages/laptop.jpg";
import mobile from "../assets/subcategoryImages/mobile.jpg";
import gadget from "../assets/subcategoryImages/gadget.jpg";
import adventure from "../assets/subcategoryImages/adventure.jpg";
import agency from "../assets/subcategoryImages/agency.jpg";
import bars from "../assets/subcategoryImages/bars.jpg";
import cleaning from "../assets/subcategoryImages/cleaning.jpg";
import college from "../assets/subcategoryImages/college.jpg";
import decoration from "../assets/subcategoryImages/decoration.jpg";
import furniture from "../assets/subcategoryImages/furniture.jpg";
import appliance from "../assets/subcategoryImages/appliance.jpg";
import gardening from "../assets/subcategoryImages/gardening.jpg";
import hotel from "../assets/subcategoryImages/hotel.jpg";
import libraries from "../assets/subcategoryImages/libraries.jpg";
import school from "../assets/subcategoryImages/school.jpg";
import tourist from "../assets/subcategoryImages/tourist.jpg";
import online from "../assets/subcategoryImages/online.jpg"
import financial from "../assets/subcategoryImages/financial.jpg";
import legal from "../assets/subcategoryImages/legal.jpg";
import event from "../assets/subcategoryImages/event.jpg";
import homerepair from "../assets/subcategoryImages/homerepair.jpg";
import speciality from "../assets/subcategoryImages/speciality.jpg";
import shirt from "../assets/subcategoryImages/shirt.jpg";
import boots from "../assets/subcategoryImages/boots.jpg";
import handbag from "../assets/subcategoryImages/handbag.jpg";
import ring from "../assets/subcategoryImages/ring.jpg";

export const categories = [
  {
    id: 1,
    name: "Fashion",
    description: "Explore the latest trends in fashion, including clothing, footwear, accessories, and jewelry.",
    image: cloth,
    subcategories: [
      {
        id: 1,
        name: "Clothing",
        description: "Discover a wide range of clothing options for men, women, and children.",
        image: clothes,
        products: [
          {
            id: 101,
            productName: "Men's Casual T-Shirt",
            description: "A comfortable casual shirt for men made from high-quality cotton.",
            offerPrice: 650,
            imageUrl: shirt,
          },
        ],
      },
      {
        id: 2,
        name: "Footwear",
        description: "Find the perfect shoes, boots, and sandals for any occasion.",
        image: footwear,
        products: [
          {
            id: 201,
            productName: "Leather Boots",
            description: "Durable leather boots suitable for all weather conditions.",
            offerPrice: 9000,
            imageUrl: boots,
          },
        ],
      },
      {
        id: 3,
        name: "Accessories",
        description: "Complete your look with the best accessories, from bags to belts.",
        image: accessories,
        products: [
          {
            id: 302,
            productName: "Designer Handbag",
            description: "Elegant handbag with ample space and a stylish design.",
            offerPrice: 25000,
            imageUrl: handbag,
          },
        ],
      },
      {
        id: 4,
        name: "Jewelry",
        description: "Explore exquisite jewelry pieces to adorn yourself with style.",
        image: jwelry,
        products: [
          {
            id: 402,
            productName: "Diamond ring",
            description: "Elegant diamond earrings perfect for special occasions.",
            offerPrice: 500000,
            imageUrl: ring,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Food",
    description: "Indulge in a variety of food experiences, from restaurants to street food.",
    image: food,
    subcategories: [
      {
        id: 5,
        name: "Restaurants",
        description: "Dine at the best restaurants offering a variety of cuisines.",
        image: restaurant,
        products: [
          // {
          //   id: 501,
          //   name: "Italian Cuisine",
          //   description: "Enjoy authentic Italian dishes at our partner restaurants.",
          //   price: 50,
          //   image: "/images/food/restaurants/italian.jpg",
          // },
          // {
          //   id: 502,
          //   name: "Sushi Restaurant",
          //   description: "Fresh and delicious sushi made by expert chefs.",
          //   price: 50,
          //   image: "/images/food/restaurants/sushi.jpg",
          // },
        ],
      },
      {
        id: 6,
        name: "Cafes",
        description: "Enjoy a cozy environment with your favorite coffee and snacks.",
        image: cafes,
        products: [
          // {
          //   id: 601,
          //   name: "Coffee Beans",
          //   description: "Premium quality coffee beans for a perfect brew.",
          //   price: 50,
          //   image: "/images/food/cafes/coffeebeans.jpg",
          // },
          // {
          //   id: 602,
          //   name: "Pastry Box",
          //   description: "Assorted pastries for a delightful treat.",
          //   price: 50,
          //   image: "/images/food/cafes/pastries.jpg",
          // },
        ],
      },
      {
        id: 7,
        name: "Street Food",
        description: "Taste the vibrant and flavorful street food from around the city.",
        image: street,
        products: [
          // {
          //   id: 701,
          //   name: "Tacos",
          //   description: "Spicy and flavorful tacos with a variety of fillings.",
          //   price: 50,
          //   image: "/images/food/streetfood/tacos.jpg",
          // },
          // {
          //   id: 702,
          //   name: "Falafel Wrap",
          //   description: "Delicious falafel wrapped in fresh pita bread.",
          //   price: 50,
          //   image: "/images/food/streetfood/falafel.jpg",
          // },
        ],
      },
      {
        id: 8,
        name: "Bakeries",
        description: "Satisfy your sweet tooth with fresh pastries and baked goods.",
        image: backries,
        products: [
          // {
          //   id: 801,
          //   name: "Chocolate Cake",
          //   description: "Rich and moist chocolate cake, perfect for any celebration.",
          //   price: 50,
          //   image: "/images/food/bakeries/chocolatecake.jpg",
          // },
          // {
          //   id: 802,
          //   name: "Croissants",
          //   description: "Flaky and buttery croissants for a delightful breakfast.",
          //   price: 50,
          //   image: "/images/food/bakeries/croissants.jpg",
          // },
        ],
      },
      {
        id: 9,
        name: "Groceries",
        description: "Shop for fresh produce and groceries for your daily needs.",
        image: groceries,
        products: [
          // {
          //   id: 901,
          //   name: "Organic Vegetables",
          //   description: "Fresh and organic vegetables for a healthy diet.",
          //   price: 50,
          //   image: "/images/food/groceries/vegetables.jpg",
          // },
          // {
          //   id: 902,
          //   name: "Whole Grain Bread",
          //   description: "Nutritious whole grain bread for your daily meals.",
          //   price: 50,
          //   image: "/images/food/groceries/bread.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Entertainment",
    description: "Experience the best in entertainment, from movies to live performances.",
    image: concert,
    subcategories: [
      {
        id: 10,
        name: "Cinemas",
        description: "Watch the latest blockbusters in comfortable cinema halls.",
        image: cinema,
        products: [
          // {
          //   id: 1001,
          //   name: "Movie Tickets",
          //   description: "Buy tickets for the latest movies in your area.",
          //   price: 50,
          //   image: "/images/entertainment/cinemas/tickets.jpg",
          // },
          // {
          //   id: 1002,
          //   name: "Popcorn & Snacks",
          //   description: "Enjoy a variety of snacks while watching your movie.",
          //   price: 50,
          //   image: "/images/entertainment/cinemas/popcorn.jpg",
          // },
        ],
      },
      {
        id: 11,
        name: "Theaters",
        description: "Enjoy live theater performances and plays in your city.",
        image: theater,
        products: [
          // {
          //   id: 1101,
          //   name: "Theater Tickets",
          //   description: "Purchase tickets for upcoming theater shows.",
          //   price: 50,
          //   image: theater,
          // },
          // {
          //   id: 1102,
          //   name: "Theater Programs",
          //   description: "Get programs and playbills for theater productions.",
          //   price: 50,
          //   image: "/images/entertainment/theaters/program.jpg",
          // },
        ],
      },
      {
        id: 12,
        name: "Concerts",
        description: "Attend live music concerts featuring your favorite artists.",
        image: concert,
        products: [
          // {
          //   id: 1201,
          //   name: "Concert Tickets",
          //   description: "Buy tickets for upcoming music concerts.",
          //   price: 50,
          //   image: "/images/entertainment/concerts/tickets.jpg",
          // },
          // {
          //   id: 1202,
          //   name: "Merchandise",
          //   description: "Purchase concert merchandise such as T-shirts and posters.",
          //   price: 50,
          //   image: "/images/entertainment/concerts/merchandise.jpg",
          // },
        ],
      },
      {
        id: 13,
        name: "Festivals",
        description: "Join in the celebrations at local cultural and music festivals.",
        image: festival,
        products: [
          // {
          //   id: 1301,
          //   name: "Festival Pass",
          //   description: "Get access to all events and activities at the festival.",
          //   price: 50,
          //   image: "/images/entertainment/festivals/pass.jpg",
          // },
          // {
          //   id: 1302,
          //   name: "Festival Food & Drink",
          //   description: "Enjoy a variety of food and drink options at the festival.",
          //   price: 50,
          //   image: "/images/entertainment/festivals/food.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Health & Fitness",
    description: "Maintain your health and fitness with top-notch facilities and services.",
    image: fitness,
    subcategories: [
      {
        id: 14,
        name: "Gyms",
        description: "Work out at the best gyms with state-of-the-art equipment.",
        image: gym,
        products: [
          // {
          //   id: 1401,
          //   name: "Gym Membership",
          //   description: "Get a membership for unlimited access to gym facilities.",
          //   price: 50,
          //   image: "/images/healthfitness/gyms/membership.jpg",
          // },
          // {
          //   id: 1402,
          //   name: "Personal Training Sessions",
          //   description: "Book personal training sessions with professional trainers.",
          //   price: 50,
          //   image: "/images/healthfitness/gyms/training.jpg",
          // },
        ],
      },
      {
        id: 15,
        name: "Yoga Centers",
        description: "Relax and rejuvenate with professional yoga sessions.",
        image: yoga,
        products: [
          // {
          //   id: 1501,
          //   name: "Yoga Classes",
          //   description: "Join yoga classes for all skill levels.",
          //   price: 50,
          //   image: "/images/healthfitness/yoga/classes.jpg",
          // },
          // {
          //   id: 1502,
          //   name: "Yoga Mats",
          //   description: "Purchase high-quality yoga mats for your practice.",
          //   price: 50,
          //   image: "/images/healthfitness/yoga/mats.jpg",
          // },
        ],
      },
      {
        id: 16,
        name: "Health Clinics",
        description: "Visit top-rated health clinics for all your medical needs.",
        image: clinic,
        products: [
          // {
          //   id: 1601,
          //   name: "General Check-Up",
          //   description: "Schedule a general health check-up at our clinic.",
          //   price: 50,
          //   image: "/images/healthfitness/clinics/checkup.jpg",
          // },
          // {
          //   id: 1602,
          //   name: "Specialist Consultation",
          //   description: "Consult with specialized doctors for specific health issues.",
          //   price: 50,
          //   image: "/images/healthfitness/clinics/consultation.jpg",
          // },
        ],
      },
      {
        id: 17,
        name: "Spas & Salons",
        description: "Pamper yourself with luxurious spa and salon treatments.",
        image: spa,
        products: [
          // {
          //   id: 1701,
          //   name: "Spa Packages",
          //   description: "Enjoy relaxing spa packages for a full rejuvenation experience.",
          //   price: 50,
          //   image: "/images/healthfitness/spasalons/spapackage.jpg",
          // },
          // {
          //   id: 1702,
          //   name: "Haircuts & Styling",
          //   description: "Book appointments for professional haircuts and styling.",
          //   price: 50,
          //   image: spa,
          // },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Vehicles",
    description: "Find the best vehicles and services for your transportation needs.",
    image: vehicle,
    subcategories: [
      {
        id: 18,
        name: "Car Dealerships",
        description: "Explore a wide range of cars at the best dealerships.",
        image: car,
        products: [
          // {
          //   id: 1801,
          //   name: "Sedan",
          //   description: "A stylish and comfortable sedan suitable for family use.",
          //   price: 50,
          //   image: "/images/vehicles/cardealerships/sedan.jpg",
          // },
          // {
          //   id: 1802,
          //   name: "SUV",
          //   description: "Spacious SUV perfect for off-road adventures.",
          //   price: 50,
          //   image: "/images/vehicles/cardealerships/suv.jpg",
          // },
        ],
      },
      {
        id: 19,
        name: "Bike Dealerships",
        description: "Find the perfect bike for your rides.",
        image: bike,
        products: [
          // {
          //   id: 1901,
          //   name: "Mountain Bike",
          //   description: "Durable mountain bike for rugged terrain.",
          //   price: 50,
          // },
          // {
          //   id: 1902,
          //   name: "Road Bike",
          //   description: "Lightweight road bike designed for speed and efficiency.",
          //   price: 50,
          //   image: "/images/vehicles/bikedealerships/roadbike.jpg",
          // },
        ],
      },
      {
        id: 20,
        name: "Rental Services",
        description: "Rent vehicles for short-term or long-term use.",
        image: rent,
        products: [
          // {
          //   id: 2001,
          //   name: "Car Rental",
          //   description: "Rent a car for a day or longer with flexible options.",
          //   price: 50,
          //   image: "/images/vehicles/rentals/carrental.jpg",
          // },
          // {
          //   id: 2002,
          //   name: "Bike Rental",
          //   description: "Rent a bike for short-term use.",
          //   price: 50,
          //   image: "/images/vehicles/rentals/bikerental.jpg",
          // },
        ],
      },
      {
        id: 21,
        name: "Repair Shops",
        description: "Get your vehicle serviced at top repair shops.",
        image: repair,
        products: [
          // {
          //   id: 2101,
          //   name: "Oil Change",
          //   description: "Get your vehicle's oil changed by professionals.",
          //   price: 50,
          //   image: repair,
          // },
          // {
          //   id: 2102,
          //   name: "Tire Replacement",
          //   description: "Replace worn-out tires with new ones.",
          //   price: 50,
          //   image: "/images/vehicles/repairshops/tirereplacement.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Electronics",
    description: "Discover the latest electronics and gadgets for your home and office.",
    image: electronic,
    subcategories: [
      {
        id: 22,
        name: "Mobile Phones",
        description: "Find the latest smartphones and accessories.",
        image: mobile,
        products: [
          // {
          //   id: 2201,
          //   name: "Smartphone A",
          //   description: "Latest model with high performance and features.",
          //   price: 50,
          //   image: "/images/electronics/mobilephones/smartphonea.jpg",
          // },
          // {
          //   id: 2202,
          //   name: "Smartphone B",
          //   description: "Affordable smartphone with essential features.",
          //   price: 50,
          //   image: "/images/electronics/mobilephones/smartphoneb.jpg",
          // },
        ],
      },
      {
        id: 23,
        name: "Laptops & Computers",
        description: "Shop for the best laptops and computers.",
        image: laptop,
        products: [
          // {
          //   id: 2301,
          //   name: "Laptop Pro",
          //   description: "High-performance laptop for professionals.",
          //   price: 50,
          //   image: "/images/electronics/laptops/laptoppro.jpg",
          // },
          // {
          //   id: 2302,
          //   name: "Desktop PC",
          //   description: "Reliable desktop computer for home or office use.",
          //   price: 50,
          //   image: "/images/electronics/laptops/desktop.jpg",
          // },
        ],
      },
      {
        id: 24,
        name: "Home Appliances",
        description: "Upgrade your home with the latest appliances.",
        image: appliance,
        products: [
          // {
          //   id: 2401,
          //   name: "Smart Refrigerator",
          //   description: "Refrigerator with advanced features and connectivity.",
          //   price: 50,
          //   image: "/images/electronics/homeappliances/refrigerator.jpg",
          // },
          // {
          //   id: 2402,
          //   name: "Washing Machine",
          //   description: "High-efficiency washing machine with multiple settings.",
          //   price: 50,
          //   image: "/images/electronics/homeappliances/washingmachine.jpg",
          // },
        ],
      },
      {
        id: 25,
        name: "Gadgets",
        description: "Explore innovative gadgets and tech accessories.",
        image: gadget,
        products: [
          // {
          //   id: 2501,
          //   name: "Wireless Earbuds",
          //   description: "Compact and high-quality wireless earbuds.",
          //   price: 50,
          //   image: "/images/electronics/gadgets/earbuds.jpg",
          // },
          // {
          //   id: 2502,
          //   name: "Smartwatch",
          //   description: "Feature-rich smartwatch with fitness tracking.",
          //   price: 50,
          //   image: "/images/electronics/gadgets/smartwatch.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Home & Living",
    description: "Enhance your home with quality furniture, decor, and services.",
    image: decor,
    subcategories: [
      {
        id: 26,
        name: "Furniture",
        description: "Discover stylish and comfortable furniture for your home.",
        image: furniture,
        products: [
          // {
          //   id: 2601,
          //   name: "Sofa",
          //   description: "Comfortable sofa for your living room.",
          //   price: 50,
          //   image: "/images/homeliving/furniture/sofa.jpg",
          // },
          // {
          //   id: 2602,
          //   name: "Dining Table",
          //   description: "Elegant dining table for family meals.",
          //   price: 50,
          //   image: "/images/homeliving/furniture/diningtable.jpg",
          // },
        ],
      },
      {
        id: 27,
        name: "Home Decor",
        description: "Beautify your space with unique and trendy decor.",
        image: decoration,
        products: [
          // {
          //   id: 2701,
          //   name: "Wall Art",
          //   description: "Artistic wall decor to enhance your walls.",
          //   price: 50,
          //   image: "/images/homeliving/homedecor/wallart.jpg",
          // },
          // {
          //   id: 2702,
          //   name: "Decorative Vases",
          //   description: "Stylish vases to complement your decor.",
          //   price: 50,
          //   image: "/images/homeliving/homedecor/vases.jpg",
          // },
        ],
      },
      {
        id: 28,
        name: "Gardening",
        description: "Get everything you need for your garden.",
        image: gardening,
        products: [
          // {
          //   id: 2801,
          //   name: "Garden Tools Set",
          //   description: "Complete set of tools for garden maintenance.",
          //   price: 50,
          //   image: "/images/homeliving/gardening/tools.jpg",
          // },
          // {
          //   id: 2802,
          //   name: "Flower Pots",
          //   description: "Decorative flower pots for your plants.",
          //   price: 50,
          //   image: "/images/homeliving/gardening/pots.jpg",
          // },
        ],
      },
      {
        id: 29,
        name: "Cleaning Services",
        description: "Keep your home spotless with professional cleaning services.",
        image: cleaning,
        products: [
          // {
          //   id: 2901,
          //   name: "Basic Cleaning Service",
          //   description: "Standard cleaning for your home.",
          //   price: 50,
          //   image: "/images/homeliving/cleaningservices/basic.jpg",
          // },
          // {
          //   id: 2902,
          //   name: "Deep Cleaning Service",
          //   description: "Thorough cleaning for a spotless home.",
          //   price: 50,
          //   image: "/images/homeliving/cleaningservices/deep.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Travel & Leisure",
    description: "Plan your next adventure with the best travel and leisure services.",
    image: tourism,
    subcategories: [
      {
        id: 30,
        name: "Hotels",
        description: "Stay in the best hotels during your travels.",
        image: hotel,
        products: [
          // {
          //   id: 3001,
          //   name: "Luxury Hotel Room",
          //   description: "Stay in a luxury room with premium amenities.",
          //   price: 50,
          //   image: "/images/travelleisure/hotels/luxuryroom.jpg",
          // },
          // {
          //   id: 3002,
          //   name: "Standard Hotel Room",
          //   description: "Comfortable standard room for a pleasant stay.",
          //   price: 50,
          //   image: "/images/travelleisure/hotels/standardroom.jpg",
          // },
        ],
      },
      {
        id: 31,
        name: "Travel Agencies",
        description: "Book your trips with trusted travel agencies.",
        image: agency,
        products: [
          // {
          //   id: 3101,
          //   name: agency,
          //   description: "Comprehensive vacation packages including flights and accommodations.",
          //   price: 50,
          //   image: "/images/travelleisure/travelagencies/package.jpg",
          // },
          // {
          //   id: 3102,
          //   name: "Travel Insurance",
          //   description: "Get travel insurance for peace of mind during your trips.",
          //   price: 50,
          //   image: "/images/travelleisure/travelagencies/insurance.jpg",
          // },
        ],
      },
      {
        id: 32,
        name: "Tourist Attractions",
        description: "Visit must-see tourist spots in your destination.",
        image: tourist,
        products: [
          // {
          //   id: 3201,
          //   name: "Museum Tickets",
          //   description: "Tickets to major museums and cultural sites.",
          //   price: 50,
          //   image: "/images/travelleisure/touristattractions/museum.jpg",
          // },
          // {
          //   id: 3202,
          //   name: "Guided Tours",
          //   description: "Book guided tours to explore popular attractions.",
          //   price: 50,
          //   image: "/images/travelleisure/touristattractions/tour.jpg",
          // },
        ],
      },
      {
        id: 33,
        name: "Adventure Sports",
        description: "Experience thrilling adventure sports during your vacation.",
        image: adventure,
        products: [
          // {
          //   id: 3301,
          //   name: "Skydiving",
          //   description: "Experience the thrill of skydiving with professional instructors.",
          //   price: 50,
          //   image: "/images/travelleisure/adventuresports/skydiving.jpg",
          // },
          // {
          //   id: 3302,
          //   name: "Scuba Diving",
          //   description: "Explore underwater life with guided scuba diving trips.",
          //   price: 50,
          //   image: "/images/travelleisure/adventuresports/scubadiving.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Education",
    description: "Access quality educational institutions and resources.",
    image: library,
    subcategories: [
      {
        id: 34,
        name: "Schools",
        description: "Find top schools for quality education.",
        image: school,
        products: [
          // {
          //   id: 3401,
          //   name: "Enrollment Package",
          //   description: "Complete enrollment package for new students.",
          //   price: 50,
          //   image: "/images/education/schools/enrollment.jpg",
          // },
          // {
          //   id: 3402,
          //   name: "Uniforms",
          //   description: "Purchase school uniforms for students.",
          //   price: 50,
          //   image: "/images/education/schools/uniforms.jpg",
          // },
        ],
      },
      {
        id: 35,
        name: "Colleges",
        description: "Explore colleges offering diverse courses and programs.",
        image: college,
        products: [
          // {
          //   id: 3501,
          //   name: "Course Materials",
          //   description: "Buy textbooks and materials for college courses.",
          //   price: 50,
          //   image: college,
          // },
          // {
          //   id: 3502,
          //   name: "Tuition Fees",
          //   description: "Pay tuition fees for college enrollment.",
          //   price: 50,
          //   image: "/images/education/colleges/tuition.jpg",
          // },
        ],
      },
      {
        id: 36,
        name: "Online Courses",
        description: "Access a variety of online courses for flexible learning.",
        image: online,
        products: [
          // {
          //   id: 3601,
          //   name: "Coding Bootcamp",
          //   description: "Intensive coding bootcamp for aspiring developers.",
          //   price: 50,
          //   image: "/images/education/onlinecourses/coding.jpg",
          // },
          // {
          //   id: 3602,
          //   name: "Language Learning",
          //   description: "Online language learning courses for different languages.",
          //   price: 50,
          //   image: "/images/education/onlinecourses/language.jpg",
          // },
        ],
      },
      {
        id: 37,
        name: "Libraries",
        description: "Explore library resources and memberships.",
        image: libraries,
        products: [
          // {
          //   id: 3701,
          //   name: "Library Membership",
          //   description: "Annual membership for library access and borrowing privileges.",
          //   price: 50,
          //   image: "/images/education/libraries/membership.jpg",
          // },
          // {
          //   id: 3702,
          //   name: "Book Purchase",
          //   description: "Buy popular books and literature from the library store.",
          //   price: 50,
          //   image: "/images/education/libraries/book.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Food & Beverages",
    description: "Savor a wide range of food and beverage options.",
    image: food,
    subcategories: [
      {
        id: 38,
        name: "Restaurants",
        description: "Enjoy dining at the finest restaurants.",
        image: restaurant,
        products: [
          // {
          //   id: 3801,
          //   name: "Dinner for Two",
          //   description: "A special dinner package for two at a high-end restaurant.",
          //   price: 50,
          //   image: "/images/foodbeverages/restaurants/dinner.jpg",
          // },
          // {
          //   id: 3802,
          //   name: "Lunch Special",
          //   description: "Affordable lunch special at a local eatery.",
          //   price: 50,
          //   image: "/images/foodbeverages/restaurants/lunch.jpg",
          // },
        ],
      },
      {
        id: 39,
        name: "Cafes",
        description: "Relax and enjoy coffee and snacks at cozy cafes.",
        image: cafes,
        products: [
          // {
          //   id: 3901,
          //   name: "Coffee & Pastries",
          //   description: "A combo of coffee and pastries at your favorite café.",
          //   price: 50,
          //   image: "/images/foodbeverages/cafes/coffee.jpg",
          // },
          // {
          //   id: 3902,
          //   name: "Specialty Tea",
          //   description: "Premium specialty teas for a relaxing experience.",
          //   price: 50,
          //   image: "/images/foodbeverages/cafes/tea.jpg",
          // },
        ],
      },
      {
        id: 40,
        name: "Bars",
        description: "Enjoy a variety of drinks at local bars.",
        image: bars,
        products: [
          // {
          //   id: 4001,
          //   name: "Cocktail Mixes",
          //   description: "Selection of cocktail mixes for your next party.",
          //   price: 50,
          //   image: "/images/foodbeverages/bars/cocktails.jpg",
          // },
          // {
          //   id: 4002,
          //   name: "Craft Beer",
          //   description: "Buy craft beers from local breweries.",
          //   price: 50,
          //   image: "/images/foodbeverages/bars/beer.jpg",
          // },
        ],
      },
      {
        id: 41,
        name: "Specialty Foods",
        description: "Discover gourmet and specialty food items.",
        image: speciality,
        products: [
          // {
          //   id: 4101,
          //   name: "Artisanal Cheese",
          //   description: "Selection of high-quality artisanal cheeses.",
          //   price: 50,
          //   image: "/images/foodbeverages/specialtyfoods/cheese.jpg",
          // },
          // {
          //   id: 4102,
          //   name: "Organic Snacks",
          //   description: "Healthy organic snacks for any occasion.",
          //   price: 50,
          //   image: "/images/foodbeverages/specialtyfoods/snacks.jpg",
          // },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Services",
    description: "Find a range of essential and professional services.",
    image: courier,
    subcategories: [
      {
        id: 42,
        name: "Home Repairs",
        description: "Professional repair services for your home.",
        image: homerepair,
        products: [
          // {
          //   id: 4201,
          //   name: "Plumbing Services",
          //   description: "Expert plumbing services for leaks, installations, and repairs.",
          //   price: 50,
          //   image: "/images/services/homerepairs/plumbing.jpg",
          // },
          // {
          //   id: 4202,
          //   name: "Electrical Repairs",
          //   description: "Qualified electricians for all your electrical needs.",
          //   price: 50,
          //   image: "/images/services/homerepairs/electrical.jpg",
          // },
        ],
      },
      {
        id: 43,
        name: "Legal Services",
        description: "Get professional legal assistance and advice.",
        image: legal,
        products: [
          // {
          //   id: 4301,
          //   name: "Legal Consultation",
          //   description: "Consult with experienced lawyers for legal advice.",
          //   price: 50,
          //   image: "/images/services/legalservices/consultation.jpg",
          // },
          // {
          //   id: 4302,
          //   name: "Document Preparation",
          //   description: "Get assistance with preparing legal documents.",
          //   price: 50,
          //   image: "/images/services/legalservices/documents.jpg",
          // },
        ],
      },
      {
        id: 44,
        name: "Financial Services",
        description: "Manage your finances with expert financial services.",
        image: financial,
        products: [
          // {
          //   id: 4401,
          //   name: "Financial Planning",
          //   description: "Comprehensive financial planning services.",
          //   price: 50,
          //   image: "/images/services/financialservices/planning.jpg",
          // },
          // {
          //   id: 4402,
          //   name: "Tax Preparation",
          //   description: "Professional tax preparation and filing services.",
          //   price: 50,
          //   image: "/images/services/financialservices/tax.jpg",
          // },
        ],
      },
      {
        id: 45,
        name: "Event Planning",
        description: "Plan and organize events with professional help.",
        image: event,
        products: [
          // {
          //   id: 4501,
          //   name: "Event Coordination",
          //   description: "Full event coordination services for weddings, parties, and more.",
          //   price: 50,
          //   image: "/images/services/eventplanning/coordination.jpg",
          // },
          // {
          //   id: 4502,
          //   name: "Event Rentals",
          //   description: "Rent equipment and decorations for your event.",
          //   price: 50,
          //   image: "/images/services/eventplanning/rentals.jpg",
          // },
        ],
      },
    ],
  },
];
