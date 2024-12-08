// Function to plot a 2D graph
document.getElementById('plotButton').addEventListener('click', function () {
    const expression = document.getElementById('expression').value;
    const xMin = parseFloat(document.getElementById('xMin').value) || -10;
    const xMax = parseFloat(document.getElementById('xMax').value) || 10;

    const showGrid = document.getElementById('showGrid').checked;
    const showAxisLabels = document.getElementById('showAxisLabels').checked;

    if (!expression) {
        alert('Please enter a valid mathematical expression.');
        return;
    }

    try {
        const xValues = [];
        const yValues = [];
        for (let x = xMin; x <= xMax; x += 0.1) {
            xValues.push(x);
            const y = math.evaluate(expression.replace(/x/g, x));
            yValues.push(y);
        }

        const trace = {
            x: xValues,
            y: yValues,
            mode: 'lines',
            type: 'scatter',
        };

        const layout = {
            title: `Graph of ${expression}`,
            xaxis: { title: showAxisLabels ? 'x' : '', showgrid: showGrid },
            yaxis: { title: showAxisLabels ? 'y' : '', showgrid: showGrid },
        };

        Plotly.newPlot('graph', [trace], layout);
    } catch (error) {
        alert('Invalid expression.');
    }
});

// Function to download graph as image
document.getElementById('downloadGraph').addEventListener('click', function () {
    const graphElement = document.getElementById('graph');
    if (graphElement.data) {
        Plotly.downloadImage(graphElement, {
            format: 'png',
            filename: '2d_graph',
        });
    } else {
        alert('No graph to download! Please plot a graph first.');
    }
});
