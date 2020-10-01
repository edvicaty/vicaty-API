const Project = require("../models/Project");
const { CreatedModel, createdModelSchema } = require("../models/CreatedModel");

//Projects APIs ------------------------------------------------------------------------------------
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
//Models APIs ------------------------------------------------------------------------------------

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

//Elements APIs ------------------------------------------------------------------------------------

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

//Data APIs ------------------------------------------------------------------------------------

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
