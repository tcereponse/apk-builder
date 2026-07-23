import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CATEGORIES } from '../../../shared/constants/mockData';
import { Category } from '../../../shared/types';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const CategoriesPage: React.FC = () => {
 const [categories, setCategories] = useState<Category[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
 const fetchCategories = async () => {
 await new Promise(resolve => setTimeout(resolve, 500));
 setCategories(MOCK_CATEGORIES);
 setLoading(false);
 };
 fetchCategories();
 }, []);

 const filteredCategories = categories.filter(category =>
 category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 category.description.toLowerCase().includes(searchTerm.toLowerCase())
 );

 if (loading) return <LoadingSpinner />;

 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
 Catégories
 </h1>
 <div className="max-w-md">
 <input
 type="text"
 placeholder="Rechercher une catégorie..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
 />
 </div>
 </div>

 {filteredCategories.length === 0 ? (
 <div className="text-center py-12">
 <p className="text-gray-500 dark:text-gray-400 text-lg">
 Aucune catégorie trouvée
 </p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredCategories.map(category => (
 <Link
 key={category.id}
 to={/categories/{category.slug}`}
 className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-all border border-gray-200 dark:border-gray-700 p-6 hover:border-primary-300 dark:hover:border-primary-600"
 >
 <div className="flex items-start justify-between mb-3">
 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
 {category.name}
 </h2>
 {category.icon && (
 <span className="text-2xl">{category.icon}</span>
 )}
 </div>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
 {category.description}
 </p>
 <div className="flex items-center justify-between">
 <span className="text-sm text-gray-500 dark:text-gray-400">
 {category.site_count || 0} sites
 </span>
 <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
 Voir →
 </span>
 </div>
 </Link>
 ))}
 </div>
 )}
 </div>
 );
};

export default CategoriesPage;