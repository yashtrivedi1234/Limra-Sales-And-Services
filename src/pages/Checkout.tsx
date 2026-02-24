import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, MapPin, Minus, Plus, Clock, 
  Mail, Truck, ShieldCheck, CheckCircle, ShoppingCart, ChevronDown 
} from 'lucide-react';

// Import type and format tool from the Shop page if you have them in a shared file.
// For simplicity here, we define what we need:
import { Product, formatCurrency } from './Shop'; 

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the product passed from the Shop component via router state
  const product = location.state?.product as Product;

  const [quantity, setQuantity] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // If no product was passed (e.g., user refreshed the page or typed the URL directly)
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Cart is Empty</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-[#0f2c59] text-white px-6 py-2 rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const totalAmount = product.currentPrice * quantity;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-12 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} // Goes back to the previous page
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Checkout</h1>
            <p className="text-slate-500">Complete your purchase details below</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Forms */}
          <div className="flex-grow space-y-6 lg:w-2/3">
            
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-6">
                <User className="w-5 h-5 text-slate-500" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Full Name *</label>
                  <input type="text" placeholder="Enter your full name" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email Address *</label>
                  <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1 md:col-span-2 lg:col-span-1">
                  <label className="text-sm font-medium text-slate-700">Mobile Number *</label>
                  <input type="tel" placeholder="Enter 10-digit mobile number" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-6">
                <MapPin className="w-5 h-5 text-slate-500" /> Delivery Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1 md:col-span-3">
                  <label className="text-sm font-medium text-slate-700">Complete Address *</label>
                  <textarea rows={3} placeholder="House/Flat No., Building, Street, Area, Landmark" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">City *</label>
                  <input type="text" placeholder="Enter city" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1 relative">
                  <label className="text-sm font-medium text-slate-700">State *</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                    <option value="">Select state</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="DL">Delhi</option>
                    <option value="MH">Maharashtra</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 bottom-3 text-slate-500 pointer-events-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">PIN Code *</label>
                  <input type="text" placeholder="Enter PIN code" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Terms and Checkout Button */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#0f2c59] rounded border-slate-300 focus:ring-[#0f2c59]" 
                />
                <span className="text-sm text-slate-600">
                  I agree to the Terms & Conditions, Privacy Policy, and Return Policy *
                </span>
              </label>
              <button 
                disabled={!agreedToTerms}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                  agreedToTerms 
                    ? 'bg-[#0f2c59] text-white hover:bg-[#0a1e3f] shadow-lg shadow-blue-900/20' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Pay Now with Cashfree
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:w-1/3 space-y-6">
            
            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-6">
                <ShoppingCart className="w-5 h-5 text-slate-500" /> Order Summary
              </h2>
              
              {/* Dynamic Product Info */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                  <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight mb-1">{product.title}</h3>
                  <p className="text-xs text-slate-500 mb-2">Model: {product.model}</p>
                  <span className="text-[10px] border border-slate-200 text-slate-500 px-2 py-1 rounded-full">{product.brand}</span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-100 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Price per unit</span>
                  <span className="font-medium text-slate-800">{formatCurrency(product.currentPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Quantity</span>
                  <div className="flex items-center gap-3 border border-slate-200 rounded-lg px-2 py-1">
                    <button onClick={decreaseQty} className="text-slate-400 hover:text-slate-600 p-1"><Minus className="w-3 h-3" /></button>
                    <span className="font-medium w-4 text-center">{quantity}</span>
                    <button onClick={increaseQty} className="text-slate-400 hover:text-slate-600 p-1"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Installation</span>
                  <span className="font-semibold text-green-600 text-xs">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Delivery</span>
                  <span className="font-semibold text-green-600 text-xs">FREE</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Total Amount</span>
                <span className="font-bold text-xl text-slate-900">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            {/* What You Get Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">What You Get</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Truck className="w-4 h-4 text-green-600" /> Free delivery across India
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-blue-500" /> Free professional installation
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-purple-500" /> {product.warranty} comprehensive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}