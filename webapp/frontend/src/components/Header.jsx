'use client';

import Image from 'next/image';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl overflow-hidden mx-4 md:mx-8 my-6 border border-gray-100 shadow-lg'>
            
            {/* Header Left Content */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 p-8 md:p-12 lg:p-16'>
                <div>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl text-gray-800 font-bold leading-tight mb-4 text-center md:text-left'>
                        Your Trusted <span className='text-primary'>Health & Wellness</span> Partner
                    </h1>
                    <p className='text-gray-600 text-[16px] md:text-lg mb-6 text-center md:text-left leading-relaxed'>
                        Experience comprehensive healthcare with AI-powered diagnostics, personalized treatment plans, and 24/7 medical support for your well-being.
                    </p>
                </div>
                
                {/* Trust Indicators */}
                <div className='flex items-center gap-4 mb-4'>
                    <div className='flex -space-x-3'>
                        <Image

                            className='w-16 h-8 md:w-24 md:h-10 rounded-full border-2 border-white shadow-md'
                            src={"/images/group_profiles.png"}
                            alt="Satisfied Patients"
                            height={500}
                            width={600}
                        />
                    </div>
                    <p className='text-gray-600 text-[12px] md:text-sm font-medium'>
                        <span className='text-primary font-bold'>1,000+</span> patients found relief this month
                    </p>
                </div>

                {/* Health Stats */}
                <div className='grid grid-cols-2 gap-4 w-full max-w-md'>
                    <div className='text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
                        <div className='text-primary font-bold text-lg'>99%</div>
                        <div className='text-gray-500 text-xs'>Accuracy Rate</div>
                    </div>
                    <div className='text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
                        <div className='text-secondary font-bold text-lg'>24/7</div>
                        <div className='text-gray-500 text-xs'>Support Available</div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 w-full max-w-md'>
                    <a 
                        href='#appointment' 
                        className='flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex-1 transform hover:scale-105'
                    >
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Book Appointment 
                    </a>
                    
                    <a 
                        href='#ai-bot' 
                        className='flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1 transform hover:scale-105'
                    >
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        AI Health Assistant
                    </a>
                </div>

                {/* Emergency Notice */}
                <div className='flex items-center gap-2 text-xs text-gray-500 mt-2'>
                    <svg className='w-4 h-4 text-red-500' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    For medical emergencies, call your local emergency number immediately.
                </div>
            </div>

            {/* Header Right Image */}
            <div className='md:w-1/2 relative flex items-center justify-center p-8'>
                <div className='relative w-full h-full max-w-2xl'>
                    <Image
                        height={500}
                        width={600}
                        className='w-full h-auto max-h-[800px] bottom-[-50px] object-contain transform hover:scale-105 transition-transform duration-500 rounded-lg'
                        src={"/images/header_img.webp"}
                        alt="Professional healthcare team providing medical care"
                    />
                    
                    {/* Floating Certification Badge */}
                    <div className='absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 border border-primary/20'>
                        <div className='bg-primary/10 p-2 rounded-full'>
                            <svg className='w-6 h-6 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>Certified by</p>
                            <p className='text-sm font-semibold text-primary'>Medical Board</p>
                        </div>
                    </div>

                    {/* Floating Stats Badge */}
                    <div className='absolute bottom-4 left-4 bg-secondary text-white rounded-lg shadow-xl p-3'>
                        <div className='text-center'>
                            <div className='text-lg font-bold'>15+</div>
                            <div className='text-xs'>Years Experience</div>
                        </div>
                    </div>

                    {/* AI Technology Badge */}
                    <div className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white rounded-full px-4 py-2 text-xs font-medium shadow-lg'>
                        AI-Powered Diagnostics
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;