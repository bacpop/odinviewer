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
app.post('/sbml', (req, res) => {
    const graph = convertSBMLtoCytoscape(libsbmlInstance, req.body);
    res.send(graph);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});