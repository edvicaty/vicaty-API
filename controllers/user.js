const Project = require("../models/Project");
const { CreatedModel, createdModelSchema } = require("../models/CreatedModel");
// const User = require("../models/User");

//projects
// exports.viewProjects = async (req, res) => {
//   const projects = await Project.find({ user: req.user._id });
//   res.status(200).json(projects);
// };
// exports.viewProject = async (req, res) => {
//   const { projectId } = req.params;
//   const project = await Project.find({ _id: projectId, user: req.user._id })
//     .populate("user")
//     .populate("createdModels");
//   res.status(200).json(project);
// };
// exports.createProject = async (req, res) => {
//   const { projectName } = req.body;
//   const newProject = await Project.create({
//     user: req.user._id,
//     projectName,
//     createdModels: [],
//   });
//   const user = await User.findOne({ _id: req.user._id });
//   user.projects.push(newProject);
//   user.save();
//   res.status(201).json(newProject);
// };
// exports.editProject = async (req, res) => {
//   const { projectId } = req.params;
//   const { projectName } = req.body;
//   const updatedProject = await Project.findByIdAndUpdate(
//     projectId,
//     {
//       projectName,
//     },
//     { new: true }
//   );
//   res.status(200).json(updatedProject);
// };
// exports.deleteProject = async (req, res) => {
//   const { projectId } = req.params;
//   const project = await Project.findById(projectId);
//   if (req.user._id.toString() === project.user.toString()) {
//     await Project.findByIdAndDelete(projectId);
//     return res.status(200).json({ message: "deleted" });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "unauthorized, https://http.cat/401" });
//   }
// };
// //duplicateProject
// exports.duplicateProject = async (req, res) => {
//   const { projectId } = req.params;
//   const { projectName } = req.body;
//   const originalProject = await Project.findById(projectId).populate(
//     "createdModels"
//   );
//   if (req.user._id.toString() === originalProject.user.toString()) {
//     //creating new project
//     const newProject = await Project.create({
//       user: req.user._id,
//       projectName,
//       createdModels: [],
//     });
//     const user = await User.findOne({ _id: req.user._id });
//     user.projects.push(newProject);
//     user.save();
//     //model multiplication loop
//     for (let i = 0; i < originalProject.createdModels.length; i++) {
//       const user = req.user._id;
//       const project = newProject._id;
//       const createdModelName =
//         originalProject.createdModels[i].createdModelName;
//       const description = originalProject.createdModels[i].description;
//       const elements = originalProject.createdModels[i].elements;

//       const newModel = await CreatedModel.create({
//         user,
//         project,
//         createdModelName,
//         elements,
//         description,
//       });

//       newModel.api = {
//         viewAllProjects: {
//           reqType: "POST",
//           route: `/project`,
//           body: "userId : <your user Id>",
//         },
//         getProject: {
//           reqType: "POST",
//           route: `/project/${newProject._id}`,
//           body: "userId : <your user Id>",
//         },
//         getCreatedModel: {
//           reqType: "POST",
//           route: `/createdModel/${newModel._id}`,
//           body: "userId : <your user Id>",
//         },
//         getAllElements: {
//           reqType: "POST",
//           route: `/element/getAll/${newModel._id}`,
//           body: "userId : <your user Id>",
//         },
//         getElement: {
//           reqType: "POST",
//           route: `/element/getSingle/${newModel._id}/<elementName>`,
//           body: "userId : <your user Id>",
//         },
//         createElement: {
//           reqType: "POST",
//           route: `/element/create/${newModel._id}`,
//           body:
//             "userId : <your user Id> || elementName: <your new element Name>",
//         },
//         deleteElement: {
//           reqType: "POST",
//           route: `/element/delete/${newModel._id}/<elementName>`,
//           body: "userId : <your user Id>",
//         },
//         addSingleData: {
//           reqType: "POST",
//           route: `/element/addSingle/${newModel._id}/<elementName>`,
//           body: "userId : <your user Id> || value: <your data value>",
//         },
//         updateSingleData: {
//           reqType: "POST",
//           route: `/element/updateSingle/${newModel._id}/<elementName>/<dataId>`,
//           body: "userId : <your user Id> || value: <your new data value>",
//         },
//         deleteSingleData: {
//           reqType: "POST",
//           route: `/element/deleteSingle/${newModel._id}/<elementName>/<dataId>`,
//           body: "userId : <your user Id>",
//         },
//       };
//       newModel.save();
//       await newProject.createdModels.push(newModel._id);
//       await newProject.save();
//     }
//     return res.status(201).json(newProject);
//   } else {
//     return res
//       .status(401)
//       .json({ message: "unauthorized, https://http.cat/401" });
//   }
// };

