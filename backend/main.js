const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const libsbml = require('libsbmljs_stable');
const { convertSBMLtoCytoscape } = require('./sbml-to-cytoscape');

const app = express();
app.use(express.text({ type: '*/*', limit: '10mb' }));
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.text());

const libsbmlInstance = libsbml();

// Adapt your Express route
app.post('/sbml', (req, res) => {  // Update route for Netlify Functions
    const graph = convertSBMLtoCytoscape(libsbmlInstance, req.body);
    res.send(graph);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});