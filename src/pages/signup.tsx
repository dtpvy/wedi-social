import { Language } from "@/components/Language";
import { ERROR_MESSAGES } from "@/constants/error";
import { TRACKING_EVENT, TRACKING_PAGE } from "@/constants/tracking";
import { trpc } from "@/utils/trpc";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
};

const Signup = () => {
  const tracking = trpc.tracking.add.useMutation();
  const signup = trpc.user.signup.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await signup.mutateAsync(data);
      notifications.show({
        message: `Account creates successfully. Hellp ${res.result}`,
        color: "green",
        icon: <IconCheck />,
      });
      tracking.mutate({
        event: TRACKING_EVENT.ENTER_SIGNUP,
        page: TRACKING_PAGE.SIGNUP,
      });
    } catch (e: any) {
      if (e.message === ERROR_MESSAGES.userExist) {
        notifications.show({
          message: "Account is already existed",
          color: "red",
          icon: <IconX />,
        });
      } else if (
        e.message.includes("Unique constraint failed on the fields: (`phone`)")
      ) {
        notifications.show({
          message: "Số diện thoại đã tồn tại",
          color: "red",
          icon: <IconX />,
        });
      } else {
        notifications.show({
          message: "Có lỗi xảy ra. Vui lòng thử lại",
          color: "red",
          icon: <IconX />,
        });
      }
    }
  };

  // useEffect(() => {
  //   tracking.mutate({
  //     event: TRACKING_EVENT.ENTER_SIGNUP,
  //     page: TRACKING_PAGE.SIGNUP,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-0 right-0 mt-10 mr-10">
        <Language />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    required
                    {...register("name")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your phone
                  </label>
                  <input
                    type="string"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your phone"
                    required
                    maxLength={10}
                    {...register("phone")}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
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
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
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
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("confirmPassword", {
                    validate: (val: string) => {
                      if (watch("password") !== val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the
                    <a
                      className="ml-1 font-medium text-green-700 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {errors.confirmPassword && (
                <div className="text-red-600 text-center my-2">
                  Your passwords do no match
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-green-700 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
