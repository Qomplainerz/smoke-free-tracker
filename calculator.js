export class Calculator {
	constructor(cigsPerDay, costPerCig) {
		this.cigsPerHour = cigsPerDay / 24;
		this.costPerHour = (cigsPerDay * costPerCig) / 24;
		this.lifePerCig = 11; // 11 Minuten pro Zigarette
	}
	
	calculateTimeElapsed(seconds) {
		let totalMs = seconds * 1000;
		
		const years = Math.floor(totalMs / (1000 * 60 * 60 * 24 * 365.25));
		totalMs %= (1000 * 60 * 60 * 24 * 365.25);

		const months = Math.floor(totalMs / (1000 * 60 * 60 * 24 * 30.44)); // Durchschnittlicher Monat
		totalMs %= (1000 * 60 * 60 * 24 * 30.44);

		const weeks = Math.floor(totalMs / (1000 * 60 * 60 * 24 * 7));
		totalMs %= (1000 * 60 * 60 * 24 * 7);

		const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
		totalMs %= (1000 * 60 * 60 * 24);

		const hours = Math.floor(totalMs / (1000 * 60 * 60));
		totalMs %= (1000 * 60 * 60);

		const minutes = Math.floor(totalMs / (1000 * 60));
		totalMs %= (1000 * 60);

		const secondsElapsed = Math.floor(totalMs / 1000);
		const milliseconds = totalMs % 1000;

		return { years, months, weeks, days, hours, minutes, seconds: secondsElapsed, milliseconds };
	}
	
	calculateCigsAvoided(seconds) {
		return Math.round(this.cigsPerHour * (seconds / 3600) * 100) / 100;
	}
	
	calculateSavings(seconds) {
		return Math.round(this.costPerHour * (seconds / 3600) * 100) / 100;
	}
	
	calculateLifeGained(cigsAvoided) {
		return Math.round(cigsAvoided * this.lifePerCig * 100) / 100;
	}
}
