import ContentData from "./contentData.model.js";

// Get content by slug
export const getContent = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await ContentData.findOne({ slug });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create or update content
export const updateContent = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content } = req.body;

    const updatedContent = await ContentData.findOneAndUpdate(
      { slug },
      { content },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({
      success: true,
      data: updatedContent,
      message: "Content updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
