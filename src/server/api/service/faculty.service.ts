import type { SQL } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { Faculty, CreateFacultyRequest } from "@/server/api/dto/faculty.dto"
import { faculty } from "@/server/db/faculty";

export interface IFacultyService {
  create(req: CreateFacultyRequest, trx?: typeof db): Promise<[string | null, ErrorOrNull]>;
  getByFilter(filter?: SQL): Promise<[Faculty[] | [], ErrorOrNull]>;
  getOneByFilter(filter: SQL): Promise<[Faculty | null, ErrorOrNull]>;
  update(filter: SQL, update: Partial<Faculty>, trx?: typeof db): Promise<ErrorOrNull>;
  delete(filter: SQL): Promise<ErrorOrNull>;
}

class FacultyService implements IFacultyService {
  async create(req: CreateFacultyRequest, trx?: typeof db): Promise<[string | null, ErrorOrNull]> {
    const database = trx ?? db; // trx? trx : db;
    const id = randomUUID();
    const res = await database
      .insert(faculty)
      .values({ ...req, id })
      .returning({ id: faculty.id })
      .catch((e) => {
        console.log(e);
        return new PostgreSQLError();
      });
    
    if(res instanceof Error) return [null, res];
    return [res[0]?.id ?? null, null];
  }

  async getByFilter(filter?: SQL): Promise<[Faculty[], ErrorOrNull]> {
    const res = await db.query.faculty.findMany({
      where: filter,
    }).catch((e) => {
      console.log(e);
      return new PostgreSQLError();
    });

    if(res instanceof Error) return [[], res];
    return [res, null];
  }

  async getOneByFilter(filter: SQL): Promise<[Faculty | null, ErrorOrNull]> {
    const res = await db.query.faculty.findFirst({
      where: filter,
    }).catch((e) => {
      console.log(e);
      return new PostgreSQLError();
    })

    if(res instanceof Error) return [null, res];
    if(!res) return [null, new ErrorWithCategory("Faculty not found", ErrorCategory.ResourceNotFound)];
    return [res, null];
  }

  async update(filter: SQL, update: Partial<Faculty>, trx?: typeof db): Promise<ErrorOrNull> {
    const database = trx ?? db;

    const res = await database
      .update(faculty)
      .set({
        ...update, updatedAt: new Date()
      })
      .where(filter)
      .returning({
        updatedId: faculty.id
      })
      .catch((e) => {
        console.log(e);
        return new PostgreSQLError();
      });

    if(res instanceof Error) return res;
    if(res.length === 0) return new ErrorWithCategory("Faculty not found", ErrorCategory.ResourceNotFound);
    return null;
  }

  async delete(filter: SQL): Promise<ErrorOrNull> {
    const res = await db
    .delete(faculty)
    .where(filter)
    .catch((e) => {
      console.log(e);
      return new PostgreSQLError();
    });

    if(res instanceof Error) return res;
    return null;
  }
}

export const facultyServiceImpl = new FacultyService();