// //models
// exports.viewCreatedModel = async (req, res) => {
//   const { modelId } = req.params;
//   const createdModel = await CreatedModel.findById(modelId);
//   res.status(200).json(createdModel);
// };
// exports.createCreatedModel = async (req, res) => {
//   const { projectId } = req.params;
//   const { createdModelName, description } = req.body;
//   const project = await Project.findOne({ _id: projectId });
//   const newModel = await CreatedModel.create({
//     user: req.user._id,
//     project: project._id,
//     createdModelName,
//     elements: [],
//     description,
//   });
//   newModel.api = {
//     viewAllProjects: {
//       reqType: "POST",
//       route: `/project`,
//       body: "userId : <your user Id>",
//     },
//     getProject: {
//       reqType: "POST",
//       route: `/project/${projectId}`,
//       body: "userId : <your user Id>",
//     },
//     getCreatedModel: {
//       reqType: "POST",
//       route: `/createdModel/${newModel._id}`,
//       body: "userId : <your user Id>",
//     },
//     getAllElements: {
//       reqType: "POST",
//       route: `/element/getAll/${newModel._id}`,
//       body: "userId : <your user Id>",
//     },
//     getElement: {
//       reqType: "POST",
//       route: `/element/getSingle/${newModel._id}/<elementName>`,
//       body: "userId : <your user Id>",
//     },
//     createElement: {
//       reqType: "POST",
//       route: `/element/create/${newModel._id}`,
//       body: "userId : <your user Id> || elementName: <your new element Name>",
//     },
//     deleteElement: {
//       reqType: "POST",
//       route: `/element/delete/${newModel._id}/<elementName>`,
//       body: "userId : <your user Id>",
//     },
//     addSingleData: {
//       reqType: "POST",
//       route: `/element/addSingle/${newModel._id}/<elementName>`,
//       body: "userId : <your user Id> || value: <your data value>",
//     },
//     updateSingleData: {
//       reqType: "POST",
//       route: `/element/updateSingle/${newModel._id}/<elementName>/<dataId>`,
//       body: "userId : <your user Id> || value: <your new data value>",
//     },
//     deleteSingleData: {
//       reqType: "POST",
//       route: `/element/deleteSingle/${newModel._id}/<elementName>/<dataId>`,
//       body: "userId : <your user Id>",
//     },
//   };
//   newModel.save();
//   await project.createdModels.push(newModel._id);
//   await project.save();
//   res.status(201).json(newModel);
// };
// exports.editCreatedModel = async (req, res) => {
//   const { modelId } = req.params;
//   const { createdModelName, description } = req.body;
//   const updatedModel = await CreatedModel.findByIdAndUpdate(
//     modelId,
//     {
//       createdModelName,
//       description,
//     },
//     { new: true }
//   );
//   res.status(200).json(updatedModel);
// };
// exports.deleteCreatedModel = async (req, res) => {
//   const { modelId } = req.params;
//   const model = await CreatedModel.findById(modelId);
//   if (req.user._id.toString() === model.user.toString()) {
//     await CreatedModel.findByIdAndDelete(modelId);
//     return res.status(200).json({ message: "deleted" });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "unauthorized, https://http.cat/401" });
//   }
// };

//elements inside CreatedModel
//userId sent through body for validation
///////////////////////////////// API endpoints controllers ///////////////////////////

exports.viewAllProjects = async (req, res) => {
  const { userId } = req.body;

  const projects = await Project.find({ user: userId }).populate(
    "createdModels"
  );

  if (!projects[0]) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  res.status(200).json(projects);
};

exports.getProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  const project = await Project.find({ _id: projectId, user: userId }).populate(
    "createdModels"
  );
  if (!project[0]) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  res.status(200).json(project);
};

exports.getCreatedModel = async (req, res) => {
  const { modelId } = req.params;
  const { userId } = req.body;

  const createdModel = await CreatedModel.findOne({
    _id: modelId,
    user: userId,
  });
  if (!createdModel) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  res.status(200).json(createdModel);
};

