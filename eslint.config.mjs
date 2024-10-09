{
    "root"=true,
    "parser"= "@typescript-eslint/parser",
    "plugins"= "@typescript-eslint",
    "extends" = [
        "eslint:recommented",
        "plugin:typescript-eslint/esling-recommented",
        "plugin:typescript-eslint/recommented",
        "plugin:prettier/recommented"
    ],
		"rules"= {
			
			"@typescript-eslint/no-unused-vars": "off",
			"@rypescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "warn",

			"prettier/prettier": [
				"error",
				{
					singleQuote: true,
					trailingComma: "none",
					useTabs: true,
					semi: true,
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: "auto"
				}
			]
		}
    }