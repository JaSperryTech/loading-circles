// index.js
import { circleManager } from './controls.js';

// Create an initial circle
circleManager.createCircle({
    loaderCount: 1,
    lineWidth: 10,
    loaderColors: ['#3498db'],
    loaderSpeeds: [1],
    showPercentage: true
});

// Button to create new circles
const newCircleBtn = document.createElement('button');
newCircleBtn.innerText = 'Create New Circle';
newCircleBtn.addEventListener('click', () => {
    circleManager.createCircle({
        loaderCount: 1,
        lineWidth: 10,
        loaderColors: ['#3498db'],
        loaderSpeeds: [1],
        showPercentage: true
    });
});
document.body.appendChild(newCircleBtn);
