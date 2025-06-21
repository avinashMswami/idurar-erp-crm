const mongoose = require("mongoose");

const Model = mongoose.model('Query');

const paginatedList = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { status, sortBy = 'created', sortValue = -1 } = req.query;


  const filter = {
    ...(status && { status }), // spreading and short-circuting
  };

  try {
    const resultsPromise = Model.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortValue }) 
      .exec();

    const countPromise = Model.countDocuments(filter);

    const [result, count] = await Promise.all([resultsPromise, countPromise]);

    const pages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      result,
      pagination: { page, pages, count },
      message: count > 0 ? "Fetched Successfully" : "No data found!",
    });
  } catch (error) {
    console.error("Error in paginatedList:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = paginatedList;