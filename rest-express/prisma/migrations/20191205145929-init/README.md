# Migration `20191205145929-init`

This migration has been generated by David at 12/5/2019, 2:59:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "lift"."User" (
  "avatarUrl" TEXT NOT NULL DEFAULT ''  ,
  "email" TEXT    ,
  "id" TEXT NOT NULL   ,
  "name" TEXT    ,
  "nickname" TEXT    ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."Post" (
  "author" TEXT    REFERENCES "User"(id) ON DELETE SET NULL,
  "content" TEXT    ,
  "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "id" TEXT NOT NULL   ,
  "published" BOOLEAN NOT NULL DEFAULT true  ,
  "title" TEXT NOT NULL DEFAULT ''  ,
  "updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."Message" (
  "author" TEXT NOT NULL   REFERENCES "User"(id) ON DELETE RESTRICT,
  "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "id" TEXT NOT NULL   ,
  "text" TEXT NOT NULL DEFAULT ''  ,
  "updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."User_roles" (
  "nodeId" TEXT NOT NULL   REFERENCES "User"(id) ON DELETE CASCADE,
  "position" INTEGER NOT NULL   ,
  "value" TEXT NOT NULL   ,
  PRIMARY KEY ("nodeId","position")
);

CREATE UNIQUE INDEX "lift"."User.email" ON "User"("email")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20191205145929-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,50 @@
+datasource sqlite {
+  provider = "sqlite"
+  url      = "file:dev.db"
+  enabled  = true
+}
+
+// This is used in prod
+// datasource db {
+//   provider = "mysql"
+//   url      = env("MYSQL_URL")
+//   default  = true
+// }
+
+enum Role {
+  USER
+  ADMIN
+}
+
+generator photon {
+  provider = "photonjs"
+}
+
+model User {
+  id        String    @default(cuid()) @id
+  email     String?   @unique
+  name      String?
+  nickname  String?
+  avatarUrl String
+  posts     Post[]
+  messages  Message[]
+  roles     Role[]
+}
+
+model Post {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  published Boolean  @default(true)
+  title     String
+  content   String?
+  author    User?
+}
+
+model Message {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  text      String
+  author    User
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20191205145929-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191205145929-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
