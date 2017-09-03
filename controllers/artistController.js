const _ = require('lodash');
//
const Artist = require("../models/artist");

function buildQuery(criteria){
  const query ={};
  if (criteria.age){
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }

  return query;
}

module.exports = {
  index(req, res, next) {
    Artist.find({})  
    .then(artist => res.send(artist))
    .catch(next);
  },

  create(req, res, next) {
    const props = req.body;
    Artist.create(props)
      .then(artist => res.send(artist))
      .catch(next)
  },

  // for /driver/:id
  edit(req, res, next) {
    const id = req.params.id;
    const props = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Artist.findByIdAndUpdate({ _id: id }, props, { new: true })
      .then(artist => res.send(artist))
      .catch(next);
  },

  // for /driver/:id
  delete(req, res, next) {
    const id = req.params.id;
    Artist.findByIdAndRemove({ _id: id })
      .then(artist => res.status(204).send(artist))
      .catch(next);
  },
  
  searchArtists(req, res, next){
    let _criteria = _.extend({
      age: { min: 0, max: 100 },
      yearsActive: { min: 0, max: 100 },
      name: ''
    }, req.body);
    criteria = _.omit(_criteria, 'sort')
    
    const sortProperty = _criteria.sort
    const sortOrder = {};
    sortOrder[sortProperty] =1;
    
    const offset = _criteria.offset;
    const limit = _criteria.limit;

    const query = Artist.find(buildQuery(criteria))
      .sort(sortOrder) //.sort({[sortProperty]:1})
      .skip(offset)
      .limit(limit);

    Promise.all([query, Artist.count()])
    .then((result)=>{
      res.send({
        all: result[0],
        count:result[1],
        offset,
        limit
      })
    })
    .catch(next);
  },

  getAgeRange(req, res, next){
    const minQuery = Artist.find({}).sort({age:1}).limit(1).then(artists => artists[0].age);
    const maxQuery = Artist.find({}).sort({age:-1}).limit(1).then(artists => artists[0].age);
    Promise.all([minQuery, maxQuery])
    .then(result => 
      {
        console.log(result);
        res.send({min:result[0], max:result[1]});
      })
    .catch(next);
  },

  getYearsActiveRange(req, res, next){

    const minQuery = Artist.find({}).sort({yearsActive:1}).limit(1).then(artists => artists[0].yearsActive);
    const maxQuery = Artist.find({}).sort({yearsActive:-1}).limit(1).then(artists => artists[0].yearsActive);
    Promise.all([minQuery, maxQuery])
    .then(result => res.send({min:result[0], max:result[1]}))
    .catch(next);
  }
}
