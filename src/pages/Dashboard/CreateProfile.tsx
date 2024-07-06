import { FC, FormEvent, useState } from "react";
import signupImg from "@/assets/images/signup.png";
import arrowRight from "@/assets/icons/arrow-right.svg";
import googleImg from "@/assets/icons/google.svg";
import { AuthHeader, Input } from "../../components/Auth";
import { CheckboxInput } from "../../components/Auth";
import { SocialButton } from "../../components/Auth";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import logoImg from "@/assets/logo.png";


interface FormErrorState {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  tos?: string;
}

const FormArea: FC = () => {
  const [tos, setTos] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrorState>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const validated = () => {
    const errors: FormErrorState = {};

    if (!formData.first_name) {
      errors.first_name = "First name is required";
    }

    if (!formData.last_name) {
      errors.last_name = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must at least 6 chars long";
    }

    if (formData.password != formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    if(!tos){
      errors.tos = "Please consider our terms of service";
      toast.error(errors.tos);
    }

    setFormErrors(errors);

    return Object.keys(errors).length == 0;
  };

  const [isLoading, setIsLoading] = useState();
  // const navigate = useNavigate();

  const submitFormData = () => {
    setIsLoading(isLoading);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validated() && tos) {
      return submitFormData();
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <>
    <div className="px-4 py-3 flex items-center">
      <img src={logoImg} alt="" className="w-[100px]"/>
    </div>
    <div className="bg-white px-6 md:px-16 flex flex-col justify-center">
      <AuthHeader>Create your account</AuthHeader>
      <form noValidate onSubmit={handleSubmit}>
        <div className="flex items-center flex-col sm:flex-row justify-between md:space-x-3">
          <Input
            type="text"
            label="First name"
            name="first_name"
            placeholder="Enter first name"
            className="mb-2"
            errorMessage={formErrors.first_name}
            handleChange={handleChange}
          />
          <Input
            type="text"
            label="Last name"
            name="last_name"
            placeholder="Enter last name"
            className="mb-2"
            errorMessage={formErrors.last_name}
            handleChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="Email address"
            className="mb-2"
            errorMessage={formErrors.email}
            handleChange={handleChange}
          />
        </div>
        <div className="flex items-center flex-col sm:flex-row  justify-between md:space-x-3">
          <Input
            type="password"
            label="New Password"
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            errorMessage={formErrors.password}
            className="mb-2"
          />
          <Input
            type="password"
            label="Confirm password"
            name="password_confirmation"
            placeholder="Confirm Password"
            className="mb-2"
            errorMessage={formErrors.password_confirmation}
            handleChange={handleChange}
          />
        </div>

        <div className="w-full flex items-center mt-4 flex-col sm:flex-row justify-between">
          <div className="flex items-center space-x-3 ">
            {/* <input type="checkbox" name="remember" /> */}
            <CheckboxInput name="remember" active={tos} setActive={setTos} />
            <label className="text-gray-500" htmlFor="">
              I Agree with all of your Terms & Conditions
            </label>
          </div>
          <button
            type="submit"
            className="bg-main mt-5 md:mt-0 rounded-[20px] px-6 py-2 flex text-white items-center font-[600] "
          >
            Create Account
            {
              isLoading
              ? <DotLoader color="white" size={12} className="w-[1.2rem] ml-2" />
              : <img src={arrowRight} alt="" className="w-[1.2rem] ml-2" />
            }
          </button>
        </div>

        <div className="w-full border-t relative mt-8 flex justify-center">
          <span className="text-sm text-gray-600 inline-block border rounded-lg py-0 px-3 relative bg-white -top-3">
            Sign up with
          </span>
        </div>

        <div className="mt-3 flex  flex-col lg:flex-row items-center justify-center">
          <SocialButton name="Google" image={googleImg} handler={() => null} />
        </div>
      </form>
    </div>

    </>
  );
};

export default function CreateProfile() {
  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="h-full bg-[#fbf4fc] relative hidden sm:flex flex-col justify-center items-center">
        <img src={signupImg} alt="" className="w-[80%] mx-auto" />
      </div>
      <FormArea />
    </div>
  );
}
