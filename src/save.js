import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { slides } = attributes;

    return (
        <div { ...useBlockProps.save() }>
            <div className="slider-container">
                <div className="slides">
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <h2>{slide.title}</h2>
                            {slide.imageUrl && <img src={slide.imageUrl} alt={slide.title} style={{ width: '400px' }} />}
                            <p>{slide.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-controls">
                <button className="prev-button">&lt;</button>
                <button className="next-button">&gt;</button>
            </div>
        </div>
    );
}
