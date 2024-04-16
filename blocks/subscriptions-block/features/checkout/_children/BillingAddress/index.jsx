import React, { useEffect, useRef, useState } from "react";

import { usePhrases, Input, Button, Stack } from "@wpmedia/arc-themes-components";
import countryCodes from "../../../../components/ContactInfo/countryCodes";
import listOfStates from "./listOfStates";

export const ARCXP_BILLING_ADDRESS = "ArcXP_billingAddress"

const BillingAddress = ({ Sales, user, setError, setOrder, captchaToken, billingAddress, setBillingAddress, className, setIsOpen, setIsComplete, resetRecaptcha, setResetRecaptcha, children }) => {
	const formRef = useRef();
	const entriesRef = useRef({});
  const [isUS, setIsUS] = useState(false);
  const [isValid, setIsValid] = useState(formRef?.current?.checkValidity());

	if (billingAddress) {
		if(!entriesRef.current.line1) entriesRef.current.line1 = billingAddress.line1 ? billingAddress.line1 : "";
		if(!entriesRef.current.line2) entriesRef.current.line2 = billingAddress.line2 ? billingAddress.line2 : "";
		if(!entriesRef.current.region) entriesRef.current.region = billingAddress.region ? billingAddress.region : "";
		if(!entriesRef.current.country) entriesRef.current.country = billingAddress.country ? billingAddress.country : "";
		if(!entriesRef.current.locality) entriesRef.current.locality = billingAddress.locality ? billingAddress.locality : "";
		if(!entriesRef.current.postal) entriesRef.current.postal = billingAddress.postal ? billingAddress.postal : "";
	}

  useEffect(() => {
    const check = formRef?.current?.checkValidity();
    setIsValid(check)
		if(entriesRef.current?.country === "US") setIsUS(true);
  }, [])

	const handleSubmit = async (event) => {
		event.preventDefault();
		const valid = formRef.current.checkValidity();
		if (valid) {
      setBillingAddress(entriesRef.current);
      localStorage.setItem(ARCXP_BILLING_ADDRESS, JSON.stringify(entriesRef.current));
      setIsOpen(state => ({...state, billingAddress: false, payment: true}));
			setIsComplete(state => ({...state, billingAddress: true}))
			try {
				const order = await Sales.createNewOrder(entriesRef.current, user?.email, null, user?.firstName, user?.lastName, user?.secondLastName, null, captchaToken);
				setOrder(order);
			} catch (e) {
				setResetRecaptcha(!resetRecaptcha);
				setError(e)
				setResetRecaptcha(!resetRecaptcha);
			}
		}
	};

	const handleInputChange = (name, entry) => {
    const valid = formRef.current.checkValidity();
    if(isValid !== valid) setIsValid(valid);
    if(name === "country") {
      if (entry.value === "US") {
        setIsUS(true);
      } else {
        setIsUS(false);
      }
    }
		entriesRef.current[name] = entry.value;
	};

	const phrases = usePhrases();

	const getTranslatedCountries = countryCodes.map((entry) => ({
		label: phrases.t(entry.key),
		value: entry.code,
	}));

	return (
		<form onSubmit={handleSubmit} ref={formRef} className={`${className}__billing-address`} data-testid="billing-address">
			<Stack direction="vertical" gap="16px" className={`${className}__billing-address-form-div`}>
				<Input
					label={phrases.t("checkout-block.address1")}
					name="line1"
					required
          defaultValue={billingAddress.line1 ?? ''}
					onChange={(value) => {
						handleInputChange("line1", value);
					}}
					showDefaultError={false}
					type="text"
					validationErrorMessage={phrases.t("checkout-block.address1-validation")}
				/>
        <Input
					label={phrases.t("checkout-block.address2")}
					name="line2"
          defaultValue={billingAddress.line2 ?? ''}
					onChange={(value) => {
						handleInputChange("line2", value);
					}}
          placeholder={phrases.t("checkout-block.address2-placeholder")}
					showDefaultError={false}
					type="text"
				/>
				<Stack className={`${className}__billing-address-input-div`}>
					<Input
						label={phrases.t("checkout-block.country-region")}
						name="country"
						required
						defaultValue={billingAddress.country ?? ''}
						onChange={(value) => {
							handleInputChange("country", value);
						}}
						showDefaultError={false}
						options={getTranslatedCountries}
						type="select"
						validationErrorMessage={phrases.t("checkout-block.country-validation")}
					/>
					<Input
						label={phrases.t("checkout-block.city")}
						name="locality"
						required
						defaultValue={billingAddress.locality ?? ''}
						placeholder={phrases.t("checkout-block.city-placeholder")}
						onChange={(value) => {
							handleInputChange("locality", value);
						}}
						showDefaultError={false}
						type="text"
						validationErrorMessage={phrases.t("checkout-block.city-validation")}
					/>
				</Stack>
				<Stack className={`${className}__billing-address-input-div`}>
					<Input
						label={phrases.t("checkout-block.state")}
						name="region"
						required
						defaultValue={billingAddress.region ?? ''}
						onChange={(value) => {
							handleInputChange("region", value);
						}}
						options={listOfStates}
						showDefaultError={false}
						type={isUS ? "select" : "text"}
						validationErrorMessage={phrases.t("checkout-block.state-validation")}
					/>
					<Input
						label={phrases.t("checkout-block.zip-code")}
						name="postal"
						required
						defaultValue={billingAddress.postal ?? ''}
						onChange={(value) => {
							handleInputChange("postal", value);
						}}
						showDefaultError={false}
						type="text"
						validationErrorMessage={phrases.t("checkout-block.zip-code-validation")}
					/>
				</Stack>
			</Stack>

			{children}
			<Button size="medium" variant="primary" disabled={!isValid ? true : null} fullWidth type="submit" >
				<span>{phrases.t("checkout-block.continue")}</span>
			</Button>
		</form>
	);
};

export default BillingAddress;