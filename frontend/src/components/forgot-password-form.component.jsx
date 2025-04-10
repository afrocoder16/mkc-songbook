import { Label, TextInput, Button } from "flowbite-react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { formButtonTheme } from "../config/button-theme.config";
import { useSelector } from "react-redux";

import sendIcon from "../assets/send.svg";
import { requestOTP } from "../utils/api/user-api.util";
import store from "../store/store";
import { resetAuth, setForgotPassEmail } from "../store/slices/user.slice";
import CustomTailSpin from "./custom-tail-spin.component";

/**
 * Form component for initiating password reset process
 * Represents step 1 of the password reset flow
 * Allows users to enter their email to receive a reset code
 * @returns {JSX.Element} Forgot password form component
 */
const ForgotPasswordForm = () => {
    const error = useActionData();
    const navigation = useNavigation();
    const email = useSelector((store) => store.user.forgotEmail);
    return (
        <Form
            className="flex-1 flex flex-col gap-7 justify-center text-baseblack overflow-auto"
            method="POST"
            action="/auth/forgot-password"
        >
            <div className="flex flex-col gap-1">
                <span className="text-neutrals-800">Step 1 of 2</span>
                <h3 className="text-2xl font-bold">Reset Password</h3>
                <p className="text-sm text-neutrals-800">
                    We'll send you a code to your email to reset your password.
                </p>
            </div>
            <div className="flex flex-col pt-3.5 gap-5 items-stretch">
                <div className="flex flex-col pb-10 gap-1.5">
                    <Label htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        color={error?.message ? "failure" : ""}
                        placeholder="youremail@company.com"
                        defaultValue={email}
                        helperText={
                            <span className="text-sm">{error?.message}</span>
                        }
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <Button
                        theme={formButtonTheme}
                        size="lg"
                        className="bg-secondary focus:ring-0"
                        type="submit"
                        isProcessing={navigation.state === "submitting"}
                        processingSpinner={<CustomTailSpin small white />}
                    >
                        Send Code
                        <img className="ml-2.5" src={sendIcon} alt="" />
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default ForgotPasswordForm;

/**
 * Action handler for the forgot password form submission
 * Requests an OTP to be sent to the provided email
 * @param {Object} params - Parameters object containing the request
 * @param {Request} params.request - Form submission request object
 * @returns {Promise<Response>} Redirects to verification page on success, returns validation errors otherwise
 */
export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");

    try {
        const data = await requestOTP(email, true);
        if (!data.success)
            throw { message: "An unexpected error occurred.", status: 500 };
        store.dispatch(resetAuth());
        store.dispatch(setForgotPassEmail(email));
        return redirect("/auth/verify");
    } catch (error) {
        if (error.status === 400) return { message: error.message };
        throw error;
    }
};
