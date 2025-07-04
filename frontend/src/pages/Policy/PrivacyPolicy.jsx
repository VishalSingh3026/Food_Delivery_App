import React from 'react';

const PrivacyPolicy = () => {

    return (
        <div className='dark:bg-slate-900'>
            <div className="w-11/12 mx-auto py-10 text-gray-800 dark:text-gray-200 flex flex-col gap-3 text-justify">
                <div className='flex flex-col gap-2'>
                    <h2 className="text-3xl font-semibold">Privacy Policy</h2>
                    <p>At FoodieDelivery, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our services. By using our app, you agree to the terms described in this policy.</p>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">1. Information We Collect:</h3>
                    <ul className="list-disc pl-5">
                        <li><strong>Personal Information:</strong> We collect information such as your name, email address, phone number, and delivery address to process orders and communicate with you.</li>
                        <li><strong>Payment Information:</strong> We collect payment details (such as credit card information) to process transactions. This data is securely processed by third-party payment processors.</li>
                        <li><strong>Usage Data:</strong> We collect information about how you interact with our app, including your device type, location, and browsing behavior, to improve our service.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">2. How We Use Your Information:</h3>
                    <ul className="list-disc pl-5">
                        <li>To process and fulfill your orders, including delivering food to your specified address.</li>
                        <li>To send order updates, promotional offers, and other communications related to your account.</li>
                        <li>To improve our app and services based on your feedback and usage patterns.</li>
                        <li>To protect against fraudulent transactions and ensure the security of your personal information.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">3. Sharing Your Information:</h3>
                    <ul className="list-disc pl-5">
                        <li>We do not sell or rent your personal information to third parties.</li>
                        <li>Your data may be shared with trusted third-party service providers who help us with payment processing, order fulfillment, and customer service. These partners are required to handle your information securely and in accordance with applicable laws.</li>
                        <li>We may disclose your information if required by law or to protect our rights, property, or the safety of our users.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">4. Data Security:</h3>
                    <ul className="list-disc pl-5">
                        <li>We implement industry-standard security measures to protect your personal data, including encryption and secure servers.</li>
                        <li>However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">5. Your Choices:</h3>
                    <ul className="list-disc pl-5">
                        <li>You can opt out of receiving promotional emails by following the unsubscribe link provided in each email.</li>
                        <li>You can update or delete your account information at any time by contacting our support team.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">6. Cookies:</h3>
                    <ul className="list-disc pl-5">
                        <li>We use cookies to improve your experience on our app, such as remembering your preferences and providing personalized content.</li>
                        <li>You can manage cookie preferences through your device settings. However, disabling cookies may affect your user experience.</li>
                    </ul>
                </div>

                <p className="mt-4">If you have any questions or concerns regarding our Privacy Policy, please feel free to contact us at <a href="mailto:support@fooddelivery.com" className="text-blue-500">support@fooddelivery.com</a>. Thank you for trusting FoodieDelivery with your personal information!</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;