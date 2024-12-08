// Function to plot a 3D graph
document.getElementById('plotButton').addEventListener('click', function () {
    const expression = document.getElementById('expression').value;
    const xMin = parseFloat(document.getElementById('xMin').value) || -10;
    const xMax = parseFloat(document.getElementById('xMax').value) || 10;
    const yMin = parseFloat(document.getElementById('yMin').value) || -10;
    const yMax = parseFloat(document.getElementById('yMax').value) || 10;

    if (!expression) {
        alert('Please enter a valid mathematical expression.');
        return;
    }

    try {
        const xValues = math.range(xMin, xMax, 0.5)._data;
        const yValues = math.range(yMin, yMax, 0.5)._data;
        const zValues = [];

        xValues.forEach((x) => {
            const zRow = [];
            yValues.forEach((y) => {
                const z = math.evaluate(expression.replace(/x/g, x).replace(/y/g, y));
                zRow.push(z);
            });
            zValues.push(zRow);
        });

        const trace = {
            x: xValues,
            y: yValues,
            z: zValues,
            type: 'surface',
        };

        Plotly.newPlot('graph', [trace]);
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
            filename: '3d_graph',
        });
    } else {
        alert('No graph to download! Please plot a graph first.');
    }
});
