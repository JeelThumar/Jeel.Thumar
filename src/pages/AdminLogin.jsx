import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handlePinChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        setError(false);

        // Auto focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            if (nextInput) nextInput.focus();
        }

        // Check if full pin is entered
        if (newPin.every(digit => digit !== '')) {
            const enteredPin = newPin.join('');
            if (enteredPin === '0407') {
                localStorage.setItem('isAdminAuthenticated', 'true');
                navigate('/admin/dashboard');
            } else {
                setError(true);
                // Shake effect and clear
                setTimeout(() => setPin(['', '', '', '']), 500);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            const prevInput = document.getElementById(`pin-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-black cursor-auto">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-black/5 flex flex-col items-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-8">
                    <Lock size={28} className="text-white" />
                </div>
                
                <h1 className="text-3xl font-syne font-bold mb-2">Admin Access</h1>
                <p className="text-black/60 text-center mb-10">Enter your secure PIN to access the portfolio dashboard.</p>

                <div className={`flex gap-4 mb-4 ${error ? 'animate-shake' : ''}`}>
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            id={`pin-${index}`}
                            type="password"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handlePinChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={`w-14 h-16 text-center text-2xl font-bold font-mono border-2 rounded-xl focus:outline-none transition-all ${
                                error 
                                    ? 'border-red-500 text-red-500 bg-red-50' 
                                    : 'border-black/10 focus:border-black focus:shadow-md'
                            }`}
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-medium animate-pulse">Incorrect PIN. Try again.</p>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
