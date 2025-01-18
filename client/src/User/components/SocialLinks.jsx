import { Email, Facebook, GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { icons } from '../../data'
import { motion } from 'framer-motion'

const SocialMedia = () => {
    const socialMedia = [
        {
            name: "Facebook",
            link: "mailto:ngb3358@gmail.com",
            icon: <Email />
        },
        {
            name: "LinkedIn",
            link: "https://www.linkedin.com/in/neeraj-gupta-043595298/",
            icon: <LinkedIn />
        },
        {
            name: "Github",
            link: "https://github.com/NeerajGupta4820",
            icon: <GitHub />
        },
        
    ]

    return (
        <>
            {
                socialMedia.map((sLink, index) => (
                    <motion.a
                        whileHover={{ scale: [1, 1.2], duration: 200 }}
                        href={sLink.link}
                        target="_blank"
                        key={index}
                        className="flex justify-center items-center text-white hover:bg-black hover:text-orange w-[3rem] h-[3rem] rounded-full"
                    >
                        {sLink.icon}
                    </motion.a>
                ))
            }
        </>
    )
}

export default SocialMedia;