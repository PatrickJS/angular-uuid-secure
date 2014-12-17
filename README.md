angular-uuid-secure
===================

Most secure uuid generator in for Angular.js when you include <code>crypto</code> library


```javascript
angular.module('yourApp', ['ngUUID'])
.run(function($uuid, $log) {
  var id = $uuid();
  $log.info('Generated uuid: '+ id);
  $log.info('is uuid? '+ $uuid.isUUID(id));
});
```
