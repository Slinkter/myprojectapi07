/**
 * @module SDRLogger
 * @description
 * Sistema de telemetría de arquitectura para monitorear el flujo de datos,
 * ciclos de vida de componentes y transiciones de estado.
 * 
 * Mejoras:
 * - Soporte para ambiente (dev/prod)
 * - Niveles de log configurables
 * - Filtering por categorías
 * - Performance optimizado
 */

const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    NONE: 4,
};

const DEFAULT_CONFIG = {
    minLevel: import.meta.env.PROD ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG,
    enabledCategories: {
        STATE: true,
        UI: true,
        API: true,
        FLOW: true,
        PERF: true,
        ERROR: true,
    },
    enableTimestamp: !import.meta.env.PROD,
    maxDataDepth: 3,
};

let config = { ...DEFAULT_CONFIG };

export const logger = {
    configure(newConfig) {
        config = { ...config, ...newConfig };
    },

    getConfig() {
        return { ...config };
    },

    setCategory(category, enabled) {
        if (config.enabledCategories !== undefined) {
            config.enabledCategories[category] = enabled;
        }
    },

    setLevel(level) {
        config.minLevel = level;
    },

    _shouldLog(level, category) {
        if (level < config.minLevel) return false;
        if (config.enabledCategories && !config.enabledCategories[category]) return false;
        return true;
    },

    _formatTime() {
        if (!config.enableTimestamp) return "";
        return new Date().toISOString().split("T")[1].slice(0, -1);
    },

    _formatData(data, depth = 0) {
        if (depth > config.maxDataDepth) return "[MAX_DEPTH]";
        if (data === null) return null;
        if (data === undefined) return undefined;
        if (typeof data === "function") return "[Function]";
        if (typeof data !== "object") return data;
        if (Array.isArray(data)) {
            return data.slice(0, 50).map((item) => logger._formatData(item, depth + 1));
        }
        const result = {};
        for (const key of Object.keys(data).slice(0, 20)) {
            result[key] = logger._formatData(data[key], depth + 1);
        }
        return result;
    },

    state(prev, next, action) {
        if (!logger._shouldLog(LOG_LEVELS.DEBUG, "STATE")) return;
        console.log(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[STATE] Transition: " + action,
            "\nPrev:", logger._formatData(prev),
            "\nNext:", logger._formatData(next)
        );
    },

    ui(component, event, detail = "") {
        if (!logger._shouldLog(LOG_LEVELS.DEBUG, "UI")) return;
        console.log(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[UI] " + component + " " + event + " " + detail
        );
    },

    api(endpoint, status, duration) {
        if (!logger._shouldLog(LOG_LEVELS.INFO, "API")) return;
        console.log(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[API] " + endpoint + " | Status: " + status + " | Time: " + (duration ? duration.toFixed(2) : 0) + "ms"
        );
    },

    flow(step, data) {
        if (!logger._shouldLog(LOG_LEVELS.DEBUG, "FLOW")) return;
        console.log(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[FLOW] Step: " + step,
            "Data:", logger._formatData(data)
        );
    },

    perf(name, time) {
        if (!logger._shouldLog(LOG_LEVELS.INFO, "PERF")) return;
        const timeMs = typeof time === "number" ? time.toFixed(2) : time;
        console.log(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[PERF] " + name + ": " + timeMs + "ms"
        );
    },

    debug(message, ...args) {
        if (!logger._shouldLog(LOG_LEVELS.DEBUG, "FLOW")) return;
        console.debug(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[DEBUG] " + message, ...args
        );
    },

    info(message, ...args) {
        if (!logger._shouldLog(LOG_LEVELS.INFO, "UI")) return;
        console.info(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[INFO] " + message, ...args
        );
    },

    warn(message, ...args) {
        if (!logger._shouldLog(LOG_LEVELS.WARN, "API")) return;
        console.warn(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[WARN] " + message, ...args
        );
    },

    error(message, ...args) {
        if (!logger._shouldLog(LOG_LEVELS.ERROR, "ERROR")) return;
        console.error(
            (config.enableTimestamp ? "[" + logger._formatTime() + "] " : "") + "[ERROR] " + message, ...args
        );
    },

    group(label) {
        console.group(label);
    },

    groupEnd() {
        console.groupEnd();
    },

    table(data) {
        console.table(logger._formatData(data));
    },
};

export default logger;