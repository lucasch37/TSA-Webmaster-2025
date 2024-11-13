import ThemeToggle from "@/components/themeToggle";
import localFont from 'next/font/local'

const myFont = localFont({ src: './fonts/HomemadeApple-Regular.ttf' })


export default function Home() {
    return (
        <div className={`p-14`}>
            <p className={`text-center ${myFont.className} text-6xl`}>Sprout & About</p>
        </div>
    );
}