import logo from "../../assets/Logo-new.webp";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
    };

    return (
        <div className="flex justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-xl rounded-2xl py-8 px-4 w-116 text-center space-y-6"
            >
                <div className="flex justify-center">
                    <img src={logo} alt="logo" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {/* Username */}
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 text-start">Username</label>
                    <input
                        type="text"
                        placeholder="Jhone776"
                        {...register("username", { required: "Username is required" })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1 text-start">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 text-start">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Min length is 6" },
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1 text-start">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#019376] text-white py-2 rounded-lg cursor-pointer transition"
                >
                    Login
                </button>

                <Link to="/auth/register" className="text-[#019376]">
                    Don't have an account? Signup!
                </Link>
            </form>
        </div>
    );
}
