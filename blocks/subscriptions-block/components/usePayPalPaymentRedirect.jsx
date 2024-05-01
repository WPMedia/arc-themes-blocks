import { useState, useEffect } from "react";

import { useSales, useIdentity } from "@wpmedia/arc-themes-components";
import { ARCXP_ORDERNUMBER, RECAPTCHA_TOKEN } from "../utils/constants";

const usePayPalPaymentRedirect = (paypal, token, successURL, loginURL) => {
	const { Sales } = useSales();
    const { Identity } = useIdentity();

	const [error, setError] = useState();
	const [isCheckingPaypal, setIsCheckingPaypal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
		const isUserLoggedIn = async () => {
           const userLoggedIn = await Identity.isLoggedIn()
			setIsLoggedIn(userLoggedIn);
            if(!userLoggedIn){
                window.location.href = loginURL;
            }
		};

		isUserLoggedIn();
	}, [Identity]);

	useEffect(() => {
        const callFinalizePayment = async () =>{
            setIsCheckingPaypal(true);
			const orderNumberPayPal = localStorage[ARCXP_ORDERNUMBER];
			const recaptchaToken = localStorage.getItem(RECAPTCHA_TOKEN);
			if (orderNumberPayPal) {
                try{
                    await Sales.finalizePayment(
                        orderNumberPayPal,
                        paypal?.paymentMethodID,
                        token,
                        null,
                        recaptchaToken,
                    )
                    localStorage.removeItem(ARCXP_ORDERNUMBER);
                    window.location.href = successURL;
                }catch(e){
                    setError(e);
                    setIsCheckingPaypal(false);
                }
			}
        }

		if (paypal?.paymentMethodID && token && isLoggedIn) {
            callFinalizePayment();
		}
	}, [paypal, token, isLoggedIn]);

	return { error, isCheckingPaypal };
};

export default usePayPalPaymentRedirect;
