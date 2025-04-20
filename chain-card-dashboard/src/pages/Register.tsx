
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Check, User, Wallet } from "lucide-react";
import { RegisterFormData } from "@/lib/types";
import NavBar from "@/components/NavBar";

const registerFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    walletAddress: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.startsWith("0x"),
        "Ethereum wallet address must start with 0x"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      walletAddress: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration successful!",
        description: "Redirecting to your dashboard...",
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container mx-auto pt-24 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">
              Join UnchainScore to access your crypto profile
            </p>
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Fill out the form below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-muted-foreground mr-2" />
                            <Input placeholder="John Doe" {...field} />
                          </div>
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
                          <Input type="email" placeholder="your@email.com" {...field} />
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
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ethereum Wallet Address (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 text-muted-foreground mr-2" />
                            <Input placeholder="0x..." {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Register <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="#" className="text-crypto-blue hover:text-crypto-purple">
                  Log in
                </a>
              </div>
            </CardContent>
          </Card>
          
          {/* Trust indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-crypto-blue/10 rounded-full flex items-center justify-center mb-2">
                <Check className="h-5 w-5 text-crypto-blue" />
              </div>
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-crypto-blue/10 rounded-full flex items-center justify-center mb-2">
                <Check className="h-5 w-5 text-crypto-blue" />
              </div>
              <p className="text-xs text-muted-foreground">Private</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-crypto-blue/10 rounded-full flex items-center justify-center mb-2">
                <Check className="h-5 w-5 text-crypto-blue" />
              </div>
              <p className="text-xs text-muted-foreground">Free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
