import userModel from "../models/userModel.js"

// add products to user cart
const addToCart = async (req, res) => {

    try {

        const {itemId, size} = req.body
        const userId = req.user.userId;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData || null

        if(cartData[itemId]) {

            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }

        else {

            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success:true, message:"Product added to cart"})
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:error.message})

    }

}


// update user cart
const updateCart = async (req, res) => {
    
    try {
        
        const { itemId, size, quantity} = req.body
        const userId = req.user.userId;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        console.log(cartData);
        
        res.json({success:true, message:"Cart updated"})

    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:error.message})

    }

}


// get user cart data
const getCart = async (req, res) => {

    try {

        const userId = req.user.userId;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success:true, cartData})
        
    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
        
    }
    
}


export { addToCart, updateCart, getCart }