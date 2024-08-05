# odinviewer

## Running this tool locally

You can run this website locally with the following commands:

```sh
npm install & npm run dev
npm install & npm run build & npm run preview
```

## Adding models on the website

All models are imported manually on the website to be displayed. 

To add a new model on the website, you need several files:
- A JavaScript file to describe the ODEs of the model
- A JSON file to get a graph of the model computed from the SBML file describing the model

### Exporting an Odin model into JavaScript

To get the JavaScript file of the model, you should use [SBMLtoOdin](https://github.com/bacpop/SBMLtoOdin) and export the resulting odin model into a JavaScript file using the following commands:

```R
# install.packages("odin")
library(odin)
# install.packages("odin.js")
library(odin.js)
# install.packages("devtools")
library(devtools)
library(stringr)

load_all() # loads functions from SBMLtoOdin package

id <- "BIOMD0000000002" # change with the id of the model you want

output_file <- paste("../",id, ".R", sep = "")
importSBMLfromBioModels(id,output_file)

js_code <- odin::odin_js_bundle(output_file)
code <- js_code$model$code
code[1] <- paste("export",code[1])
splited_code <- str_split_1(code[1]," ")
splited_code[3] <- "model"
code[1] <- paste(splited_code, collapse = " ")
output_file <- paste("./models/",id, ".js", sep = "")
writeLines(code, con = output_file)
```

The JavaScript file should deposited into the public/models folder.
You should also add the name of the model you just added to `file_names.txt` in the same folder.

### Turning SBML files to JSON for the graph construction

You should first upload the SBML file corresponding to the model you wish to add in the TurningSBMLfilesToJSON/SBMLfiles folder.

You can do this by reading the README file in the TurningSBMLfilesToJSON folder.