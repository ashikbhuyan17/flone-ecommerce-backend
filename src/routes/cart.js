const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware");

const { addItemToCart } = require("../controller/cart");
const router = express.Router();

router.post(
    "/user/cart/addtocart",
    requireSignIn,
    userMiddleware,
    addItemToCart
);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
// router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
//new update
// router.post(
//     "/user/cart/removeItem",
//     requireSignin,
//     userMiddleware,
//     removeCartItems
// );

module.exports = router;