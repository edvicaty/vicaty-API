const express = require("express");
const router = express.Router();
const {
  viewProjects,
  viewProject,
  createProject,
  editProject,
  deleteProject,
  duplicateProject,
  viewCreatedModel,
  createCreatedModel,
  editCreatedModel,
  deleteCreatedModel,
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
const { isAuth, checkRole, catchErrors } = require("../middlewares");
//projects CRUD
router.get("/", isAuth, viewProjects);
router.get("/project/:projectId", isAuth, viewProject);
router.post("/", isAuth, createProject);
router.put("/project/:projectId", isAuth, editProject);
router.delete("/project/:projectId", isAuth, deleteProject);
//Duplicate project schema
router.post("/duplicateProject/:projectId", isAuth, duplicateProject);
//models CRUD
router.get("/model/:modelId", isAuth, viewCreatedModel);
router.post("/model/:projectId", isAuth, createCreatedModel);
router.put("/model/:modelId", isAuth, editCreatedModel);
router.delete("/model/:modelId", isAuth, deleteCreatedModel);

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
