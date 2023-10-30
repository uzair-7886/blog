import { FaCc } from 'react-icons/fa';

function Footer() {
    return (
        <div className="flex flex-col items-center text-xs md:text-sm justify-center h-16 text-gray-400">
            <div className="flex items-center">
                {/* <FaCc className="mr-2" /> */}
                <span>Copyrights Reserved!</span>
            </div>
            <a href="mailto:uzairk7886@gmail.com?subject=Contribute as an Author" className="mt-1 dark:hover:text-purple-400 hover:text-yellow-400">Contribute as an author?</a>
        </div>
    );
}

export default Footer;
