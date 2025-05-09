[< back](../README.md)

# Add new application project

### Step 1: Create a new directory within `apps` directory

the name of the folder and the prefix path of the application should be the same.

### Step 2: Create `turbo.json` file

create a `turbo.json` file within application's folder. The file should include the `build`, `dev` and `start` commands. the number of variants of each command depends on the enviroments.

### Step 3: Define scripts in `package.json` file

in the `scripts` section in the `package.json`, you need to defined `build`, `dev`, `start` and `clean` scripts at least.

### Step 4: Config multi-zones

add a new key into .env.\* files `main` application. you can find these file in `apps/main/env/...` folder.
<br />
The name of key should follow the convention below:
<br />
`NEXT_PUBLIC_ZONE_<UNIQUE-NUMBER>`.
<br />
The value of the key should follow the convention below:
<br />
``` javascript
`"{\"name\":\"<name-of-zone>\",\"domain\":\"<domain-of-zone>\"}"`
```
<br />
<br />
For example:

``` json
NEXT_PUBLIC_ZONE_4="{\"name\":\"admin\",\"domain\":\"http://localhost:9002\"}"
```