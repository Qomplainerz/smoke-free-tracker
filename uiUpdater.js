export class UIUpdater {
	constructor(attemptsEl, timeElapsedEl, cigsAvoidedEl, savingsEl, lifeGainedEl, achievementsContainer) {
		this.attemptsEl = attemptsEl;
		this.timeElapsedEl = timeElapsedEl;
		this.cigsAvoidedEl = cigsAvoidedEl;
		this.savingsEl = savingsEl;
		this.lifeGainedEl = lifeGainedEl;
		this.achievementsContainer = achievementsContainer;
	}
	
	update(attempts, duration, cigsAvoided, savings, lifeGained, years, months, weeks, days, hours, minutes, seconds, milliseconds, newAchievements) {
		this.attemptsEl.textContent = attempts;
		this.timeElapsedEl.textContent = `${years}y ${months}m ${weeks}w ${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
		this.cigsAvoidedEl.textContent = cigsAvoided.toFixed(2);
		this.savingsEl.textContent = savings.toFixed(2) + ' €';
		this.lifeGainedEl.textContent = `${lifeGained.toFixed(2)} minutes`;
		
		// Achievements-Anzeige
		if (newAchievements.length > 0) {
			newAchievements.forEach(achievement => {
				const p = document.createElement('p');
				p.textContent = `Achievement unlocked: ${achievement}! 🎉`;
				this.achievementsContainer.appendChild(p);
			});
		}
	}
	
	reset() {
		this.attemptsEl.textContent = '0';
		this.timeElapsedEl.textContent = '';
		this.cigsAvoidedEl.textContent = '0';
		this.savingsEl.textContent = '0 €';
		this.lifeGainedEl.textContent = '0 minutes';
		this.achievementsContainer.innerHTML = '';
	}
}
