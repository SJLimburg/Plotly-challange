// will need an event to read the test subject id entered - FOr id="selDataset" need to add option values and text for all names
let subject = 9;
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
// Use otu_labels as the hovertext for the chart. .text(function (d) {${'d.otu_labels'};}

d3.json("./samples.json").then((data) => {
    // console.log(data);
    let names = data.names;
    // console.log(names);
    let sampleValues = data.samples[subject].sample_values;
    console.log(`sample values:  ${sampleValues}`);
    let otuIDs = data.samples[subject].otu_ids;
    console.log(`OTU IDs: ${otuIDs}`);
    let otuLabels = data.samples[subject].otu_labels;
    // console.log(otuLabels);
    // get top 10 OTUs - sort samplevalues in descending then get those values and the OTU IDs for them
    let topTenSamples = sampleValues.slice(0,10);
    console.log(`top ten samples:  ${topTenSamples}`);
    let topTenOTU = otuIDs.slice(0,10);
    console.log(`top ten OTUid:  ${topTenOTU}`); 
    let topTenHover = otuLabels.slice(0,10);
    console.log(`top ten OTUid:  ${topTenHover}`);   

    // let sampleSort = data.samples.sort((a,b) => d3.descending(a.sample_values,b.sample_values));
    // console.log(sampleSort);

    let trace = {
        type : 'bar',
        orientation : 'h',
        hovertext: otuIDs,
        x: topTenSamples,
        y: topTenOTU,
        line: {
        heigt: 10,
        color: 'blue'
        },
    };
// create the data variable
    let chartData = [trace];

    // create layout
    let layout = {
        title: "Top 10 OTUs",
        yaxis: {
            autorange: true,
            type: "linear"
          },

          };
          
    Plotly.newPlot('bar', chartData, layout)
    });

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
