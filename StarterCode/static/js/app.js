// will need an event to read the test subject id entered - FOr id="selDataset" need to add option values and text for all names
let subject = 20;
console.log(subject);

getSubjectID();

function getSubjectID() {
    let selectBox = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
      // console.log(data);
      let boxNames = data.names;
      boxNames.forEach((sample) => {
        selectBox
          .append("option")
          .text(sample)
          .property("value", sample);
    });
            // optionChanged("940");

  })}

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart. 

d3.json("./samples.json").then((data) => {
    let sampleValues = data.samples[subject].sample_values;    // console.log(`sample values:  ${sampleValues}`);
    let otuIDs = data.samples[subject].otu_ids;     // console.log(`OTU IDs: ${otuIDs}`);
    let otuLabels = data.samples[subject].otu_labels;    // console.log(otuLabels);
    let topTenSamples = sampleValues.slice(0,10).reverse();
    console.log(`top ten samples:  ${topTenSamples}`);
    let topTenOTU = otuIDs.slice(0,10).reverse();
    console.log(`top ten OTUid:  ${topTenOTU}`); 
 
// create trace for bar 
    let trace =  {
        x: topTenSamples,
        y: otuIDs.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: otuLabels.slice(0, 10).map(id => `Bacteria found: ${id}`).reverse(),
        type : 'bar',
        orientation : 'h',
        line: {
        height: 1,
        color: 'blue'
        },
      };
// create the data variable for bar chart
    let chartData = [trace];

// create layout for bar chart
    let layout = {
        title: "Top 10 OTUs",
                          };
         
  Plotly.newPlot('bar', chartData, layout);

/*Create a bubble chart that displays each sample. Use otu_ids for the x values. otuIDs
Use sample_values for the y values.  Use sample_values for the marker size. sampleValues
Use otu_ids for the marker colors. Use otu_labels for the text values.*/

let trace2 = {
  x: otuIDs,
  y: sampleValues,
  text: otuLabels.map(id => `Bacteria found: ${id}`),
  type : 'scatter',
  mode : 'markers',
  marker: {
    size: sampleValues,
    color: otuIDs,
    colorscale: 'Portland',
    type: 'heatmap',
      },
  };
let bubbleChart = [trace2];
let layout2 = {
  title: "OTU Varieties"
}
Plotly.newPlot('bubble', bubbleChart, layout2);

});



// let sampleSort = data.samples.sort((a,b) => d3.descending(a.sample_values,b.sample_values));
