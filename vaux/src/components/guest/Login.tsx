import React from 'react';
import google from '../../assets/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import signin from '../../assets/signin.svg';
import { login, userSignup } from '../../actions/APIActions';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { decodeToken } from '../../utils/common.utils';
import Loader from '../common/Loader';

function Login() {

  return (
    <div className="bg-background flex justify-center items-center h-[100%]">
      <div className="w-[60%] h-[100%] hidden lg:flex lg:justify-center lg:items-center">
        <a href="/" className="text-white m-4 font-14 back-to-homepage">
          <div className="d-flex align-items-center text-black font-semibold">
            <span className="material-icons-round md-18 text-black mr-2">{'<-'}</span>
            Back to Homepage
          </div>
        </a>
        <img className='h-[100%]' src={signin} alt="login" />
      </div>
      <LoginContent />
    </div>
  )
}

function LoginContent() {

  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('vaux-staff-token', JSON.stringify(null));
  const [userId, setUserId] = useLocalStorage('userId', JSON.stringify(null));
  const [loading, setLoading] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrMsg] = useState("");
  const [valideForm, setValidForm] = useState({
    email: true,
    password: true
  });

  const handleLogin = async (event?: any) => {
    setLoading(true);
    event.preventDefault();
    const data: any = await login({ email: email, password: password });
    let { Error, Id, Token } = data || {}
    if (Error) {
      setErrMsg(Error);
      setLoading(false);
      return
    }
    if (Token && Token?.length > 0) {
      setErrMsg("");
      setToken(JSON.stringify(Token));
      setUserId(JSON.stringify(Id));
      decodeToken(Token);
      setLoading(false);
      routeChange('/studio');
    }
  };

  const handleSignup = async (event?: any, fromGoogle?: boolean, gToken?: string | undefined) => {
    if (!fromGoogle) {
      event.preventDefault();
    }
    const data: any = await userSignup({ token: gToken });
    let { Error, Id, Token } = data || {}
    if (Error) {
      setErrMsg(Error);
      setLoading(false);
      return
    }
    if (Token) {
      setErrMsg("");
      setUserId(JSON.stringify(Id));
      setToken(JSON.stringify(Token));
      decodeToken(Token);
      setLoading(false);
      routeChange('/studio');
    }
  };

  const handleEmailInput = (value: string) => {
    setEmail(value)
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.length === 0) {
      setValidForm((prev) => { return { ...prev, email: true } })
      return
    }
    if (value.match(validRegex)) {
      setValidForm((prev) => { return { ...prev, email: true } })
    } else {
      setValidForm((prev) => { return { ...prev, email: false } })
    }
  }
  const handlePasswordInput = (value: string) => {
    setPassword(value)
    if (value.length === 0) {
      setValidForm((prev) => { return { ...prev, password: true } })
      return
    }
    if (value.length >= 4) {
      setValidForm((prev) => { return { ...prev, password: true } })
    } else {
      setValidForm((prev) => { return { ...prev, password: false } })
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      handleSignup(null, true, tokenResponse?.access_token)
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const routeChange = (path: string, params?: any) => {
    navigate(path, { state: params });
  }

  return (
    <>
      {loading && <Loader />}
      <div className="lg:py-12 lg:px-20 md:p-32 sm:p-20 p-8 w-full lg:w-[40%] h-[100%] flex flex-col justify-center overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-12 sm:mb-16 text-center">Login to VOAUX</h1>
        <div className='flex flex-col gap-3 items-center'>
          {/* <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
          <button className='w-full flex justify-center border border-solid border-indigo rounded-xmd py-2 px-3 focus:outline-none text-black hover:bg-button-hover' onClick={() => {setLoading(true); googleLogin()}}>
            <img src={google} alt="google" className='w-6 h-6 mx-4' />
            <span>Sign In with Google</span>
          </button>
          <div className='text-center'><span className='text-indigo text-xl font-normal'>OR</span></div>
          <div className='w-full'>
            <form onSubmit={(event: any) => handleLogin(event)}>
              {errorMsg && <div className='font-medium text-red-600'>{errorMsg}</div>}
              <div className="mb-6 font-medium">
                <input type="text" id="email" name="email" placeholder='Email' value={email}
                  onChange={(event) => handleEmailInput(event.target.value)}
                  className={`w-full border ${!valideForm.email ? "border-red-500 focus:border-red-500" : "border-indigo "} py-2 px-3 focus:outline-none focus:border-primary bg-transparent rounded-xmd`} autoComplete="off" />
                {!valideForm.email && <span className='text-xs font-medium mt-1 text-red-600'>{"Invalid Email"}</span>}

              </div>
              <div className="mb-6 font-medium">
                <input type="password" id="password" name="password" placeholder='Password' value={password}
                  onChange={(event) => handlePasswordInput(event.target.value)}
                  className={`w-full border ${!valideForm.password ? "border-red-500 focus:border-red-500" : "border-indigo "}  py-2 px-3 focus:outline-none focus:border-primary bg-transparent rounded-xmd`} autoComplete="off" />
                {!valideForm.password && <span className='text-xs font-medium mt-1 text-red-600'>{"Password must be atleast 8 character long"}</span>}
              </div>
              <div className={`mb-6' ${(valideForm.email && valideForm.password) ? "" : "pointer-events-none opacity-50"}`}>
                <button type="submit" className="bg-primary text-white font-medium rounded-xmd py-2 px-4 w-full">Login</button>
              </div>
            </form>
          </div>
        </div>

        <div className='border-t border-t-indigo mb-8'></div>
        <div className='my-4'>
          <button type="submit" className="border border-primary font-medium py-2 px-4 w-full hover:bg-button-hover rounded-xmd"
            onClick={() => routeChange('/signup')}>CREATE AN ACCOUNT</button>
        </div>
      </div>
    </>
  )
}

export default Login