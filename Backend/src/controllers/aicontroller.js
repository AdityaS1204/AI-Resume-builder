const puppeteer = require("puppeteer");
const MarkdownIt = require('markdown-it');
const aiService = require("../Services/aiServices");

module.exports.getResume = async (req, res) => {
  const cleanedData = req.body.cleanedData;
  console.log("cleanedData", cleanedData);
  console.log("req.body", req.body);
  
  if (!cleanedData) {
    return res.status(400).send("User info required");
  }

  const response = await aiService(cleanedData);
  if (!response) {
    return res.status(500).send("Error generating resume");
  }
  console.log("response", response);
  res.send(response);
};

module.exports.getResumePDF = async (req, res) => {
  const { markdownContent } = req.body;

  if (!markdownContent) {
    return res.status(400).send({ error: "Markdown content is required." });
  }

  try {
    const md = new MarkdownIt();
    const html = md.render(markdownContent);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send({ error: "Failed to generate PDF." });
  }
}