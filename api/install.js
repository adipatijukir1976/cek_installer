const fetch = require('node-fetch');

const GITHUB_REPO = "adipatijukir1976/cek_installer";
const GITHUB_FILE = "installs.json";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`;

    // 1. Get current content
    const getResponse = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const data = await getResponse.json();
    const content = Buffer.from(data.content, 'base64').toString();
    const json = JSON.parse(content);
    const newTotal = json.total + 1;

    // 2. Update with new total
    const updatedContent = Buffer.from(
      JSON.stringify({ total: newTotal }, null, 2)
    ).toString('base64');

    const updateResponse = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: "Update total installs",
        content: updatedContent,
        sha: data.sha,
      }),
    });

    const result = await updateResponse.json();
    res.status(200).json({ message: "Updated", total: newTotal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating install count" });
  }
};
