const Memberships = require("../models/memberships")
const User = require("../models/User")
const stripe = require("stripe")('sk_test_51K7jzHSEu1sDfKjEmDI8SkdTNPtVwLKs6uWBIQ03oSyirkFiPwISB1qvw8TNco9dWq0Hsq3XRvtKb8vntXzfevTj00HoSeukc6')
exports.createMembership = async (req, res) => {
    const { membership_name } = req.body
    const { membership_price } = req.body;
    const { membership_description } = req.body;


    try {
        const check_membership = await Memberships.findOne({ membership_name: membership_name });
        if (check_membership) {
            res.status(400).json({
                success: false,
                message: "Membership already exists"
            })
        }
        else {
            Memberships.create({
                membership_name: membership_name,
                membership_price: membership_price,
                membership_description: membership_description
            })
            res.status(200).json({
                success: true,
                message: "Membership Created"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.allMemberships = async (req, res) => {
    try {
        const all_memberships = await Memberships.find()
        res.status(200).json({
            success: true,
            all_memberships: all_memberships
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.buyMembership = async (req, res) => {
    try {
        const { membership_name } = req.body;
        const user = await User.findOne(req.user._id);
        const membership = await Memberships.findOne({ membership_name: membership_name });

        if (!membership) {
            return res.status(401).json({
                success: false,
                message: "No membership found",
            });
        }

        if (user.membership === membership.membership_name) {
            return res.status(400).json({
                success: false,
                message: "You already have the membership",
            });
        }

        // Check if the user already has an active Checkout session
        if (user.stripeCheckoutSessionId) {
            return res.status(200).json({
                success: true,
                sessionId: user.stripeCheckoutSessionId,
            });
        }

        // Create a new Checkout session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: membership.membership_name,
                        description: membership.membership_description,
                    },
                    unit_amount: membership.membership_price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/profile', // Redirect URL after successful payment
            cancel_url: 'http://localhost:3000/plans',
        });

        // Save the session ID to the user in your database
        user.stripeCheckoutSessionId = stripeSession.id;
        await user.save();

        // Respond with the session ID
        res.status(200).json({
            success: true,
            sessionId: stripeSession.id,
        });
    } catch (error) {
        console.error('Error in buyMembership:', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateMembership = async (req, res) => {
    try {
        
        const { membership_name } = req.body;
        const {token} = req.cookies;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne(decoded._id);
        const membership = await Memberships.findOne({ membership_name: membership_name });
        
        const sig = req.headers['stripe-signature'];
        let event;

        try {
            
            event = stripe.webhooks.constructEvent(req.rawBody, sig, 'whsec_d9b0cc47c810a6254a6bfb0c65731fdf82f5c43e46ceb24ddc949f575dd78e5a');
            
        } catch (err) {
            
            return res.status(400).json({ success: false, message: `Webhook Error: ${err.message}` });
        }
        
        if (event.type === 'checkout.session.completed') {
            // Handle successful payment
            user.membership = membership.membership_name;
            await user.save();
            
            res.status(200).json({
                success: true,
                message: "Bought new membership",
            });
        } else {
            // Handle other webhook events
            
            res.status(200).json({
                success: true,
                message: "Webhook received successfully",
            });
        }
    } catch (error) {
        // Handle other errors
        console.error('Error updating membership:', error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



exports.check_membership_level = async (req, res) => {

    try {
        const user = await User.findOne(req.user._id);
        const membership = user.membership;
        res.status(200).json({
            success: true,
            message: membership
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}