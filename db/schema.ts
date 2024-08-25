import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable(
  "user",
  {
    id: text("id").primaryKey(), // Use UUIDv4 for primary key
    name: text("name").notNull().unique(),
    kinde_id: text("kinde_id").notNull().unique(),
    email: text("email").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    nameIdx: index("user_name_index").on(table.name),
  })
);

export enum BoardState {
  active,
  archived,
}

export const boardTable = sqliteTable(
  "board",
  {
    id: text("id").primaryKey(), // Use UUIDv4 for primary key
    title: text("title").notNull(),
    state: integer("state").$type<BoardState>().notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    creator: text("user_id").references(() => userTable.id, {
      onDelete: "set null",
    }),
  },
  (table) => ({
    stateIdx: index("board_state_index").on(table.state),
  })
);

export enum PostType {
  'went_well',
  'to_improvement',
  'to_discuss',
  'action_item',
}

export const postTable = sqliteTable(
  "post",
  {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    author: text("user_id").references(() => userTable.id, {
      onDelete: "set null",
    }),
    boardId: text("board_id").references(() => boardTable.id, {
      onDelete: "cascade",
    }).notNull(),
    type: integer("post_type").$type<PostType>().notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    boardIdIdx: index("post_board_id_index").on(table.boardId),
  })
);

export enum Role {
  owner,
  member,
  guest,
}

export const memberTable = sqliteTable(
  "member",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").references(() => userTable.id, {
      onDelete: "cascade",
    }),
    boardId: text("board_id").references(() => boardTable.id, {
      onDelete: "cascade",
    }),
    role: integer("role").$type<Role>().notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    userIdIdx: index("members_user_id_index").on(table.userId),
    boardIdIdx: index("members_board_id_index").on(table.boardId),
  })
);
