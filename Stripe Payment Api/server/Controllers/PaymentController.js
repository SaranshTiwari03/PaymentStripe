const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Purchase=require("../Models/checkout")
const checkoutSession=async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.product,
                images:[product.imgdata]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:`http://localhost:3000/sucess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:"http://localhost:3000/cancel",
    });
        
    res.json({id:session.id})
}

const successSave=async(req,res)=>{
    const { session_id } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['payment_intent.payment_method'] });
      const lineItems = await stripe.checkout.sessions.listLineItems(session_id);
  
       
      if (!session_id) {
        return res.status(400).json({ error: 'Session ID is missing in the request body' });
      }
  
      // Extract data from the session and line items
      const purchasedItems = lineItems.data.map(item => ({
        name: item.description,
        price: item.amount_total / 100, // Convert amount to currency format
        quantity: item.quantity
      }));
  
      const paymentStatus = session.payment_status;
      const transactionId = session.payment_intent.id;
      const customerEmail = session.customer_details.email;
  
      // Save the data to MongoDB
      const purchaseData = new Purchase({
        session_id: session_id,
        purchased_items: purchasedItems,
        payment_status: paymentStatus,
        transaction_id: transactionId,
        customer_email: customerEmail
      });
      await purchaseData.save();
  
     
  
      res.json({ message: 'Purchase data saved successfully' });
    } catch (error) {
      console.error('Error processing purchase:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports={
    checkoutSession,
    successSave
}