import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  MapPin,
  Minus,
  Plus,
  Clock,
  Mail,
  Truck,
  ShieldCheck,
  CheckCircle,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { Product, formatCurrency } from "./Shop";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { BRAND } from "@/lib/colors";

// ✅ Validation Schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  address: yup
    .string()
    .matches(/^[a-zA-Z0-9\s,.\-\/]+$/, "Special characters not allowed")
    .required("Address is required"),
  city: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, "PIN must be 6 digits")
    .required("PIN code is required"),
});

// ✅ Helper: block invalid keystrokes
const allowOnlyLetters = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/^[a-zA-Z\s]$/.test(e.key) &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
  ) {
    e.preventDefault();
  }
};

const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/^[0-9]$/.test(e.key) &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
  ) {
    e.preventDefault();
  }
};

const allowAddressChars = (
  e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  if (
    !/^[a-zA-Z0-9\s,.\-\/]$/.test(e.key) &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
  ) {
    e.preventDefault();
  }
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product as Product;

  const [quantity, setQuantity] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: BRAND.bgSoft }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND.dark }}>
          Your Cart is Empty
        </h2>
        <button
          onClick={() => navigate("/")}
          style={{ background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)` }}
          className="text-white px-6 py-2 rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalAmount = product.currentPrice * quantity;

  const onSubmit = async (data: any) => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...data,
      product: {
        title: product.title,
        model: product.model,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.currentPrice,
      },
      quantity,
      amount: totalAmount,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (result.success) {
        toast.success("🎉 Order placed! Confirmation email sent.");
        setTimeout(() => {
          navigate("/order-success", { state: result.order });
        }, 1200);
      } else {
        toast.error(result.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFocusRing = `focus:ring-2 focus:ring-[${BRAND.primary}]/40`;

  return (
    <div className="min-h-screen pb-12 pt-8" style={{ background: BRAND.bgSoft }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mt-12 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: BRAND.dark }}>Checkout</h1>
          <p className="mb-8" style={{ color: BRAND.slate400 }}>
            Complete your purchase details below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN: Forms */}
            <div className="flex-grow space-y-6 lg:w-2/3">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: `1px solid ${BRAND.slate100}` }}>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-6" style={{ color: BRAND.dark }}>
                  <User className="w-5 h-5" style={{ color: BRAND.primary }} /> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("fullName")}
                      onKeyDown={allowOnlyLetters}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.fullName ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.fullName ? undefined : BRAND.slate100, ...(!errors.fullName ? { '--tw-ring-color': `${BRAND.primary}66` } as any : {}) }}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.email ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.email ? undefined : BRAND.slate100 }}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1 md:col-span-2 lg:col-span-1">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      {...register("mobile")}
                      onKeyDown={allowOnlyNumbers}
                      maxLength={10}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.mobile ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.mobile ? undefined : BRAND.slate100 }}
                    />
                    {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile.message}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: `1px solid ${BRAND.slate100}` }}>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-6" style={{ color: BRAND.dark }}>
                  <MapPin className="w-5 h-5" style={{ color: BRAND.primary }} /> Delivery Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1 md:col-span-3">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>Complete Address *</label>
                    <textarea
                      rows={3}
                      placeholder="House/Flat No., Building, Street, Area, Landmark"
                      {...register("address")}
                      onKeyDown={allowAddressChars}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                        errors.address ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.address ? undefined : BRAND.slate100 }}
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>City *</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      {...register("city")}
                      onKeyDown={allowOnlyLetters}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.city ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.city ? undefined : BRAND.slate100 }}
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                  </div>

                  <div className="space-y-1 relative">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>State *</label>
                    <select
                      {...register("state")}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white ${
                        errors.state ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.state ? undefined : BRAND.slate100 }}
                    >
                      <option value="">Select state</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="DL">Delhi</option>
                      <option value="MH">Maharashtra</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 bottom-3 pointer-events-none" style={{ color: BRAND.slate400 }} />
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium" style={{ color: BRAND.darkMid }}>PIN Code *</label>
                    <input
                      type="text"
                      placeholder="Enter PIN code"
                      {...register("pinCode")}
                      onKeyDown={allowOnlyNumbers}
                      maxLength={6}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.pinCode ? "border-red-400 bg-red-50" : ""
                      }`}
                      style={{ borderColor: errors.pinCode ? undefined : BRAND.slate100 }}
                    />
                    {errors.pinCode && <p className="text-xs text-red-500 mt-1">{errors.pinCode.message}</p>}
                  </div>
                </div>
              </div>

              {/* Terms and Checkout Button */}
              <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: `1px solid ${BRAND.slate100}` }}>
                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded"
                    style={{ accentColor: BRAND.primary }}
                  />
                  <span className="text-sm" style={{ color: BRAND.slate400 }}>
                    I agree to the Terms & Conditions, Privacy Policy, and Return Policy *
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!agreedToTerms || isSubmitting}
                  className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-200"
                  style={{
                    background: agreedToTerms && !isSubmitting
                      ? `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`
                      : BRAND.slate100,
                    color: agreedToTerms && !isSubmitting ? BRAND.white : BRAND.slate400,
                    boxShadow: agreedToTerms && !isSubmitting ? `0 8px 24px ${BRAND.primary}33` : 'none',
                    cursor: agreedToTerms && !isSubmitting ? 'pointer' : 'not-allowed',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Placing Order...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: `1px solid ${BRAND.slate100}` }}>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-6" style={{ color: BRAND.dark }}>
                  <ShoppingCart className="w-5 h-5" style={{ color: BRAND.primary }} /> Order Summary
                </h2>

                <div className="flex gap-4 mb-6 pb-6" style={{ borderBottom: `1px solid ${BRAND.slate100}` }}>
                  <div className="w-20 h-20 rounded-lg p-2 flex items-center justify-center flex-shrink-0" style={{ background: BRAND.primaryPale }}>
                    <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2 leading-tight mb-1" style={{ color: BRAND.dark }}>{product.title}</h3>
                    <p className="text-xs mb-2" style={{ color: BRAND.slate400 }}>Model: {product.model}</p>
                    <span className="text-[10px] border px-2 py-1 rounded-full" style={{ borderColor: BRAND.slate100, color: BRAND.slate400 }}>{product.brand}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6 pb-6 text-sm" style={{ borderBottom: `1px solid ${BRAND.slate100}` }}>
                  <div className="flex justify-between items-center">
                    <span style={{ color: BRAND.slate400 }}>Price per unit</span>
                    <span className="font-medium" style={{ color: BRAND.dark }}>{formatCurrency(product.currentPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: BRAND.slate400 }}>Quantity</span>
                    <div className="flex items-center gap-3 border rounded-lg px-2 py-1" style={{ borderColor: BRAND.slate100 }}>
                      <button type="button" onClick={decreaseQty} className="p-1" style={{ color: BRAND.slate400 }}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium w-4 text-center" style={{ color: BRAND.dark }}>{quantity}</span>
                      <button type="button" onClick={increaseQty} className="p-1" style={{ color: BRAND.slate400 }}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: BRAND.slate400 }}>Installation</span>
                    <span className="font-semibold text-green-600 text-xs">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: BRAND.slate400 }}>Delivery</span>
                    <span className="font-semibold text-green-600 text-xs">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold" style={{ color: BRAND.dark }}>Total Amount</span>
                  <span className="font-bold text-xl" style={{ color: BRAND.primary }}>{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* What You Get Card */}
              <div className="bg-white rounded-xl shadow-sm p-6" style={{ border: `1px solid ${BRAND.slate100}` }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: BRAND.dark }}>What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm" style={{ color: BRAND.darkMid }}>
                    <Truck className="w-4 h-4" style={{ color: BRAND.primary }} /> Free delivery across India
                  </li>
                  <li className="flex items-center gap-3 text-sm" style={{ color: BRAND.darkMid }}>
                    <ShieldCheck className="w-4 h-4" style={{ color: BRAND.primary }} /> Free professional installation
                  </li>
                  <li className="flex items-center gap-3 text-sm" style={{ color: BRAND.darkMid }}>
                    <CheckCircle className="w-4 h-4" style={{ color: BRAND.primary }} /> {product.warranty} comprehensive
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
