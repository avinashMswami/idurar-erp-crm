const mongoose = require('mongoose');
const Model = mongoose.model('Invoice');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateInvoiceSummary = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Invoice ID is required' });
  }

  try {
    const invoice = await Model.findById(id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const itemNotes = invoice.items
      .filter((item) => item.note && item.note.trim() !== '')
      .map((item) => `- ${item.itemName}: ${item.note}`)
      .join('\n');

    if (!itemNotes) {
      return res.status(400).json({ success: false, message: 'No notes available to summarize.' });
    }

    const prompt = `Summarize the following notes from an invoice in a professional and concise way:\n${itemNotes}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const summaryText = result.response.text().trim();

    invoice.noteSummary = summaryText;
    await invoice.save();

    return res.status(200).json({
      success: true,
      result: summaryText,
      message: 'Invoice note summary generated successfully.',
    });
  } catch (error) {
    console.error('[Invoice Summary Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = generateInvoiceSummary;