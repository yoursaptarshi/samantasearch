import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
export const createMembership= (membershipName,membershipPrice,membershipDescription)=>async(dispatch)=>{
    try {
        dispatch({
            type:"createMembershipReuest"
        })
        await axios.post("/api/v1/create-memberships",{membership_name:membershipName,membership_price:membershipPrice,membership_description:membershipDescription})
        dispatch({
            type:"createMembershipSuccess"
        })
    } catch (error) {
        dispatch({
            type:"createMembershipFailure",
            payload:error.response.data.message
        })
    }
}

export const allMemberships =()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllMembershipsRequest"
        })
       const {data} = await axios.get("/api/v1/all-memberships")
       dispatch({
        type:"GetAllMembershipsSuccess",
        payload:data.all_memberships
       })
    } catch (error) {
        dispatch({
            type:"GetAllMembershipsFailure",
            payload:error.response.data.message
        })
    }
}

export const buyMembership = (membership) => async (dispatch) => {
    try {
        dispatch({
            type: "buyMembershipRequest",
        });

        const stripe = await loadStripe('pk_test_51K7jzHSEu1sDfKjEHqOo5sOaKQEqcwEiaYWwnc1oofaq5q0V45uWPvIS2DYLRf7YqeorI57Man6bxwUpUyyL7Sgh00bUwajwHw');

        const response = await axios.post("/api/v1/buy-membership", { membership_name: membership });

        if (response.status === 200) {
            const { sessionId } = response.data;

            const stripeSession = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

            if (stripeSession.error) {
                console.error('Error redirecting to checkout:', stripeSession.error);
                dispatch({
                    type: "buyMembershipFailure",
                });
            } else {
                await axios.post("/api/v1/update-membership", { membership_name: membership });
                
                
                dispatch({
                    type: "buyMembershipSuccess",
                });
            }
        } else {
            console.error('Membership purchase failed:', response.data.message);
            dispatch({
                type: "buyMembershipFailure",
            });
        }
    } catch (error) {
        console.error('Error in buyMembership:', error.message);
        dispatch({
            type: "buyMembershipFailure",
        });
    }
};



//when we do axios.get we get many properties data is one of them.
// data: The payload returned by the server, typically containing the requested information.
// status: The HTTP status code of the response (e.g., 200, 404, 500).
// statusText: The HTTP status message corresponding to the status code (e.g., OK, Not Found, Internal Server Error).
// headers: An object containing the response headers.
// config: The configuration object used to make the request.
// request: The XMLHttpRequest object or equivalent in Node.js, providing information about the request and allowing manipulation of the request if needed.