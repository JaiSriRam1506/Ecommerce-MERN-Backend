const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const {calculateTotalPrice}=require('../utils/helpers');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

async function payWithStripe(orderData){
    try {
        const { items, shipping, description, coupon } = orderData;
        const products = await Product.find();
      
        let orderAmount;
        orderAmount = calculateTotalPrice(products, items);
        if (coupon !== null && coupon?.name !== "nil") {
          let totalAfterDiscount =orderAmount - (orderAmount * coupon.discount) / 100;
          orderAmount = totalAfterDiscount.toFixed(2)*100;
        }
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: orderAmount,
          currency: "inr",
          automatic_payment_methods: {
            enabled: true,
          },
          description,
          shipping: {
            address: {
              line1: shipping.line1,
              line2: shipping.line2,
              city: shipping.city,
              country: shipping.country,
              postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
          },
          // receipt_email: customerEmail
        });

       //console.log(paymentIntent);
       return paymentIntent.client_secret;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error)
        throw new AppError('Unable to complete Payment: '+error, StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

module.exports={
    payWithStripe
}
