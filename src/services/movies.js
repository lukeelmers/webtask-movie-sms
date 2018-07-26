const fetch = require('node-fetch');
const moment = require('moment');
const { serializeParams } = require('../utils');

const baseUrl = 'https://api.themoviedb.org/3';

async function _fetchImdbIds(ctx, results) {
  // TODO: Persist these in a db for future reference
  try {
    const params = { api_key: ctx.secrets.TMDB_API_KEY };
    return Promise.all(results.map(async r => {
      const response = await fetch(`${baseUrl}/movie/${r.id}/external_ids?${serializeParams(params)}`);
      const json = await response.json();
      return {
        ...r,
        imdb_id: json.imdb_id
      };
    }));
  } catch(err) {
    throw err;
  }
}

async function fetchGenreList(ctx) {
  try {
    const params = { api_key: ctx.secrets.TMDB_API_KEY };
    const response = await fetch(`${baseUrl}/genre/movie/list?${serializeParams(params)}`);
    const json = await response.json();
    return json.genres;
  } catch(err) {
    throw err;
  }
}

async function fetchReviews(ctx) {
  try {
    const params = {
      api_key: ctx.secrets.TMDB_API_KEY,
      'vote_average.gte': 8.0,
      'vote_count.gte': 5,
      include_adult: false,
      with_release_type: '4|6',
      without_genres: '16,18,27,37', // TODO: Make configurable
      with_genres: '28|12|35|99|878', // TODO: Make configurable
      'primary_release_date.gte': moment().subtract(365, 'days').format('YYYY-MM-DD'),
      'release_date.gte': moment().subtract(365, 'days').format('YYYY-MM-DD'),
      'release_date.lte': moment().format('YYYY-MM-DD'),
      sort_by: 'release_date.desc'
    };
    const response = await fetch(`${baseUrl}/discover/movie?${serializeParams(params)}`);
    const json = await response.json();
    // TODO: Make .slice() count configurable
    const reviews = await _fetchImdbIds(ctx, json.results.slice(0, 5));
    return reviews;
  } catch(err) {
    throw err;
  }
}

module.exports = {
  fetchGenreList,
  fetchReviews
};
