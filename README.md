
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-sysd-wants
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Plan a symlink to express a systemd &quot;wants&quot; relation between two
units.
<!--/#echo -->



API
---

This module exports one function:

### sysdWants(who, wants, what)

* `who` (string): Unit ID of the systemd trigger unit,
  e.g. `'local-fs.target'`.
* `wants` (boolean): Whether `who` "wants" `what`.
  `true` = request the symlink exists,
  `false` = request its absence.
* `what` (object): `file` spec of the systemd unit that shall be triggered.



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
