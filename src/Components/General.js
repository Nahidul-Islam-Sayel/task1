import React from 'react';
import { __ } from "@wordpress/i18n";
import {
    Button,
    PanelBody,
    ToggleControl,
    MenuGroup,
    ButtonGroup,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

const General = ({ attributes, setAttributes, slide }) => {
    const { slides, align, editablePrefix, editableTitle, editableDescription, tabHeadingTagName } = attributes;
    const [selectedImage, setSelectedImage] = useState("");

    const handleTextAlignmentChange = (alignment) => {
        setAttributes({ align: alignment });
    };

    const handleToggleChange = (key) => {
        setAttributes({ [key]: !attributes[key] });
    };

    const headerLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    return (
        <div>
            <PanelBody title={__("Content")} icon="editor-paragraph">
                <MenuGroup label={__("Text Alignment", "demo-tabs")}>
                    <ButtonGroup
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        {['left', 'center', 'right'].map((alignOption, i) => (
                            <Button
                                key={i}
                                className="button-text-alignment"
                                title={alignOption}
                                onClick={() =>
                                    handleTextAlignmentChange(alignOption)
                                }
                            >
                                {__(alignOption)}
                            </Button>
                        ))}
                    </ButtonGroup>
                </MenuGroup>
                <MenuGroup label={__("Content Settings", "demo-tabs")}>
                    <ToggleControl
                        label={__("Enable Prefix")}
                        checked={editablePrefix}
                        onChange={() => handleToggleChange("editablePrefix")}
                    />
                    <ToggleControl
                        label={__("Enable Title")}
                        checked={editableTitle}
                        onChange={() => handleToggleChange("editableTitle")}
                    />
                    <ToggleControl
                        label={__("Enable Description")}
                        checked={editableDescription}
                        onChange={() => handleToggleChange("editableDescription")}
                    />
                </MenuGroup>
                <MenuGroup label={__( 'Tab Heading Tag Name', 'demo-tabs' )}>
                    <ButtonGroup
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {headerLevels.map((tag, i) => (
                            <Button
                                key={i}
                                className={`button-tag ${tag === tabHeadingTagName ? 'is-active' : ''}`}
                                onClick={() =>
                                    setAttributes({
                                        tabHeadingTagName: tag,
                                    })
                                }
                            >
                                {__(tag)}
                            </Button>
                        ))}
                    </ButtonGroup>
                </MenuGroup>
            </PanelBody>
        </div>
    );
};

export default General;
