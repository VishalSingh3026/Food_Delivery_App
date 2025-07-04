import React from 'react';
import { motion } from 'framer-motion';

const About = () => {

    return (
        <div className="bg-white dark:bg-slate-900 py-10">
            {/* About Section */}
            <div className="w-11/12 mx-auto text-center">
                {/* Title */}
                <motion.h2
                    className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    About Us
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg text-gray-800 dark:text-gray-200 mb-8 max-w-6xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    At FoodieDelivery, we are committed to providing a seamless and delightful experience for food lovers. Our platform connects you to a wide variety of restaurants and cuisines, delivering your favorite meals right to your doorstep. Whether you're craving something healthy or indulgent, we've got something for everyone.
                </motion.p>

                {/* Mission Statement */}
                <motion.h3
                    className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    Our Mission
                </motion.h3>
                <motion.p
                    className="text-lg text-gray-800 dark:text-gray-200 max-w-6xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    Our mission is simple: to make food delivery easy, fast, and enjoyable. We aim to create a platform where users can effortlessly discover, order, and enjoy the best food, all while providing exceptional customer service. Join us on this culinary journey, and let us bring the flavors of the world to your doorstep!
                </motion.p>
            </div>

            {/* Core Values Section */}
            <div className="w-11/12 mx-auto text-center mt-16 text-gray-800 dark:text-gray-200">
                <h3 className="text-3xl font-semibold mb-6">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Value 1 */}
                    <div className="p-6 bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Customer First</h4>
                        <p className="">We prioritize our customers, ensuring their needs are met with top-notch service and quality food every time.</p>
                    </div>

                    {/* Value 2 */}
                    <div className="p-6 bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Innovation</h4>
                        <p className="">We continuously innovate and improve our platform to provide a faster, more efficient delivery experience.</p>
                    </div>

                    {/* Value 3 */}
                    <div className="p-6 bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Sustainability</h4>
                        <p className="">We strive to minimize our environmental impact by promoting sustainable practices and eco-friendly packaging.</p>
                    </div>
                </div>
            </div>

            {/* Our Journey Timeline Section */}
            <div className="w-11/12 mx-auto text-center mt-16 text-gray-800 dark:text-gray-200">
                <h3 className="text-3xl font-semibold mb-6">Our Journey</h3>
                <div className="flex flex-col items-center space-y-8">
                    {/* Timeline Entry 1 */}
                    <div className="w-full max-w-5xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-[0px_0px_30px_0px_#00000024]">
                        <motion.h4
                            className="text-xl font-semibold mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            2018 - Our Founding
                        </motion.h4>
                        <p className="">
                            FoodieDelivery was founded with the goal of providing a simple yet efficient food delivery platform for customers who value convenience and quality.
                        </p>
                    </div>

                    {/* Timeline Entry 2 */}
                    <div className="w-full max-w-5xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-[0px_0px_30px_0px_#00000024]">
                        <motion.h4
                            className="text-xl font-semibold mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            2020 - Expanding Our Reach
                        </motion.h4>
                        <p className="">
                            By 2020, we expanded our services to multiple cities, bringing a wider variety of restaurants and an even faster delivery experience.
                        </p>
                    </div>

                    {/* Timeline Entry 3 */}
                    <div className="w-full max-w-5xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-[0px_0px_30px_0px_#00000024]">
                        <motion.h4
                            className="text-xl font-semibold mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            2022 - Commitment to Sustainability
                        </motion.h4>
                        <p className="">
                            We launched initiatives to reduce our carbon footprint, including eco-friendly packaging and supporting local sustainable food producers.
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className="w-11/12 mx-auto text-center mt-16 text-gray-800 dark:text-gray-200">
                <h3 className="text-3xl font-semibold mb-6">Meet Our Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg">
                        <img src="/team-member-1.jpg" alt="" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Harshvardhan</h4>
                        <p className="">Founder & CEO</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg">
                        <img src="/team-member-2.jpg" alt="" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Himanshu Singh</h4>
                        <p className="">Chief Operating Officer</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 shadow-[0px_0px_30px_0px_#00000024] rounded-lg">
                        <img src="/team-member-3.jpg" alt="" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h4 className="text-xl font-semibold mb-2">Prasoon Kumar Sharma</h4>
                        <p className="">Chief Technology Officer</p>
                    </div>
                </div>
            </div> */}

            {/* Call to Action Section */}
            {/* <div className="w-11/12 mx-auto text-center mt-16 bg-slate-500 dark:bg-slate-800 text-white py-10 rounded-lg">
                <h3 className="text-3xl font-semibold mb-4">Join the FoodieDelivery Family</h3>
                <p className="text-lg mb-6">If you're passionate about food and tech, we'd love for you to join our team. Explore exciting career opportunities and make an impact.</p>
                <button className="bg-slate-600 dark:text-gray-200 dark:bg-slate-900 p-3 rounded-md font-semibold">Apply Now</button>
            </div> */}
        </div>
    );
};

export default About;