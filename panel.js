const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InnerBlocks, PlainText, InspectorControls } = wp.editor;
const { ToggleControl, PanelBody } = wp.components;
const { __ } = wp.i18n;

registerBlockType("alcatraz-blocks-accordion/alcatraz-blocks-accordion-panel", {
	title: __("Alcatraz Accordion Panel", "alcatraz-blocks-accordion"),
	category: "widgets",
	supports: {
		html: false
	},
	attributes: {
		label: {
			type: "string",
			default: ""
		},
		expanded: {
			type: "boolean",
			default: false
		}
	},
	parent: ["alcatraz-blocks-accordion/alcatraz-blocks-accordion"],
	edit: ({ attributes, setAttributes, isSelected }) => {
		const { label, expanded } = attributes;
		const onToggleChange = () => setAttributes({ expanded: !expanded });
		const onTextChange = label => setAttributes({ label });
		return (
			<Fragment>
				{isSelected && (
					<InspectorControls>
						<PanelBody title="Expanded">
							<ToggleControl
								label="Expand this panel by default?"
								help={
									expanded
										? "Expanded by default"
										: "Collapsed by default"
								}
								checked={expanded}
								onChange={onToggleChange}
							/>
						</PanelBody>
					</InspectorControls>
				)}
				<alcatraz-accordion-panel expanded={expanded}>
					<PlainText
						placeholder="Label"
						value={label}
						onChange={onTextChange}
					/>
					<InnerBlocks />
				</alcatraz-accordion-panel>
			</Fragment>
		);
	},
	save: ({ attributes }) => {
		const { label, expanded } = attributes;
		return (
			<alcatraz-accordion-panel
				label={label}
				expanded={expanded ? "true" : undefined}
			>
				<InnerBlocks.Content />
			</alcatraz-accordion-panel>
		);
	}
});
