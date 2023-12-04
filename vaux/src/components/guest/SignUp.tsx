import google from 'assets/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import signup from 'assets/signup.svg';
import { useState } from 'react';
import { userSignup } from 'actions/APIActions';
import { useNavigate } from 'react-router';
import { useCookie } from 'hooks/useCookie';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { decodeToken } from 'utils/common.utils';
import Loader from 'components/common/Loader';


function SignUp() {

    return (
        <div className="bg-background flex justify-center items-center h-[100%] overflow-auto">
            <div className="w-[60%] h-[100%] hidden lg:flex lg:justify-center lg:items-center">
                <a href="/" className="text-white m-4 font-14 back-to-homepage">
                    <div className="d-flex align-items-center text-black font-semibold">
                        <span className="material-icons-round md-18 text-black mr-2">{'<-'}</span>
                        Back to Homepage
                    </div>
                </a>
                <img className='h=[100%]' src={signup} alt="signup" />
            </div>
            <SignUpContent />
        </div>
    )
}

function SignUpContent() {

    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('vaux-staff-token', JSON.stringify(null));
    const [userId, setUserId] = useLocalStorage('userId', JSON.stringify(null));
    const [loading, setLoading] = useState(false);


    const [signupForm, setSignupForm] = useState(
        {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            privilege_type: "free"
        }
    );
    const [errorMsg, setErrMsg] = useState("");
    const [valideForm, setValidForm] = useState({
        first_name: true,
        last_name: true,
        email: true,
        password: true
    });

    const handleSignup = async (event?: any, fromGoogle?: boolean, gToken?: string | undefined) => {
        setLoading(true);
        if (!fromGoogle) {
            event.preventDefault();
        }
        const data: any = await userSignup(fromGoogle ? { token: gToken } : signupForm);
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

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            handleSignup(null, true, tokenResponse?.access_token)
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const routeChange = (path: string, params?: any) => {
        navigate(path, { state: params });
    }

    const handleNameInput = (value: string, key: string) => {
        const validRegex = /^(?=.{1,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/gm;
        if (value.length === 0) {
            setValidForm((prev) => { return { ...prev, [key]: true } })
            return
        }
        if (value.match(validRegex)) {
            setValidForm((prev) => { return { ...prev, [key]: true } })
        } else {
            setValidForm((prev) => { return { ...prev, [key]: false } })
        }
    }

    const handleEmailInput = (value: string) => {
        setSignupForm((prev) => { return { ...prev, email: value } });
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
        setSignupForm((prev) => { return { ...prev, password: value } });
        if (value.length === 0) {
            setValidForm((prev) => { return { ...prev, password: true } })
            return
        }
        if (value.length >= 8) {
            setValidForm((prev) => { return { ...prev, password: true } })
        } else {
            setValidForm((prev) => { return { ...prev, password: false } })
        }
    }

    return (
        <>
            {loading && <Loader />}
            <div className="lg:py-12 lg:px-20 md:p-32 sm:p-20 p-8 w-full lg:w-[40%] h-[100%] flex flex-col justify-center overflow-y-auto">
                <h1 className="text-3xl font-semibold mb-12 sm:mb-16 text-center">Create an Account</h1>
                <div className='flex flex-col gap-3 items-center'>
                    <button className='w-full flex justify-center border border-solid border-indigo rounded-xmd py-2 px-3 focus:outline-none text-black hover:bg-button-hover' onClick={() => googleLogin()}>
                        <img src={google} alt="google" className='w-6 h-6 mx-4' />
                        <span>Sign Up with Google</span>
                    </button>
                    <div className='text-center'><span className='text-indigo text-xl font-normal'>OR</span></div>
                    <div className='w-full'>
                        <form onSubmit={(event: any) => handleSignup(event, false, undefined)}>
                            {errorMsg && <div className='font-medium text-red-600'>{errorMsg}</div>}
                            <div className="mb-6 font-medium">
                                <input type="text" id="firstName" name="firstName" placeholder='First Name'
                                    onChange={(event) => {
                                        setSignupForm((prev) => { return { ...prev, first_name: event?.target.value } });
                                        handleNameInput(signupForm.first_name, 'first_name')
                                    }}
                                    className="w-full border border-indigo py-2 px-3 focus:outline-none focus:border-primary bg-transparent rounded-xmd" autoComplete="off" />
                                {!valideForm.first_name && <span className='text-xs font-medium mt-1 text-red-600'>{"Invalid First Name"}</span>}

                            </div>
                            <div className="mb-6">
                                <input type="text" id="lastName" name="lastName" placeholder='Last Name'
                                    onChange={(event) => {
                                        setSignupForm((prev) => { return { ...prev, last_name: event?.target.value } });
                                        handleNameInput(signupForm.last_name, 'last_name')
                                    }}                                className="w-full border border-indigo py-2 px-3 focus:outline-none focus:border-primary bg-transparent rounded-xmd" autoComplete="off" />
                                {!valideForm.last_name && <span className='text-xs font-medium mt-1 text-red-600'>{"Invalid Last Name"}</span>}
                            </div>
                            <div className="mb-6">
                                <input type="text" id="email" name="email" placeholder='Email'
                                    onChange={(event) => handleEmailInput(event.target.value)}
                                    className="w-full border border-indigo py-2 px-3 focus:outline-none focus:border-primary bg-transparent rounded-xmd" autoComplete="off" />
                                {!valideForm.email && <span className='text-xs font-medium mt-1 text-red-600'>{"Invalid Email"}</span>}

                            </div>
                            <div className="mb-6">
                                <input type="password" id="password" name="password" placeholder='Password'
                                    onChange={(event) => handlePasswordInput(event.target.value)}
                                    className="w-full border border-indigo py-2 px-3 focus:outline-none focus:border-primary bg-transparent rounded-xmd" autoComplete="off" />
                                {!valideForm.password && <span className='text-xs font-medium mt-1 text-red-600'>{"Password must be atleast 8 character long"}</span>}

                            </div>
                            <div className={`mb-6' ${(valideForm.first_name && valideForm.last_name && valideForm.email && valideForm.password) ? "" : "pointer-events-none opacity-50"}`}>
                                <button type="submit" className="bg-primary text-white font-medium rounded-xmd py-2 px-4 w-full">SIGNUP</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='border-t border-t-indigo mb-8'></div>
                <div className=''>
                    <button type="submit" className="border border-primary font-medium py-2 px-4 w-full hover:bg-button-hover rounded-xmd"
                        onClick={() => routeChange('/login')}>LOGIN</button>
                </div>
            </div>
        </>
    )
}

export default SignUp