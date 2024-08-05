api_path = "http://localhost:3000/sbml"
# Can be used with https://only-backend-v3.onrender.com/sbml
# but it will take longer
path_file_names = "../public/models/file_names.txt"
output_folder = "../public/models"

import requests
import json
import os
import urllib.parse

def import_from_Biomodels(id):
    response = requests.get(f"https://www.ebi.ac.uk/biomodels/model/files/{id}.xml")
    response = response.text
    file_main = response.split("<main>")[1].split("</main>")[0]
    file_name = file_main.split("<name>")[1].split("</name>")[0]
    file_name = urllib.parse.quote_plus(file_name)
    response2 = requests.get(f"https://www.ebi.ac.uk/biomodels/model/download/{id}.xml?filename={file_name}")
    return response2.text

sbml_files = open(path_file_names, "r").read().split("\n")

for sbml_file in sbml_files:
    if sbml_file == "":
        continue
    print(f"Processing {sbml_file}")
    
    sbml = import_from_Biomodels(sbml_file)

    try:
        sbml = sbml.encode("utf-8")
        response = requests.post(api_path, data=sbml, headers = {"Content-Type": "application/text"})
        response = json.loads(response.text)
        sbml_name = sbml_file.replace(".xml","")
        save_files = open(f"{output_folder}/{sbml_name}.json", "w")
        save_files.write(json.dumps(response))
        save_files.close()

    except Exception as e:
        print(f"Error: {e}")
        continue