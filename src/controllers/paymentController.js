const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51LVhuNGZCoUhdemptaUZ7R1FtKjZt5lXBfjDjnEoMCTzdXZEGCef4Rd2uFXrTgHQTYn8cwlT0Qe61MCqukegSG6O006mIwMcu7"
);

const handlePayStripe = async (req, res) => {
  const { id, items, amount, token, userInfo } = req.body;

  const description = items.map((item) => item.id).join(", ");

  const payment = await stripe.paymentIntents
    .create({
      amount,
      currency: "USD",
      description,
      payment_method: id,
      confirm: true,
    })
    .then((answer) => {
      console.log("ANSWWW:", answer.status);
      res.json(answer.status);
    })
    .catch((err) => {
      console.log("ERRRRR:", err);
      res.json({ message: err.raw.message });
    });
};

module.exports = {
  handlePayStripe,
};
