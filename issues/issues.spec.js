const db = require('../data/dbConfig.js');

const request = require('supertest');

const issues = require('./issues-model.js');

const server = require('../api/server.js');

describe('issues model', () => {
    describe('update()', () => {
        it('should update the issue', async () => {
            await issues.update({ id: 1, zip: 84723 })
            const issue = await db('issues').pluck('zip').where({ id: 1 })
            expect(issue[0]).toBe(84723)
        })
        it('should return status 400', async () => {
            await request(server).put('/api/issues/1').send({ issue_name: 'Not affordable housing', zip: 94723 }).expect(400)
        })
    })
    describe('remove()', () => {
        it('should delete the issue', async () => {
            await issues.remove(2)
            const issue = await db('issues').where({ id: 2 })
            expect(issue).toEqual([])
        })
        it('should return status 400', async () => {
            await request(server).delete('/api/issues/2').expect(400)
        })
    })
})