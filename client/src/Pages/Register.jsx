import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://localhost:5174";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        console.log("Server response:", data);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred while registering. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-white p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.hindustantimes.com/ht-img/img/2024/09/30/1600x900/Cricket_3_1727677442716_1727677564058.jpg')",
        backdropFilter: "blur(8px)",
      }}
    >
      <Card className="w-96 shadow-xl rounded-xl p-8 bg-black bg-opacity-70 border border-gray-300 transform transition duration-300 hover:scale-105">
        <CardContent>
          <h2 className="text-4xl font-extrabold text-center mb-2 text-yellow-400 drop-shadow-xl">
            Cricxify Registration
          </h2>
          <p className="text-center text-white mb-6 text-lg">
            Join CricXify Now! Elevate Your Cricketing Experience with Exclusive Access.
          </p>
          {error && (
            <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-white text-lg font-semibold">Full Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-500 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>
            <div>
              <Label className="text-white text-lg font-semibold">Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-500 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-white text-lg font-semibold">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-500 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 shadow-md"
                />
              </div>
              <div>
                <Label className="text-white text-lg font-semibold">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-500 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 shadow-md"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-md hover:bg-blue-800 transition shadow-md hover:shadow-lg"
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-white mb-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Login here
                </Link>
              </p>
              <p className="text-white">
                <Link to="/" className="text-blue-400 hover:underline">
                  Return to homepage
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
