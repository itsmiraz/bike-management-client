import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { registerSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useRegisterMutation } from "@/redux/feature/auth/authApi";
import { setUser } from "@/redux/feature/auth/authSlice";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    toast("Logining");

    try {
      const res = await register(values).unwrap();

      dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
      toast("Logged in SuccessFully");
      navigate("/");
    } catch (err: any) {
      console.log(err);
      toast(err?.data?.message || "Logged in Failed");
      if (err?.data) {
        toast.error(
          err?.data?.errorSource.map((errSrc: any) => errSrc?.message)
        );
      }
      // toast(err?.data.message || "Logged in Failded");
    }
  }
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <img
          src={logo}
          className="w-24 absolute left-[50%] -translate-x-[50%] top-10 mx-auto"
          alt=""
        />

        <div className="max-w-[400px] bg-gray-100 shadow-lg w-full mx-auto border rounded-lg p-4">
          <h2 className="text-2xl font-semibold pb-2">Register</h2>
          <Separator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your Full Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Type your Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Separator className="my-4" />

          <p className="text-sm text-gray-600">
            Already have a account Login{" "}
            <Link to={"/auth/login"}>
              <span className="hover:underline">Here</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
