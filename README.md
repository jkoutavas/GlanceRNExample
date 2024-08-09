# GlanceRNExample

An example use of the Glance SDK, based on newer React Native

## Recipe

```sh
 npx react-native@0.72.10 init GlanceExample --version 0.72.10
 yarn add @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage react-native-safe-area-context @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-reanimated
 yarn add @types/redux-persist --dev # and then add this to tsconfig.json: compilerOptions: types": ["react-native", "jest", "redux-persist"]
 yarn add @glance-networks/reactnative-bridge
 cd ios; pod install; cd ..
```
