"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

import { signIn, signUp } from "@/lib/actions/auth.action"
import { auth } from "@/firebase/client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


/**
* Define the dynamic schema for the form
* Based on the type(sign-in or sign-up)
*/
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  /**
  * Define a form
  */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  /**
  * On submit collect the data from the user and send it to the backend
  * sign-up and sign-in functionality
  */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = values;

        /**
        * Register user with the help of createUserWithEmailAndPassword from firebase/auth
        */
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        /**
        * SignUp user with the help of signUp from /lib/actions/auth.action
        */
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if (!result?.succes) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.")
        router.push("/sign-in")
        console.log('Sign up', values);
      } else {
        const { email, password } = values;

        /**
        * SignIn user with the help of signInWithEmailAndPassword from firebase/auth
        */
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        /**
        * getIdToken from the user
        */
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error('Sign in failed')
          return;
        }

        /**
        * signIn user with email and idToken with the help of signIn from /lib/actions/auth.action
        */
        await signIn({
          email, idToken
        })

        toast.success("Sign in successfully.")
        router.push("/")
        console.log('Sign up', values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error:${error}`);

    }
  }

  const isSign = type === 'sign-in'

  return (
    <div className="card-border lg:min-w-w[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={32} />
          <h2 className="text-primary-100">AI Interviewer</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSign && <FormField control={form.control} name="name" label="Name" placeholder="Your name" />}
            <FormField control={form.control} name="email" label="Email" placeholder="Your Email" />
            <FormField control={form.control} name="password" label="Password" placeholder="Your Password" />
            <Button className="btn" type="submit">{isSign ? 'Sign-in' : 'Create an Account'}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSign ? 'No account yet?' : 'Have an account already?'}
          <Link href={!isSign ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
            {!isSign ? 'sign in' : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm