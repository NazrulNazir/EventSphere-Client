"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { Eye, EyeOff, UserPlus, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { FcGoogle, FcRotateCamera } from "react-icons/fc";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
// import { Router } from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";

// import { Checkbox } from "@/components/ui/checkbox";
// import { PasswordStrength } from "./password-strength";

export function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    setLoading(true);

    // better-auth Register
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.name as string,
        email: userData.email as string,
        password: userData.password as string,
        image: imageUrl,
        callbackURL: "/dashboard",
      });

      if (data) {
        toast.success("Account created successfully");
        router.push("/login");
      }

      if (error) {
        toast.error(error.message ? error.message : "Something went wrong");
        return;
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
    // setLoading(false);
  };
  return (
    <Card className="surface-gradient border-border/60 shadow-2xl">
      <CardHeader className="space-y-2 text-center">
        {/* <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
          <UserPlus className="h-7 w-7 text-primary" />
        </div> */}

        <CardTitle className="font-display text-3xl">Create Account</CardTitle>

        <CardDescription>
          Join EventSphere and start managing amazing events.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* image upload */}
          <div className="mb-6 flex flex-col items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="relative">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted transition-all duration-300 hover:border-primary hover:bg-accent"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Event Image"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0"
                    />
                  </svg>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow transition hover:bg-accent"
              >
                <FcRotateCamera className="text-lg" />
              </button>
            </div>

            <h3 className="mt-4 text-base font-semibold text-foreground">
              Event Image
            </h3>

            <p className="mt-1 text-center text-sm text-muted-foreground">
              Click the image or camera icon to upload
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="h-11 pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="h-11 pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="h-11 pl-10 pr-11"
                required
              />

              {/* <PasswordStrength password={password} /> */}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="h-11 pl-10 pr-11"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {/* <div className="flex items-start gap-3">
            <Checkbox id="terms" required />

            <Label
              htmlFor="terms"
              className="text-sm leading-5 text-muted-foreground"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-primary hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </Label>
          </div> */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>

            <div className="relative flex justify-center text-xs uppercase my-3">
              <span className="bg-card px-3 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button type="button" variant="outline" className="h-11 w-full">
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
