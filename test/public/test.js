

function getDynamic() {
  $.ajax('http://localhost:8080/dynamicContent').then(function(response, status, jqXHR) {
    console.log(jqXHR.status, jqXHR.statusText);
    //console.log(jqXHR.getAllResponseHeaders());
    console.log(response);
  });
}


describe('delta_cache_ws.js', function() {

  describe('dynamic content', function() {
    it('should return correct content', function(done) {
      $.get('/dynamicContent').then((responseBody, _, xhrRequest) => {
        expect(responseBody).to.be('version 1');
        return $.get('/dynamicContent');
      }).then((responseBody, _, xhrRequest) => {
        expect(responseBody).to.be('version 2');
        console.log(xhrRequest.getAllResponseHeaders());
        expect(xhrRequest.getResponseHeader('IM')).to.be('googlediffjson');
        done();
      }).catch(err => {
        done(err);
      });
    });
  });

  describe('static content', function() {
    it('should return correct content', function(done) {
      $.get('/staticContent').then((responseBody, _, xhrRequest) => {
        expect(responseBody).to.be('single response');
        //console.log(xhrRequest);
        return $.get('/staticContent');
      }).then((responseBody, _, xhrRequest) => {
        expect(responseBody).to.be('single response');
        done();
      }).catch(err => {
        done(err);
      });
    });
  });

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1,2,3].indexOf(5)).to.eql(-1);
      expect([1,2,3].indexOf(0)).to.eql(-1);
    });
  });
});