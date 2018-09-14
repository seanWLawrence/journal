import request from 'supertest-as-promised';
import Api from '../../api/Api';
var app = new Api().express;
describe('Journal API', function () {
    describe('GET /pages/:id - get page by id', function () {
        /**
         * Sets the URL that we're testing
         */
        var URL = '/pages/1';
        it('Should return an object of type Page', function () {
            return request(app)
                .get(URL)
                .expect(200)
                .then(function (res) {
                /**
                 * Sets the keys that the Page object should have
                 */
                var reqKeys = ['id', 'name', 'content'];
                /**
                 * Gets the Page from the resp
                 */
                var data = res.body.data;
                /**
                 * Checks that the keys are in fact there and of the correct type
                 */
                reqKeys.forEach(function (key) {
                    expect(Object.keys(data)).toContain(key);
                });
                // check type of each field
                expect(typeof data.id).toBe('number');
                expect(typeof data.name).toBe('string');
                expect(typeof data.content).toBe('string');
            });
        });
        it('Should return a Page with the requested id', function () {
            return request(app)
                .get(URL)
                .expect(200)
                .then(function (res) {
                /**
                 * Pulls initial page created on database initialization
                 */
                expect(res.body.data).toEqual({
                    id: 1,
                    name: 'test',
                    content: '# Hello, world!'
                });
            });
        });
        it('TODO: Should 400 on a request for a nonexistant id', function () {
            return Promise.all([
                request(app)
                    .get('/pages/-32')
                    .expect(400)
                    .then(function (res) {
                    expect(res.body.error).toBe('No page found with id: -32');
                }),
                request(app)
                    .get('/pages/99999')
                    .expect(400)
                    .then(function (res) {
                    expect(res.body.error).toBe('No page found with id: 99999');
                }),
            ]);
        });
    });
    describe('GET /pages - get all pages', function () {
        /**
         * Sets the URL that we're testing
         */
        var URL = '/pages';
        /**
         * Object properties that we expect the response to have
         */
        var expectedProps = ['id', 'name', 'content'];
        it('Should return JSON array', function () {
            return request(app)
                .get(URL)
                .expect(200)
                .then(function (res) {
                // check that it sends back an array
                expect(res.body.data).toBeInstanceOf(Array);
            });
        });
        it('Should return objects with the correct props', function () {
            return request(app)
                .get(URL)
                .expect(200)
                .then(function (res) {
                // check for the expected properties
                var sampleKeys = Object.keys(res.body.data[0]);
                expectedProps.forEach(function (key) {
                    expect(sampleKeys.includes(key)).toBe(true);
                });
            });
        });
        it('Should not contain extra properties', function () {
            return request(app)
                .get(URL)
                .expect(200)
                .then(function (res) {
                // check for only expected properties
                var extraProps = Object.keys(res.body.data[0]).filter(function (key) {
                    return !expectedProps.includes(key);
                });
                expect(extraProps).toHaveLength(0);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUM7QUFDNUMsT0FBTyxHQUFHLE1BQU0sZUFBZSxDQUFDO0FBRWhDLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBRTlCLFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDdkIsUUFBUSxDQUFDLGlDQUFpQyxFQUFFO1FBQzNDOztXQUVHO1FBQ0gsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtZQUMxQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7aUJBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUM7aUJBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNUOzttQkFFRztnQkFDSCxJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBRTFDOzttQkFFRztnQkFDSyxJQUFBLG9CQUFJLENBQWM7Z0JBQzFCOzttQkFFRztnQkFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztvQkFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO2dCQUNILDJCQUEyQjtnQkFDM0IsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLE9BQU8sSUFBSSxD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