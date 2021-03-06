'use strict';
const TBA = require('../tba-storm');
const nock = require('nock');
const response = require('./responses/status')
const req = new TBA('token');
const expect = require('chai').expect

describe('TBA API Status Test', () => {
    beforeEach(() => {
        nock('https://www.thebluealliance.com/api/v3/')
            .get('status/?X-TBA-Header-Key=token')
            .reply(200, response);
    });

    it('should contain proper object types', () => {
        req.getStatus().then(e => {
            //the whole response
            expect(typeof e).to.be('object');
            expect(typeof e.contbuild_enabled).to.be('boolean');
            expect(typeof e.current_season).to.be('number');
            expect(typeof e.down_events).to.be('array');
            expect(typeof e.is_datafeed_down).to.be('boolean')
            expect(typeof e.max_season).to.be('number');

            //the android object
            expect(typeof e.android).to.be('object');
            expect(typeof e.android.latest_app_version).to.be('number');
            expect(typeof e.android.min_app_version).to.be('number');
            
            //the ios object
            expect(typeof e.ios).to.be('object');
            expect(typeof e.ios.latest_app_version).to.be('number');
            expect(typeof e.ios.min_app_version).to.be('number');

            //the web object
            expect(typeof e.web).to.be('object');
            expect(typeof e.web.commit_time).to.be('string');
            expect(typeof e.web.current_commit).to.be('string');
            expect(typeof e.web.deploy_time).to.be('string');
            expect(typeof e.web.travis_job).to.be('string');
        });      
    });

});