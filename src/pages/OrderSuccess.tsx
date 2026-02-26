import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Phone, Mail, ArrowRight, Home, Truck, ShieldCheck, Clock } from 'lucide-react';

// Utility: format currency (same as Shop.tsx)
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

// Confetti particle component
const Confetti = () => {
  const colors = ['#0f2c59', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    size: `${6 + Math.random() * 8}px`,
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const [showConfetti, setShowConfetti] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }} className="text-2xl text-slate-800 mb-4">No Order Found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-[#0f2c59] text-white px-6 py-2 rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const formattedDate = estimatedDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const displayFont = { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap');
      `}</style>

      {showConfetti && <Confetti />}

      <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-16 pt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Success Hero */}
          <div
            className="text-center mb-10"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease',
            }}
          >
            {/* Animated checkmark */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="w-28 h-28 rounded-full bg-green-50 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                  style={{ animation: 'pulse 2s infinite' }}
                >
                  <CheckCircle
                    className="w-12 h-12 text-green-500"
                    style={{
                      opacity: animateIn ? 1 : 0,
                      transform: animateIn ? 'scale(1)' : 'scale(0)',
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                    }}
                  />
                </div>
              </div>
            </div>

            <h1
              style={{ ...displayFont, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
              className="text-slate-900 mb-3"
            >
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              Thank you <span className="font-semibold text-slate-700">{order.fullName}</span>! Your order has been confirmed and a confirmation email has been sent to{' '}
              <span className="font-semibold text-blue-600">{order.email}</span>.
            </p>
          </div>

          {/* Order ID Banner */}
          <div
            className="bg-[#0f2c59] text-white rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.2s',
            }}
          >
            <div>
              <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Order Reference</p>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }} className="text-xl text-white">{order._id || order.orderId || 'ORD-' + Date.now()}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Order Date</p>
              <p className="font-semibold text-sm">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Product Details */}
          <div
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.35s',
            }}
          >
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800 mb-5">
              <Package className="w-5 h-5 text-slate-500" /> Your Order
            </h2>
            <div className="flex gap-4 items-start">
              {order.product?.imageUrl && (
                <div className="w-20 h-20 bg-slate-50 rounded-lg p-2 flex items-center justify-center flex-shrink-0 border border-slate-100">
                  <img
                    src={order.product.imageUrl}
                    alt={order.product.title}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-1 line-clamp-2">
                  {order.product?.title}
                </h3>
                <p className="text-xs text-slate-400 mb-1">Model: {order.product?.model}</p>
                <span className="text-[10px] border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                  {order.product?.brand}
                </span>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-xs text-slate-400 mb-1">Qty: {order.quantity}</p>
                <p style={displayFont} className="text-slate-900 text-base">{formatCurrency(order.amount)}</p>
                <p className="text-[10px] text-green-600 font-medium mt-1">FREE Delivery</p>
              </div>
            </div>
          </div>

          {/* Delivery Info + Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

            {/* Estimated Delivery */}
            <div
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              style={{
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.45s',
              }}
            >
              <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800 mb-4">
                <Truck className="w-5 h-5 text-slate-500" /> Estimated Delivery
              </h2>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                <p className="text-green-600 text-xs font-medium uppercase tracking-wider mb-1">Expected By</p>
                <p style={displayFont} className="text-slate-800 text-sm leading-snug">{formattedDate}</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Order confirmed & processing
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Free professional installation included
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              style={{
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.5s',
              }}
            >
              <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800 mb-4">
                <MapPin className="w-5 h-5 text-slate-500" /> Delivery Address
              </h2>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p style={displayFont} className="text-slate-800 text-base">{order.fullName}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.state} – {order.pinCode}</p>
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone className="w-3.5 h-3.5" /> {order.mobile}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="w-3.5 h-3.5" /> {order.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.6s',
            }}
          >
            <h2 style={displayFont} className="text-xl text-slate-800 mb-5">What Happens Next?</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-slate-100" />
              <div className="space-y-5">
                {[
                  { icon: Mail, color: 'bg-blue-100 text-blue-600', title: 'Confirmation Email', desc: 'You will receive an order confirmation email shortly.' },
                  { icon: Package, color: 'bg-amber-100 text-amber-600', title: 'Order Processing', desc: 'Your order is being prepared and quality-checked.' },
                  { icon: Truck, color: 'bg-green-100 text-green-600', title: 'Out for Delivery', desc: 'We\'ll notify you when your order is dispatched.' },
                  { icon: ShieldCheck, color: 'bg-purple-100 text-purple-600', title: 'Installation', desc: 'Our technician will contact you to schedule free installation.' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 pl-0">
                    <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center flex-shrink-0 relative z-10`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="font-semibold text-slate-800 text-sm">{step.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className="text-center"
            style={{
              opacity: animateIn ? 1 : 0,
              transition: 'all 0.6s ease 0.7s',
            }}
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-[#0f2c59] text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#0a1e3f] transition-all duration-200 shadow-lg shadow-blue-900/20 group"
            >
              <Home className="w-4 h-4" />
              Continue Shopping
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-slate-400 mt-3">For any queries, contact our support team</p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </>
  );
}