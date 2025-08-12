import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Signup() {
  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <Helmet>
        <title>Sign up | Servana</title>
        <meta name="description" content="Create your Servana account to share and receive fresh food safely." />
        <link rel="canonical" href="/auth/signup" />
      </Helmet>
      <Card className="shadow">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" placeholder="Full name" aria-label="Full name" />
          <Input type="email" placeholder="Email" aria-label="Email" />
          <Input type="password" placeholder="Password" aria-label="Password" />
          <Button className="w-full">Sign up</Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account? <NavLink className="underline" to="/auth/login">Log in</NavLink>
          </p>
        </CardContent>
      </Card>
      <p className="mt-4 text-xs text-muted-foreground">
      </p>
    </main>
  );
}
