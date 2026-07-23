import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SITES } from '../../../shared/constants/mockData';
import { Site } from '../../../shared/types';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const SiteDetailPage: React.FC = () => {
 const { id } = useParams<{ id: string }>();
 const [site, setSite] = useState<Site | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchSite = async () => {
 await new Promise(resolve => setTimeout(resolve, 500));
 const found = MOCK_SITES.find(s => s.id === id);
 setSite(found || null);
 setLoading(false);
 };
 fetchSite();
 }, [id]);

 if (loading) return <LoadingSpinner />;

 if (!site) {
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
 Site non trouvé
 </h1>
 <Link to="/sites" className="text-primary-600 dark:text-primary-400 hover:underline">
 Retour à la liste des sites
 </Link>
 </div>
 );
 }

 return (
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <Link to="/sites" className="text-primary-600 dark:text-primary-400 hover:underline mb-6 inline-block">
 ← Retour à la liste
 </Link>

 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden">
 <div className="p-6 md:p-8">
 <div className="flex items-start justify-between mb-6">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
 {site.title}
 </h1>
 <a
 href={site.url}
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
 >
 {site.url}
 </a>
 </div>
 {site.image_url && (
 <img
 src={site.image_url}
 alt={site.title}
 className="w-20 h-20 object-contain rounded"
 />
 )}
 </div>

 <div className="mb-6">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 Description
 </h2>
 <p className="text-gray-600 dark:text-gray-400">
 {site.description}
 </p>
 </div>

 {site.full_description && (
 <div className="mb-6">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 À propos
 </h2>
 <p className="text-gray-600 dark:text-gray-400">
 {site.full_description}
 </p>
 </div>
 )}

 {site.categories && site.categories.length > 0 && (
 <div className="mb-6">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 Catégories
 </h2>
 <div className="flex flex-wrap gap-2">
 {site.categories.map(category => (
 <Link
 key={category.id}
 to={`/categories/{category.slug}}
 className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
 >
 {category.icon} {category.name}
 </Link>
 ))}
 </div>
 </div>
 )}

 {site.tags && site.tags.length > 0 && (
 <div className="mb-6">
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 Tags
 </h2>
 <div className="flex flex-wrap gap-2">
 {site.tags.map((tag, index) => (
 <span
 key={index}
 className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
 >
 #{tag}
 </span>
 ))}
 </div>
 </div>
 )}

 <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
 <div className="text-sm text-gray-500 dark:text-gray-400">
 <p>Ajouté le : {new Date(site.created_at).toLocaleDateString('fr-FR')}</p>
 <p>Dernière mise à jour : {new Date(site.updated_at).toLocaleDateString('fr-FR')}</p>
 </div>
 <a
 href={site.url}
 target="_blank"
 rel="noopener noreferrer"
 className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-2 rounded-lg font-medium transition-colors"
 >
 Visiter le site
 </a>
 </div>
 </div>
 </div>
 </div>
 );
};

export default SiteDetailPage;