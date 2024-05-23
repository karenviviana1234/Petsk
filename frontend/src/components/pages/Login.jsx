import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import imgLogin from './../../../public/img/imgLogin.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/user/validacion', {
                email,
                password,
            });

            const { data, status } = response;
            if (status === 200) {
                const { token, user } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                Swal.fire({
                    title: '¡Inicio de sesión exitoso!',
                    icon: 'success',
                    confirmButtonText: 'Ir al inicio',
                }).then(() => navigate('/inicio'));
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen'
            style={{ backgroundImage: `url(${imgLogin})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
        >
            <form onSubmit={handleSubmit} className='w-full max-w-sm mt-96 pt-24'>
                <div className='mb-4'>
                    <input
                        type='email'
                        id='email'
                        placeholder='Correo electrónico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-gray-300 px-3 py-2 rounded-3xl border border-gray-400 focus:outline-none ml-5'
                        style={{ height: '40px', width: '90%' }}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full bg-gray-300 px-3 py-2 rounded-3xl border border-gray-400 focus:outline-none ml-5'
                            style={{ height: '40px', width: '90%' }}
                            required
                        />
                        <div className='absolute inset-y-0 right-3 flex items-center mr-6'>
                            {showPassword ? (
                                <FaEyeSlash className='text-gray-500 cursor-pointer' onClick={handleTogglePassword} />
                            ) : (
                                <FaEye className='text-gray-500 cursor-pointer' onClick={handleTogglePassword} />
                            )}
                        </div>
                    </div>
                </div>
                <button type='submit' className='w-full bg-blue-950 rounded-3xl text-white py-2 ml-5 px-4 hover:bg-blue-900' style={{ width: '90%' }}>Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
