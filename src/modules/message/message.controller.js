const Message = require("./message.model");

exports.getMessage = async (req, res) => {
  const result = await Message.find({});
  if (!result) {
    return res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
  res.status(200).json({
    message: "successsfully",
    data: result,
  });
};

exports.createMessage = async (req, res) => {
  console.log(req.body);
  try {
    // Validate input data
    const { fullname, email, title, description } = req.body;
    // if (!fullname || !email || !title || !description) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }

    // Create project object
    const project = new Message({
      fullname,
      email,
      title,
      description,
    });

    // Save project to database
    const data = await project.save();

    // Return success response
    return res.status(200).json({
      message: "Message created successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

exports.getByIdMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Message.findById(id);
    res.status(200).json({
      status: "success",
      message: "succussfully",
      data: message,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Failed to find by id" });
  }
};
exports.openByIdMessage = async (req, res) => {
  try {
    const { isOpen } = req.body;
    const taskId = req.params.id;
    const message = await Message.findByIdAndUpdate(taskId, {
      isOpen,
    });
    res.status(200).json({
      status: "success",
      message: "succussfully",
      data: message,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Failed to open file" });
  }
};

exports.deleteMessage = async (req, res) => {
  const taskId = req.params.id;
  await Message.findByIdAndDelete(taskId);
  res.status(200).json({
    message: "succussfully",
  });
};
