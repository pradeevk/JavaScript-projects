const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const eventRoutes = require('./routes/events');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
