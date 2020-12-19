# Migration `20201219093508-add-special-stats`

This migration has been generated by Sam Starling at 12/19/2020, 9:35:08 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Pokemon" ADD COLUMN     "specialDefense" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "specialAttack" INTEGER NOT NULL DEFAULT 0
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201126082055-add-classification..20201219093508-add-special-stats
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,8 +17,10 @@
   hp Int @default(0)
   attack Int @default(0)
   defense Int @default(0)
   speed Int @default(0)
+  specialDefense Int @default(0)
+  specialAttack Int @default(0)
   @@index([generation])
 }
```

