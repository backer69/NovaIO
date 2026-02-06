module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/lib/supabase.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
;
// Environment variables checks
const supabaseUrl = ("TURBOPACK compile-time value", "");
const supabaseAnonKey = ("TURBOPACK compile-time value", "");
if ("TURBOPACK compile-time truthy", 1) {
    // In development, this might happen during build before env vars are set properly
    // or if using local JSON mode. We don't want to crash import.
    console.warn('Supabase URL or Key missing. Database features will fail.');
}
const supabase = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCalendarEvent",
    ()=>addCalendarEvent,
    "addFinanceEntry",
    ()=>addFinanceEntry,
    "addRegistration",
    ()=>addRegistration,
    "getAdminByEmail",
    ()=>getAdminByEmail,
    "getCalendarEvents",
    ()=>getCalendarEvents,
    "getDashboardStats",
    ()=>getDashboardStats,
    "getFinanceEntries",
    ()=>getFinanceEntries,
    "getRegistrations",
    ()=>getRegistrations
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
;
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'data', 'db.json');
// --- Supabase Check ---
const isSupabaseEnabled = ()=>{
    return !!("TURBOPACK compile-time value", "") && !!("TURBOPACK compile-time value", "") && !!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"];
};
// --- Local JSON Helpers ---
const readLocalDb = ()=>{
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading local DB:', error);
        return {
            registrations: [],
            admins: [],
            finance: [],
            calendar: []
        };
    }
};
const writeLocalDb = (data)=>{
    try {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing local DB:', error);
    }
};
const getRegistrations = async ()=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    return readLocalDb().registrations;
};
const addRegistration = async (registration)=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    // Local Fallback
    const db = readLocalDb();
    db.registrations.push(registration);
    writeLocalDb(db);
};
const getAdminByEmail = async (email)=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    // Fallback
    const db = readLocalDb();
    return db.admins.find((admin)=>admin.email === email);
};
const getFinanceEntries = async ()=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    return readLocalDb().finance;
};
const addFinanceEntry = async (entry)=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    const db = readLocalDb();
    const newEntry = {
        ...entry,
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        createdAt: new Date().toISOString()
    };
    db.finance.push(newEntry);
    writeLocalDb(db);
};
const getCalendarEvents = async ()=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    return readLocalDb().calendar;
};
const addCalendarEvent = async (event)=>{
    if (isSupabaseEnabled()) //TURBOPACK unreachable
    ;
    const db = readLocalDb();
    const newEvent = {
        ...event,
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        createdAt: new Date().toISOString()
    };
    db.calendar.push(newEvent);
    writeLocalDb(db);
};
const getDashboardStats = async ()=>{
    const registrations = await getRegistrations();
    const finance = await getFinanceEntries();
    const calendar = await getCalendarEvents();
    const totalRevenue = finance.filter((e)=>e.type === 'INCOME').reduce((sum, e)=>sum + Number(e.amount), 0);
    const pendingRegistrations = registrations.filter((r)=>r.status === 'PENDING').length;
    // Logic for "active webinars": let's say events that haven't ended yet
    const now = new Date();
    const activeWebinars = calendar.filter((e)=>new Date(e.endAt) > now).length;
    return {
        totalRevenue,
        totalRegistrations: registrations.length,
        activeWebinars,
        pendingRegistrations
    };
};
}),
"[project]/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40ce4610ee2cca951a1fe3d8486398af3ac6c1d41c":"submitRegistration","40d9bc2c5bec3b41d2a53fe5db76c0732d8f057569":"createCalendarEventAction","40e49910126a85fc34196c800eae66036dea9ea7fc":"createFinanceEntryAction"},"",""] */ __turbopack_context__.s([
    "createCalendarEventAction",
    ()=>createCalendarEventAction,
    "createFinanceEntryAction",
    ()=>createFinanceEntryAction,
    "submitRegistration",
    ()=>submitRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function submitRegistration(draft) {
    if (!draft.personal || !draft.address || !draft.motivation) {
        throw new Error("Incomplete registration data");
    }
    const record = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        ...draft,
        personal: draft.personal,
        address: draft.address,
        motivation: draft.motivation,
        currentStep: 3,
        status: 'PENDING',
        createdAt: new Date().toISOString()
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRegistration"])(record);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard/members');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
    return {
        success: true
    };
}
async function createFinanceEntryAction(formData) {
    const type = formData.get('type');
    const amount = Number(formData.get('amount'));
    const category = formData.get('category');
    const description = formData.get('description');
    const date = formData.get('date');
    if (!type || isNaN(amount) || !date) {
        throw new Error('Invalid input');
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addFinanceEntry"])({
        type,
        amount,
        category,
        description,
        date
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard/finance');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
async function createCalendarEventAction(formData) {
    const title = formData.get('title');
    const startAt = formData.get('startAt');
    const endAt = formData.get('endAt');
    const meetLink = formData.get('meetLink');
    if (!title || !startAt || !endAt) {
        throw new Error('Invalid input');
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addCalendarEvent"])({
        title,
        startAt,
        endAt,
        meetLink
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard/calendar');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    submitRegistration,
    createFinanceEntryAction,
    createCalendarEventAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitRegistration, "40ce4610ee2cca951a1fe3d8486398af3ac6c1d41c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFinanceEntryAction, "40e49910126a85fc34196c800eae66036dea9ea7fc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCalendarEventAction, "40d9bc2c5bec3b41d2a53fe5db76c0732d8f057569", null);
}),
"[project]/.next-internal/server/app/register/motivation/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/register/motivation/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40ce4610ee2cca951a1fe3d8486398af3ac6c1d41c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitRegistration"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$motivation$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/register/motivation/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__516b1eb3._.js.map