const userRepo = require("../repository/user");
const shopRepo = require("../repository/shop");
const productRepo = require("../repository/product");
const cityRepo = require("../repository/city");
const provinceRepo = require("../repository/province");
const feedbackRepo = require("../repository/feedback");
const contactRepo = require("../repository/contact");
const seasonRepo = require("../repository/season");

exports.getOverviewStats = async () => {
  const [
    totalUsers,
    totalShops,
    totalProducts,
    totalCities,
    totalProvinces,
    totalFeedback,
    totalContacts,
    totalSeasons,
  ] = await Promise.all([
    userRepo.countDocument(),
    shopRepo.countDocument(),
    productRepo.countDocument(),
    cityRepo.countDocument(),
    provinceRepo.countDocument(),
    feedbackRepo.countDocument(),
    contactRepo.countDocument(),
    seasonRepo.countDocument(),
  ]);

  return {
    totalUsers,
    totalShops,
    totalProducts,
    totalCities,
    totalProvinces,
    totalFeedback,
    totalContacts,
    totalSeasons,
  };
};
