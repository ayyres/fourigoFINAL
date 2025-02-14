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
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Registration Siswa</h2>

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
                <TextInput label="Name" name="Name" placeholder="Enter your full name" type="text" />
                <TextInput label="Username" name="username" placeholder="Choose a username" type="text" />
                <TextInput label="Date of Birth" name="dateOfBirth" type="date" />
                <TextInput label="Email" name="email" placeholder="Enter your email" type="email" />
                <TextInput label="Address" name="address" placeholder="Enter your address" type="text" />
                <TextInput label="Phone Number" name="phoneNumber" placeholder="Enter phone number" type="text" />
                <TextInput label="Password" name="password" placeholder="Enter password" type="password" />
                <TextInput label="Confirm Password" name="confirmPassword" placeholder="Confirm your password" type="password" />
                

                {/* Radio Group untuk Gender */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Gender</label>
                  <RadioGroup.Root
                    className="flex gap-4"
                    value={values.gender}
                    onValueChange={(value) => setFieldValue("gender", value)}
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroup.Item
                        className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center"
                        value="Laki-laki"
                      >
                        <div className={values.gender === "Laki-laki" ? "w-3 h-3 bg-blue-500 rounded-full" : ""}></div>
                      </RadioGroup.Item>
                      <span className="text-gray-800">Laki-laki</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroup.Item
                        className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center"
                        value="Perempuan"
                      >
                        <div className={values.gender === "Perempuan" ? "w-3 h-3 bg-pink-500 rounded-full" : ""}></div>
                      </RadioGroup.Item>
                      <span className="text-gray-800">Perempuan</span>
                    </label>
                  </RadioGroup.Root>
                </div>
                <TextInput label="School Name" name="class" placeholder="Enter your school name " type="text" />
                <select name="Kompetensi Keahlian">
                  <option value="Teknik Informatika"> Teknik Informatika</option>
                  <option value="Sistem Informatika"> Sistem Informatika</option>
                  <option value="Administrasi"> Administrasi</option>
                </select>
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
