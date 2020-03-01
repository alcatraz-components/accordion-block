const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls } = wp.editor;
const { ToggleControl, PanelBody } = wp.components;
const { __ } = wp.i18n;

import "./panel";

registerBlockType("alcatraz-blocks-accordion/alcatraz-blocks-accordion", {
	title: __("Alcatraz Accordion", "alcatraz-blocks-accordion"),
	category: "widgets",
	supports: {
		html: false
	},
	attributes: {
		multiPanel: {
			type: "boolean",
			default: false
		}
	},
	edit: ({ attributes, setAttributes, isSelected }) => {
		const { multiPanel } = attributes;
		const onToggleChange = () => setAttributes({ multiPanel: !multiPanel });
		const INNER_BLOCKS = [
			"alcatraz-blocks-accordion/alcatraz-blocks-accordion-panel"
		];
		return (
			<Fragment>
				{isSelected && (
					<InspectorControls>
						<PanelBody title="Multi-panel">
							<ToggleControl
								label="Allow multiple panels to be open?"
								help={
									multiPanel
										? "Multiple panels allowed"
										: "Single panel only"
								}
								checked={multiPanel}
								onChange={onToggleChange}
							/>
						</PanelBody>
					</InspectorControls>
				)}
				<alcatraz-accordion multiPanel={multiPanel}>
					<InnerBlocks
						template={[INNER_BLOCKS]}
						allowedBlocks={INNER_BLOCKS}
					/>
				</alcatraz-accordion>
			</Fragment>
		);
	},
	save: ({ attributes }) => {
		const { multiPanel } = attributes;
		return (
			<alcatraz-accordion multiPanel={multiPanel ? "true" : undefined}>
				<InnerBlocks.Content />
			</alcatraz-accordion>
		);
	}
});
