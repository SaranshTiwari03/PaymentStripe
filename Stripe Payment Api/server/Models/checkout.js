const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  purchased_items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  payment_status: { type: String, required: true },
  transaction_id: { type: String, required: true },
  customer_email: { type: String }
});

module.exports  = mongoose.model('Purchase', purchaseSchema);

