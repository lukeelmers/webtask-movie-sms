'use latest';

const { fetchGenreList, fetchReviews } = require('./services/movies');
const { sendSms } = require('./services/sms');
const keyBy = require('lodash/keyBy');

module.exports = async (ctx, cb) => {

  try {
    const genres = await fetchGenreList(ctx);
    const genresById = keyBy(genres, 'id');
    const reviews = await fetchReviews(ctx);

    let message = `\nGrab yo' 🍿!\nStreaming this week:\n`;
    reviews.forEach(r => {
      message += `\n---\n${r.title}\n${r.vote_average}/10 (${r.vote_count})\nGenre:`;
      r.genre_ids.forEach(g => message += ` ${genresById[`${g}`].name}`);
    });

    const sms = await sendSms(ctx, message);
    cb(null, {
      status: 'success',
      data: {
        message,
        reviews,
        sms
      }
    });
  } catch(err) {
    cb(err);
  }

};
