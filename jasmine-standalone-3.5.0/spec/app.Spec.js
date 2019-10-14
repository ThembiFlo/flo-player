describe('GET /api/users', function () {
  it('should respond with json', function (done) {
    artist=new Artist;
      artist(application)
          .get('/api/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(tellJasmine(done));
        
      })
      
  });