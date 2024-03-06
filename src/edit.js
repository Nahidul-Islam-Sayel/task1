import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	BlockControls,
} from "@wordpress/block-editor";
import { useState, useEffect } from "react";
import { Button } from "@wordpress/components";
import { Toolbar } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isEditing, setIsEditing] = useState(false);

	const { slides } = attributes;

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
			(slide, index) => index !== indexToRemove,
		);
		setAttributes({ slides: updatedSlides });
	};

	return (
		<div {...blockProps}>
			<BlockControls>
				<Toolbar>
					<Button icon="plus-alt2" label={__("Add Slide")} onClick={addSlide} />
					{slides.map((slide, index) => (
						<Button
							key={index}
							icon="dismiss"
							label={__("Remove Slide")}
							onClick={() => removeSlide(index)}
						/>
					))}
				</Toolbar>
			</BlockControls>
			<div className="slider-container">
				<div
					className="slides"
					style={{
						transform: `translateX(-${currentSlide * 100}%)`,
						transition: isEditing ? "none" : "transform 0.5s ease-in-out",
					}}
				>
					{slides.map((slide, index) => (
						<div key={index} className="slide">
							<RichText
								tagName="h2"
								value={slide.title}
								onChange={(value) => handleSlideChange(index, "title", value)}
								onFocus={handleEditStart}
								onBlur={handleEditEnd}
								placeholder={__("Enter title", "easy-slider")}
							/>
							{slide.imageUrl ? (
								<img
									src={slide.imageUrl}
									alt={slide.title}
									style={{ width: "400px" }}
								/>
							) : (
								<MediaUpload
									onSelect={(media) =>
										handleSlideChange(index, "imageUrl", media.url)
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
								onChange={(value) => handleSlideChange(index, "content", value)}
								onFocus={handleEditStart}
								onBlur={handleEditEnd}
								placeholder={__("Enter content", "easy-slider")}
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
