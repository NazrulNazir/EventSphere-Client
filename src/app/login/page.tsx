import { LoginForm } from "@/components/auth/login-form";
import { RegisterHero } from "@/components/auth/register-hero";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <RegisterHero />

        <div className="flex mt-5 justify-center px-6  lg:px-10">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}