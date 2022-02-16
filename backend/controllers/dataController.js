const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const { options } = require("../routes/dataRoutes");

//desc getallData
//route /api/data
// access private/(public before auth)
const getDatas = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//desc create data
//route /api/data
// access private/(public before auth)
const setData = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

//desc update data
//route /api/data:id
// access private/(public before auth)
const updateData = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("data not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//desc delete data
//route /api/data/:id
// access private/(public before auth)
const deleteData = asyncHandler(async (req, res) => {
  await Goal.findByIdAndRemove(req.params.id);
  res.status(200).json({ msg: `data ${req.params.id} deleted` });
});

module.exports = {
  getDatas,
  setData,
  updateData,
  deleteData,
};
