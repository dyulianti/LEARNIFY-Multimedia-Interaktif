const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
async function readData() {
  try {
    const text = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(text || '{}');
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    return {};
  }
}
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}
app.get('/api/state', async (req, res) => {
  const data = await readData();
  res.json(data);
});
app.post('/api/state', async (req, res) => {
  const body = req.body || {};
  const current = await readData();
  const next = Object.assign({}, current, body);
  await writeData(next);
  res.json({ ok: true });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
