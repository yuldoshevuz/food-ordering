import { Router } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../data/swagger.json"
import environments from "../config/environments";
import adminRouter from "./admin.routes";
import vendorRouter from "./vendor.routes";

const router = Router()

const swaggerDocument = JSON.stringify(swaggerDocs)
    .replace("$host", environments.HOST || `localhost:${environments.PORT}`);

router.use("/docs",
    swaggerUi.serve,
    swaggerUi.setup(JSON.parse(swaggerDocument))
); 
router.use("/admin", adminRouter)
router.use("/vendor", vendorRouter)

export default router