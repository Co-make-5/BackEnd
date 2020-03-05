const db = require('../data/dbConfig.js');

const request = require('supertest');

const users = require('./users-model.js');

const server = require('../api/server.js');

describe('users model', () => {
    describe('addIssue()', () => {
        it('should add a new issue', async () => {
            await users.addIssue({ user_id: 1, issue_name: 'test issue', zip: 27384 })
            const issue = await db('issues').pluck('zip').where({ user_id: 1, issue_name: 'test issue' })
            const length = issue.length
            expect(issue[length - 1]).toBe(27384)
        })
        it('should return status 400', async () => {
            await request(server).post('/api/users/1/issues').send({ issue_name: 'Not affordable housing', zip: 94723 }).expect(400)
        })
    })
    describe('edit()', () => {
        it('should edit the user', async () => {
            await users.edit({ id: 1, location: 'narnia' })
            const user = await db('users').select('location').where({ id: 1 })
            expect(user).toEqual([{"location": "narnia"}])
        })
        it('should return status 400', async () => {
            await request(server).put('/api/users/1').expect(400)
        })
    })
})