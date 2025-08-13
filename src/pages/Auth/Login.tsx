import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <Helmet>
        <title>Login | Servana</title>
        <meta name="description" content="Log in securely to your Servana account" />
        <link rel="canonical" href="/auth/login" />
      </Helmet>
      <Card className="shadow">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" aria-label="Email" />
          <Input type="password" placeholder="Password" aria-label="Password" />
          <Button className="w-full">Log in</Button>
          <p className="text-sm text-muted-foreground text-center">
            New here? <NavLink className="underline" to="/auth/signup">Create an account</NavLink>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
