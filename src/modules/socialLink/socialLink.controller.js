const SocialLink = require("./socialLink.model");

exports.getSocialLink = async (req, res) => {
  const result = await SocialLink.find({});
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

exports.createSocialLink = async (req, res) => {
  console.log(req.body);

  try {
    // Validate input data
    const { facebook, instagram, linkedIn, github, twitter } = req.body;
    // if (!fullname || !email || !title || !description) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }

    // Create project object
    const project = new SocialLink({
      facebook,
      instagram,
      linkedIn,
      github,
      twitter,
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

exports.deleteSocialLink = async (req, res) => {
  const taskId = req.params.id;
  await SocialLink.findByIdAndDelete(taskId);
  res.status(200).json({
    message: "succussfully",
  });
};
