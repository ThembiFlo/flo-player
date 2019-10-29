const request = require('supertest');
const app = require('../app');
const assert = require('assert');
const fs = require('fs');

const getcount = () => {
	let count = 0;
	fs.readFile('./db/db.js', 'utf8', function(err, data) {
		let results = JSON.parse(data);
		count = results.items.length;
	});
	return count;
};

describe('Server:', (done) => {
	it('should read app list', (done) => {
		request(app).get('/api/app').expect(200, done);
	});

	it('should delete app item in file', (done) => {});

	it('should add app item', (done) => {});
});
