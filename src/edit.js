import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import './editor.scss';
import { useState, useEffect } from 'react';

export default function Edit() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [slides, setSlides] = useState([
        {
            title: __('Slide 1 Title', 'easy-slider'),
            content: __('Slide 1 Content', 'easy-slider'),
            imageUrl: '',
        },
        {
            title: __('Slide 2 Title', 'easy-slider'),
            content: __('Slide 2 Content', 'easy-slider'),
            imageUrl: '',
        },
        {
            title: __('Slide 3 Title', 'easy-slider'),
            content: __('Slide 3 Content', 'easy-slider'),
            imageUrl: '',
        }
    ]);

    const blockProps = useBlockProps();

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
        <div { ...blockProps }>
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
                                    setSlides(updatedSlides);
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
                                        setSlides(updatedSlides);
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
                                    setSlides(updatedSlides);
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
