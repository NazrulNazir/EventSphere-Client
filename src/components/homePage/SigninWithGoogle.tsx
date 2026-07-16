'use client'
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const SigninGoogle = () => {

    const router = useRouter();

    const handleGoogleSignin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });

        if(data){
            toast.success('Login with google successfully.');
            router.push('/dashboard')
        }else{
            toast.error('Login Faild.')
        }
    }

    return (
        <div className='mt-6'>
            {/* <button onClick={handleGoogleSignin} className='btn w-full flex justify-center items-center gap-2 text-[15px]'><FcGoogle />Signin with Google</button> */}
            <Button onClick={handleGoogleSignin} type="button" variant="outline" className="h-11 w-full">
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
        </div>
    )
}

export default SigninGoogle
