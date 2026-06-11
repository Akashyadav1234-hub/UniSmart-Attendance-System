import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const isFaculty = location.pathname.includes('/faculty/login');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await axios.post('https://unismart-backend-cxir.onrender.com/api/auth/request-otp', {
          email: email
        });

        if (response.status === 200) {
          setOtpSent(true);
          setTimeout(() => {
            if (inputRefs.current[0]) inputRefs.current[0].focus();
          }, 300);
        }
      } catch (err) {
        const errMsg = err.response?.data?.message || "Network error. Is the backend running?";
        alert(errMsg);
        console.error("Failed to send OTP:", err);
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    const otpCode = otp.join('');

    try {
      const response = await axios.post('https://unismart-backend-cxir.onrender.com/api/auth/verify-otp', {
        email: email,
        otp: otpCode
      });

      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        setIsVerifying(false);
        navigate(isFaculty ? '/faculty/dashboard' : '/admin/dashboard');
      }
    } catch (err) {
      setIsVerifying(false);
      const errMsg = err.response?.data?.message || "Invalid OTP or Network Error.";
      alert(errMsg);
      console.error("Failed to verify OTP:", err);
    }
  };

  const goBack = () => {
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);

      if (pastedData.length === 6) {
        inputRefs.current[5].focus();
      } else {
        inputRefs.current[pastedData.length].focus();
      }
    }
  };

  return (
    <>
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .shadow-ambient {
            box-shadow: 0 8px 32px rgba(0, 32, 69, 0.08);
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
      `}</style>
      <div className="bg-surface-container-low min-h-screen flex text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-primary">
        <div className="flex w-full h-screen">
          <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-surface-dim items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC27D5I6hFnUZQlAJ18UDTcnwcgGZFYTNfVWgOdKpShIPDPo5ao9n3VO8mnznF1a9Xpk_h8TRYljEIhdqZurK2dFpuAcORiuHck_SGslH5C6pgtumU5heSbZO7Gwzql1q7NINvJo7ON-DqMaD53tDWf0Y6DvSQ7owz1ZlLajYduYYHOMzM6hbQQQ0BAo6EwHPNjgJrmwO0P9bZdsxfHwU4tAuOh5ykVovfl2XEb8N_J0POoiVul8etNpLA5i59auTyZMMJEJRJH4qI')" }}></div>
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm mix-blend-multiply"></div>
            <div className="relative z-10 p-margin-desktop text-on-primary flex flex-col justify-between h-full w-full max-w-2xl">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-display-lg" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                <span className="font-headline-lg text-headline-lg tracking-tight">UniSmart</span>
              </div>
              <div className="mb-xl">
                <h1 className="font-display-lg text-display-lg mb-lg">Institutional Intelligence, Unified.</h1>
                <p className="font-body-lg text-body-lg text-on-primary/80 max-w-md">Access your secure dashboard to manage faculty operations, student data, and administrative workflows with clarity and precision.</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface-container-low relative">
            <div className="absolute top-margin-mobile left-margin-mobile lg:hidden flex items-center gap-sm text-primary">
              <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              <span className="font-headline-md text-headline-md font-bold">UniSmart</span>
            </div>

            <div className="w-full max-w-[440px] bg-surface rounded-xl shadow-ambient border border-outline-variant/30 p-xl relative overflow-hidden">
              <div className="mb-xl text-center">
                <div className="w-16 h-16 bg-surface-container mx-auto rounded-full flex items-center justify-center mb-md border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">{isFaculty ? 'Faculty Portal' : 'Admin Portal'}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Secure access via institutional credentials</p>
              </div>

              {!otpSent ? (
                <form className="space-y-lg transition-all duration-300 transform opacity-100 translate-x-0 relative" onSubmit={handleSendOTP}>
                  <div className="space-y-xs">
                    <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="officialEmail">
                      Official Email Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">mail</span>
                      <input
                        className="w-full pl-12 pr-md py-3 bg-surface-container-lowest border border-outline rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow placeholder:text-outline/60"
                        id="officialEmail"
                        placeholder="faculty@institution.edu"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="w-full py-3 px-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg transition-colors flex items-center justify-center gap-xs focus:ring-2 focus:ring-offset-2 focus:ring-primary" type="submit">
                    <span>Send OTP</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <div className="text-center mt-md">
                    <a className="font-body-md text-body-md text-primary hover:underline" href="#">Having trouble accessing your account?</a>
                  </div>
                </form>
              ) : (
                <form className="space-y-lg transition-all duration-300 transform opacity-100 translate-x-0 relative" onSubmit={handleVerify}>
                  <div className="text-center mb-md">
                    <p className="font-body-md text-body-md text-on-surface-variant">We sent a 6-digit code to</p>
                    <p className="font-label-md text-label-md text-on-surface mt-1 truncate">{email}</p>
                  </div>
                  <div className="flex justify-between gap-sm mb-lg">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-14 text-center font-headline-md text-headline-md bg-surface-container-lowest border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                        maxLength="1"
                        required
                        type="number"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                      />
                    ))}
                  </div>
                  <button className={`w-full py-3 px-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg transition-colors flex items-center justify-center gap-xs focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isVerifying ? 'opacity-90 cursor-not-allowed' : ''}`} type="submit" disabled={isVerifying}>
                    {isVerifying ? (
                      <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span><span>Verifying...</span></>
                    ) : (
                      <><span className="material-symbols-outlined text-[18px]">lock_open</span><span>Verify & Login</span></>
                    )}
                  </button>
                  <div className="flex items-center justify-between mt-md">
                    <button className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface flex items-center gap-xs transition-colors" onClick={goBack} type="button">
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Back
                    </button>
                    <button className="font-body-md text-body-md text-primary hover:underline" type="button">
                      Resend Code
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="absolute bottom-margin-desktop text-center w-full max-w-[440px]">
              <p className="font-body-md text-body-md text-on-surface-variant/60">
                © 2024 UniSmart Learning Management System.<br />
                <a className="hover:text-primary transition-colors" href="#">Privacy</a> · <a className="hover:text-primary transition-colors" href="#">Terms</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
