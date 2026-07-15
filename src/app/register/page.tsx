import { RegisterHero } from "@/components/auth/register-hero";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <RegisterHero />

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}