const {Tour} = require('../models');

const createTour = async (tourData) => {
  // if (!tourData.userId) {
  //   throw new Error('User ID is required to create a tour');
  // }

  if (!tourData.status) tourData.status = 'active';

  const newTour = await Tour.create(tourData);
  return newTour;
};

const getAllTours = async (req, res) => {
  const { search = "", page = 1, limit = 5, sort="price" ,order="desc"} = req.query;
  console.log(req.query)

  let sortedData = sort;
  const pages = parseInt(page) || 1;
  const limits = parseInt(limit) || 10;
  const skips = (pages - 1) * limit;
  sortedData+=order;
  console.log(sortedData);

  const filter = {};
  if(search){
    filter.eventName = {$regex:search,$options:'i'}
  }

  let sortBy = {};
  if (sort) {
    // const [key,order]=sortedData.split(" ");
    sortBy[sort] = (order ==='desc') ? -1:1;
  }
  console.log(filter);

  const tours = await Tour.aggregate([
    { $sort: sortBy },
    { $match: filter},
    { $skip: skips, },
    { $limit: limits, },
    { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userDetails" } },
    { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "users", let: { name: "$name", email: "$email" },
        pipeline: [{
          $match: {
            $expr: {
              $and: [{ $eq: ["$name", "$$name"] },
              { $eq: ["$email", "$$email"] }]
            }
          }
        }], as: "UserData"
      }
    },
    { $unwind: { path: "$UserData", preserveNullAndEmptyArrays: true } },
  ]);
  tours.meta = {
    pages, limit, skips,sortBy
  }
  return tours
};

const getTourById = async (id) => {
  const tour = await Tour.findById(id);
  return tour;
};

const updateTour = async (id, updatedData) => {
  const tour = await Tour.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return tour;
};

const deleteTour = async (id) => {
  const tour = await Tour.findByIdAndDelete(id);
  return tour;
};

module.exports = {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
};
