import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    RichText,
    MediaUpload,
    BlockControls,
    InspectorControls,
} from "@wordpress/block-editor";
import { Button, PanelBody, RangeControl, ColorPalette, SelectControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { Toolbar } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [activePanel, setActivePanel] = useState('image');

    const { slides, imageBorderRadius, imageSize, titleColor, titleSize, titleStyle, contentColor, contentSize, contentStyle } = attributes;

    const blockProps = useBlockProps();

    useEffect(() => {
        if (!isEditing) {
            const timer = setTimeout(() => {
                setCurrentSlide((currentSlide + 1) % slides.length);
            }, 5000); 

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

    const handleSlideChange = (index, key, value) => {
        const updatedSlides = slides.map((slide, i) => {
            if (i === index) {
                return {
                    ...slide,
                    [key]: value,
                };
            }
            return slide;
        });

        setAttributes({ slides: updatedSlides });
    };

    const addSlide = () => {
        const newSlide = {
            title: "",
            content: "",
            imageUrl: "",
        };
        setAttributes({ slides: [...slides, newSlide] });
    };

    const removeSlide = (indexToRemove) => {
        const updatedSlides = slides.filter(
            (slide, index) => index !== indexToRemove
        );
        setAttributes({ slides: updatedSlides });
    };

    const removePicture = (indexToRemove) => {
        const updatedSlides = slides.map((slide, index) => {
            if (index === indexToRemove) {
                return { ...slide, imageUrl: "" };
            }
            return slide;
        });
        setAttributes({ slides: updatedSlides });
    };

    return (
        <div {...blockProps}>
            <BlockControls>
                <Toolbar>
                    <Button
                        icon="plus-alt2"
                        label={__("Add Slide")}
                        onClick={addSlide}
                    />
                    {slides.map((slide, index) => (
                        <Button
                            key={index}
                            icon="dismiss"
                            label={__("Remove Slide")}
                            onClick={() => removeSlide(index)}
                        />
                    ))}
                    <Button
                        icon="trash"
                        label={__("Remove Picture")}
                        onClick={() => removePicture(currentSlide)}
                    />
                </Toolbar>
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__("Controls")} initialOpen={true}>
                    <Button
                        isPrimary={activePanel === 'image'}
                        onClick={() => setActivePanel('image')}
                    >
                        {__("Image")}
						
                    </Button>
                    <Button
                        isPrimary={activePanel === 'content'}
                        onClick={() => setActivePanel('content')}
                    >
                        {__("Content Controls")}
                    </Button>
                    <Button
                        isPrimary={activePanel === 'title'}
                        onClick={() => setActivePanel('title')}
                    >
                        {__("Title Controls")}
                    </Button>
                </PanelBody>
                {activePanel === 'image' && (
                    <PanelBody title={__("Image Controls")} icon="format-image">
                        <RangeControl
                            label={__("Border Radius")}
                            value={imageBorderRadius}
                            onChange={(value) =>
                                setAttributes({ imageBorderRadius: value })
                            }
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__("Image Size")}
                            value={imageSize}
                            onChange={(value) =>
                                setAttributes({ imageSize: value })
                            }
                            min={100}
                            max={800}
                        />
                        <Button
                            isDestructive
                            onClick={() => removePicture(currentSlide)}
                        >
                            {__("Remove Picture")}
                        </Button>
                    </PanelBody>
                )}
                {activePanel === 'content' && (
                    <PanelBody title={__("Content Controls")} icon="edit">
                        <RangeControl
                            label={__("Content Size")}
                            value={contentSize}
                            onChange={(value) =>
                                setAttributes({ contentSize: value })
                            }
                            min={12}
                            max={36}
                        />
                        <ColorPalette
                            label={__("Content Color")}
                            value={contentColor}
                            onChange={(value) =>
                                setAttributes({ contentColor: value })
                            }
                        />
                        <SelectControl
                            label={__("Content Style")}
                            value={contentStyle}
                            options={[
                                { label: __("Normal"), value: "normal" },
                                { label: __("Italic"), value: "italic" },
                                { label: __("Oblique"), value: "oblique" },
                            ]}
                            onChange={(value) =>
                                setAttributes({ contentStyle: value })
                            }
                        />
                    </PanelBody>
                )}
                {activePanel === 'title' && (
                    <PanelBody title={__("Title Controls")} icon="admin-customizer">
                        <RangeControl
                            label={__("Title Size")}
                            value={titleSize}
                            onChange={(value) =>
                                setAttributes({ titleSize: value })
                            }
                            min={16}
                            max={72}
                        />
                        <ColorPalette
                            label={__("Title Color")}
                            value={titleColor}
                            onChange={(value) =>
                                setAttributes({ titleColor: value })
                            }
                        />
                        <SelectControl
                            label={__("Title Style")}
                            value={titleStyle}
                            options={[
                                { label: __("Normal"), value: "normal" },
                                { label: __("Italic"), value: "italic" },
                                { label: __("Oblique"), value: "oblique" },
                            ]}
                            onChange={(value) =>
                                setAttributes({ titleStyle: value })
                            }
                        />
                    </PanelBody>
                )}
            </InspectorControls>
            <div className="slider-container">
                <div
                    className="slides"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: isEditing
                            ? "none"
                            : "transform 0.5s ease-in-out",
                    }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <RichText
                                tagName="h2"
                                value={slide.title}
                                onChange={(value) =>
                                    handleSlideChange(index, "title", value)
                                }
                                onFocus={handleEditStart}
                                onBlur={handleEditEnd}
                                placeholder={__("Enter title", "easy-slider")}
                                style={{
                                    fontSize: `${titleSize}px`,
                                    color: titleColor,
                                    fontStyle: titleStyle,
                                }}
                            />
                            {slide.imageUrl ? (
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    style={{
                                        width: `${imageSize}px`,
                                        borderRadius: `${imageBorderRadius}px`,
                                    }}
                                />
                            ) : (
                                <MediaUpload
                                    onSelect={(media) =>
                                        handleSlideChange(
                                            index,
                                            "imageUrl",
                                            media.url
                                        )
                                    }
                                    type="image"
                                    render={({ open }) => (
                                        <button onClick={open}>
                                            {__("Upload Image", "easy-slider")}
                                        </button>
                                    )}
                                />
                            )}
                            <RichText
                                tagName="p"
                                value={slide.content}
                                onChange={(value) =>
                                    handleSlideChange(index, "content", value)
                                }
                                onFocus={handleEditStart}
                                onBlur={handleEditEnd}
                                placeholder={__(
                                    "Enter content",
                                    "easy-slider"
                                )}
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
