import { DataManager } from './dataManager.js';
import { Calculator } from './calculator.js';
import { UIUpdater } from './uiUpdater.js';
import { Achievements } from './achievements.js';

// Initialization
const dataManager = new DataManager('smoke_tracker.json');
const calculator = new Calculator(65, 0.36); // 65 cigarettes/day, 0.36 €/cigarette
const uiUpdater = new UIUpdater(
	document.getElementById('attempts'),
	document.getElementById('timeElapsed'),
	document.getElementById('cigsAvoided'),
	document.getElementById('savings'),
	document.getElementById('lifeGained'),
	document.getElementById('achievements-container')
);
const achievements = new Achievements(); // Achievements-Modul initialisieren

const startForm = document.getElementById('startForm');
const loadLastBtn = document.getElementById('loadLast');
const trackRelapseBtn = document.getElementById('trackRelapse');

startForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const startTime = new Date(document.getElementById('startTime').value).toISOString();
	dataManager.startAttempt(startTime);
	animate();
});

loadLastBtn.addEventListener('click', () => {
	const data = dataManager.loadData();
	if (data.start_time) animate();
});

trackRelapseBtn.addEventListener('click', () => {
	const data = dataManager.loadData();
	if (data.start_time) {
		dataManager.trackRelapse();
		uiUpdater.reset();
	}
});

function animate() {
	function update() {
		const data = dataManager.loadData();
		if (data.start_time) {
			const now = new Date();
			const start = new Date(data.start_time);
			const duration = Math.max(0, (now - start) / 1000); // In Sekunden
			const { years, months, weeks, days, hours, minutes, seconds, milliseconds } = calculator.calculateTimeElapsed(duration);
			const cigsAvoided = calculator.calculateCigsAvoided(duration);
			const savings = calculator.calculateSavings(duration);
			const lifeGained = calculator.calculateLifeGained(cigsAvoided);
            
            // Achievements überprüfen und den Status aktualisieren
            const newAchievements = achievements.check(savings, lifeGained);
			
			uiUpdater.update(data.attempts, duration, cigsAvoided, savings, lifeGained, years, months, weeks, days, hours, minutes, seconds, milliseconds, newAchievements);
		}
		requestAnimationFrame(update);
	}
	requestAnimationFrame(update);
}
