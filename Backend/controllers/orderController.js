import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'


// Global Variables
const currency = 'inr'
const deliveryCharge = 10

// gateway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Placing orders using COD Method
const placeOrder = async (req, res) => {
    
    try {
        
        const { items, amount, address} = req.body
        const userId = req.user.userId;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success:true, message: "Order Placed"})
        console.log(orderData);
        

    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:error.message})

    }

}


// Placing orders using stripe Method

const placeOrderStripe = async (req, res) => {

    const origin = req.headers.origin || process.env.FRONTEND_URL;
    
    try {

        const { items, amount, address} = req.body
        const userId = req.user.userId;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({

            price_data: {
                currency: currency,
                product_data: {
                    name: item.name

                },
                unit_amount: item.price * 100
            },

            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"

                },
                unit_amount: deliveryCharge * 100
            },

            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        })


        res.json({
            success: true,
            session_url: session.url
        })

        console.log("Stripe session created:", session.url);
        
    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}


// Verify Stripe

const verifyStripe = async (req, res) => {

    const {success,orderId} = req.body
    const userId = req.user.userId;

    try {
        
        if(success === 'true') {

            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}}) 
            res.json({success: true})
        }

        else {

            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})

        }

    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}


// Placing orders using Razor Method
const placeOrderRazorpay = async (req, res) => {
    


}


// All orders data for Admin Panel
const allOrders = async (req, res) => {

    try {

          const orders = await orderModel.find({})
          res.json({success:true, orders})
        
    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}


// User Order Data For Frontend
const userOrders = async(req,res) => {

    try {
        
        const {userId} = req.user

        const orders = await orderModel.find({  userId})
        res.json({success:true, orders})

    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:error.message})

    }

}


// Update Order Status from Admin
const updateStatus = async(req,res) => {
    
    try {

        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Status Updated"})
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:error.message})

    }

}


export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
}