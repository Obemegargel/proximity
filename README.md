| Tool                  | Version                                 | Notes / How to check                        |
| --------------------- | --------------------------------------- | ------------------------------------------- |
| OS                    | Windows 11 (build 26100.6584)           | `winver`                                    |
| Shell                 | PowerShell                              | ExecutionPolicy: RemoteSigned (CurrentUser) |
| Node.js               | v22.11.0                                | LTS line; `node -v`                         |
| npm                   | 10.9.0                                  | Bundled with Node 22; `npm -v`              |
| npx                   | 10.9.0                                  | Bundled with npm; `npx -v`                  |
| Git                   | 2.47.0.windows.1                        | `git --version`                             |
| LTS codename          | Jod                                     | `node -p "process.release.lts"` → `Jod`     |
| Expo CLI              | 54.0.8                                  | `npx expo --version`                        |
| EAS CLI               | 16.20.0 (uninstalled to fix errors)     | `npx eas --version`                         |
| Android PlatformTools | 36.0.0                                  | `adb version`                               |
| Expo Dev Client       | Installed                               | Built via EAS (development profile)         |
| SDK Path              | Android SDK: %LOCALAPPDATA%\Android\Sdk |                                             |
| React                 |                                         |                                             |
| React Native          |                                         |                                             |

# Package (SDK) versions installed in my app:

node -p "require('./package.json').dependencies['expo']" # 54.0.12
node -p "require('./package.json').dependencies['react']" # 19.1.0
node -p "require('./package.json').dependencies['react-native']" # 0.81.4
node -p "require('./package.json').devDependencies['typescript']" # ^5.9.3
