import React, { useEffect, useState } from "react";
import cour1 from "/src/assets/images/cour1.jpeg";
import cour2 from "/src/assets/images/cour2.jpeg";
import cour3 from "/src/assets/images/cour3.jpeg";
import cour4 from "/src/assets/images/cour4.jpeg";

const Corousal = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { id: 1, content: "Slide 1", image: cour1 },
        { id: 2, content: "Slide 2", image: cour2 },
        { id: 3, content: "Slide 3", image: cour3 },
        { id: 4, content: "Slide 3", image: cour4 },
        { id: 5, content: "Slide 3", image: cour2 },
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [slides.length]);

    return (
        <div className="w-full relative overflow-hidden">
            {/* Carousel Container */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 33.33}%)`, // Move by 33.33% for two slides and a half
                    width: `${slides.length * 33.33}%`, // Adjust container width
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="w-1/3 flex-shrink-0 p-2" // Each slide takes 33.33% width
                    >
                        <div className="rounded-2xl h-96 flex justify-center items-center overflow-hidden">
                            <img
                                src={slide.image}
                                alt={slide.content}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
            >
                &lt;
            </button>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
            >
                &gt;
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 mx-1 rounded-full ${currentSlide === index ? "bg-blue-500" : "bg-gray-300"
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Corousal;