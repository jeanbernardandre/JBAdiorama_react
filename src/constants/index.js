//export const ROOT_ADRESS = 'http://jbwp.local/';
//export const DOMAIN_NAME = 'http://localhost:3000/';
export const DOMAIN_NAME = 'https://www.jeandiorama.com/';
export const ROOT_ADRESS = 'https://www.jeandiorama.com/wp/';
export const ADDRESS_V2 = ROOT_ADRESS + 'wp-json/wp/v2/';
export const ADDRESS_V3 = ROOT_ADRESS + 'wp-json/acf/V3/';
export const ADDRESS_PAGES = ROOT_ADRESS + 'wp-json/wp/v2/pages/';
export const ADRESS_MENU = ROOT_ADRESS + 'wp-json/menus/v1/menus/main-menu';
export const ADRESS_IMAGES = ROOT_ADRESS + 'wp-json/photos/v1/pid/';
export const ADDRESS_TAGS = ROOT_ADRESS + 'wp-json/wp/v2/tags/';
export const ADDRESS_DIORAMAS_LIMIT = ROOT_ADRESS + 'wp-json/dioramas/v1/pid/dioramahome/';

export const ADRESS_DIORAMAS = ROOT_ADRESS + 'wp-json/dioramas/v1/pid/dioramapage';
export const BLOGPOST_DIORAMAS = ROOT_ADRESS + 'wp-json/dioramas/v1/pid/blogpost';
export const CATEGORIE_DIORAMA = 14;
export const LOADER_COLOR = '#f13ab8';
export const SECONDARY_COLOR = '#117893';
export const PAGE_ABOUT = 239;
export const PAGE_GALLERY = 1735;
export const PAGE_MAPS = 269;
export const PAGE_HOME = 51;
export const GALERY_PAGE = 1735;
export const BLOG_ID = 6;
export const FETCH_ADDRESS = DOMAIN_NAME + 'wp/sendget.php';

export const NEWSBOXADDRESS = ADDRESS_V2 + 'posts/?categories=19&per_page=1';
export const BLOGBOXADDRESS = ADDRESS_V2 + 'posts/?categories=15&per_page=1'; // route générale
export const ADVERTBOXADDRESS = ADDRESS_V2 + 'posts/?categories=21';//&per_page=1
export const DSBOXADDRESS = ADDRESS_V2 + 'posts/?categories=22&per_page=1';
export const PRESSADDRESS = ADDRESS_V2 + 'posts/?categories=18';
export const CATEGORIE_PAGES = ADDRESS_V2 + 'posts/?categories=20';

export const META_DESCRIPTION = 'This website shows the nature centered dioramas I have been building throughout the last part of 2017 and in 2018. The rules of the game are pretty simple : I bought a series of 3d boxes and I fill them with little scenes that must not be more than 2cm high.';
export const META_TITLE = 'Jean | JBA Diorama Neither Science-Fiction nor Reality';
console.log(NEWSBOXADDRESS);

//http://jbwp.local/wp-json/dioramas/v1/pid/dioramapage