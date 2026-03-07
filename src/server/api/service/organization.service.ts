import type { SQL } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { Organization, OrganizationWithUser, CreateOrganizationRequest } from "@/server/api/dto/organization.dto";
import { organization } from "@/server/db/organization";
import { user } from "@/server/db/auth-schema";
import { eq } from "drizzle-orm";
import { userServiceImpl } from "@/server/api/service/user.service";

export interface IOrganizationService {
    create(req: CreateOrganizationRequest, trx?: typeof db): Promise<[string | null, ErrorOrNull]>;
    getByFilter(filter?: SQL): Promise<[OrganizationWithUser[] | [], ErrorOrNull]>;
    getOneByFilter(filter: SQL): Promise<[OrganizationWithUser | null, ErrorOrNull]>;
    update(filter: SQL, update: Partial<Organization>, trx?: typeof db): Promise<ErrorOrNull>;
    delete(filter: SQL): Promise<ErrorOrNull>;
}

class OrganizationService implements IOrganizationService {
    async create(req: CreateOrganizationRequest, trx?: typeof db): Promise<[string | null, ErrorOrNull]> {
        const database = trx ?? db;
        const id = randomUUID();
        const res = await database
            .insert(organization)
            .values({ ...req, id })
            .returning({ id: organization.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return [null, res];
        return [res[0]?.id ?? null, null];
    }
    async getByFilter(filter?: SQL): Promise<[OrganizationWithUser[], ErrorOrNull]> {
        const res = await db.query.organization.findMany({
            where: filter,
            with: { user: true }
        }).catch((e) => {
            console.log(e);
            return new PostgreSQLError();
        });

        if (res instanceof Error) return [[], res];
        return [res as OrganizationWithUser[], null];
    }

    async getOneByFilter(filter: SQL): Promise<[OrganizationWithUser | null, ErrorOrNull]> {
        const res = await db.query.organization.findFirst({
            where: filter,
            with: { user: true }
        }).catch((e) => {
            console.log(e);
            return new PostgreSQLError();
        });

        if (res instanceof Error) return [null, res];
        if (!res) return [null, new ErrorWithCategory("Organization not found", ErrorCategory.ResourceNotFound)];
        return [res as OrganizationWithUser, null];
    }

    async update(filter: SQL, update: Partial<Organization>, trx?: typeof db): Promise<ErrorOrNull> {
        const database = trx ?? db;

        const res = await database
            .update(organization)
            .set({ ...update, updatedAt: new Date() })
            .where(filter)
            .returning({ updatedId: organization.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return res;
        if (res.length === 0) return new ErrorWithCategory("Organization not found", ErrorCategory.ResourceNotFound);
        return null;
    }

    async delete(filter: SQL): Promise<ErrorOrNull> {
        return await db.transaction(async (tx) => {
            const orgs = await tx
                .select({ userId: organization.userId })
                .from(organization)
                .where(filter);

            const org = orgs[0];
            if (!org) return null;

            const userId = org.userId;

            const deleteOrgRes = await tx
                .delete(organization)
                .where(filter)
                .catch((e) => {
                    console.log(e);
                    return new PostgreSQLError();
                });

            if (deleteOrgRes instanceof Error) return deleteOrgRes;

            const deleteUserRes = await userServiceImpl.delete(eq(user.id, userId), tx);

            if (deleteUserRes instanceof Error) throw deleteUserRes;

            return null;

        }).catch((e) => {
            if (e instanceof ErrorWithCategory || e instanceof PostgreSQLError) return e;
            return new PostgreSQLError();
        });
    }
}

export const organizationServiceImpl = new OrganizationService();
