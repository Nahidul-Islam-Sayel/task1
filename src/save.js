import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import './style.scss'

export default function save({ attributes }) {
    const { slides, imageBorderRadius, imageSize, titleColor, titleSize, titleStyle, contentColor, contentSize, contentStyle } = attributes;

    return (
        <div { ...useBlockProps.save() }>
            <div className="slider-container">
                <div className="slides">
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <RichText.Content
                                className='title'
                                tagName="h2"
                                value={slide.title}
                                style={{
                                    fontSize: `${titleSize}px`,
                                    color: titleColor,
                                    fontStyle: titleStyle,
                                }}
                            />
                            {slide.imageUrl && (
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    style={{
                                        width: `${imageSize}px`,
                                        borderRadius: `${imageBorderRadius}px`,
                                    }}
                                />
                            )}
                            <RichText.Content
                                className='content'
                                tagName="p"
                                value={slide.content}
                                style={{
                                    fontSize: `${contentSize}px`,
                                    color: contentColor,
                                    fontStyle: contentStyle,
                                }}
                            />
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
