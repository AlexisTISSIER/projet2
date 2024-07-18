const chatbotService = require('../../services/chatbotService');

exports.postMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await chatbotService.processMessage(message);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};