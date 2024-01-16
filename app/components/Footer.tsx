import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="my-12">
            <div className='flex gap-5 justify-center'>
                <Link href={'/'}>
                    <FaFacebookSquare />
                </Link>
                <Link href={'/'}>
                    <FaInstagram />
                </Link>
                <Link href={'/'}>
                    <FaTwitter />
                </Link>
                <Link href={'/'}>
                    <FaYoutube />
                </Link>
            </div>
            <div className='flex gap-5 font-medium text-xs justify-center my-5'>
                <Link href={'/'}>Conditions of Use</Link>
                <Link href={'/'}>Privacy & Policy</Link>
                <Link href={'/'}>Press Room</Link>
            </div>
            <div className='font-medium text-xs text-center text-slate-500'>© 2021 MovieBox by Adriana Eka Prayudha  </div>
        </footer>
    )
}

export default Footer