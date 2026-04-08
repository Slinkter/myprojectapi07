import React from "react";
import PropTypes from "prop-types";

/**
 * @component GlobalErrorBoundary
 * @description
 * Componente de alta orden diseñado para capturar errores de renderizado en el árbol de componentes.
 */
const GlobalErrorBoundary = ({ children }) => {
    return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>;
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("SDR-01 critical alert: Component crash detected", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback />;
        }
        return this.props.children;
    }
}

const ErrorFallback = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 max-w-md">
            <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.876" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Algo salió mal</h1>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
                Se ha producido un error inesperadamente. Por favor, intenta recargar la página.
            </p>
            <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-primary text-white font-bold rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
                Recargar Página
            </button>
        </div>
    </div>
);

GlobalErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.element,
};

export default GlobalErrorBoundary;
