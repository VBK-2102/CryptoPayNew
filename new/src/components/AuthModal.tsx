import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

interface AuthModalProps {
  type: 'login' | 'signup' | 'forgot-password'
  onClose: () => void
  onSwitchType: (type: 'login' | 'signup' | 'forgot-password') => void
}

const AuthModal: React.FC<AuthModalProps> = ({ type, onClose, onSwitchType }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup, sendPasswordReset } = useAuth()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (type === 'forgot-password') {
      if (!email) {
        toast.error('Please enter your email address')
        return
      }
    } else {
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (type === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return
        }
      }
    }

    try {
      setLoading(true)
      
      if (type === 'login') {
        await login(email, password)
        toast.success('Welcome back!')
        onClose()
      } else if (type === 'signup') {
        await signup(email, password)
        toast.success('Account created successfully!')
        onClose()
      } else if (type === 'forgot-password') {
        await sendPasswordReset(email)
        // Don't close modal, show success message
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <style>
        {`
          .auth-modal input::placeholder {
            color: rgba(255,255,255,0.5) !important;
            opacity: 1;
          }
          .auth-modal input:focus::placeholder {
            color: rgba(255,255,255,0.3) !important;
          }
        `}
      </style>
      <div 
        className="auth-modal"
      style={{
        position: 'fixed',
        inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
          padding: '1rem',
          backdropFilter: 'blur(4px)'
      }}
      onClick={handleBackdropClick}
    >
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        maxWidth: '450px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          padding: '2rem 2rem 1.5rem 2rem', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
          >
            ×
          </button>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '0.5rem',
            color: 'white',
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {type === 'login' ? '🚀 Welcome Back' : type === 'signup' ? '✨ Create Account' : '🔒 Reset Password'}
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            {type === 'login' 
              ? 'Sign in to access your crypto wallet' 
              : type === 'signup'
              ? 'Join thousands of users trading crypto'
              : 'Enter your email to receive a password reset link'
            }
          </p>
        </div>

        <div style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                color: 'white',
                fontSize: '0.95rem'
              }}>
                📧 Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{ 
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ffd700'
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.target.style.background = 'rgba(255,255,255,0.05)'
                }}
              />
            </div>

            {type !== 'forgot-password' && (
            <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontWeight: '600',
                  color: 'white',
                  fontSize: '0.95rem'
                }}>
                  🔐 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                  style={{ 
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ffd700'
                    e.target.style.background = 'rgba(255,255,255,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.target.style.background = 'rgba(255,255,255,0.05)'
                  }}
              />
            </div>
            )}

            {type === 'signup' && (
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontWeight: '600',
                  color: 'white',
                  fontSize: '0.95rem'
                }}>
                  🔒 Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  style={{ 
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ffd700'
                    e.target.style.background = 'rgba(255,255,255,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.target.style.background = 'rgba(255,255,255,0.05)'
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                color: '#1a1a2e',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)'
                }
              }}
            >
              {loading ? '⏳ Processing...' : (type === 'login' ? '🚀 Sign In' : type === 'signup' ? '✨ Create Account' : '📧 Send Reset Link')}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            {type === 'forgot-password' ? (
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', fontSize: '1rem' }}>
                  Remember your password?
                </p>
                <button
                  onClick={() => onSwitchType('login')}
                  style={{
                    color: '#ffd700',
                    background: 'rgba(255,215,0,0.1)',
                    border: '1px solid rgba(255,215,0,0.3)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,215,0,0.2)'
                    e.currentTarget.style.borderColor = 'rgba(255,215,0,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,215,0,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)'
                  }}
                >
                  ← Back to Sign In
                </button>
              </div>
            ) : (
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
              {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => onSwitchType(type === 'login' ? 'signup' : 'login')}
                style={{
                  marginLeft: '0.5rem',
                      color: '#ffd700',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                      cursor: 'pointer',
                      fontWeight: '600'
                }}
              >
                {type === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
                {type === 'login' && (
                  <div style={{ 
                    marginTop: '1.5rem', 
                    padding: '1rem', 
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <button
                      onClick={() => onSwitchType('forgot-password')}
                      style={{
                        color: '#ff6b6b',
                        background: 'rgba(255,107,107,0.1)',
                        border: '1px solid rgba(255,107,107,0.3)',
                        borderRadius: '8px',
                        padding: '0.75rem 1.5rem',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,107,107,0.2)'
                        e.currentTarget.style.borderColor = 'rgba(255,107,107,0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,107,107,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(255,107,107,0.3)'
                      }}
                    >
                      🔒 Forgot your password?
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AuthModal