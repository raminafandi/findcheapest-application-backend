module.exports = function paginatedResults(model) {
  return async (req, res, next) => {
    const search = req.query.search;
    const price = req.query.price;

    console.log(search,price);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let query = {};

    if (search) {
      query["$or"] = [
        { name: { $regex: `.*${search}*.`, $options: "i" } },
        { description: { $regex: `.*${search}*.`, $options: "i" } },
      ];
    }

    if (price) {
      query["$and"] = [{ price: { $lte: `${price}` } }];
    }

    const results = {};

    if (endIndex < (await model.countDocuments(query).exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find(query)
        .sort({ price: 1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
