export class DataManager {
	constructor(fileName) {
		this.fileName = fileName;
	}
	
	loadData() {
		let data = localStorage.getItem(this.fileName);
		if (!data) {
			data = JSON.stringify({ start_time: null, attempts: 0, relapses: [] });
			localStorage.setItem(this.fileName, data);
		}
		return JSON.parse(data);
	}
	
	saveData(data) {
		localStorage.setItem(this.fileName, JSON.stringify(data));
	}
	
	startAttempt(startTime) {
		const data = this.loadData();
		data.start_time = startTime;
		data.attempts += 1;
		this.saveData(data);
	}
	
	trackRelapse() {
		const data = this.loadData();
		if (data.start_time) {
			const now = new Date().toISOString();
			const start = new Date(data.start_time);
			const duration = Math.floor((new Date(now) - start) / 1000); // In seconds
			data.relapses.push({ start: data.start_time, end: now, duration });
			data.start_time = null;
			this.saveData(data);
		}
	}
}
