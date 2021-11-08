import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose, { connection } from 'mongoose';
import server from '../../../server';
import httpCodes from '../../../constants/http-status-codes';
import responseCodes from '../../../constants/response-codes';
import CustomError from 'responses/error/custom-error';
import throwError from '../../../responses/error';
import { Request, Response, NextFunction } from 'express';

const app = new server().app;
const request = supertest(app);

describe('test app rputing', (): void => {
    it('/api/unknown', (done): void => {
        request
            .get('/api/unknown-route')
            .set('Accept', 'application/json')
            .expect(httpCodes.NOT_FOUND)
            .end((err, res): void => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.have.property('code').to.equal(responseCodes.NOT_FOUND);
                expect(body).to.have.property('statusCode').to.equal(httpCodes.NOT_FOUND);
                expect(body).to.have.property('message').not.to.equal('');
                return done();
            });
    });
});
