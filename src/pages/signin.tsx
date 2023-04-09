import { Image, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

const Signin = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();

  const error = !!router.query.error;

  const onSubmit = (data: LoginForm) => {
    signIn("credentials", { ...data, callbackUrl: "/feed" });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="no-underline flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  {...register("email")}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("password")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-green-700 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {error && (
        <Notification
          className="absolute top-0 right-0 mt-4 mr-4 z-10"
          icon={<IconX size="1.1rem" />}
          color="red"
        >
          Đăng nhập thất bại. Vui lòng thử lại.
        </Notification>
      )}
    </section>
  );
};

export default Signin;
