# rollup-plugin-control-addin

A [Rollup](https://rollupjs.org/) plugin for building [AL Control Add-in](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-control-addin-object)'s.

## Installation

```bash
pnpm add rollup-plugin-control-addin
```

## Usage

```js
import { defineConfig } from 'rollup';
import controlAddin from 'rollup-plugin-control-addin';

export default defineConfig({
    plugins: [controlAddin()]
});
```

## License

This project is licensed under the MIT license, see [LICENSE](LICENSE.txt).