import { motion } from "framer-motion";

function ProductsSection() {
  const products = [
    { id: 1, name: "Smartphone", price: "$599", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Laptop", price: "$1099", image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Camera", price: "$799", image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Headphones", price: "$199", image: "https://via.placeholder.com/300x200" },
    { id: 5, name: "Smart TV", price: "$999", image: "https://via.placeholder.com/300x200" },
    { id: 6, name: "Tablet", price: "$499", image: "https://via.placeholder.com/300x200" },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Products
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-gray-50 rounded-xl shadow p-4 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{product.name}</h3>
              <p className="text-blue-600 font-bold">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
