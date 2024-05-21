# GlanceRNExample

An example use of the Glance SDK, based on newer React Native

## Recipe:

```sh
 npx react-native@0.72.10 init GlanceExample --version 0.72.10
 yarn add redux redux-thunk react-redux redux-persist @react-native-async-storage/async-storage react-native-safe-area-context
 yarn add @types/redux-persist --dev # and then add this to tsconfig.json: compilerOptions: types": ["react-native", "jest", "redux-persist"]
 cd ios; pod install; cd ..
```
