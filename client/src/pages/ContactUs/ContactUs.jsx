import React from "react";
import Phone from "../../assets/telephone.png"
import { motion } from 'framer-motion'

const ContactUs = () => {
    return (
        <>
            <div className="flex flex-col items-center text-sm mt-10">
                <p className="text-2xl mb-5 text-primary font-medium pb-2 underline">
                    Contact Us
                </p>
                <h1 className="text-4xl font-semibold text-secondary pb-4">
                    Get in touch with us
                </h1>
                <p className="text-sm text-gray-500 text-center pb-10">
                    Have questions about our rental process, your orders, or just want to say hi?
                    <br />
                    We’re always here to help you look your best without the hassle. <br />Reach out to us anytime — our friendly support team will get back to you as soon as possible!
                </p>
            </div>
            <motion.form
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="flex flex-col items-center text-sm mt-10">
                <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                    <div className="w-full">
                        <label className="text-black/70" htmlFor="name">
                            Your Name
                        </label>
                        <input
                            className="h-12 p-2 mt-2 w-full border border-secondary/30 rounded outline-none focus:border-secondary"
                            type="text"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="text-black/70" htmlFor="name">
                            Your Email
                        </label>
                        <input
                            className="h-12 p-2 mt-2 w-full border border-secondary/30 rounded outline-none focus:border-secondary"
                            type="email"
                            required
                        />
                    </div>
                </div>

                <div className="mt-6 w-[350px] md:w-[700px]">
                    <label className="text-black/70" htmlFor="name">
                        Message
                    </label>
                    <textarea
                        className="w-full mt-2 p-2 h-40 border border-secondary/30 rounded resize-none outline-none focus:border-secondary"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="mt-5 bg-primary hover:bg-secondary text-white h-12 w-56 px-4 rounded active:scale-95 transition"
                >
                    Send Message
                </button>
            </motion.form>
            <motion.div
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                transition={{
                    delay: 2,
                    duration: 1,
                }}
                viewport={{ once: true }}
                className="absolute top-[350px] left-[500px]">
                <img src={Phone} className="w-80 " alt="" />
            </motion.div>
        </>
    );
};

export default ContactUs;
