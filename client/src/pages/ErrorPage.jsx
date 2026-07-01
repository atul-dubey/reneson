import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, ServerCrash, HelpCircle, WifiOff, ArrowLeft, RotateCw } from 'lucide-react';

const ErrorPage = ({ type: defaultType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine type: props type, then location state type, then fallback to 404
  const errorType = defaultType || location.state?.type || '404';
  const customMessage = location.state?.message;

  const errorConfig = {
    '404': {
      title: 'Page Not Found',
      subtitle: '404 Error',
      description: "We can't seem to find the page you're looking for. It might have been moved, deleted, or never existed.",
      icon: HelpCircle,
      color: 'text-[#426369]',
      bgColor: 'bg-[#426369]/5',
      borderColor: 'border-[#426369]/10'
    },
    '500': {
      title: 'Internal Server Error',
      subtitle: '500 Error',
      description: 'Something went wrong on our servers. We are already working on fixing it. Please try again shortly.',
      icon: ServerCrash,
      color: 'text-red-500',
      bgColor: 'bg-red-50/50',
      borderColor: 'border-red-100'
    },
    '400': {
      title: 'Bad Request',
      subtitle: '400 Error',
      description: 'The server could not understand or process the request due to invalid syntax or parameters.',
      icon: AlertCircle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-100'
    },
    'network': {
      title: 'Connection Lost',
      subtitle: 'Network Error',
      description: 'Unable to connect to our servers. Please check your internet connection and try again.',
      icon: WifiOff,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50/50',
      borderColor: 'border-indigo-100'
    }
  };

  const config = errorConfig[errorType] || errorConfig['404'];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-100 p-10 text-center shadow-xl shadow-slate-100/50 space-y-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50">
        
        {/* Animated Icon Container */}
        <div className={`mx-auto w-24 h-24 ${config.bgColor} border ${config.borderColor} rounded-[2rem] flex items-center justify-center shadow-inner`}>
          <Icon className={`${config.color} animate-pulse`} size={44} />
        </div>

        {/* Title & Info */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
            {config.subtitle}
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">
            {config.title}
          </h1>
          <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-xs mx-auto">
            {customMessage || config.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            onClick={() => navigate('/')}
            className="flex-1 bg-[#426369] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#426369]/20 transition-all cursor-pointer border-none outline-none"
          >
            <ArrowLeft size={16} /> Home
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:-translate-y-1 transition-all cursor-pointer border-none outline-none"
          >
            <RotateCw size={16} /> Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
