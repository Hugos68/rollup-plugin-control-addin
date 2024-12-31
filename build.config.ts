import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
	entries: ["./src/index"],
	outDir: "./dist",
	clean: true,
	declaration: true,
	sourcemap: true,
	externals: ["rollup"],
	rollup: {
		emitCJS: true,
	},
});
