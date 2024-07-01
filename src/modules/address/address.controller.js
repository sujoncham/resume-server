const Address = require("./address.model");

exports.getAddress = async (req, res) => {
  const result = await Address.find({}).populate("user");
  if (!result) {
    return res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successsfully",
    data: result,
  });
};

exports.createAddress = async (req, res) => {
  console.log(req.body);
  try {
    // Validate input data
    const { permanentAdd, temporaryAdd, user } = req.body;

    // Create project object
    const project = new Address({
      permanentAdd,
      temporaryAdd,
      user,
    });

    // Save project to database
    const data = await project.save();

    // Return success response
    return res.status(200).json({
      message: "Project created successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

exports.getByIdAddress = async (req, res) => {
  const id = req.params.id;
  await Project.findById(id);
  res.status(200).json({
    status: "success",
    message: "succussfully",
  });
};

exports.deleteAddress = async (req, res) => {
  const projectId = req.params.id;
  await Address.findByIdAndDelete(projectId);
  res.status(200).json({
    message: "succussfully",
  });
};
