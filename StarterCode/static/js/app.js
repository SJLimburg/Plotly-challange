// will need an event to read the test subject id entered - FOr id="selDataset" need to add option values and text for all names

getSubjectID();

function getSubjectID() {
    let selectBox = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      let boxNames = data.names;
      boxNames.forEach((sample) => {
        selectBox
          .append("option")
          .text(sample)
          .property("value", sample);
    });
            // optionChanged("940");

  })}

// use d3 to read in the Json data
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart. .text(function (d) {${'d.otu_labels'};}

// d3.json("./samples.json").then((data) => {
//     console.log(data);
//     let names = data.names;
//     console.log(names);
//     let sampleValues = data.samples[0].sample_values;
//     // console.log(sampleValues);
//     let otuIDs = data.samples[0].otu_ids;
//     // console.log(otuIDs);
//     let otuLabels = data.samples[0].otu_labels;
//     // console.log(otuLabels);
//     // get top 10 OTUs - sort samplevalues in descending then get those values and the OTU IDs for them
//     let sampleSort = data.samples.sort((a,b) => d3.descending(a.sample_values,b.sample_values));
//     console.log(sampleSort);

//     let trace = {
//         type : 'bar',
//         orientation : 'h',
//         hovertext: otuIDs,
//         x: sampleValues,
//         y: otuLabels,
//         line: {
//         heigt: 10,
//         color: 'blue'
//         },
//     };
// // create the data variable
//     let chartData = [trace];

//     // create layout
//     let layout = {
//         title: "Top 10 OTUs",
//         yaxis: {
//             autorange: true,
//             type: "linear"
//           },

//           };
          
//     Plotly.newPlot('bar', chartData, layout)
//     });

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
