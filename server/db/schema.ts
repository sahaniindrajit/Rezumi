import {
    pgTableCreator,
    boolean,
    timestamp,
    text,
    primaryKey,
    integer,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const createTable = pgTableCreator((name) => `${name}`);




export const userDetails = createTable('userDetails', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    experince: text('experience')
        .array(),
    education: text('education')
        .array(),
    skill: text('skill')
        .array(),
    project: text('project')
        .array(),
    additional: text('additional')
        .array(),
    certificate: text('certificate')
        .array(),
    achivement: text('achivement')
        .array(),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull(),
})


export const experience = createTable('experience', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    jobtitle: text('jobTitle'),
    company: text('company'),
    isCurrent: boolean('isCurrent'),
    startingDate: timestamp('startingDate', { mode: 'string' }).notNull(),
    endingDate: timestamp('endingDate', { mode: 'string' }),
    description: text('description'),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull(),
})

export const education = createTable('education', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    degree: text('degree').notNull(),
    field: text('field').notNull(),
    university: text('university').notNull(),
    isCurrent: boolean('isCurrent').default(false),
    gpa: text('gpa').notNull(),
    startingDate: timestamp('startingDate', { mode: 'string' }).notNull(),
    endingDate: timestamp('endingDate', { mode: 'string' }),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull(),

})

export const skill = createTable('skill', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    technical: text('technical').array().notNull(),
    softSkill: text('softSkill').array().notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull(),

})


export const project = createTable('project', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    description: text('description').notNull(),
    skills: text('skills')
        .array()
        .notNull(),
    link: text('link').notNull(),
    isCurrent: boolean('isCurrent').default(false),
    startingDate: timestamp('startingDate', { mode: 'string' }).notNull(),
    endingDate: timestamp('endingDate', { mode: 'string' }),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull(),
})

export const certificate = createTable('certificate', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    description: text('description').notNull(),
    link: text('link'),
    skills: text('skills')
        .array()
        .notNull(),
})

export const achivement = createTable('achivement', {
    id: text('text')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    link: text('link'),
})

export const additional = createTable('additional', {
    id: text('text')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    link: text('link'),
})

export const users = createTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    phoneNumber: integer('phoneNumber'),
    country: text('country'),
    location: text('location'),
    dob: timestamp('dob'),
    gender: text('gender'),
    linkedin: text('linkedin'),
    portfolio: text('portfolio'),
    currentPosition: text('currentPosition'),
    description: text('description'),
})

export const accounts = createTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = createTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = createTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ]
)

export const authenticators = createTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)

export type EducationType = typeof education.$inferSelect;
export type achivementType = typeof achivement.$inferSelect;
export type SkillType = typeof skill.$inferSelect;
export type AdditionType = typeof additional.$inferSelect;
export type ExperienceType = typeof experience.$inferSelect;
export type ProjectType = typeof project.$inferSelect;
export type CertificateType = typeof certificate.$inferSelect;
export type UserType = typeof users.$inferSelect; // initially user was pointing to drizzle/schema.ts, but now it points to the new users table