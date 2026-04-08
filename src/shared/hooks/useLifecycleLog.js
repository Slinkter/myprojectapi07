import { useEffect } from "react";
import { logger } from "@/lib/logger";

/**
 * @hook useLifecycleLog
 * @description
 * Hook de telemetría que registra el ciclo de vida de un componente.
 * Permite rastrear montajes, actualizaciones y desmontajes en tiempo real.
 */
export const useLifecycleLog = (componentName) => {
    useEffect(() => {
        logger.ui(componentName, "MOUNTED");

        return () => {
            logger.ui(componentName, "UNMOUNTED");
        };
    }, [componentName]);

    useEffect(() => {
        logger.ui(componentName, "UPDATED");
    });
};

export default useLifecycleLog;
