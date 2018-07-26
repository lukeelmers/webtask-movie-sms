const twilio = require('twilio');

async function sendSms(ctx, body) {
  try {
    const client = new twilio(
      ctx.secrets.TWILIO_ACCOUNT_SID,
      ctx.secrets.TWILIO_AUTH_TOKEN
    );
    const response = await client.messages.create({
      to: ctx.secrets.TWILIO_RECIPIENT,
      from: ctx.secrets.TWILIO_SENDER,
      body
    });
    return response;
  } catch(err) {
    throw err;
  }
}

module.exports = { sendSms };
