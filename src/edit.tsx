import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useRegisteredPostMeta } from './api/meta';
import { useEffect } from '@wordpress/element';

function stringTo( type: 'number', value: string ): number;
function stringTo( type: 'boolean', value: string ): boolean;
function stringTo( type: 'string', value: string ): string;
function stringTo( type: string, value: string ): number | string | boolean {
	if ( type === 'number' || type === 'integer' ) {
		return Number( value );
	} else if ( type === 'boolean' ) {
		return Boolean( value );
	}

	return value;
}

const usePostMeta = () => {
	const postType: string = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const properties = useRegisteredPostMeta( postType );

	return [ meta, setMeta, properties ];
};

const Edit: React.FC< {
	attributes: { metaKey: string; metaValue: unknown };
	setAttributes: ( attr: Record< string, unknown > ) => void;
	name: string;
	clientId: string;
} > = ( props ) => {
	const { attributes, setAttributes, name } = props;
	const { metaKey, metaValue } = attributes;

	const [ meta, setMeta, properties ] = usePostMeta();

	const block = useSelect(
		( select ) => select( 'core/blocks' ).getBlockType( name ),
		[ name ]
	);

	const updateMetaValue = ( newValue: string ) => {
		const val = stringTo( block.attributes.metaValue.type, newValue );
		if ( metaKey ) {
			setMeta( { ...meta, [ metaKey ]: val } );
			setAttributes( { metaValue: val } );
		}
	};

	useEffect( () => {
		// sync meta to attribute.
		updateMetaValue( meta[ metaKey ] );
		return () => {
			// On remove this block, cleanup post meta.
			updateMetaValue( '' );
		};
	}, [] );

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ 'Post meta setting' }>
				<TextControl
					value={ metaValue }
					label={ properties?.[ metaKey ]?.description || '' }
					onChange={ updateMetaValue }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const blockProps = useBlockProps();
	return (
		<>
			{ inspectorControls }
			<RichText
				{ ...blockProps }
				tagName="p"
				value={ String( metaValue ) }
				onChange={ updateMetaValue }
				multiline={ false }
				placeholder={ 'Add text...' }
				withoutInteractiveFormatting={ false }
				allowedFormats={ [] }
			/>
		</>
	);
};
export default Edit;
