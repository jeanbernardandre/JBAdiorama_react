<?php

	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );

	add_filter( 'rest_endpoints', function( $endpoints ){
		if ( ! isset( $endpoints['/wp/v2/posts'] ) ) {
			return $endpoints;
		}
		$endpoints['/wp/v2/posts'][0]['args']['per_page']['default'] = 100;
		return $endpoints;
	});

	function register_my_menu() {
		register_nav_menu('jeandiorama_menu',__( 'jeandiorama' ));
	}
	add_action( 'init', 'register_my_menu' );

	function register_rest_images(){
		register_rest_field( 
		['post', 'page'],
			'fimg_url',
			[
				'get_callback'    => 'get_rest_featured_image',
				'update_callback' => null,
				'schema'          => null
			]
		);
	}
	function get_rest_featured_image($object, $field_name, $request) {
		if ($object['featured_media']) {
			$img = wp_get_attachment_image_src($object['featured_media'], 'medium_large');
			return $img[0];
		}
		return false;
	}
	add_action('rest_api_init', 'register_rest_images' );

function wpm_custom_post_type() {
    $labels = [
        'name' => 'Photos pour Masonry',
        'singular_name' => 'Photo pour Masonry',
        'menu_name' => __('Photos auto'),
        'all_items' => __('Toutes les Photos auto'),
        'view_item' => __('Voir les sPhotos auto'),
        'add_new_item' => __('Ajouter une nouvelle Photos auto'),
        'add_new' => __('Ajouter'),
        'edit_item' => __('Editer la Photos auto'),
        'update_item' => __('Modifier la Photos auto'),
        'search_items' => __('Rechercher une Photos auto'),
        'not_found' => __('Non trouvée'),
        'not_found_in_trash' => __('Non trouvée dans la corbeille')
    ];
    $args = [
        'label' => __('Photos auto'),
        'description' => __('Tous sur Photos auto'),
        'labels' => $labels,
        'supports' => ['title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields'],
        'show_in_rest' => true,
        'hierarchical' => false,
        'public' => true,
        'has_archive' => true,
        'rewrite' => ['slug' => 'photos-tv']
    ];
    register_post_type('photostv', $args);
}
add_action( 'init', 'wpm_custom_post_type', 0);

function prefix_register_book_route() {
    register_rest_route( 'my-namespace/v1', '/photostv/(?P<id>\d+)', [
        // Supported methods for this endpoint. WP_REST_Server::READABLE translates to GET.
        'methods' => WP_REST_Server::READABLE,
        // Register the callback for the endpoint.
        'callback' => 'prefix_get_book',
    ]);
}

add_action( 'rest_api_init', 'prefix_register_book_route' );

function getQueryPhotos(WP_REST_Request $request) {
    $page = $request['page'];

    $args = [
        'posts_per_page' => 12,
        'paged' => $page,
        'orderby' => 'rand',
        'order' => 'desc',
        'post_type' => 'photostv',
    ];
    $query = new WP_Query($args);

    if (empty($query->posts)) {
        return new WP_Error('no_posts', __('No post found'), ['status' => 404]);
    }

    $max_pages = $query->max_num_pages;
    $total = $query->found_posts;
    $posts = $query->posts;
    $controller = new WP_REST_Posts_Controller('post');

    foreach ( $posts as $post ) {
        $response = $controller->prepare_item_for_response($post, $request);
        $data[] = $controller->prepare_response_for_collection($response);
    }

    $response = new WP_REST_Response($data, 200);
    $response->header('X-WP-Total', $total);
    $response->header('X-WP-TotalPages', $max_pages);
    return $response;
}

add_action('rest_api_init', function() {
    register_rest_route( 'photos/v1', '/pid/(?P<page>\d+)', [
        'methods' => 'GET',
        'callback' => 'getQueryPhotos',
        'args' => [
            'page' => [
                'required' => true
                ]
            ]
    ]);
});

//http://jbwp.local/wp-json/photos/v1/pid/1734
//http://jbwp.local/wp-json/wp/v2/photostv

function my_customize_rest_cors() {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function( $value ) {
        header( 'Access-Control-Allow-Origin: *' );
        header( 'Access-Control-Allow-Methods: GET' );
        header( 'Access-Control-Allow-Credentials: true' );
        header( 'Access-Control-Expose-Headers: Link', false );

        return $value;
    } );
}

add_action( 'rest_api_init', 'my_customize_rest_cors', 15 );
