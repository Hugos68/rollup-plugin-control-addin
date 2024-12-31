import type { Plugin } from "rollup";

export interface ControlAddinOptions {
	name?: string;
	lines?: string[];
}

export default function (options: ControlAddinOptions = {}): Plugin {
	const name = options.name ?? "ControlAddin";
	const lines = options.lines ?? [];
	return {
		name: "control-addin",
		outputOptions(options) {
			return {
				...options,
				format: "cjs",
			};
		},
		buildEnd() {
			this.emitFile({
				fileName: `${name}.al`,
				type: "prebuilt-chunk",
				code: `controladdin ${name} {
    StartupScript = './index.js';
    StyleSheets = './index.css';
    HorizontalStretch = true;
    HorizontalShrink = true;
    ${lines.map((line) => `${line}\n`)}`,
			});
		},
	};
}
