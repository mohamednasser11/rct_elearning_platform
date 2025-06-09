import React, { useState, useEffect } from 'react';
import './ForgotPasswordModal.css';
import { MdOutlineMail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdWarning } from "react-icons/io";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState('request_code'); // 'request_code', 'verify_code', 'create_new_password'
  const [countdown, setCountdown] = useState(0);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      switch (stage) {
        case 'request_code':
          if (email && !isSendingCode) {
            handleSendVerificationCode();
          }
          break;
        case 'verify_code':
          if (verificationCode) {
            handleVerifyCode();
          }
          break;
        case 'create_new_password':
          if (newPassword && confirmPassword) {
            handleResetPassword();
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSendingCode) {
      setIsSendingCode(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isSendingCode]);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [stage, email, verificationCode, newPassword, confirmPassword, isSendingCode]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSendVerificationCode = () => {
    if (!validateEmail(email)) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    // In a real application, you'd send an API request here
    console.log('Sending verification code to:', email);
    setIsSendingCode(true);
    setCountdown(60);
    // For demonstration, immediately move to verify code stage after sending
    // In a real app, this would happen after a successful API response
    setStage('verify_code');
  };

  const validateVerificationCode = (code) => {
    if (!code) {
      setVerificationCodeError('Verification code is required');
      return false;
    }
    if (code.length !== 6) {
      setVerificationCodeError('Verification code must be exactly 6 characters');
      return false;
    }
    if (!/^\d+$/.test(code)) {
      setVerificationCodeError('Verification code must contain only numbers');
      return false;
    }
    setVerificationCodeError('');
    return true;
  };

  const handleVerifyCode = () => {
    if (!validateVerificationCode(verificationCode)) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    // In a real application, you'd verify the code with an API request here
    console.log('Verifying code:', verificationCode);
    // For demonstration, immediately move to create new password stage after verification
    // In a real app, this would happen after a successful API response
    setStage('create_new_password');
  };

  const validatePassword = (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordRequirements(requirements);
    
    return Object.values(requirements).every(Boolean);
  };

  const handleResetPassword = () => {
    if (!validatePassword(newPassword)) {
      setPasswordError('Please meet all password requirements');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    
    // In a real application, you'd send an API request to reset password here
    console.log('Resetting password:', newPassword);
    setToastMessage('Password has been reset successfully');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>

        {stage === 'request_code' && (
          <>
            <div className="badge-container">
              <MdOutlineMail className="badge-icon mail-icon" />
            </div>
            <h2>Reset Password</h2>
            <p className="subt">Enter your email address and we'll send you a verification code to reset your password.</p>
            <div className="input-group-modal">
              <div className={`input-with-icon ${isShaking ? 'shake' : ''}`}>
                <MdOutlineMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {emailError && (
                <div className="error-popup">
                  <IoMdWarning />
                  {emailError}
                </div>
              )}
            </div>
            <button
              className="btn-modal-primary"
              onClick={handleSendVerificationCode}
              disabled={isSendingCode}
            >
              {isSendingCode ? `Resend in ${countdown}s` : 'Send Verification Code'}
            </button>
          </>
        )}

        {stage === 'verify_code' && (
          <>
            <div className="badge-container">
              <MdOutlineMail className="badge-icon mail-icon" />
            </div>
            <h2>Reset Password</h2>
            <p className="subt">Enter your email address and we'll send you a verification code to reset your password.</p>
            <div className="input-group-modal">
              <div className="input-with-icon">
                <MdOutlineMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <button
              className="btn-modal-primary"
              onClick={handleSendVerificationCode}
              disabled={isSendingCode}
            >
              {isSendingCode ? `Resend in ${countdown}s` : 'Send Verification Code'}
            </button>
            <p className="enter-code-text">Enter verification code</p>
            <div className="input-group-modal">
              <div className={`input-with-icon ${isShaking ? 'shake' : ''}`}>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                    setVerificationCode(value);
                    setVerificationCodeError('');
                  }}
                  onKeyPress={handleKeyPress}
                  maxLength={6}
                />
              </div>
              {verificationCodeError && (
                <div className="error-popup">
                  <IoMdWarning />
                  {verificationCodeError}
                </div>
              )}
            </div>
            <button
              className="btn-modal-primary"
              onClick={handleVerifyCode}
            >
              Verify Code & Continue
            </button>
          </>
        )}

        {stage === 'create_new_password' && (
          <>
            <div className="badge-container shield-badge">
              <BsShieldCheck className="badge-icon shield-icon" />
            </div>
            <h2>Create New Password</h2>
            <p className="subt">Your code has been verified! Now create your new secure password.</p>
            {passwordError && (
              <div className="error-popup">
                <IoMdWarning />
                {passwordError}
              </div>
            )}
            <div className={`input-group-modal ${isShaking ? 'shake' : ''}`}>
              <label className="input-label-modal">New Password</label>
              <div className="input-with-icon">
                <BiLockAlt className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError('');
                    validatePassword(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <IoEyeOutline />
                </span>
              </div>
              <div className="password-requirements">
                <div className={`requirement ${passwordRequirements.minLength ? 'met' : ''}`}>
                  • At least 8 characters long
                </div>
                <div className={`requirement ${passwordRequirements.hasUpperCase ? 'met' : ''}`}>
                  • At least one uppercase letter
                </div>
                <div className={`requirement ${passwordRequirements.hasLowerCase ? 'met' : ''}`}>
                  • At least one lowercase letter
                </div>
                <div className={`requirement ${passwordRequirements.hasNumber ? 'met' : ''}`}>
                  • At least one number
                </div>
                <div className={`requirement ${passwordRequirements.hasSpecialChar ? 'met' : ''}`}>
                  • At least one special character
                </div>
              </div>
            </div>
            <div className={`input-group-modal ${isShaking ? 'shake' : ''}`}>
              <label className="input-label-modal">Confirm Password</label>
              <div className="input-with-icon">
                <BiLockAlt className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  onKeyPress={handleKeyPress}
                />
                <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <IoEyeOutline />
                </span>
              </div>
            </div>
            <button
              className="btn-modal-primary"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}

      </div>

      {showToast && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordModal; 