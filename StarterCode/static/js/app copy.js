// will need an event to read the test subject id entered - FOr id="selDataset" need to add option values and text for all names
let subject = 1;
let subjectID = 941;
console.log(`start with subject ${subject}`);
makeCharts(subject);
metadata(subjectID);
startup();

function startup() {
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
      
  })}


function makeCharts (subject) {
d3.json("./samples.json").then((data) => {
    let sampleValues = data.samples[subject].sample_values;    // console.log(`sample values:  ${sampleValues}`);
    let otuIDs = data.samples[subject].otu_ids;     // console.log(`OTU IDs: ${otuIDs}`);
    let otuLabels = data.samples[subject].otu_labels;    // console.log(otuLabels);
    let topTenSamples = sampleValues.slice(0,10).reverse();
    console.log(`top ten samples:  ${topTenSamples}`);
    let topTenOTU = otuIDs.slice(0,10).reverse();
    console.log(`top ten OTUid:  ${topTenOTU}`); 
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
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
  text: otuLabels.map(id => `Bacteria types found: ${id}`),
  type : 'scatter',
  mode : 'markers',
  marker: {
    size: sampleValues,
    sizeref: 0.25,
    sizemode: 'area',
    color: otuIDs,
    colorscale: 'Portland',
    type: 'heatmap',
      },
  };
let bubbleChart = [trace2];
let layout2 = {
  title: "All of the Test Subject OTUs",
  xaxis:{
    title: "OTU Identifier",
    size: 16
  },
  yaxis:{
    autorange : 'true',
    title: 'Sample Values'
  },
}
Plotly.newPlot('bubble', bubbleChart, layout2);

});
}

//function for metadata
function metadata(subjectID) {
  d3.json("./samples.json").then((data) => {
      let metaData = data.metadata;
      let metaArray = metaData.filter(d => d.id == subjectID);
      let result = metaArray[0];
      console.log(`subject id  is  ${subjectID} and result is : ${result}`);
      let panelData = d3.select("#sample-metadata");
      panelData.html("");
      console.log(`result: ${result}`);

      Object.entries(result).forEach(([key, value]) => {
          let mData = `${key}: ${value}`;
          panelData.append("p").text(mData);
      });
  });
}

//function for optionChanged
function optionChanged(newSubjectId) {
  makeCharts(newSubject); //need to fix this
  metadata(newSubjectId);
}

// let sampleSort = data.samples.sort((a,b) => d3.descending(a.sample_values,b.sample_values));
