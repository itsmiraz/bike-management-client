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
import { loginShcema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { toast } from "sonner";
import { setUser } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const Login = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginShcema>>({
    resolver: zodResolver(loginShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginShcema>) {
    toast("Logining");

    try {
      const res = await login(values).unwrap();

      dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
      toast("Logged in SuccessFully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Logged in Failded");
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
          <h2 className="text-2xl font-semibold pb-2">Login</h2>
          <Separator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            Don't have any account Regiser{" "}
            <Link to={"/auth/register"}>
              <span className="hover:underline">Here</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
