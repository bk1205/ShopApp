import Product from '../models/product';

const PRODUCTS = [
  new Product (
    'p1',
    'u3',
    'Apple 10.2-inch iPad Wi-Fi + Cellular 32GB - Space Gray',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-cell-select-space-201909_GEO_US_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1567896857159',
    'A tablet with amazing performance and ios operating system, best for a student and professional',
    35000,
    1
  ),
  new Product(
    'p2',
    'u1',
    'Red Shirt',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'A red t-shirt, perfect for days with non-red weather.',
    299.99,
    1
  ),
  new Product(
    'p3',
    'u1',
    'Blue Carpet',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    99.99,
    1
  ),
  new Product(
    'p4',
    'u2',
    'Coffee Mug',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Can also be used for tea!',
    80.99,
    1
  ),
  new Product(
    'p5',
    'u3',
    'The Book - Limited Edition',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    150.99,
    1
  ),
  new Product(
    'p6',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    22099.99,
    1
  ),
  new Product(
    'p7',
    'u1',
    'Pen & Paper',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    50.49,
    1
  )
];

export default PRODUCTS;