import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite probar el dev server desde el celular usando la IP LAN.
  // Next bloquea recursos dev como /_next/webpack-hmr si el origen no esta permitido.
  allowedDevOrigins: ["10.22.210.160"],
};

export default nextConfig;
