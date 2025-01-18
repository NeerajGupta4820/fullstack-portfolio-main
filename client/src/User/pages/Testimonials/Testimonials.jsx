import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { MainHeading } from "../../components";
import TestimonialsCard from './TestimonialsCard';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTestimonials } from "../../../redux/actions/testimonial";

import './swiper.css'; // Ensure this file has correct styles if you're using custom CSS

const Testimonials = () => {
    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch();
    const { testimonials } = useSelector(state => state.testimonial);

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getTestimonials());
    }, [dispatch]);

    ////////////////////////////// RENDER ////////////////////////////////////////
    return (
        <>
            <motion.section
                whileInView={{ opacity: [0, 1] }}
                animate={{ y: [0, 1] }}
                transition={{ duration: 0.3, delayChildren: 0.5 }}
                name="testimonials"
                className="flex flex-col mb-[10rem]"
            >
                <div className="w-full flex justify-center">
                    <MainHeading
                        forwardHeading='Testimonials'
                        small
                        backHeading='Testimonials'
                        detail='See what my satisfied clients have to say about my services. Partner with me to bring your web projects to life!'
                    />
                </div>

                <Swiper
                    grabCursor={true}
                    centeredSlides={false}  // No centering of slides
                    slidesPerView={1}       // Show two slides at a time
                    spaceBetween={20}       // Add some space between slides
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="w-full py-[50px]"
                >
                    {
                        testimonials.length > 0 ? (
                            testimonials.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <TestimonialsCard
                                        content={testimonial.content}
                                        name={testimonial.name}
                                        designation={testimonial.designation}
                                        image={testimonial.image}
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <div className="flex justify-center items-center h-[200px] text-gray-500">
                                    No testimonials available.
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </motion.section>
        </>
    );
}

export default Testimonials;
