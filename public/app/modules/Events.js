export default new class Events {
	constructor() {
		this.listeners = {}
	}

	on(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(listener);
		return listener;
	}

	off(event) {
		this.listener[event] = this.listeners[event] || [];
		delete this.listeners[event];
	}

	emit(event, data) {
		this.listeners[event].forEach(listener => {
			listener(data);
		})
	}

	remove(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		const idx = this.listeners[event].indexOf(listener);
		if (idx !== -1) {
			delete this.listeners[event][idx];
		}
		if (!this.listeners[event].length) {
			delete this.listeners[event];
		}
		
	}	

}