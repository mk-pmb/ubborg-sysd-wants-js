
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-sysd-wants
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Plan a symlink to express a systemd &quot;wants&quot; relation between two
units, and/or (un)mask a unit.
<!--/#echo -->



API
---

This module exports one function that holds another function:

### sysdWants([opt, ]who, wants, what)

* `opt`: Common options, see below.
* `who` (string¹): Unit ID of the systemd trigger unit,
  e.g. `'local-fs.target'`.
* `wants` (boolean): Whether `who` "wants" `what`.
  `true` = request the symlink exists and points to `what`,
  `false` = request its absence.
* `what` (object¹): `file` spec of the systemd unit that shall be triggered.



### .mask([opt, ]unitName, masked)

Usually, masking should not be required.
You can enable or disable units in an overridable manner using
__systemd presets__ (`man 5 systemd.preset`).
Also consider using drop-in files to add specific __conditions__ to a unit.

* `opt`: Common options, see below.
* `unitName` (string¹): The name of the symlink to be created or removed in
  `/etc/systemd/system/`.
* `masked` (boolean): Whether the unit shall be masked.
  `true` = request the symlink exists and points to `'/dev/null'`,
  `false` = request its absence.


### Common options

The options object, and all of its options, are optional.

The options object argument must be either omitted or be a plain object,
i.e. not an array.

Supported options are:

* `sysdPre` (string): Path prefix to the systemd config dir to use,
  e.g. `'/etc'` or `'/lib'`.



<!--#toc stop="scan" -->

-----

¹)  May also be an array, in which case an array will be returned with the
    results of each possible combination with the other argument(s).




Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
