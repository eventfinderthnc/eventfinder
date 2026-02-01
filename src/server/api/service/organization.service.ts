import type { SQL } from "drizzle-orm";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { Organization, CreateOrganizationRequest } from "@/server/api/dto/organization.dto";
import { organization } from "@/server/db/organization";
import { user } from "@/server/db/user";
import { eq } from "drizzle-orm";
import { userServiceImpl } from "@/server/api/service/user.service";

export interface IOrganizationService {
    create(req: CreateOrganizationRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]>;
    getByFilter(filter?: SQL): Promise<[Organization[] | [], ErrorOrNull]>;
    getOneByFilter(filter: SQL): Promise<[Organization | null, ErrorOrNull]>;
    update(filter: SQL, update: Partial<Organization>, trx?: typeof db): Promise<ErrorOrNull>;
    delete(filter: SQL): Promise<ErrorOrNull>;
}

class OrganizationService implements IOrganizationService {
    async create(req: CreateOrganizationRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]> {
        const database = trx ?? db;
        const res = await database
            .insert(organization)
            .values(req)
            .returning({ id: organization.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return [null, res];
        return [res[0]?.id ?? 0, null];
    }
    async getByFilter(filter?: SQL): Promise<[Organization[], ErrorOrNull]> {
        const res = await db.query.organization.findMany({ where: filter }).catch((e) => {
            console.log(e);
            return new PostgreSQLError();
        });

        if (res instanceof Error) return [[], res];
        return [res, null];
    }

    async getOneByFilter(filter: SQL): Promise<[Organization | null, ErrorOrNull]> {
        const res = await db.query.organization.findFirst({ where: filter }).catch((e) => {
            console.log(e);
            return new PostgreSQLError();
        });

        if (res instanceof Error) return [null, res];
        if (!res) return [null, new ErrorWithCategory("Organization not found", ErrorCategory.ResourceNotFound)];
        return [res, null];
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

            const deleteUserRes = await userServiceImpl.delete(eq(user.id, Number(userId)), tx);

            if (deleteUserRes instanceof Error) throw deleteUserRes;

            return null;

        }).catch((e) => {
            if (e instanceof ErrorWithCategory || e instanceof PostgreSQLError) return e;
            return new PostgreSQLError();
        });
    }
}

export const organizationServiceImpl = new OrganizationService();
