const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.REACT_PUBLIC_STRIPE_SECRET_KEY);
  const handler = async (req, res)=>{
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [],
        line_items: req.body.map((item) => {
          const img = item.img
          const newImage = img
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                description: item.description,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
      console.log(session);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ statusCode: 500, message: err.message });
    }
  }
 

module.exports = handler;