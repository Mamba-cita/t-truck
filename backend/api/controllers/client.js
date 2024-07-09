import Transport from "../models/Transport.js";
import ProductStat from "../models/ProductStat.js";
import Customer from "../models/Customers.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers2 = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.status(200).json(transports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getTransports = async (req, res) => {
  try {
    // Destructure query parameters with default values
    const { page = 1, pageSize = 20, sort = "{}", search = "" } = req.query;

    // Function to generate sorting format
    const generateSort = () => {
      if (sort) {
        const sortParsed = JSON.parse(sort);
        return {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };
      }
      return {};
    };

    // Generate sort format
    const sortFormatted = generateSort();

    // Query transports based on search criteria, sorting, pagination
    const transports = await Transport.find({
      $or: [
        { cargo_rate: { $regex: new RegExp(search, "i") } },
        { customer_id: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip((parseInt(page) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize));

    // Count total documents matching the search criteria
    const total = await Transport.countDocuments({
      $or: [
        { cargo_rate: { $regex: new RegExp(search, "i") } },
        { truck: { $regex: new RegExp(search, "i") } },
      ],
    });

    // Send response with transports and total count
    res.status(200).json({
      transports,
      total,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


    

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
