# Conversion of SBML files to graph in a JSON format

The conversion from SBML to graph is made using [Syblars](https://github.com/iVis-at-Bilkent/syblars/blob/main) (Copyright (c) 2021 i-Vis at Bilkent).

## Loading SBML files

The SBML files to be converted are listed in the `file_names.txt` file in the **public/models** folder. Make sure all files are listed in `file_names.txt`.

## Running the server

On shell command, you can run locally the API to convert SBML files to graph using the **backend** folder. Once in this folder, you can just run the following command:

```sh
npm install & npm start
```

By doing this, the server will start and a python script will run to make the conversion. When the conversion is done, this message will appear in your shell: `All files have been converted into JSON`. When this message appears, you can press **CTRL + C** to exit.