const Skills = require("./skills.model");

exports.getSkills = async (req, res) => {
  const result = await Skills.find({});
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

exports.createSkills = async (req, res) => {
  try {
    // Validate input data
    const { title, technologies } = req.body;
    if (!title || !technologies) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create project object
    const project = new Skills({
      title,
      technologies,
    });

    // Save project to database
    const data = await project.save();

    // Return success response
    return res.status(200).json({
      message: "Project created successfully",
      projectId: data._id,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

exports.getByIdSkills = (req, res) => {
  res.status(200).json({
    message: "succussfully",
  });
};

exports.deleteSkills = (req, res) => {
  res.status(200).json({
    message: "succussfully",
  });
};
