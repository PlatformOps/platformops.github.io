---
layout: post
title:  "Clean tumbstones in cassandra"
author: jinna
categories: [ cassandra, database, nosql ]
image: assets/images/tech/cassandra.svg
---

# Clean tumbstones in cassandra

- Get the GC_GRACE_SECONDS value of the table, store it in some file.

- Alter to reduce the GC_GRACE_SECONDS to 30 

`alter table student with GC_GRACE_SECONDS = 30;`

Wait for 30-60 seconds to cleanup the tumbstones and continue to atlter to the last value.

- Replace it back with actual value

`alter table student with GC_GRACE_SECONDS = 86400;`
