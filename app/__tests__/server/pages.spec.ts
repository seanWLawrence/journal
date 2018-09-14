import request from 'supertest-as-promised';
import Api from '../../api/Api';

const app = new Api().express;

describe('Journal API', () => {
	describe('GET /pages/:id - get page by id', () => {
		/**
		 * Sets the URL that we're testing
		 */
		const URL = '/pages/1';

		it('Should return an object of type Page', () => {
			return request(app)
				.get(URL)
				.expect(200)
				.then((res) => {
					/**
					 * Sets the keys that the Page object should have
					 */
					const reqKeys = ['id', 'name', 'content'];

					/**
					 * Gets the Page from the resp
					 */
					const { data } = res.body;
					/**
					 * Checks that the keys are in fact there and of the correct type
					 */
					reqKeys.forEach((key) => {
						expect(Object.keys(data)).toContain(key);
					});
					// check type of each field
					expect(typeof data.id).toBe('number');
					expect(typeof data.name).toBe('string');
					expect(typeof data.content).toBe('string');
				});
		});

		it('Should return a Page with the requested id', () => {
			return request(app)
				.get(URL)
				.expect(200)
				.then((res) => {
					/**
					 * Pulls initial page created on database initialization
					 */
					expect(res.body.data).toEqual({
						id: 1,
						name: 'test',
						content: '# Hello, world!',
					});
				});
		});

		it('TODO: Should 400 on a request for a nonexistant id', () => {
			return Promise.all([
				request(app)
					.get('/pages/-32')
					.expect(400)
					.then((res) => {
						expect(res.body.error).toBe('No page found with id: -32');
					}),
				request(app)
					.get('/pages/99999')
					.expect(400)
					.then((res) => {
						expect(res.body.error).toBe('No page found with id: 99999');
					}),
			]);
		});
	});

	describe('GET /pages - get all pages', () => {
		/**
		 * Sets the URL that we're testing
		 */
		const URL = '/pages';

		/**
		 * Object properties that we expect the response to have
		 */
		let expectedProps = ['id', 'name', 'content'];

		it('Should return JSON array', () => {
			return request(app)
				.get(URL)
				.expect(200)
				.then((res) => {
					// check that it sends back an array
					expect(res.body.data).toBeInstanceOf(Array);
				});
		});

		it('Should return objects with the correct props', () => {
			return request(app)
				.get(URL)
				.expect(200)
				.then((res) => {
					// check for the expected properties
					let sampleKeys = Object.keys(res.body.data[0]);
					expectedProps.forEach((key) => {
						expect(sampleKeys.includes(key)).toBe(true);
					});
				});
		});

		it('Should not contain extra properties', () => {
			return request(app)
				.get(URL)
				.expect(200)
				.then((res) => {
					// check for only expected properties
					let extraProps = Object.keys(res.body.data[0]).filter((key) => {
						return !expectedProps.includes(key);
					});
					expect(extraProps).toHaveLength(0);
				});
		});
	});
});
