const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Issue = require('../models/Issue');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Create an issue with every field: POST request to /api/issues/{project}', async (done) => {
        let data = {
            issue_title: 'abc',
            issue_text: 'def',
            created_by: 'jon',
            open: false,
            created_on: new Date('1999-04-10'),
            updated_on: new Date('2000-04-08'),
        }

        chai.request(server)
            .post('/api/issues/project')
            .send(data)
            .end(async (err, res) => {
                let data = res.body
                assert.equal(res.status, 200)
                assert.equal(data.issue_text, data.issue_text)
                assert.equal(data.issue_title, data.issue_title)
                assert.equal(data.created_by, data.created_by)
                assert.isBoolean(data.open)
                assert.isDefined(data.created_on)
                assert.equal(data.created_on.substr(0, 10), '1999-04-10')
                assert.isDefined(data.updated_on)
                assert.equal(data.updated_on.substr(0, 10), '2000-04-08')
            });

        done()
    })

    test('Create an issue with only required fields: POST request to /api/issues/{project}', async (done) => {
        let data = {
            issue_title: 'abc',
            issue_text: 'def',
            created_by: 'jon',
        }

        chai.request(server)
            .post('/api/issues/project')
            .send(data)
            .end(async (err, res) => {
                let data = res.body
                assert.equal(res.status, 200)
                assert.equal(data.issue_text, data.issue_text)
                assert.equal(data.issue_title, data.issue_title)
                assert.equal(data.created_by, data.created_by)
                assert.isBoolean(data.open)
                assert.isDefined(data.created_on)
                assert.isDefined(data.updated_on)

            });

        done()
    })
    test('Create an issue with missing required fields: POST request to /api/issues/{project}', async (done) => {
        let data = {
            issue_title: 'abc',
            issue_text: 'def',
            // created_by: 'jon',
        }

        chai.request(server)
            .post('/api/issues/project')
            .send(data)
            .end(async (err, res) => {
                assert.equal(res.status, 200)
                assert.isDefined(res.body.error)
            });

        done()
    })

    test('View issues on a project: GET request to /api/issues/{project}', async () => {
        let issue = await Issue.create({
            issue_title: 'test',
            issue_text: 'someboy',
            project: 'indra',
            created_by: 'shiv'
        })

        let issues = await Issue.find({ project: 'indra' });
        assert.equal(issues.length, 1);

        chai.request(server)
            .get('/api/issues/indra')
            .end(async (err, res) => {
                let data = res.body;
                assert.equal(res.status, 200);
                assert.notEqual(data.length, 0);
            })


    })

    test('View issues on a project with one filter: GET request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })

    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })
    test('Update one field on an issue: PUT request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })
    test('Update an issue with missing _id: PUT request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })

    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })

    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })

    test('Delete an issue: DELETE request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })

    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', async () => {

        assert.equal(true, true)
    })

    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', async () => {
        assert.equal(true, true)
    })
});
