export class Achievements {
	constructor() {
		this.financialGoals = [
			{ name: 'Erster Euro gespart', goal: 1, achieved: false },
			{ name: '10 Euro gespart', goal: 10, achieved: false },
			{ name: '100 Euro gespart', goal: 100, achieved: false }
		];
		
		this.healthGoals = [
			{ name: '20 Minuten rauchfrei', goal: 20, achieved: false, unit: 'minutes' },
			{ name: '1 Stunde rauchfrei', goal: 60, achieved: false, unit: 'minutes' },
			{ name: '24 Stunden rauchfrei', goal: 24 * 60, achieved: false, unit: 'minutes' }
		];
	}
	
	check(savings, lifeGained) {
		const newAchievements = [];
		
		this.financialGoals.forEach(goal => {
			if (!goal.achieved && savings >= goal.goal) {
				goal.achieved = true;
				newAchievements.push(goal.name);
			}
		});
		
		this.healthGoals.forEach(goal => {
			if (!goal.achieved && lifeGained >= goal.goal) {
				goal.achieved = true;
				newAchievements.push(goal.name);
			}
		});
		
		return newAchievements;
	}
}
