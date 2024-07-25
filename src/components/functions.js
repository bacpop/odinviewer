// This function is used to compute the width of a text given a font size and a font family
export function getTextWidth(font_size, font_family, text = "G") {  
    const inputText = text; 
    const font = font_size + "px " + font_family; 
    
    const canvas = document.createElement("canvas"); 
    const context = canvas.getContext("2d"); 
    if (context) {
        context.font = font; 
    }
    else {
        return 0;
    }
    
    const width = context?.measureText(inputText).width; 
    return width;
}
export async function convertSbmlToImage(xml) { 
  
    const layoutOptions = {
      name: "fcose",
      randomize: true,
      padding: 30,
      nodeDimensionsIncludeLabels: true,
    };
    const imageOptions = {
      format: "png",
      background: "transparent",
      width: 1280,
      height: 720,
    };
  
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      body: xml + JSON.stringify({layoutOptions, imageOptions})
    };
  
    // We send the SBML to the server to get an image of the graph
    // https://github.com/iVis-at-Bilkent/syblars
    try {
      const response = await fetch("http://syblars.cs.bilkent.edu.tr/sbml", settings);
      const result = await response.json();
  
      if (response.ok) {
        const layoutInfo = result["image"]; 
        return layoutInfo;
      } else {
        console.error("Error fetching SBGN:", result); 
      }
  
    } catch (error) {
      console.error("Network error:", error);
    }
}