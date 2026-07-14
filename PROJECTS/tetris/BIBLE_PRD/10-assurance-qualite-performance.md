Assurance Qualité & Performance — TETRISPerformance Targets (Lighthouse)




MétriqueCibleMéthodePerformance≥ 95Lighthouse DesktopAccessibilité≥ 95Lighthouse + WCAG 2.1 AABest Practices≥ 95LighthouseSEO≥ 90LighthouseFCP< 1.0sLighthouseLCP< 2.0sLighthouseTBT< 100msLighthouseCLS< 0.05Lighthouse
Bundle OptimizationVite Build Configuration:
rollupOptions.output.manualChunks: Séparation React, React-DOM, et libs tierces

build.chunkSizeWarningLimit: 500KB

build.sourcemap: false (production)

build.minify: 'esbuild' (rapide et efficace)

Target Bundle Sizes: