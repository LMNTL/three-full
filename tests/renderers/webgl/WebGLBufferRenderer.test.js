var Three = (function (exports) {
	'use strict';

	function WebGLBufferRenderer( gl, extensions, info ) {

		var mode;

		function setMode( value ) {

			mode = value;

		}

		function render( start, count ) {

			gl.drawArrays( mode, start, count );

			info.update( count, mode );

		}

		function renderInstances( geometry, start, count ) {

			var extension = extensions.get( 'ANGLE_instanced_arrays' );

			if ( extension === null ) {

				console.error( 'WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
				return;

			}

			var position = geometry.attributes.position;

			if ( position.isInterleavedBufferAttribute ) {

				count = position.data.count;

				extension.drawArraysInstancedANGLE( mode, 0, count, geometry.maxInstancedCount );

			} else {

				extension.drawArraysInstancedANGLE( mode, start, count, geometry.maxInstancedCount );

			}

			info.update( count, mode, geometry.maxInstancedCount );

		}

		//

		this.setMode = setMode;
		this.render = render;
		this.renderInstances = renderInstances;

	}

	exports.WebGLBufferRenderer = WebGLBufferRenderer;

	return exports;

}({}));
