// controls.js
import LoadingCircle from './LoadingCircle.js';

class CircleManager {
    constructor() {
        this.circles = [];
        this.circleCounter = 0;
    }

    createCircle(options) {
        const circleId = `loadingCircle${this.circleCounter++}`;
        const canvas = document.createElement('canvas');
        canvas.id = circleId;
        canvas.width = 200;
        canvas.height = 200;
        document.body.appendChild(canvas);

        const loadingCircle = new LoadingCircle(circleId, options);
        this.circles.push(loadingCircle);
        this.setupCircleControls(circleId, loadingCircle);
        return loadingCircle; // Return the created circle for further manipulation if needed
    }

    setupCircleControls(circleId, loadingCircle) {
        const controlsDiv = document.createElement('div');
        controlsDiv.innerHTML = `
            <h4>Settings for Circle ${circleId}</h4>
            <label for="loaderCount${circleId}">Number of Loaders:</label>
            <input type="number" id="loaderCount${circleId}" min="1" max="10" value="${loadingCircle.loaderCount}">

            <label for="loaderColors${circleId}">Loader Colors (comma-separated):</label>
            <input type="text" id="loaderColors${circleId}" value="${loadingCircle.loaderColors.join(',')}">

            <label for="showPercentage${circleId}">Show Percentage:</label>
            <input type="checkbox" id="showPercentage${circleId}" ${loadingCircle.showPercentage ? 'checked' : ''}>

            <div id="loaderSpeedContainer${circleId}">
                <label>Loader Speeds:</label>
                <div id="loaderSpeeds${circleId}"></div>
            </div>

            <button id="startBtn${circleId}">Start Animation</button>
            <button id="stopBtn${circleId}">Stop Animation</button>
            <button id="resetBtn${circleId}">Reset</button>
        `;

        document.body.appendChild(controlsDiv);
        this.updateLoaderSpeedInputs(circleId, loadingCircle.loaderCount, loadingCircle);

        // Event listeners for controls
        document.getElementById(`startBtn${circleId}`).addEventListener('click', () => {
            loadingCircle.startAnimation();
        });

        document.getElementById(`stopBtn${circleId}`).addEventListener('click', () => {
            loadingCircle.stopAnimation();
        });

        document.getElementById(`resetBtn${circleId}`).addEventListener('click', () => {
            loadingCircle.reset();
        });

        document.getElementById(`loaderCount${circleId}`).addEventListener('change', (event) => {
            const count = parseInt(event.target.value);
            loadingCircle.loaderCount = count;
            loadingCircle.percentages = Array(count).fill(0);
            loadingCircle.loaderSpeeds = Array(count).fill(1);
            this.updateLoaderSpeedInputs(circleId, count, loadingCircle);
            loadingCircle.drawLoaders();
        });

        document.getElementById(`loaderColors${circleId}`).addEventListener('change', (event) => {
            loadingCircle.loaderColors = event.target.value.split(',');
            loadingCircle.drawLoaders();
        });

        document.getElementById(`showPercentage${circleId}`).addEventListener('change', (event) => {
            loadingCircle.showPercentage = event.target.checked;
            loadingCircle.drawLoaders();
        });
    }

    updateLoaderSpeedInputs(circleId, count, loadingCircle) {
        const speedContainer = document.getElementById(`loaderSpeeds${circleId}`);
        speedContainer.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Speed for Loader ${i + 1}`;
            input.id = `loaderSpeed${circleId}-${i}`;
            input.value = loadingCircle.loaderSpeeds[i];

            input.addEventListener('change', (event) => {
                const speedValue = parseFloat(event.target.value);
                loadingCircle.loaderSpeeds[i] = speedValue;
            });

            speedContainer.appendChild(input);
        }
    }
}

const circleManager = new CircleManager();
export { circleManager };
