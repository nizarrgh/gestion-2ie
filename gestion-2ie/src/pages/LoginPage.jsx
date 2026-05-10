import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Connexion</h2>

                {error && <p className="login-error">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="exemple@mail.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
}