document.getElementById('plotButton').addEventListener('click', function () {
    const expressionInput = document.getElementById('expression');
    const functionSelect = document.getElementById('functionSelect');
    const xMin = parseFloat(document.getElementById('xMin').value) || -10;
    const xMax = parseFloat(document.getElementById('xMax').value) || 10;
    const showGrid = document.getElementById('showGrid').checked;
    const showAxisLabels = document.getElementById('showAxisLabels').checked;

    const expression = expressionInput.value || functionSelect.value;

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
            line: { color: '#007BFF' },
        };

        const layout = {
            title: `Graph of ${expression}`,
            xaxis: { title: showAxisLabels ? 'x' : '', showgrid: showGrid },
            yaxis: { title: showAxisLabels ? 'y' : '', showgrid: showGrid },
        };

        Plotly.newPlot('graph', [trace], layout);
    } catch (error) {
        alert('Invalid expression. Please enter a valid mathematical expression using "x" as the variable.');
    }
});

document.getElementById('functionSelect').addEventListener('change', function () {
    const selectedFunction = this.value;
    if (selectedFunction) {
        document.getElementById('expression').value = selectedFunction;
    }
});

document.getElementById('downloadGraph').addEventListener('click', function () {
    Plotly.downloadImage('graph', { format: 'png', filename: 'graph' });
});

document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
