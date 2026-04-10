/**
 * @module app/router/ErrorPage
 * @description Página de error 404.
 */

import { Link } from "react-router-dom";

const ErrorPage = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4" role="main">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4" id="error-heading">Página no encontrada</h2>
        <Link
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors"
        >
            Volver al inicio
        </Link>
    </div>
);

export default ErrorPage;