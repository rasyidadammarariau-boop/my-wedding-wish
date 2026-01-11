import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

// Dummy credentials
const DUMMY_USERS = {
  admin: { email: "admin@weddingku.id", password: "admin123", role: "admin" },
  user: { email: "user@weddingku.id", password: "user123", role: "user" },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check dummy credentials
    if (formData.email === DUMMY_USERS.admin.email && formData.password === DUMMY_USERS.admin.password) {
      toast.success("Login berhasil sebagai Admin!");
      navigate("/dashboard?role=admin");
    } else if (formData.email === DUMMY_USERS.user.email && formData.password === DUMMY_USERS.user.password) {
      toast.success("Login berhasil!");
      navigate("/dashboard");
    } else {
      toast.error("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="font-display text-3xl font-semibold text-foreground">
              WeddingKu
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl shadow-card p-8">
          <h1 className="font-display text-2xl font-semibold text-foreground text-center mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Masuk ke akun Anda untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Ingat saya</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Lupa password?
              </a>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Masuk
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Belum punya akun?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Daftar sekarang
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center mb-3 font-medium">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                <span className="text-muted-foreground">Admin:</span>
                <code className="text-primary">admin@weddingku.id / admin123</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                <span className="text-muted-foreground">User:</span>
                <code className="text-primary">user@weddingku.id / user123</code>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