//GETALL elements
exports.getAllElements = async (req, res) => {
  const { modelId } = req.params;
  const { userId } = req.body;

  const model = await CreatedModel.findOne({ _id: modelId });
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }
  res.status(200).json(model.elements);
};
//get element
exports.getElement = async (req, res) => {
  const { modelId, elementName } = req.params;
  const { userId } = req.body;
  const model = await CreatedModel.findOne({ _id: modelId });
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }

  const index = model.elements.findIndex((element) => {
    if (element[`${elementName}`]) {
      return element;
    }
  });

  const element = model.elements[index];

  res.status(200).json(element);
};
//create element
exports.createElement = async (req, res) => {
  const { modelId } = req.params;
  const { userId, elementName } = req.body;

  const model = await CreatedModel.findOne({ _id: modelId });
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }
  let repeated = false;
  await model.elements.forEach((element) => {
    if (element[`${elementName}`]) {
      repeated = true;
    }
  });
  if (repeated) {
    return res.status(409).json({
      message: `There is an element with that same name, please pick a different name`,
    });
  }
  let element = {};
  element[elementName] = {
    data: [],
  };
  model.elements.push(element);
  model.save();
  res.status(201).json(model);
};

//delete element
exports.deleteElement = async (req, res) => {
  const { modelId, elementName } = req.params;
  const { userId } = req.body;
  const model = await CreatedModel.findOne({
    _id: modelId,
  });
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }
  if (!model) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }

  const index = model.elements.findIndex((element) => {
    if (element[`${elementName}`]) {
      return element;
    }
  });
  model.elements.splice(index, 1);
  model.markModified(`elements`);
  if (!model.elements) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  model.save();
  res.status(200).json(model.elements);
};
/////// ADD SINGLE /////////////
exports.addSingle = async (req, res) => {
  const { modelId, elementName } = req.params;
  const { userId, value } = req.body;
  const model = await CreatedModel.findOne({
    _id: modelId,
  });
  if (!model) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }

  const index = model.elements.findIndex((element) => {
    if (element[`${elementName}`]) {
      return element;
    }
  });
  let lastId = 0;

  if (model.elements[`${index}`][`${elementName}`][`data`].length >= 1) {
    let lastIndex =
      model.elements[`${index}`][`${elementName}`][`data`].length - 1;
    lastId = model.elements[`${index}`][`${elementName}`][`data`][lastIndex].id;
  }

  model.elements[`${index}`][`${elementName}`][`data`].push({
    id: lastId + 1,
    value: value,
  });
  model.markModified(`elements`);
  if (!model.elements[`${index}`]) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  model.save();
  res.status(200).json(model.elements[`${index}`]);
};
/////// UPDATE SINGLE /////////////
exports.updateSingle = async (req, res) => {
  const { modelId, elementName, dataId } = req.params;
  const { userId, value } = req.body;
  const model = await CreatedModel.findOne({
    _id: modelId,
  });
  if (!model) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }

  const elementIndex = model.elements.findIndex((element) => {
    if (element[`${elementName}`]) {
      return element;
    }
  });

  const dataIndex = model.elements[`${elementIndex}`][`${elementName}`][
    `data`
  ].findIndex((data) => {
    if (data.id == dataId) {
      return data;
    }
  });

  model.elements[`${elementIndex}`][`${elementName}`][`data`][
    dataIndex
  ].value = value;
  model.markModified(`elements`);
  if (!model.elements[`${elementIndex}`]) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  model.save();
  res.status(200).json(model.elements[`${elementIndex}`]);
};

/////// DELETE SINGLE /////////////
exports.deleteSingleData = async (req, res) => {
  const { modelId, elementName, dataId } = req.params;
  const { userId } = req.body;
  const model = await CreatedModel.findOne({
    _id: modelId,
  });
  if (!model) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  if (model.user != userId) {
    return res
      .status(401)
      .json({ message: "unauthorized, https://http.cat/401" });
  }

  const elementIndex = model.elements.findIndex((element) => {
    if (element[`${elementName}`]) {
      return element;
    }
  });

  const dataIndex = model.elements[`${elementIndex}`][`${elementName}`][
    `data`
  ].findIndex((data) => {
    if (data.id == dataId) {
      return data;
    }
  });
  model.elements[`${elementIndex}`][`${elementName}`][`data`].splice(
    dataIndex,
    1
  );

  model.markModified(`elements`);
  if (!model.elements[`${elementIndex}`]) {
    return res.status(404).json({ message: "Not found, https://http.cat/404" });
  }
  model.save();
  res.status(200).json(model.elements[`${elementIndex}`]);
};
