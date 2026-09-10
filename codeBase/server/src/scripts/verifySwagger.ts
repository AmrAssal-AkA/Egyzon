import fs from "fs";
import path from "path";
import { swaggerSpec } from "../docs/swagger";

const serverRoot = process.cwd();

interface RouteEntry {
  method: string;
  path: string;
  file: string;
  line: number;
}

const routeFiles = [
  { prefix: "/api/auth", file: "src/routes/auth.route.ts" },
  { prefix: "/api/product", file: "src/routes/product.route.ts" },
  { prefix: "/api/wishlist", file: "src/routes/wishlist.route.ts" },
  { prefix: "/api/seller", file: "src/routes/seller.route.ts" },
  { prefix: "/api/cart", file: "src/routes/cart.route.ts" },
  { prefix: "/api/category", file: "src/routes/category.routes.ts" },
  { prefix: "/api/customer", file: "src/routes/customer.route.ts" },
  { prefix: "/api/admin", file: "src/routes/admin.route.ts" },
  { prefix: "/api/order", file: "src/routes/order.route.ts" },
  { prefix: "/api/notifications", file: "src/routes/notifaication.routes.ts" },
  { prefix: "/api/payment", file: "src/routes/payment.route.ts" },
  { prefix: "/api/wallet", file: "src/routes/wallet.route.ts" },
  { prefix: "/api/newsletter", file: "src/routes/newsletter.routes.ts" },
];

const foundRoutes: RouteEntry[] = [];

for (const { prefix, file } of routeFiles) {
  const fullFilePath = path.join(serverRoot, file);
  if (!fs.existsSync(fullFilePath)) continue;

  const content = fs.readFileSync(fullFilePath, "utf8");

  const regex = /router\.(get|post|put|patch|delete)\(\s*["'`]([^"'`]+)["'`]/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const method = match[1]?.toUpperCase();
    const subPath = match[2];
    if (!method || !subPath) continue;

    const normalizedSubPath =
      subPath === "/" ? "" : subPath.startsWith("/") ? subPath : `/${subPath}`;
    const fullPath = `${prefix}${normalizedSubPath}`.replace(
      /:([a-zA-Z0-9_]+)/g,
      "{$1}",
    );

    const line = content.substring(0, match.index).split("\n").length;
    foundRoutes.push({ method, path: fullPath, file, line });
  }
}

// Add root routes from server.ts
foundRoutes.push({ method: "GET", path: "/", file: "server.ts", line: 76 });
foundRoutes.push({
  method: "GET",
  path: "/api-docs.json",
  file: "server.ts",
  line: 80,
});

console.log(
  `\n🔍 Verifying Swagger coverage against ${foundRoutes.length} Express endpoints...\n`,
);

const missingInSwagger: (RouteEntry & { reason: string })[] = [];
for (const r of foundRoutes) {
  const specPath = (swaggerSpec.paths as Record<string, any>)[r.path];
  if (!specPath) {
    missingInSwagger.push({ ...r, reason: "Path not found in swagger.ts" });
  } else if (!specPath[r.method.toLowerCase()]) {
    missingInSwagger.push({
      ...r,
      reason: `Method ${r.method} not documented in swagger.ts for path`,
    });
  }
}

const swaggerOps: { method: string; path: string }[] = [];
for (const [p, ops] of Object.entries(swaggerSpec.paths)) {
  for (const m of Object.keys(ops as Record<string, any>)) {
    swaggerOps.push({ method: m.toUpperCase(), path: p });
  }
}

const extraInSwagger: { method: string; path: string }[] = [];
for (const s of swaggerOps) {
  const found = foundRoutes.some(
    (r) => r.path === s.path && r.method === s.method,
  );
  if (!found) {
    extraInSwagger.push(s);
  }
}

let hasErrors = false;

if (missingInSwagger.length > 0) {
  hasErrors = true;
  console.error("❌ MISSING ROUTES IN SWAGGER:");
  for (const m of missingInSwagger) {
    console.error(
      `  • [${m.method}] ${m.path} (${m.file}:${m.line}) -> ${m.reason}`,
    );
  }
}

if (extraInSwagger.length > 0) {
  console.warn("\n⚠️  EXTRA/OBSOLETE ROUTES IN SWAGGER (NOT FOUND IN CODE):");
  for (const s of extraInSwagger) {
    console.warn(`  • [${s.method}] ${s.path}`);
  }
}

if (hasErrors) {
  console.error(
    "\n❌ Swagger verification failed! Please update src/docs/swagger.ts.\n",
  );
  process.exit(1);
} else {
  console.log(
    `✅ All ${foundRoutes.length} Express routes are fully documented in Swagger!`,
  );
  console.log("✅ No missing or conflicting endpoints detected.\n");
  process.exit(0);
}
