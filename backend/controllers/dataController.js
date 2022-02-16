const asyncHandler = require("express-async-handler");
//desc getallData
//route /api/data
// access private/(public before auth)
const getDatas = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "getdata" });
});
//desc create data
//route /api/data
// access private/(public before auth)
const setData = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }

  res.status(200).json({ meassage: "data set" });
});
//desc update data
//route /api/data:id
// access private/(public before auth)
const updateData = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `update data ${req.params.id}` });
});
//desc delete data
//route /api/data/:id
// access private/(public before auth)
const deleteData = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `data ${req.params.id} deleted` });
});

module.exports = {
  getDatas,
  setData,
  updateData,
  deleteData,
};
