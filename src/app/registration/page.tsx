"use client";

import { Formik, Form } from "formik";
import { RegistrationInitialValues } from "./Registration.data";
import { RegistrationValidation } from "./Registration.validation";
import { Button, Spinner } from "@radix-ui/themes";
import TextInput from "@/components/Formik/TextInput/TextInput";
import { Fragment } from "react/jsx-runtime";
import * as RadioGroup from "@radix-ui/react-radio-group";

const Registration = () => {
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Bagian Kiri - Gambar */}
        <div className="w-1/2 bg-purple-700 flex justify-center items-center p-8">
          <img
            src="pndf-removebg-preview.png" // Ganti dengan path gambar yang benar
            alt="Registration Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Bagian Kanan - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Registration Admin</h2>

          <Formik
            initialValues={RegistrationInitialValues}
            validationSchema={RegistrationValidation}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="grid grid-cols-2 gap-4">
                <TextInput label="Username" name="username" placeholder="Enter your username" type="text" />
                <TextInput label="Email" name="email" placeholder="Enter your email" type="email" />
                <TextInput label="Password" name="password" placeholder="Enter password" type="password" />
                <TextInput label="Confirm Password" name="confirmPassword" placeholder="Confirm your password" type="password" />
                <div className="col-span-2 flex justify-center mt-4">
                {/* <div id='section1' style={{height:"4000px", background:"black"}}>Scroll</div> */}
                  <Button type="submit" variant="soft" color="blue" className="w-full" disabled={isSubmitting} highContrast>
                    {isSubmitting ? (
                      <Fragment>
                        <Spinner size="2" /> Processing...
                      </Fragment>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
