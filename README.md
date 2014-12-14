angular-uuid-secure
===================

Most secure uuid generator in for Angular.js


```javascript
angular.module('yourApp', ['ngUUID'])
.run(function($uuid, $log) {
  var uuid = $uuid();
  $log.info('Generated uuid', uuid);
});
```
