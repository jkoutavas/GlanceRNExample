# GlanceRNExample

**Last updated 6-Sep-2024**

An example use of the [Glance React Bridge NPM Package](https://www.npmjs.com/package/@glance-networks/reactnative-bridge), based on some practices we're using on another project:

- React Native 0.74.5
- Functional Components
- yarn.lock file committed to git

## Recipe

```sh
 npx react-native@0.74.5 init GlanceExample --version 0.74.5
 yarn add @glance-networks/reactnative-bridge
 cd ios; pod install; cd ..
 yarn ios
 yarn android
```
