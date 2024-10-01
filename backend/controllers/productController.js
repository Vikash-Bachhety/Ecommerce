const BusinessCard = require('../models/businessCard');
const User = require('../models/user.js')

exports.getItemsByCategoryAndSubcategory = async (req, res) => {
    const { category, subcategory } = req.params;

    try {
        if (!category || !subcategory) {
            return res.status(400).send({ message: 'Category and subcategory are required' });
        }

        // Find the category with the specified ID
        const categorySearch = await BusinessCard.find({ 
            'category': category,
            'subcategory': subcategory
        }).populate('products'); // Ensure products are populated

        if (!category) {
            return res.status(404).send({ message: 'No items found for this category and subcategory' });
        }

        // Find the specific subcategory within the category
        const subcategorySearch = categorySearch.subcategory.find(sub => sub.name === subcategory);
        
        if (!subcategorySearch) {
            return res.status(404).send({ message: 'Subcategory not found' });
        }

        res.send(categorySearch.products);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};


exports.getTopDeals = async (req, res) => {
    try {
        const products = await BusinessCard.find();
        res.send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Find the BusinessCard that contains the product
      const businessCard = await BusinessCard.findOne({ 'products._id': productId });
  
      if (!businessCard) {
        return res.status(404).send({ message: 'Product not found' });
      }
  
      // Extract the product from the BusinessCard
      const product = businessCard.products.id(productId);
  
      if (!product) {
        return res.status(404).send({ message: 'Product not found in BusinessCard' });
      }
  
      res.send(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send({ message: 'Server error' });
    }
  };

  exports.getProductList = async (req, res) => {
    const { category, subcategory } = req.params;
  
    try {
      // Fetch all business cards with the given category and subcategory
      const businessCards = await BusinessCard.find({ category, subcategory });
  
      if (businessCards && businessCards.length > 0) {
        // Collect all products from each business card
        const allProducts = businessCards.reduce((acc, card) => {
          return acc.concat(card.products);
        }, []);
  
        if (allProducts.length > 0) {
          res.status(200).send(allProducts); // Send back the aggregated products array
        } else {
          res.status(404).send({ message: 'No products found' });
        }
      } else {
        res.status(404).send({ message: 'No matching categories or subcategories found' });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
exports.updateFavorites = async (req, res) => {
    const { userId } = req.params;
    const { favorites } = req.body; 
    console.log(req.body)
    console.log(req.params)

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { favorites }, 
            { new: true } 
        );
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};

exports.updateCart = async (req, res) => {
  const { userId } = req.params;
  const { cart } = req.body; 
  console.log(req.body)
  console.log(req.params)

  try {
      const user = await User.findByIdAndUpdate(
          userId,
          { cart }, 
          { new: true } 
      );
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }
      res.send(user.cart);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};
