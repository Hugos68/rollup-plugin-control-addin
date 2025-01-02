import type { Plugin } from "rollup";
import css from "rollup-plugin-import-css";

export type ApplicationLanguagePrimitive = "Text" | "Boolean" | "Integer";

interface ApplicationLanguageArgument {
	name: string;
	type: ApplicationLanguagePrimitive;
}

export interface ApplicationLanguageMethod {
	type: "event" | "procedure";
	name: string;
	args: ApplicationLanguageArgument[];
	returnType: ApplicationLanguagePrimitive;
}

export interface ControlAddinOptions {
	name?: string;
	methods?: ApplicationLanguageMethod[];
}

function formatMethod(method: ApplicationLanguageMethod) {
	const args = method.args
		.map((arg) => {
			return `${arg.name}: ${arg.type}`;
		})
		.join(";");
	return `${method.type} ${method.name}(${args})${method.returnType ? `: ${method.returnType}` : ""};`;
}

export default function controlAddin(
	options: ControlAddinOptions = {},
): Plugin {
	const name = options.name ?? "ControlAddin";
	const methods = options.methods ?? [];
	return {
		name: "control-addin",
		outputOptions() {
			return {
				plugins: [css()],
				file: "dist/index.js",
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
    ${methods.map((method) => formatMethod(method)).join("\n")}`,
			});
		},
	};
}
