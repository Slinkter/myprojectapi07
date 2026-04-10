import { useEffect } from "react";
import { logger } from "@/lib/logger";

/**
 * @hook useLifecycleLog
 * @description
 * Hook de telemetría que registra el ciclo de vida de un componente.
 * Permite rastrear montajes y desmontajes en tiempo real.
 * Solo activo en desarrollo (se desactiva en producción).
 */
export const useLifecycleLog = (componentName) => {
    useEffect(() => {
        if (import.meta.env.PROD) return;

        logger.ui(componentName, "MOUNTED");

        return () => {
            logger.ui(componentName, "UNMOUNTED");
        };
    }, [componentName]);
};

export default useLifecycleLog;
