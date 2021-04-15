<?php

namespace HAMWORKS\Block_Editor_Custom_Field_Sample;

/**
 * Class Fields
 */
class Fields {
	/**
	 * @var array
	 */
	private $fields;

	public function __construct( $field_data_file ) {
		$data      = json_decode( file_get_contents( $field_data_file ), true );
		$this->fields    = $data;
		$this->register_fields();
	}

	/**
	 * Register fields.
	 */
	private function register_fields() {
		array_walk( $this->fields, array( $this, 'register_field' ) );
	}

	/**
	 * Register post meta.
	 *
	 * @param string $meta_key
	 * @param $field
	 */
	private function register_field( $field, string $meta_key ) {
		register_meta( 'post', $meta_key, $field );
	}
}
