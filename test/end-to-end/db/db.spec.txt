import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { User, UserI } from '../../../models/user';

import server from '../../../server';
import httpCodes from '../../../constants/http-status-codes';
import responseCodes from '../../../constants/response-codes';
import { validRegistrationDetails } from '../../mock-data/user';

const app = new server().app;
const request = supertest(app);
let user: UserI;

describe('test validators', (): void => {
    let sandbox: sinon.SinonSandbox;
    before(async (): Promise<void> => {
        const newUser: Partial<UserI> = { ...validRegistrationDetails };
        user = await new User(newUser).save();

        sandbox = sinon.createSandbox();
        sandbox.stub(jwt, 'verify').callsArgWith(2, null, user);
    });

    after(async (): Promise<void> => {
        await User.findOneAndDelete({ _id: user.id });
        sandbox.restore();
    });
    it('/api/user - update user with invalid user id', (done): void => {
        const data = { bio: 'wrong param', id: `${user.id}ef4` };
        request
            .put('/api/user')
            .send(data)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer Auth`)
            .expect(httpCodes.INTERNAL_SERVER_ERROR)
            .end((err, res): void => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.have.property('code').to.equal(responseCodes.INTERNAL_SERVER_ERROR);
                expect(body).to.have.property('statusCode').to.equal(httpCodes.INTERNAL_SERVER_ERROR);
                expect(body).to.have.property('message').not.to.equal('');
                return done();
            });
    });

});