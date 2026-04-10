/**
 * @module app/router/DetailLayout
 * @description Layout para página de detalles (sin Navbar).
 */

import { Outlet } from "react-router-dom";
import { LAYOUT } from "@/utils/constants";

const DetailLayout = () => (
    <div className={LAYOUT.ROOT_CLASSES}>
        <Outlet />
    </div>
);

export default DetailLayout;