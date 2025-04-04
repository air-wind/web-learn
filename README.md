# My Monorepo

This is a monorepo project that contains multiple packages managed with pnpm workspaces.

## Packages

- **01webpack**: This package contains the main logic and exports for package A.
- **package-b**: This package contains the main logic and exports for package B.

## Getting Started

To get started with this monorepo, you need to have [pnpm](https://pnpm.io/) installed. You can install it globally using npm:

```
npm install -g pnpm
```

### Installation

After cloning the repository, navigate to the root directory and run:

```
pnpm install
```

This will install all dependencies for the packages defined in the workspace.

### Running Packages

To run a specific package, navigate to the package directory and use the following command:

```
pnpm run <script-name>
```

Replace `<script-name>` with the script you want to execute as defined in the package's `package.json`.

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
