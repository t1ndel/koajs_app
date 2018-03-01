import Http from '../modules/Http.js';
// модель для работы с документом(получение списка документов, одного дока итд)
export default new class Document {
	constructor() {
		this.baseUrl = 'http://localhost:90';

	}

	documentCheck(obj = {}) {
		return Http.send(`${this.baseUrl}/api/documentcheck`,'POST', obj);
	}

	documentList(pageNum = 1) {

		return Http.send(`${this.baseUrl}/api/documentlist/${pageNum}`,'GET');


	}

	getDocument(id) {
		return Http.send(`${this.baseUrl}/api/document/${id}`,'GET');
	}

	getDocumentsCount() {
		return Http.send(`${this.baseUrl}/api/documentcount`,'GET');
	}	

	getPaginationInfo() {
		return Http.send(`${this.baseUrl}/api/documentpagination`,'GET');
	}	

}