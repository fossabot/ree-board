import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable(
  "user",
  {
    id: text("id").primaryKey(), // Use UUIDv4 for primary key
    name: text("name").notNull().unique(),
    kinde_id: text("kinde_id").notNull().unique(),
    email: text("email").notNull().unique(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    nameIdx: index("user_name_index").on(table.name),
  })
);

enum BoardState {
  active,
  archived,
}

export const boardTable = sqliteTable(
  "board",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    state: integer("state").$type<BoardState>().notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    creator: integer("userId").references(() => userTable.id, {
      onDelete: "set null",
    }),
  },
  (table) => ({
    stateIdx: index("board_state_index").on(table.state),
  })
);

export const postTable = sqliteTable(
  "post",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    content: text("content").notNull(),
    author: integer("userId").references(() => userTable.id, {
      onDelete: "set null",
    }),
    boardId: integer("boardId").references(() => boardTable.id, {
      onDelete: "cascade",
    }),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    boardIdIdx: index("post_board_id_index").on(table.boardId),
  })
);

enum Role {
  owner,
  member,
  guest,
}

export const memberTable = sqliteTable(
  "member",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("userId").references(() => userTable.id, {
      onDelete: "cascade",
    }),
    boardId: integer("boardId").references(() => boardTable.id, {
      onDelete: "cascade",
    }),
    role: integer("role").$type<Role>().notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    userIdIdx: index("members_user_id_index").on(table.userId),
    boardIdIdx: index("members_board_id_index").on(table.boardId),
  })
);
