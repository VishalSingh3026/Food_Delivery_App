import React from 'react';

const RefundPolicy = () => {
    return (
        <div className='dark:bg-slate-900'>
            <div className="w-11/12 mx-auto py-10 text-gray-800 dark:text-gray-200 flex flex-col gap-3 text-justify">
                <div className='flex flex-col gap-2'>
                    <h2 className="text-3xl font-semibold">Refund Policy</h2>
                    <p>At FoodieDelivery, our goal is to provide a seamless and satisfying experience for all of our customers. We understand that sometimes things don't go as expected, and we are committed to resolving issues in a fair and efficient manner. Please review our refund policy below to understand the conditions under which a refund may be issued.</p>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">1. Eligibility for Refunds:</h3>
                    <ul className="list-disc pl-5">
                        <li>Incorrect or missing items in your order.</li>
                        <li>Orders not delivered within the estimated delivery window.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">2. Non-Refundable Cases:</h3>
                    <ul className="list-disc pl-5">
                        <li>Change of mind after placing the order.</li>
                        <li>Issues arising due to incorrect delivery information provided by the customer.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">3. Request Process:</h3>
                    <ul className="list-disc pl-5">
                        <li>Refund requests must be submitted within 24 hours of receiving your order.</li>
                        <li>Contact our support team at <a href="mailto:support@fooddelivery.com" className="text-blue-500">support@fooddelivery.com</a> or via our in-app support feature. Please provide your order number and a detailed description of the issue you encountered.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">4. Refund Method:</h3>
                    <ul className="list-disc pl-5">
                        <li>Approved refunds will be processed back to the original payment method within 7-10 business days.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">5. Partial Refunds:</h3>
                    <ul className="list-disc pl-5">
                        <li>In some cases, if the issue with the order is minor or if the situation can be resolved without a full refund, we may offer a partial refund. This will be determined at the discretion of our support team.</li>
                    </ul>
                </div>

                <p className="mt-4">We value your trust and strive to make every meal a great experience. If you have any further questions or need assistance, please don't hesitate to contact us. Thank you for choosing FoodieDelivery— we look forward to serving you again soon!</p>
            </div>
        </div>
    );
};

export default RefundPolicy;