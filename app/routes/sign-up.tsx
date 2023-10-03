import { useFetcher } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useState } from "react";
import jwt from "jsonwebtoken";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fname = String(formData.get("fname"));
  const lname = String(formData.get("lname"));
  const isBrand = Boolean(formData.get("isBrand"));
  const usertype = isBrand ? "BRAND" : "INFLUENCER";

  // Create a jwt token
  const jwtPayload = { email, usertype };
  const secretKey = "123";
  const token = jwt.sign(jwtPayload, secretKey);

  const errors: any = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (password.length < 12) {
    errors.password = "Password should be at least 12 characters";
  }

  if (!fname) {
    errors.fname = "First name is required";
  }

  if (!lname) {
    errors.lname = "Last name is required";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // Send the data to the server
  const response = await fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password, fname, lname, usertype }),
  });

  // // the backend responds with a jwt token
  // const data = await response.json();

  // // save the token in a cookie
  // const cookie = data.token;

  // // return the cookie in the response
  // return redirect("/dashboard", {
  //   headers: {
  //     "Set-Cookie": cookie,
  //   },
  // });

  // Redirect to dashboard if validation is successful
  return redirect("/dashboard");
};

export default function SignUpPage() {
  const fetcher = useFetcher<any>();
  const isSubmitting = fetcher.state === "submitting";
  const [isBrand, setIsBrand] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl mb-4">
            Create an account
          </h2>
          <fetcher.Form method="post" action="/sign-up">
            <input
              type="text"
              name="fname"
              className="input input-bordered w-full my-1"
              placeholder="First Name"
            />
            {fetcher.data?.errors?.fname ? (
              <em className="text-error text-sm">
                {fetcher.data.errors.fname}
              </em>
            ) : null}

            <input
              type="text"
              name="lname"
              className="input input-bordered w-full mt-4"
              placeholder="Last Name"
            />
            {fetcher.data?.errors?.lname ? (
              <em className="text-error text-sm">
                {fetcher.data.errors.lname}
              </em>
            ) : null}

            <input
              type="email"
              name="email"
              className="input input-bordered w-full mt-4"
              placeholder="Email"
            />
            {fetcher.data?.errors?.email ? (
              <em className="text-error text-sm">
                {fetcher.data.errors.email}
              </em>
            ) : null}

            <input
              type="password"
              name="password"
              className="input input-bordered w-full mt-4"
              placeholder="Password"
            />
            {fetcher.data?.errors?.password ? (
              <em className="text-error text-sm">
                {fetcher.data.errors.password}
              </em>
            ) : null}

            <div className="card-actions justify-between mt-6 items-center">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">I'm a brand</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    name="isBrand"
                    checked={isBrand}
                    onChange={() => setIsBrand(!isBrand)}
                    style={{
                      backgroundColor: isBrand ? "green" : "gray",
                      borderColor: isBrand ? "green" : "gray",
                    }}
                  />
                </label>
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please Wait" : "Submit"}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
