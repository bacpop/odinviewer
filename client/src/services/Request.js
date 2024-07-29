export default async function TurnSBMLtoCytoscape(sbml_file) {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/text',
        },
        body: sbml_file
    };
  
    try {
        const response = await fetch("http://localhost:3000/sbml", settings);
    
        // Ensure the response is successful (e.g., status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response data
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for handling by the caller
    }
}