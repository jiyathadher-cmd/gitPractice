const stripe =require('stripe');
const configstripe = new stripe(process.env.STRIPE_SECRET_KEY);

module.exports = configstripe;