import logo from "../../assets/logo-new.webp";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Signup Data:", data);
        // call your API or auth logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg rounded-2xl py-8 px-4 w-116 text-center space-y-6"
            >
                <div className="flex justify-center">
                    <img src={logo} alt="" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

                {/* User name */}
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 text-start">Full Name</label>
                    <input
                        type="text"
                        placeholder="Jhon Doe"
                        {...register("username", { required: "Username is required" })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1 text-start">{errors.username.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 text-start">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 text-start">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 text-start">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Min length is 6" },
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1 text-start">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 text-start">Password</label>
                    <input
                        type="password"
                        {...register("confirmPass", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Min length is 6" },
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {errors.confirmPass && (
                        <p className="text-red-500 text-sm mt-1 text-start">{errors.confirmPass.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#019376] text-white py-2 rounded-lg cursor-pointer transition"
                >
                    Register
                </button>
                <Link to="/auth/login" className="text-[#019376]">Already have an account? Login!</Link>
            </form>
        </div>
    );
}
