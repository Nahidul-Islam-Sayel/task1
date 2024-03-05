import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { useState, useEffect } from 'react';

export default function Edit({ attributes, setAttributes }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const { slides } = attributes;

    useEffect(() => {
        if (!isEditing) {
            const timer = setTimeout(() => {
                setCurrentSlide((currentSlide + 1) % slides.length);
            }, 5000); // Change slide every 5 seconds

            return () => clearTimeout(timer);
        }
    }, [currentSlide, slides.length, isEditing]);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    const handleEditStart = () => {
        setIsEditing(true);
    };

    const handleEditEnd = () => {
        setIsEditing(false);
    };

    return (
        <div { ...useBlockProps() }>
            <div className="slider-container">
                <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: isEditing ? 'none' : 'transform 0.5s ease-in-out' }}>
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <RichText
                                tagName="h2"
                                value={slide.title}
                                onChange={(value) => {
                                    const updatedSlides = [...slides];
                                    updatedSlides[index].title = value;
                                    setAttributes({ slides: updatedSlides });
                                }}
                                onFocus={handleEditStart}
                                onBlur={handleEditEnd}
                                placeholder={__('Enter title', 'easy-slider')}
                            />
                            {slide.imageUrl ? (
                                <img src={slide.imageUrl} alt={slide.title} style={{ width: '400px' }} />
                            ) : (
                                <MediaUpload
                                    onSelect={(media) => {
                                        const updatedSlides = [...slides];
                                        updatedSlides[index].imageUrl = media.url;
                                        setAttributes({ slides: updatedSlides });
                                    }}
                                    type="image"
                                    render={({ open }) => (
                                        <button onClick={open}>
                                            {__('Upload Image', 'easy-slider')}
                                        </button>
                                    )}
                                />
                            )}
                            <RichText
                                tagName="p"
                                value={slide.content}
                                onChange={(value) => {
                                    const updatedSlides = [...slides];
                                    updatedSlides[index].content = value;
                                    setAttributes({ slides: updatedSlides });
                                }}
                                onFocus={handleEditStart}
                                onBlur={handleEditEnd}
                                placeholder={__('Enter content', 'easy-slider')}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-controls">
                <button className="prev-button" onClick={prevSlide}>
                    &lt;
                </button>
                <button className="next-button" onClick={nextSlide}>
                    &gt;
                </button>
            </div>
        </div>
    );
}