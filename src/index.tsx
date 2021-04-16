import { registerBlockType } from '@wordpress/blocks';
import fields from '../fields.json';
import edit from './edit';

Object.entries( fields ).forEach(
	( [ key, { description, type, default: defaultValue } ] ) => {
		const blockName = key.replaceAll( '_', '-' ).replace( /^-/, '' );
		const name = `block-editor-custom-field-sample/${ blockName }`;

		registerBlockType( name, {
			name,
			apiVersion: 2,
			title: description,
			description,
			attributes: {
				metaKey: {
					type: 'string',
					default: key,
				},
				metaValue: {
					type,
					default: defaultValue,
				},
			},
			edit,
		} );
	}
);
