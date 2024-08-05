api_path = "http://localhost:3000/sbml"
# Can be used with https://only-backend-v3.onrender.com/sbml
# but it will take longer
path_sbml_files = "./SBMLfiles"
output_folder = "../public/models"

import requests
import json
import os

sbml_files = os.listdir(path_sbml_files)
sbml_files = [f for f in sbml_files if f.endswith(".xml")]

for sbml_file in sbml_files:
    print(f"Processing {sbml_file}")
    with open(f"{path_sbml_files}/{sbml_file}", "r") as f:
        sbml = f.read()

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