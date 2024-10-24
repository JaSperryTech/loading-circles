// LoadingCircle.js
class LoadingCircle {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.size = this.canvas.width;
        this.lineWidth = options.lineWidth || 10;
        this.loaderColors = options.loaderColors || ['#00BFFF'];
        this.loaderSpeeds = options.loaderSpeeds || [1];
        this.loaderCount = options.loaderCount || 1;
        this.percentages = Array(this.loaderCount).fill(0);
        this.isAnimating = false;
        this.animationFrame = null;
        this.showPercentage = options.showPercentage || false;

        this.drawLoaders();
    }

    drawLoaders() {
        const ctx = this.ctx;
        const size = this.size;

        ctx.clearRect(0, 0, size, size);

        for (let i = 0; i < this.loaderCount; i++) {
            const radius = (size / 2) - (i * (this.lineWidth + 10));
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, radius, -Math.PI / 2, (Math.PI * 2 * this.percentages[i] / 100) - Math.PI / 2);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.loaderColors[i % this.loaderColors.length];
            ctx.stroke();

            if (this.showPercentage) {
                ctx.fillStyle = '#000';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${Math.round(this.percentages[i])}%`, size / 2, size / 2 + (i * 30));
            }
        }
    }

    setPercentages(percentages) {
        this.percentages = percentages.map(percentage => Math.min(Math.max(percentage, 0), 100));
        this.drawLoaders();
    }

    startAnimation() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    stopAnimation() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    reset() {
        this.percentages.fill(0);
        this.drawLoaders();
    }

    animate() {
        if (this.isAnimating) {
            this.percentages = this.percentages.map((percentage, index) => {
                percentage += this.loaderSpeeds[index % this.loaderSpeeds.length];
                return percentage > 100 ? 0 : percentage;
            });

            this.drawLoaders();
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }
    }
}

export default LoadingCircle;
