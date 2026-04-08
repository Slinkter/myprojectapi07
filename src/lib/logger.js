/**
 * @module SDRLogger
 * @description
 * Sistema de telemetría de arquitectura para monitorear el flujo de datos,
 * ciclos de vida de componentes y transiciones de estado.
 */

const COLORS = {
    STATE: 'color: #3B82F6; font-weight: bold;', // Blue
    UI: 'color: #10B981; font-weight: bold;',    // Green
    API: 'color: #EF4444; font-weight: bold;',    // Red
    FLOW: 'color: #F59E0B; font-weight: bold;',   // Amber
    PERF: 'color: #8B5CF6; font-weight: bold;',   // Purple
};

const TAGS = {
    STATE: '[SDR-LOG][STATE]',
    UI: '[SDR-LOG][UI]',
    API: '[SDR-LOG][API]',
    FLOW: '[SDR-LOG][FLOW]',
    PERF: '[SDR-LOG][PERF]',
};

export const logger = {
    state: (prev, next, action) => {
        console.log(
            `%c${TAGS.STATE} %cState Transition: %c${action} %c\nPrev:`, 
            COLORS.STATE, '', COLORS.FLOW, '', 
            prev, 
            `\nNext:`, COLORS.UIB, next
        );
    },
    ui: (component, event, detail = "") => {
        console.log(
            `%c${TAGS.UI} %c${component} %c${event} ${detail}`, 
            COLORS.UI, COLORS.FLOW, ''
        );
    },
    api: (endpoint, status, duration) => {
        console.log(
            `%c${TAGS.API} %c${endpoint} %cStatus: ${status} %cTime: ${duration}ms`, 
            COLORS.API, COLORS.FLOW, COLORS.UI, COLORS.PERF
        );
    },
    flow: (step, data) => {
        console.log(
            `%c${TAGS.FLOW} %cStep: ${step} %cData:`, 
            COLORS.FLOW, COLORS.UI, ''
        , data);
    },
    perf: (name, time) => {
        console.log(
            `%c${TAGS.PERF} %c${name}: %ctime`, 
            COLORS.PERF, COLORS.FLOW, '', time
        );
    }
};

export default logger;
