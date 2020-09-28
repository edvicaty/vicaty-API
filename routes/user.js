const express = require("express");
const router = express.Router();
const {
  getAllElements,
  getElement,
  createElement,
  deleteElement,
  addSingle,
  updateSingle,
  deleteSingleData,
  viewAllProjects,
  getProject,
  getCreatedModel,
} = require("../controllers/user");

//Created Models elements (API endpoints to be delivered)
router.post("/project", viewAllProjects);
router.post("/project/:projectId", getProject);
router.post("/createdModel/:modelId", getCreatedModel);
router.post("/element/getAll/:modelId/", getAllElements);

router.post("/element/getSingle/:modelId/:elementName", getElement);
router.post("/element/create/:modelId", createElement);
router.post("/element/delete/:modelId/:elementName", deleteElement);
router.post("/element/addSingle/:modelId/:elementName", addSingle);
router.put("/element/updateSingle/:modelId/:elementName/:dataId", updateSingle);
router.post(
  "/element/deleteSingle/:modelId/:elementName/:dataId",
  deleteSingleData
);

module.exports = router;
