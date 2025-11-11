const productRepo = require("../repository/product");
const AppError = require("../util/app-errors");
const provinceRepo = require("../repository/province");
const Fuse = require("fuse.js");

exports.searchProducts = async (filters = {}) => {
  const match = {};

  if (filters.province) {
    const provinces = await provinceRepo.findAll({}, "name _id");
    const fuse = new Fuse(provinces, { keys: ["name"], threshold: 0.4 });
    const result = fuse.search(filters.province.trim());
    if (result.length > 0) {
      const matchedProvince = result[0].item;
      match.province = matchedProvince._id;
    }
  }

  if (filters.trending) {
    const fuseTrending = new Fuse(
      [
        "trending",
        "trend",
        "tranding",
        "trnding",
        "trindng",
        "trinding",
        "trand",
        "trandng",
        "treanding",
        "treding",
        "trendng",
      ],
      { threshold: 0.6, distance: 100 }
    );
    const resultTrending = fuseTrending.search(
      filters.trending.toLowerCase().trim()
    );
    if (resultTrending.length > 0) match.trending = true;
  }

  if (filters.price) match.price = Number(filters.price);

  let products = await productRepo.findWithFilters(match);

  if (filters.province) {
    products = products.filter((p) =>
      new RegExp(filters.province, "i").test(p.province?.name)
    );
  }

  return products;
};

exports.createProduct = async (data) => {
  if (!data || Object.keys(data).length === 0) {
    throw new AppError("Product data is required", 400);
  }
  return await productRepo.create(data);
};
exports.getAllProducts = async (isAdmin = false, page, limit) => {
  if (isAdmin) {
    const skip = (page - 1) * limit;
    const totalProducts = await productRepo.countDocument();

    const products = await productRepo
      .findAllAdmin()
      .skip(skip)
      .limit(limit)
      .populate({
        path: "shop",
        select: "name contact address city ",
        populate: {
          path: "city",
          select: "name province ",
          populate: {
            path: "province",
            select: "name -_id",
          },
        },
      })
      .populate("province", "name");

    return {
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    };
  }

  const products = await productRepo.findAll().populate({
    path: "shop",
    select: "name contact address city -_id",
    populate: {
      path: "city",
      select: "name province -_id",
      populate: {
        path: "province",
        select: "name -_id",
      },
    },
  });

  if (!products.length) throw new AppError("No products found", 404);

  return { products };
};

exports.getProductById = async (id) => {
  const product = await productRepo.findById(id);
  if (!product) throw new AppError(`No product found with ID: ${id}`, 404);
  return product;
};

exports.updateProduct = async (id, updates) => {
  const updatedProduct = await productRepo.updateById(id, updates);
  if (!updatedProduct)
    throw new AppError(`No product found with ID: ${id}`, 404);
  return updatedProduct;
};

exports.deleteProduct = async (id) => {
  const deletedProduct = await productRepo.deleteById(id);
  if (!deletedProduct)
    throw new AppError(`No product found with ID: ${id}`, 404);
  return deletedProduct;
};
