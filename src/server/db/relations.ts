import { relations } from "drizzle-orm";
import { user } from "./user";
import { faculty } from "./faculty";
import { organization } from "./organization";
import { interest } from "./interest";
import { post } from "./post";
import { calendarItem } from "./calendarItem";
import { userXOrganization } from "./userXOrganization";
import { interestXOrganization } from "./interestXOrganization";
import { interestXUser } from "./interestXUser";
import { interestXPost } from "./interestXPost";

export const userRelations = relations(user, ({ one, many }) => ({
  faculty: one(faculty, {
    fields: [user.facultyId],
    references: [faculty.id],
  }),
  organization: one(organization, {
    fields: [user.id],
    references: [organization.userId],
  }),
  calendarItems: many(calendarItem),
  followingOrganizations: many(userXOrganization),
  interests: many(interestXUser),
}));

export const facultyRelations = relations(faculty, ({ many }) => ({
  users: many(user),
}));

export const organizationRelations = relations(
  organization,
  ({ one, many }) => ({
    user: one(user, {
      fields: [organization.userId],
      references: [user.id],
    }),
    followers: many(userXOrganization),
    interests: many(interestXOrganization),
  }),
);

export const interestRelations = relations(interest, ({ many }) => ({
  users: many(interestXUser),
  organizations: many(interestXOrganization),
  posts: many(interestXPost),
}));

export const postRelations = relations(post, ({ many }) => ({
  calendarItems: many(calendarItem),
  interests: many(interestXPost),
}));

export const calendarItemRelations = relations(calendarItem, ({ one }) => ({
  post: one(post, {
    fields: [calendarItem.postId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [calendarItem.userId],
    references: [user.id],
  }),
}));

export const userXOrganizationRelations = relations(
  userXOrganization,
  ({ one }) => ({
    user: one(user, {
      fields: [userXOrganization.userId],
      references: [user.id],
    }),
    organization: one(organization, {
      fields: [userXOrganization.organizationId],
      references: [organization.id],
    }),
  }),
);

export const interestXOrganizationRelations = relations(
  interestXOrganization,
  ({ one }) => ({
    interest: one(interest, {
      fields: [interestXOrganization.interestId],
      references: [interest.id],
    }),
    organization: one(organization, {
      fields: [interestXOrganization.organizationId],
      references: [organization.id],
    }),
  }),
);

export const interestXUserRelations = relations(interestXUser, ({ one }) => ({
  interest: one(interest, {
    fields: [interestXUser.interestId],
    references: [interest.id],
  }),
  user: one(user, {
    fields: [interestXUser.userId],
    references: [user.id],
  }),
}));

export const interestXPostRelations = relations(interestXPost, ({ one }) => ({
  interest: one(interest, {
    fields: [interestXPost.interestId],
    references: [interest.id],
  }),
  post: one(post, {
    fields: [interestXPost.postId],
    references: [post.id],
  }),
}));
