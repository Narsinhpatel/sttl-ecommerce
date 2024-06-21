import {Product} from '../models/product.model.js'
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse}  from "../utils/ApiResponse.js"

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body;

  // Validate required fields
  if ([name, description, image].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

 

  // Create product
  const product = await Product.create({ name, price, description, image });

  // Return response
  return res.status(201).json(
    new ApiResponse(200, product, "Product created successfully")
  );
});


const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(
    new ApiResponse(200, products, "Products retrieved successfully")
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find product by ID
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(200, product, "Product retrieved successfully")
  );
});

export { createProduct, getAllProducts, getProductById };