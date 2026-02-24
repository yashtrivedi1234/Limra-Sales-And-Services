import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface CTAProps {
  phoneNumber?: string;
  onConsultationClick?: () => void;
}

const CTASection: React.FC<CTAProps> = ({ 
  phoneNumber = "+91-9236477974", 
  onConsultationClick 
}) => {
  return (
    <section className="w-full bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[2rem] p-8 md:p-16 shadow-sm hover:shadow-md transition-shadow duration-300">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              Ready to Transform <span className="text-emerald-600">Your Business?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Let's discuss how our digital signage solutions can elevate your brand presence and engage your customers in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onConsultationClick}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-200"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 hover:border-emerald-600 hover:text-emerald-700 text-slate-700 font-bold rounded-2xl transition-all"
              >
                <Phone className="w-5 h-5" />
                Call {phoneNumber}
              </a>
            </div>
            
            <p className="mt-8 text-sm text-slate-400 font-medium uppercase tracking-widest">
              No strings attached • Expert Advice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;