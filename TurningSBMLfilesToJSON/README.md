# Conversion of SBML files to graph in a JSON format

## Load SBML files

The SBML files that will be turned to a graph are those located in the SBMLfiles folder.

## Running the server

On shell command, you can run locally the API to convert SBML files to graph using the backend folder. Once in this folder, you can just run the following command:

```sh
npm start
```

## Doing without the local server

A version of this API is being hosted online at https://only-backend-v3.onrender.com.

If you want to use this one instead of the local version you can but the execution will be longer.

## Conversion of the files

Open the `turnSBMLintoJSON.py` file, change the `api_path` variable with the chosen api as specified above and run the script.
You can change the path of input and output files if needed.