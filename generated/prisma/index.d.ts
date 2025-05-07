
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Batch
 * 
 */
export type Batch = $Result.DefaultSelection<Prisma.$BatchPayload>
/**
 * Model Candidate
 * 
 */
export type Candidate = $Result.DefaultSelection<Prisma.$CandidatePayload>
/**
 * Model ExamResponse
 * 
 */
export type ExamResponse = $Result.DefaultSelection<Prisma.$ExamResponsePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ExamType: {
  THEORY: 'THEORY',
  PRACTICAL: 'PRACTICAL',
  VIVA: 'VIVA'
};

export type ExamType = (typeof ExamType)[keyof typeof ExamType]

}

export type ExamType = $Enums.ExamType

export const ExamType: typeof $Enums.ExamType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Batches
 * const batches = await prisma.batch.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Batches
   * const batches = await prisma.batch.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.batch`: Exposes CRUD operations for the **Batch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Batches
    * const batches = await prisma.batch.findMany()
    * ```
    */
  get batch(): Prisma.BatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidate`: Exposes CRUD operations for the **Candidate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidates
    * const candidates = await prisma.candidate.findMany()
    * ```
    */
  get candidate(): Prisma.CandidateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.examResponse`: Exposes CRUD operations for the **ExamResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamResponses
    * const examResponses = await prisma.examResponse.findMany()
    * ```
    */
  get examResponse(): Prisma.ExamResponseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Batch: 'Batch',
    Candidate: 'Candidate',
    ExamResponse: 'ExamResponse'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "batch" | "candidate" | "examResponse"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Batch: {
        payload: Prisma.$BatchPayload<ExtArgs>
        fields: Prisma.BatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findFirst: {
            args: Prisma.BatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findMany: {
            args: Prisma.BatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          create: {
            args: Prisma.BatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          createMany: {
            args: Prisma.BatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          delete: {
            args: Prisma.BatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          update: {
            args: Prisma.BatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          deleteMany: {
            args: Prisma.BatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          upsert: {
            args: Prisma.BatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          aggregate: {
            args: Prisma.BatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatch>
          }
          groupBy: {
            args: Prisma.BatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchCountArgs<ExtArgs>
            result: $Utils.Optional<BatchCountAggregateOutputType> | number
          }
        }
      }
      Candidate: {
        payload: Prisma.$CandidatePayload<ExtArgs>
        fields: Prisma.CandidateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findFirst: {
            args: Prisma.CandidateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findMany: {
            args: Prisma.CandidateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          create: {
            args: Prisma.CandidateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          createMany: {
            args: Prisma.CandidateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          delete: {
            args: Prisma.CandidateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          update: {
            args: Prisma.CandidateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          deleteMany: {
            args: Prisma.CandidateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          upsert: {
            args: Prisma.CandidateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          aggregate: {
            args: Prisma.CandidateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidate>
          }
          groupBy: {
            args: Prisma.CandidateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateCountAggregateOutputType> | number
          }
        }
      }
      ExamResponse: {
        payload: Prisma.$ExamResponsePayload<ExtArgs>
        fields: Prisma.ExamResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>
          }
          findFirst: {
            args: Prisma.ExamResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>
          }
          findMany: {
            args: Prisma.ExamResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>[]
          }
          create: {
            args: Prisma.ExamResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>
          }
          createMany: {
            args: Prisma.ExamResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>[]
          }
          delete: {
            args: Prisma.ExamResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>
          }
          update: {
            args: Prisma.ExamResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>
          }
          deleteMany: {
            args: Prisma.ExamResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExamResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>[]
          }
          upsert: {
            args: Prisma.ExamResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResponsePayload>
          }
          aggregate: {
            args: Prisma.ExamResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExamResponse>
          }
          groupBy: {
            args: Prisma.ExamResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ExamResponseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    batch?: BatchOmit
    candidate?: CandidateOmit
    examResponse?: ExamResponseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BatchCountOutputType
   */

  export type BatchCountOutputType = {
    candidates: number
    examResponses: number
  }

  export type BatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | BatchCountOutputTypeCountCandidatesArgs
    examResponses?: boolean | BatchCountOutputTypeCountExamResponsesArgs
  }

  // Custom InputTypes
  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchCountOutputType
     */
    select?: BatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountExamResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamResponseWhereInput
  }


  /**
   * Count Type CandidateCountOutputType
   */

  export type CandidateCountOutputType = {
    examResponses: number
  }

  export type CandidateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResponses?: boolean | CandidateCountOutputTypeCountExamResponsesArgs
  }

  // Custom InputTypes
  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCountOutputType
     */
    select?: CandidateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountExamResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamResponseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Batch
   */

  export type AggregateBatch = {
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  export type BatchAvgAggregateOutputType = {
    noOfCandidates: number | null
    durationInMin: number | null
  }

  export type BatchSumAggregateOutputType = {
    noOfCandidates: number | null
    durationInMin: number | null
  }

  export type BatchMinAggregateOutputType = {
    id: string | null
    assessor: string | null
    name: string | null
    type: string | null
    status: string | null
    noOfCandidates: number | null
    durationInMin: number | null
    no: string | null
    startDate: Date | null
    endDate: Date | null
    theoryQuestionBank: string | null
    practicalQuestionBank: string | null
    vivaQuestionBank: string | null
    isAssessorReached: boolean | null
    isCandidateVideoRequired: boolean | null
    isCandidatePhotosRequired: boolean | null
    isCandidateLocationRequired: boolean | null
    isCandidateAdharRequired: boolean | null
    isCandidateSelfieRequired: boolean | null
    isPracticalVisibleToCandidate: boolean | null
    isSuspiciousActivityDetectionRequired: boolean | null
    isAssessorEvidenceRequired: boolean | null
    assessorReachedAt: Date | null
    assessorCoordinates: string | null
    assessorGroupPhoto: string | null
  }

  export type BatchMaxAggregateOutputType = {
    id: string | null
    assessor: string | null
    name: string | null
    type: string | null
    status: string | null
    noOfCandidates: number | null
    durationInMin: number | null
    no: string | null
    startDate: Date | null
    endDate: Date | null
    theoryQuestionBank: string | null
    practicalQuestionBank: string | null
    vivaQuestionBank: string | null
    isAssessorReached: boolean | null
    isCandidateVideoRequired: boolean | null
    isCandidatePhotosRequired: boolean | null
    isCandidateLocationRequired: boolean | null
    isCandidateAdharRequired: boolean | null
    isCandidateSelfieRequired: boolean | null
    isPracticalVisibleToCandidate: boolean | null
    isSuspiciousActivityDetectionRequired: boolean | null
    isAssessorEvidenceRequired: boolean | null
    assessorReachedAt: Date | null
    assessorCoordinates: string | null
    assessorGroupPhoto: string | null
  }

  export type BatchCountAggregateOutputType = {
    id: number
    assessor: number
    name: number
    type: number
    status: number
    noOfCandidates: number
    durationInMin: number
    no: number
    startDate: number
    endDate: number
    theoryQuestionBank: number
    practicalQuestionBank: number
    vivaQuestionBank: number
    isAssessorReached: number
    isCandidateVideoRequired: number
    isCandidatePhotosRequired: number
    isCandidateLocationRequired: number
    isCandidateAdharRequired: number
    isCandidateSelfieRequired: number
    isPracticalVisibleToCandidate: number
    isSuspiciousActivityDetectionRequired: number
    isAssessorEvidenceRequired: number
    assessorReachedAt: number
    assessorCoordinates: number
    assessorGroupPhoto: number
    _all: number
  }


  export type BatchAvgAggregateInputType = {
    noOfCandidates?: true
    durationInMin?: true
  }

  export type BatchSumAggregateInputType = {
    noOfCandidates?: true
    durationInMin?: true
  }

  export type BatchMinAggregateInputType = {
    id?: true
    assessor?: true
    name?: true
    type?: true
    status?: true
    noOfCandidates?: true
    durationInMin?: true
    no?: true
    startDate?: true
    endDate?: true
    theoryQuestionBank?: true
    practicalQuestionBank?: true
    vivaQuestionBank?: true
    isAssessorReached?: true
    isCandidateVideoRequired?: true
    isCandidatePhotosRequired?: true
    isCandidateLocationRequired?: true
    isCandidateAdharRequired?: true
    isCandidateSelfieRequired?: true
    isPracticalVisibleToCandidate?: true
    isSuspiciousActivityDetectionRequired?: true
    isAssessorEvidenceRequired?: true
    assessorReachedAt?: true
    assessorCoordinates?: true
    assessorGroupPhoto?: true
  }

  export type BatchMaxAggregateInputType = {
    id?: true
    assessor?: true
    name?: true
    type?: true
    status?: true
    noOfCandidates?: true
    durationInMin?: true
    no?: true
    startDate?: true
    endDate?: true
    theoryQuestionBank?: true
    practicalQuestionBank?: true
    vivaQuestionBank?: true
    isAssessorReached?: true
    isCandidateVideoRequired?: true
    isCandidatePhotosRequired?: true
    isCandidateLocationRequired?: true
    isCandidateAdharRequired?: true
    isCandidateSelfieRequired?: true
    isPracticalVisibleToCandidate?: true
    isSuspiciousActivityDetectionRequired?: true
    isAssessorEvidenceRequired?: true
    assessorReachedAt?: true
    assessorCoordinates?: true
    assessorGroupPhoto?: true
  }

  export type BatchCountAggregateInputType = {
    id?: true
    assessor?: true
    name?: true
    type?: true
    status?: true
    noOfCandidates?: true
    durationInMin?: true
    no?: true
    startDate?: true
    endDate?: true
    theoryQuestionBank?: true
    practicalQuestionBank?: true
    vivaQuestionBank?: true
    isAssessorReached?: true
    isCandidateVideoRequired?: true
    isCandidatePhotosRequired?: true
    isCandidateLocationRequired?: true
    isCandidateAdharRequired?: true
    isCandidateSelfieRequired?: true
    isPracticalVisibleToCandidate?: true
    isSuspiciousActivityDetectionRequired?: true
    isAssessorEvidenceRequired?: true
    assessorReachedAt?: true
    assessorCoordinates?: true
    assessorGroupPhoto?: true
    _all?: true
  }

  export type BatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batch to aggregate.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Batches
    **/
    _count?: true | BatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchMaxAggregateInputType
  }

  export type GetBatchAggregateType<T extends BatchAggregateArgs> = {
        [P in keyof T & keyof AggregateBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatch[P]>
      : GetScalarType<T[P], AggregateBatch[P]>
  }




  export type BatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithAggregationInput | BatchOrderByWithAggregationInput[]
    by: BatchScalarFieldEnum[] | BatchScalarFieldEnum
    having?: BatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchCountAggregateInputType | true
    _avg?: BatchAvgAggregateInputType
    _sum?: BatchSumAggregateInputType
    _min?: BatchMinAggregateInputType
    _max?: BatchMaxAggregateInputType
  }

  export type BatchGroupByOutputType = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date
    endDate: Date
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt: Date | null
    assessorCoordinates: string | null
    assessorGroupPhoto: string | null
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  type GetBatchGroupByPayload<T extends BatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchGroupByOutputType[P]>
            : GetScalarType<T[P], BatchGroupByOutputType[P]>
        }
      >
    >


  export type BatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessor?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    noOfCandidates?: boolean
    durationInMin?: boolean
    no?: boolean
    startDate?: boolean
    endDate?: boolean
    theoryQuestionBank?: boolean
    practicalQuestionBank?: boolean
    vivaQuestionBank?: boolean
    isAssessorReached?: boolean
    isCandidateVideoRequired?: boolean
    isCandidatePhotosRequired?: boolean
    isCandidateLocationRequired?: boolean
    isCandidateAdharRequired?: boolean
    isCandidateSelfieRequired?: boolean
    isPracticalVisibleToCandidate?: boolean
    isSuspiciousActivityDetectionRequired?: boolean
    isAssessorEvidenceRequired?: boolean
    assessorReachedAt?: boolean
    assessorCoordinates?: boolean
    assessorGroupPhoto?: boolean
    candidates?: boolean | Batch$candidatesArgs<ExtArgs>
    examResponses?: boolean | Batch$examResponsesArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessor?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    noOfCandidates?: boolean
    durationInMin?: boolean
    no?: boolean
    startDate?: boolean
    endDate?: boolean
    theoryQuestionBank?: boolean
    practicalQuestionBank?: boolean
    vivaQuestionBank?: boolean
    isAssessorReached?: boolean
    isCandidateVideoRequired?: boolean
    isCandidatePhotosRequired?: boolean
    isCandidateLocationRequired?: boolean
    isCandidateAdharRequired?: boolean
    isCandidateSelfieRequired?: boolean
    isPracticalVisibleToCandidate?: boolean
    isSuspiciousActivityDetectionRequired?: boolean
    isAssessorEvidenceRequired?: boolean
    assessorReachedAt?: boolean
    assessorCoordinates?: boolean
    assessorGroupPhoto?: boolean
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessor?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    noOfCandidates?: boolean
    durationInMin?: boolean
    no?: boolean
    startDate?: boolean
    endDate?: boolean
    theoryQuestionBank?: boolean
    practicalQuestionBank?: boolean
    vivaQuestionBank?: boolean
    isAssessorReached?: boolean
    isCandidateVideoRequired?: boolean
    isCandidatePhotosRequired?: boolean
    isCandidateLocationRequired?: boolean
    isCandidateAdharRequired?: boolean
    isCandidateSelfieRequired?: boolean
    isPracticalVisibleToCandidate?: boolean
    isSuspiciousActivityDetectionRequired?: boolean
    isAssessorEvidenceRequired?: boolean
    assessorReachedAt?: boolean
    assessorCoordinates?: boolean
    assessorGroupPhoto?: boolean
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectScalar = {
    id?: boolean
    assessor?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    noOfCandidates?: boolean
    durationInMin?: boolean
    no?: boolean
    startDate?: boolean
    endDate?: boolean
    theoryQuestionBank?: boolean
    practicalQuestionBank?: boolean
    vivaQuestionBank?: boolean
    isAssessorReached?: boolean
    isCandidateVideoRequired?: boolean
    isCandidatePhotosRequired?: boolean
    isCandidateLocationRequired?: boolean
    isCandidateAdharRequired?: boolean
    isCandidateSelfieRequired?: boolean
    isPracticalVisibleToCandidate?: boolean
    isSuspiciousActivityDetectionRequired?: boolean
    isAssessorEvidenceRequired?: boolean
    assessorReachedAt?: boolean
    assessorCoordinates?: boolean
    assessorGroupPhoto?: boolean
  }

  export type BatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assessor" | "name" | "type" | "status" | "noOfCandidates" | "durationInMin" | "no" | "startDate" | "endDate" | "theoryQuestionBank" | "practicalQuestionBank" | "vivaQuestionBank" | "isAssessorReached" | "isCandidateVideoRequired" | "isCandidatePhotosRequired" | "isCandidateLocationRequired" | "isCandidateAdharRequired" | "isCandidateSelfieRequired" | "isPracticalVisibleToCandidate" | "isSuspiciousActivityDetectionRequired" | "isAssessorEvidenceRequired" | "assessorReachedAt" | "assessorCoordinates" | "assessorGroupPhoto", ExtArgs["result"]["batch"]>
  export type BatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | Batch$candidatesArgs<ExtArgs>
    examResponses?: boolean | Batch$examResponsesArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Batch"
    objects: {
      candidates: Prisma.$CandidatePayload<ExtArgs>[]
      examResponses: Prisma.$ExamResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assessor: string
      name: string
      type: string
      status: string
      noOfCandidates: number
      durationInMin: number
      no: string
      startDate: Date
      endDate: Date
      theoryQuestionBank: string
      practicalQuestionBank: string
      vivaQuestionBank: string
      isAssessorReached: boolean
      isCandidateVideoRequired: boolean
      isCandidatePhotosRequired: boolean
      isCandidateLocationRequired: boolean
      isCandidateAdharRequired: boolean
      isCandidateSelfieRequired: boolean
      isPracticalVisibleToCandidate: boolean
      isSuspiciousActivityDetectionRequired: boolean
      isAssessorEvidenceRequired: boolean
      assessorReachedAt: Date | null
      assessorCoordinates: string | null
      assessorGroupPhoto: string | null
    }, ExtArgs["result"]["batch"]>
    composites: {}
  }

  type BatchGetPayload<S extends boolean | null | undefined | BatchDefaultArgs> = $Result.GetResult<Prisma.$BatchPayload, S>

  type BatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BatchCountAggregateInputType | true
    }

  export interface BatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Batch'], meta: { name: 'Batch' } }
    /**
     * Find zero or one Batch that matches the filter.
     * @param {BatchFindUniqueArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchFindUniqueArgs>(args: SelectSubset<T, BatchFindUniqueArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Batch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchFindUniqueOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Batch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchFindFirstArgs>(args?: SelectSubset<T, BatchFindFirstArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Batch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Batches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Batches
     * const batches = await prisma.batch.findMany()
     * 
     * // Get first 10 Batches
     * const batches = await prisma.batch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchWithIdOnly = await prisma.batch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchFindManyArgs>(args?: SelectSubset<T, BatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Batch.
     * @param {BatchCreateArgs} args - Arguments to create a Batch.
     * @example
     * // Create one Batch
     * const Batch = await prisma.batch.create({
     *   data: {
     *     // ... data to create a Batch
     *   }
     * })
     * 
     */
    create<T extends BatchCreateArgs>(args: SelectSubset<T, BatchCreateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Batches.
     * @param {BatchCreateManyArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchCreateManyArgs>(args?: SelectSubset<T, BatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Batches and returns the data saved in the database.
     * @param {BatchCreateManyAndReturnArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Batch.
     * @param {BatchDeleteArgs} args - Arguments to delete one Batch.
     * @example
     * // Delete one Batch
     * const Batch = await prisma.batch.delete({
     *   where: {
     *     // ... filter to delete one Batch
     *   }
     * })
     * 
     */
    delete<T extends BatchDeleteArgs>(args: SelectSubset<T, BatchDeleteArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Batch.
     * @param {BatchUpdateArgs} args - Arguments to update one Batch.
     * @example
     * // Update one Batch
     * const batch = await prisma.batch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchUpdateArgs>(args: SelectSubset<T, BatchUpdateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Batches.
     * @param {BatchDeleteManyArgs} args - Arguments to filter Batches to delete.
     * @example
     * // Delete a few Batches
     * const { count } = await prisma.batch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchDeleteManyArgs>(args?: SelectSubset<T, BatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchUpdateManyArgs>(args: SelectSubset<T, BatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches and returns the data updated in the database.
     * @param {BatchUpdateManyAndReturnArgs} args - Arguments to update many Batches.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BatchUpdateManyAndReturnArgs>(args: SelectSubset<T, BatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Batch.
     * @param {BatchUpsertArgs} args - Arguments to update or create a Batch.
     * @example
     * // Update or create a Batch
     * const batch = await prisma.batch.upsert({
     *   create: {
     *     // ... data to create a Batch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Batch we want to update
     *   }
     * })
     */
    upsert<T extends BatchUpsertArgs>(args: SelectSubset<T, BatchUpsertArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchCountArgs} args - Arguments to filter Batches to count.
     * @example
     * // Count the number of Batches
     * const count = await prisma.batch.count({
     *   where: {
     *     // ... the filter for the Batches we want to count
     *   }
     * })
    **/
    count<T extends BatchCountArgs>(
      args?: Subset<T, BatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchAggregateArgs>(args: Subset<T, BatchAggregateArgs>): Prisma.PrismaPromise<GetBatchAggregateType<T>>

    /**
     * Group by Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchGroupByArgs['orderBy'] }
        : { orderBy?: BatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Batch model
   */
  readonly fields: BatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Batch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends Batch$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, Batch$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    examResponses<T extends Batch$examResponsesArgs<ExtArgs> = {}>(args?: Subset<T, Batch$examResponsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Batch model
   */
  interface BatchFieldRefs {
    readonly id: FieldRef<"Batch", 'String'>
    readonly assessor: FieldRef<"Batch", 'String'>
    readonly name: FieldRef<"Batch", 'String'>
    readonly type: FieldRef<"Batch", 'String'>
    readonly status: FieldRef<"Batch", 'String'>
    readonly noOfCandidates: FieldRef<"Batch", 'Int'>
    readonly durationInMin: FieldRef<"Batch", 'Int'>
    readonly no: FieldRef<"Batch", 'String'>
    readonly startDate: FieldRef<"Batch", 'DateTime'>
    readonly endDate: FieldRef<"Batch", 'DateTime'>
    readonly theoryQuestionBank: FieldRef<"Batch", 'String'>
    readonly practicalQuestionBank: FieldRef<"Batch", 'String'>
    readonly vivaQuestionBank: FieldRef<"Batch", 'String'>
    readonly isAssessorReached: FieldRef<"Batch", 'Boolean'>
    readonly isCandidateVideoRequired: FieldRef<"Batch", 'Boolean'>
    readonly isCandidatePhotosRequired: FieldRef<"Batch", 'Boolean'>
    readonly isCandidateLocationRequired: FieldRef<"Batch", 'Boolean'>
    readonly isCandidateAdharRequired: FieldRef<"Batch", 'Boolean'>
    readonly isCandidateSelfieRequired: FieldRef<"Batch", 'Boolean'>
    readonly isPracticalVisibleToCandidate: FieldRef<"Batch", 'Boolean'>
    readonly isSuspiciousActivityDetectionRequired: FieldRef<"Batch", 'Boolean'>
    readonly isAssessorEvidenceRequired: FieldRef<"Batch", 'Boolean'>
    readonly assessorReachedAt: FieldRef<"Batch", 'DateTime'>
    readonly assessorCoordinates: FieldRef<"Batch", 'String'>
    readonly assessorGroupPhoto: FieldRef<"Batch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Batch findUnique
   */
  export type BatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findUniqueOrThrow
   */
  export type BatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findFirst
   */
  export type BatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findFirstOrThrow
   */
  export type BatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findMany
   */
  export type BatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batches to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch create
   */
  export type BatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Batch.
     */
    data: XOR<BatchCreateInput, BatchUncheckedCreateInput>
  }

  /**
   * Batch createMany
   */
  export type BatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
  }

  /**
   * Batch createManyAndReturn
   */
  export type BatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
  }

  /**
   * Batch update
   */
  export type BatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Batch.
     */
    data: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
    /**
     * Choose, which Batch to update.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch updateMany
   */
  export type BatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to update.
     */
    limit?: number
  }

  /**
   * Batch updateManyAndReturn
   */
  export type BatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to update.
     */
    limit?: number
  }

  /**
   * Batch upsert
   */
  export type BatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Batch to update in case it exists.
     */
    where: BatchWhereUniqueInput
    /**
     * In case the Batch found by the `where` argument doesn't exist, create a new Batch with this data.
     */
    create: XOR<BatchCreateInput, BatchUncheckedCreateInput>
    /**
     * In case the Batch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
  }

  /**
   * Batch delete
   */
  export type BatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter which Batch to delete.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch deleteMany
   */
  export type BatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batches to delete
     */
    where?: BatchWhereInput
    /**
     * Limit how many Batches to delete.
     */
    limit?: number
  }

  /**
   * Batch.candidates
   */
  export type Batch$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    cursor?: CandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Batch.examResponses
   */
  export type Batch$examResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    where?: ExamResponseWhereInput
    orderBy?: ExamResponseOrderByWithRelationInput | ExamResponseOrderByWithRelationInput[]
    cursor?: ExamResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamResponseScalarFieldEnum | ExamResponseScalarFieldEnum[]
  }

  /**
   * Batch without action
   */
  export type BatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Batch
     */
    omit?: BatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
  }


  /**
   * Model Candidate
   */

  export type AggregateCandidate = {
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  export type CandidateAvgAggregateOutputType = {
    multipleFaceDetectionCount: number | null
    faceHiddenCount: number | null
    tabSwitchCount: number | null
    exitFullScreenCount: number | null
  }

  export type CandidateSumAggregateOutputType = {
    multipleFaceDetectionCount: number | null
    faceHiddenCount: number | null
    tabSwitchCount: number | null
    exitFullScreenCount: number | null
  }

  export type CandidateMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    batchId: string | null
    fatherName: string | null
    enrollmentNo: string | null
    isActive: boolean | null
    password: string | null
    gender: string | null
    adharNo: string | null
    isTheoryStarted: boolean | null
    isEvidanceUploaded: boolean | null
    isPresentInTheory: boolean | null
    isPresentInPractical: boolean | null
    isPresentInViva: boolean | null
    isTheorySubmitted: boolean | null
    theoryExamStatus: string | null
    practicalExamStatus: string | null
    vivaExamStatus: string | null
    multipleFaceDetectionCount: number | null
    faceHiddenCount: number | null
    tabSwitchCount: number | null
    exitFullScreenCount: number | null
    theoryStartedAt: Date | null
    theorySubmittedAt: Date | null
    candidateSelfieCoordinates: string | null
    candidateSelfieTakenAt: Date | null
    candidateSelfie: string | null
    adharPicture: string | null
    resetedAt: Date | null
    practicalStartedAt: Date | null
    practicalSubmittedAt: Date | null
  }

  export type CandidateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    batchId: string | null
    fatherName: string | null
    enrollmentNo: string | null
    isActive: boolean | null
    password: string | null
    gender: string | null
    adharNo: string | null
    isTheoryStarted: boolean | null
    isEvidanceUploaded: boolean | null
    isPresentInTheory: boolean | null
    isPresentInPractical: boolean | null
    isPresentInViva: boolean | null
    isTheorySubmitted: boolean | null
    theoryExamStatus: string | null
    practicalExamStatus: string | null
    vivaExamStatus: string | null
    multipleFaceDetectionCount: number | null
    faceHiddenCount: number | null
    tabSwitchCount: number | null
    exitFullScreenCount: number | null
    theoryStartedAt: Date | null
    theorySubmittedAt: Date | null
    candidateSelfieCoordinates: string | null
    candidateSelfieTakenAt: Date | null
    candidateSelfie: string | null
    adharPicture: string | null
    resetedAt: Date | null
    practicalStartedAt: Date | null
    practicalSubmittedAt: Date | null
  }

  export type CandidateCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    address: number
    batchId: number
    fatherName: number
    enrollmentNo: number
    isActive: number
    password: number
    gender: number
    adharNo: number
    isTheoryStarted: number
    isEvidanceUploaded: number
    isPresentInTheory: number
    isPresentInPractical: number
    isPresentInViva: number
    isTheorySubmitted: number
    theoryExamStatus: number
    practicalExamStatus: number
    vivaExamStatus: number
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt: number
    theorySubmittedAt: number
    candidateSelfieCoordinates: number
    candidateSelfieTakenAt: number
    candidateSelfie: number
    adharPicture: number
    resetedAt: number
    practicalStartedAt: number
    practicalSubmittedAt: number
    _all: number
  }


  export type CandidateAvgAggregateInputType = {
    multipleFaceDetectionCount?: true
    faceHiddenCount?: true
    tabSwitchCount?: true
    exitFullScreenCount?: true
  }

  export type CandidateSumAggregateInputType = {
    multipleFaceDetectionCount?: true
    faceHiddenCount?: true
    tabSwitchCount?: true
    exitFullScreenCount?: true
  }

  export type CandidateMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    batchId?: true
    fatherName?: true
    enrollmentNo?: true
    isActive?: true
    password?: true
    gender?: true
    adharNo?: true
    isTheoryStarted?: true
    isEvidanceUploaded?: true
    isPresentInTheory?: true
    isPresentInPractical?: true
    isPresentInViva?: true
    isTheorySubmitted?: true
    theoryExamStatus?: true
    practicalExamStatus?: true
    vivaExamStatus?: true
    multipleFaceDetectionCount?: true
    faceHiddenCount?: true
    tabSwitchCount?: true
    exitFullScreenCount?: true
    theoryStartedAt?: true
    theorySubmittedAt?: true
    candidateSelfieCoordinates?: true
    candidateSelfieTakenAt?: true
    candidateSelfie?: true
    adharPicture?: true
    resetedAt?: true
    practicalStartedAt?: true
    practicalSubmittedAt?: true
  }

  export type CandidateMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    batchId?: true
    fatherName?: true
    enrollmentNo?: true
    isActive?: true
    password?: true
    gender?: true
    adharNo?: true
    isTheoryStarted?: true
    isEvidanceUploaded?: true
    isPresentInTheory?: true
    isPresentInPractical?: true
    isPresentInViva?: true
    isTheorySubmitted?: true
    theoryExamStatus?: true
    practicalExamStatus?: true
    vivaExamStatus?: true
    multipleFaceDetectionCount?: true
    faceHiddenCount?: true
    tabSwitchCount?: true
    exitFullScreenCount?: true
    theoryStartedAt?: true
    theorySubmittedAt?: true
    candidateSelfieCoordinates?: true
    candidateSelfieTakenAt?: true
    candidateSelfie?: true
    adharPicture?: true
    resetedAt?: true
    practicalStartedAt?: true
    practicalSubmittedAt?: true
  }

  export type CandidateCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    batchId?: true
    fatherName?: true
    enrollmentNo?: true
    isActive?: true
    password?: true
    gender?: true
    adharNo?: true
    isTheoryStarted?: true
    isEvidanceUploaded?: true
    isPresentInTheory?: true
    isPresentInPractical?: true
    isPresentInViva?: true
    isTheorySubmitted?: true
    theoryExamStatus?: true
    practicalExamStatus?: true
    vivaExamStatus?: true
    multipleFaceDetectionCount?: true
    faceHiddenCount?: true
    tabSwitchCount?: true
    exitFullScreenCount?: true
    theoryStartedAt?: true
    theorySubmittedAt?: true
    candidateSelfieCoordinates?: true
    candidateSelfieTakenAt?: true
    candidateSelfie?: true
    adharPicture?: true
    resetedAt?: true
    practicalStartedAt?: true
    practicalSubmittedAt?: true
    _all?: true
  }

  export type CandidateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidate to aggregate.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidates
    **/
    _count?: true | CandidateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandidateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandidateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateMaxAggregateInputType
  }

  export type GetCandidateAggregateType<T extends CandidateAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidate[P]>
      : GetScalarType<T[P], AggregateCandidate[P]>
  }




  export type CandidateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithAggregationInput | CandidateOrderByWithAggregationInput[]
    by: CandidateScalarFieldEnum[] | CandidateScalarFieldEnum
    having?: CandidateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateCountAggregateInputType | true
    _avg?: CandidateAvgAggregateInputType
    _sum?: CandidateSumAggregateInputType
    _min?: CandidateMinAggregateInputType
    _max?: CandidateMaxAggregateInputType
  }

  export type CandidateGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    batchId: string
    fatherName: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender: string | null
    adharNo: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt: Date | null
    theorySubmittedAt: Date | null
    candidateSelfieCoordinates: string | null
    candidateSelfieTakenAt: Date | null
    candidateSelfie: string | null
    adharPicture: string | null
    resetedAt: Date | null
    practicalStartedAt: Date | null
    practicalSubmittedAt: Date | null
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  type GetCandidateGroupByPayload<T extends CandidateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateGroupByOutputType[P]>
        }
      >
    >


  export type CandidateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    batchId?: boolean
    fatherName?: boolean
    enrollmentNo?: boolean
    isActive?: boolean
    password?: boolean
    gender?: boolean
    adharNo?: boolean
    isTheoryStarted?: boolean
    isEvidanceUploaded?: boolean
    isPresentInTheory?: boolean
    isPresentInPractical?: boolean
    isPresentInViva?: boolean
    isTheorySubmitted?: boolean
    theoryExamStatus?: boolean
    practicalExamStatus?: boolean
    vivaExamStatus?: boolean
    multipleFaceDetectionCount?: boolean
    faceHiddenCount?: boolean
    tabSwitchCount?: boolean
    exitFullScreenCount?: boolean
    theoryStartedAt?: boolean
    theorySubmittedAt?: boolean
    candidateSelfieCoordinates?: boolean
    candidateSelfieTakenAt?: boolean
    candidateSelfie?: boolean
    adharPicture?: boolean
    resetedAt?: boolean
    practicalStartedAt?: boolean
    practicalSubmittedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    examResponses?: boolean | Candidate$examResponsesArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    batchId?: boolean
    fatherName?: boolean
    enrollmentNo?: boolean
    isActive?: boolean
    password?: boolean
    gender?: boolean
    adharNo?: boolean
    isTheoryStarted?: boolean
    isEvidanceUploaded?: boolean
    isPresentInTheory?: boolean
    isPresentInPractical?: boolean
    isPresentInViva?: boolean
    isTheorySubmitted?: boolean
    theoryExamStatus?: boolean
    practicalExamStatus?: boolean
    vivaExamStatus?: boolean
    multipleFaceDetectionCount?: boolean
    faceHiddenCount?: boolean
    tabSwitchCount?: boolean
    exitFullScreenCount?: boolean
    theoryStartedAt?: boolean
    theorySubmittedAt?: boolean
    candidateSelfieCoordinates?: boolean
    candidateSelfieTakenAt?: boolean
    candidateSelfie?: boolean
    adharPicture?: boolean
    resetedAt?: boolean
    practicalStartedAt?: boolean
    practicalSubmittedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    batchId?: boolean
    fatherName?: boolean
    enrollmentNo?: boolean
    isActive?: boolean
    password?: boolean
    gender?: boolean
    adharNo?: boolean
    isTheoryStarted?: boolean
    isEvidanceUploaded?: boolean
    isPresentInTheory?: boolean
    isPresentInPractical?: boolean
    isPresentInViva?: boolean
    isTheorySubmitted?: boolean
    theoryExamStatus?: boolean
    practicalExamStatus?: boolean
    vivaExamStatus?: boolean
    multipleFaceDetectionCount?: boolean
    faceHiddenCount?: boolean
    tabSwitchCount?: boolean
    exitFullScreenCount?: boolean
    theoryStartedAt?: boolean
    theorySubmittedAt?: boolean
    candidateSelfieCoordinates?: boolean
    candidateSelfieTakenAt?: boolean
    candidateSelfie?: boolean
    adharPicture?: boolean
    resetedAt?: boolean
    practicalStartedAt?: boolean
    practicalSubmittedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    batchId?: boolean
    fatherName?: boolean
    enrollmentNo?: boolean
    isActive?: boolean
    password?: boolean
    gender?: boolean
    adharNo?: boolean
    isTheoryStarted?: boolean
    isEvidanceUploaded?: boolean
    isPresentInTheory?: boolean
    isPresentInPractical?: boolean
    isPresentInViva?: boolean
    isTheorySubmitted?: boolean
    theoryExamStatus?: boolean
    practicalExamStatus?: boolean
    vivaExamStatus?: boolean
    multipleFaceDetectionCount?: boolean
    faceHiddenCount?: boolean
    tabSwitchCount?: boolean
    exitFullScreenCount?: boolean
    theoryStartedAt?: boolean
    theorySubmittedAt?: boolean
    candidateSelfieCoordinates?: boolean
    candidateSelfieTakenAt?: boolean
    candidateSelfie?: boolean
    adharPicture?: boolean
    resetedAt?: boolean
    practicalStartedAt?: boolean
    practicalSubmittedAt?: boolean
  }

  export type CandidateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "address" | "batchId" | "fatherName" | "enrollmentNo" | "isActive" | "password" | "gender" | "adharNo" | "isTheoryStarted" | "isEvidanceUploaded" | "isPresentInTheory" | "isPresentInPractical" | "isPresentInViva" | "isTheorySubmitted" | "theoryExamStatus" | "practicalExamStatus" | "vivaExamStatus" | "multipleFaceDetectionCount" | "faceHiddenCount" | "tabSwitchCount" | "exitFullScreenCount" | "theoryStartedAt" | "theorySubmittedAt" | "candidateSelfieCoordinates" | "candidateSelfieTakenAt" | "candidateSelfie" | "adharPicture" | "resetedAt" | "practicalStartedAt" | "practicalSubmittedAt", ExtArgs["result"]["candidate"]>
  export type CandidateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
    examResponses?: boolean | Candidate$examResponsesArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $CandidatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidate"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
      examResponses: Prisma.$ExamResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      phone: string | null
      address: string | null
      batchId: string
      fatherName: string | null
      enrollmentNo: string
      isActive: boolean
      password: string
      gender: string | null
      adharNo: string | null
      isTheoryStarted: boolean
      isEvidanceUploaded: boolean
      isPresentInTheory: boolean
      isPresentInPractical: boolean
      isPresentInViva: boolean
      isTheorySubmitted: boolean
      theoryExamStatus: string
      practicalExamStatus: string
      vivaExamStatus: string
      multipleFaceDetectionCount: number
      faceHiddenCount: number
      tabSwitchCount: number
      exitFullScreenCount: number
      theoryStartedAt: Date | null
      theorySubmittedAt: Date | null
      candidateSelfieCoordinates: string | null
      candidateSelfieTakenAt: Date | null
      candidateSelfie: string | null
      adharPicture: string | null
      resetedAt: Date | null
      practicalStartedAt: Date | null
      practicalSubmittedAt: Date | null
    }, ExtArgs["result"]["candidate"]>
    composites: {}
  }

  type CandidateGetPayload<S extends boolean | null | undefined | CandidateDefaultArgs> = $Result.GetResult<Prisma.$CandidatePayload, S>

  type CandidateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateCountAggregateInputType | true
    }

  export interface CandidateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidate'], meta: { name: 'Candidate' } }
    /**
     * Find zero or one Candidate that matches the filter.
     * @param {CandidateFindUniqueArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateFindUniqueArgs>(args: SelectSubset<T, CandidateFindUniqueArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateFindUniqueOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateFindFirstArgs>(args?: SelectSubset<T, CandidateFindFirstArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidates
     * const candidates = await prisma.candidate.findMany()
     * 
     * // Get first 10 Candidates
     * const candidates = await prisma.candidate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateWithIdOnly = await prisma.candidate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateFindManyArgs>(args?: SelectSubset<T, CandidateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidate.
     * @param {CandidateCreateArgs} args - Arguments to create a Candidate.
     * @example
     * // Create one Candidate
     * const Candidate = await prisma.candidate.create({
     *   data: {
     *     // ... data to create a Candidate
     *   }
     * })
     * 
     */
    create<T extends CandidateCreateArgs>(args: SelectSubset<T, CandidateCreateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidates.
     * @param {CandidateCreateManyArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateCreateManyArgs>(args?: SelectSubset<T, CandidateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Candidates and returns the data saved in the database.
     * @param {CandidateCreateManyAndReturnArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Candidate.
     * @param {CandidateDeleteArgs} args - Arguments to delete one Candidate.
     * @example
     * // Delete one Candidate
     * const Candidate = await prisma.candidate.delete({
     *   where: {
     *     // ... filter to delete one Candidate
     *   }
     * })
     * 
     */
    delete<T extends CandidateDeleteArgs>(args: SelectSubset<T, CandidateDeleteArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidate.
     * @param {CandidateUpdateArgs} args - Arguments to update one Candidate.
     * @example
     * // Update one Candidate
     * const candidate = await prisma.candidate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateUpdateArgs>(args: SelectSubset<T, CandidateUpdateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidates.
     * @param {CandidateDeleteManyArgs} args - Arguments to filter Candidates to delete.
     * @example
     * // Delete a few Candidates
     * const { count } = await prisma.candidate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateDeleteManyArgs>(args?: SelectSubset<T, CandidateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateUpdateManyArgs>(args: SelectSubset<T, CandidateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates and returns the data updated in the database.
     * @param {CandidateUpdateManyAndReturnArgs} args - Arguments to update many Candidates.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandidateUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Candidate.
     * @param {CandidateUpsertArgs} args - Arguments to update or create a Candidate.
     * @example
     * // Update or create a Candidate
     * const candidate = await prisma.candidate.upsert({
     *   create: {
     *     // ... data to create a Candidate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidate we want to update
     *   }
     * })
     */
    upsert<T extends CandidateUpsertArgs>(args: SelectSubset<T, CandidateUpsertArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCountArgs} args - Arguments to filter Candidates to count.
     * @example
     * // Count the number of Candidates
     * const count = await prisma.candidate.count({
     *   where: {
     *     // ... the filter for the Candidates we want to count
     *   }
     * })
    **/
    count<T extends CandidateCountArgs>(
      args?: Subset<T, CandidateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidateAggregateArgs>(args: Subset<T, CandidateAggregateArgs>): Prisma.PrismaPromise<GetCandidateAggregateType<T>>

    /**
     * Group by Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandidateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateGroupByArgs['orderBy'] }
        : { orderBy?: CandidateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandidateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidate model
   */
  readonly fields: CandidateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    examResponses<T extends Candidate$examResponsesArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$examResponsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Candidate model
   */
  interface CandidateFieldRefs {
    readonly id: FieldRef<"Candidate", 'String'>
    readonly name: FieldRef<"Candidate", 'String'>
    readonly email: FieldRef<"Candidate", 'String'>
    readonly phone: FieldRef<"Candidate", 'String'>
    readonly address: FieldRef<"Candidate", 'String'>
    readonly batchId: FieldRef<"Candidate", 'String'>
    readonly fatherName: FieldRef<"Candidate", 'String'>
    readonly enrollmentNo: FieldRef<"Candidate", 'String'>
    readonly isActive: FieldRef<"Candidate", 'Boolean'>
    readonly password: FieldRef<"Candidate", 'String'>
    readonly gender: FieldRef<"Candidate", 'String'>
    readonly adharNo: FieldRef<"Candidate", 'String'>
    readonly isTheoryStarted: FieldRef<"Candidate", 'Boolean'>
    readonly isEvidanceUploaded: FieldRef<"Candidate", 'Boolean'>
    readonly isPresentInTheory: FieldRef<"Candidate", 'Boolean'>
    readonly isPresentInPractical: FieldRef<"Candidate", 'Boolean'>
    readonly isPresentInViva: FieldRef<"Candidate", 'Boolean'>
    readonly isTheorySubmitted: FieldRef<"Candidate", 'Boolean'>
    readonly theoryExamStatus: FieldRef<"Candidate", 'String'>
    readonly practicalExamStatus: FieldRef<"Candidate", 'String'>
    readonly vivaExamStatus: FieldRef<"Candidate", 'String'>
    readonly multipleFaceDetectionCount: FieldRef<"Candidate", 'Int'>
    readonly faceHiddenCount: FieldRef<"Candidate", 'Int'>
    readonly tabSwitchCount: FieldRef<"Candidate", 'Int'>
    readonly exitFullScreenCount: FieldRef<"Candidate", 'Int'>
    readonly theoryStartedAt: FieldRef<"Candidate", 'DateTime'>
    readonly theorySubmittedAt: FieldRef<"Candidate", 'DateTime'>
    readonly candidateSelfieCoordinates: FieldRef<"Candidate", 'String'>
    readonly candidateSelfieTakenAt: FieldRef<"Candidate", 'DateTime'>
    readonly candidateSelfie: FieldRef<"Candidate", 'String'>
    readonly adharPicture: FieldRef<"Candidate", 'String'>
    readonly resetedAt: FieldRef<"Candidate", 'DateTime'>
    readonly practicalStartedAt: FieldRef<"Candidate", 'DateTime'>
    readonly practicalSubmittedAt: FieldRef<"Candidate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Candidate findUnique
   */
  export type CandidateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findUniqueOrThrow
   */
  export type CandidateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findFirst
   */
  export type CandidateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findFirstOrThrow
   */
  export type CandidateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findMany
   */
  export type CandidateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidates to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate create
   */
  export type CandidateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidate.
     */
    data: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
  }

  /**
   * Candidate createMany
   */
  export type CandidateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
  }

  /**
   * Candidate createManyAndReturn
   */
  export type CandidateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate update
   */
  export type CandidateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidate.
     */
    data: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
    /**
     * Choose, which Candidate to update.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate updateMany
   */
  export type CandidateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
  }

  /**
   * Candidate updateManyAndReturn
   */
  export type CandidateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate upsert
   */
  export type CandidateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidate to update in case it exists.
     */
    where: CandidateWhereUniqueInput
    /**
     * In case the Candidate found by the `where` argument doesn't exist, create a new Candidate with this data.
     */
    create: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
    /**
     * In case the Candidate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
  }

  /**
   * Candidate delete
   */
  export type CandidateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter which Candidate to delete.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate deleteMany
   */
  export type CandidateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidates to delete
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to delete.
     */
    limit?: number
  }

  /**
   * Candidate.examResponses
   */
  export type Candidate$examResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    where?: ExamResponseWhereInput
    orderBy?: ExamResponseOrderByWithRelationInput | ExamResponseOrderByWithRelationInput[]
    cursor?: ExamResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamResponseScalarFieldEnum | ExamResponseScalarFieldEnum[]
  }

  /**
   * Candidate without action
   */
  export type CandidateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
  }


  /**
   * Model ExamResponse
   */

  export type AggregateExamResponse = {
    _count: ExamResponseCountAggregateOutputType | null
    _avg: ExamResponseAvgAggregateOutputType | null
    _sum: ExamResponseSumAggregateOutputType | null
    _min: ExamResponseMinAggregateOutputType | null
    _max: ExamResponseMaxAggregateOutputType | null
  }

  export type ExamResponseAvgAggregateOutputType = {
    marksObtained: number | null
  }

  export type ExamResponseSumAggregateOutputType = {
    marksObtained: number | null
  }

  export type ExamResponseMinAggregateOutputType = {
    candidateId: string | null
    batchId: string | null
    questionId: string | null
    answerId: string | null
    startedAt: Date | null
    endedAt: Date | null
    type: $Enums.ExamType | null
    marksObtained: number | null
  }

  export type ExamResponseMaxAggregateOutputType = {
    candidateId: string | null
    batchId: string | null
    questionId: string | null
    answerId: string | null
    startedAt: Date | null
    endedAt: Date | null
    type: $Enums.ExamType | null
    marksObtained: number | null
  }

  export type ExamResponseCountAggregateOutputType = {
    candidateId: number
    batchId: number
    questionId: number
    answerId: number
    startedAt: number
    endedAt: number
    type: number
    marksObtained: number
    _all: number
  }


  export type ExamResponseAvgAggregateInputType = {
    marksObtained?: true
  }

  export type ExamResponseSumAggregateInputType = {
    marksObtained?: true
  }

  export type ExamResponseMinAggregateInputType = {
    candidateId?: true
    batchId?: true
    questionId?: true
    answerId?: true
    startedAt?: true
    endedAt?: true
    type?: true
    marksObtained?: true
  }

  export type ExamResponseMaxAggregateInputType = {
    candidateId?: true
    batchId?: true
    questionId?: true
    answerId?: true
    startedAt?: true
    endedAt?: true
    type?: true
    marksObtained?: true
  }

  export type ExamResponseCountAggregateInputType = {
    candidateId?: true
    batchId?: true
    questionId?: true
    answerId?: true
    startedAt?: true
    endedAt?: true
    type?: true
    marksObtained?: true
    _all?: true
  }

  export type ExamResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamResponse to aggregate.
     */
    where?: ExamResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResponses to fetch.
     */
    orderBy?: ExamResponseOrderByWithRelationInput | ExamResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamResponses
    **/
    _count?: true | ExamResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamResponseMaxAggregateInputType
  }

  export type GetExamResponseAggregateType<T extends ExamResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateExamResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamResponse[P]>
      : GetScalarType<T[P], AggregateExamResponse[P]>
  }




  export type ExamResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamResponseWhereInput
    orderBy?: ExamResponseOrderByWithAggregationInput | ExamResponseOrderByWithAggregationInput[]
    by: ExamResponseScalarFieldEnum[] | ExamResponseScalarFieldEnum
    having?: ExamResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamResponseCountAggregateInputType | true
    _avg?: ExamResponseAvgAggregateInputType
    _sum?: ExamResponseSumAggregateInputType
    _min?: ExamResponseMinAggregateInputType
    _max?: ExamResponseMaxAggregateInputType
  }

  export type ExamResponseGroupByOutputType = {
    candidateId: string
    batchId: string
    questionId: string
    answerId: string
    startedAt: Date
    endedAt: Date
    type: $Enums.ExamType
    marksObtained: number
    _count: ExamResponseCountAggregateOutputType | null
    _avg: ExamResponseAvgAggregateOutputType | null
    _sum: ExamResponseSumAggregateOutputType | null
    _min: ExamResponseMinAggregateOutputType | null
    _max: ExamResponseMaxAggregateOutputType | null
  }

  type GetExamResponseGroupByPayload<T extends ExamResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ExamResponseGroupByOutputType[P]>
        }
      >
    >


  export type ExamResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    candidateId?: boolean
    batchId?: boolean
    questionId?: boolean
    answerId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    type?: boolean
    marksObtained?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examResponse"]>

  export type ExamResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    candidateId?: boolean
    batchId?: boolean
    questionId?: boolean
    answerId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    type?: boolean
    marksObtained?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examResponse"]>

  export type ExamResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    candidateId?: boolean
    batchId?: boolean
    questionId?: boolean
    answerId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    type?: boolean
    marksObtained?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examResponse"]>

  export type ExamResponseSelectScalar = {
    candidateId?: boolean
    batchId?: boolean
    questionId?: boolean
    answerId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    type?: boolean
    marksObtained?: boolean
  }

  export type ExamResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"candidateId" | "batchId" | "questionId" | "answerId" | "startedAt" | "endedAt" | "type" | "marksObtained", ExtArgs["result"]["examResponse"]>
  export type ExamResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type ExamResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type ExamResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $ExamResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExamResponse"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs>
      batch: Prisma.$BatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      candidateId: string
      batchId: string
      questionId: string
      answerId: string
      startedAt: Date
      endedAt: Date
      type: $Enums.ExamType
      marksObtained: number
    }, ExtArgs["result"]["examResponse"]>
    composites: {}
  }

  type ExamResponseGetPayload<S extends boolean | null | undefined | ExamResponseDefaultArgs> = $Result.GetResult<Prisma.$ExamResponsePayload, S>

  type ExamResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExamResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExamResponseCountAggregateInputType | true
    }

  export interface ExamResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExamResponse'], meta: { name: 'ExamResponse' } }
    /**
     * Find zero or one ExamResponse that matches the filter.
     * @param {ExamResponseFindUniqueArgs} args - Arguments to find a ExamResponse
     * @example
     * // Get one ExamResponse
     * const examResponse = await prisma.examResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamResponseFindUniqueArgs>(args: SelectSubset<T, ExamResponseFindUniqueArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExamResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExamResponseFindUniqueOrThrowArgs} args - Arguments to find a ExamResponse
     * @example
     * // Get one ExamResponse
     * const examResponse = await prisma.examResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExamResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseFindFirstArgs} args - Arguments to find a ExamResponse
     * @example
     * // Get one ExamResponse
     * const examResponse = await prisma.examResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamResponseFindFirstArgs>(args?: SelectSubset<T, ExamResponseFindFirstArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExamResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseFindFirstOrThrowArgs} args - Arguments to find a ExamResponse
     * @example
     * // Get one ExamResponse
     * const examResponse = await prisma.examResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExamResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamResponses
     * const examResponses = await prisma.examResponse.findMany()
     * 
     * // Get first 10 ExamResponses
     * const examResponses = await prisma.examResponse.findMany({ take: 10 })
     * 
     * // Only select the `candidateId`
     * const examResponseWithCandidateIdOnly = await prisma.examResponse.findMany({ select: { candidateId: true } })
     * 
     */
    findMany<T extends ExamResponseFindManyArgs>(args?: SelectSubset<T, ExamResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExamResponse.
     * @param {ExamResponseCreateArgs} args - Arguments to create a ExamResponse.
     * @example
     * // Create one ExamResponse
     * const ExamResponse = await prisma.examResponse.create({
     *   data: {
     *     // ... data to create a ExamResponse
     *   }
     * })
     * 
     */
    create<T extends ExamResponseCreateArgs>(args: SelectSubset<T, ExamResponseCreateArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExamResponses.
     * @param {ExamResponseCreateManyArgs} args - Arguments to create many ExamResponses.
     * @example
     * // Create many ExamResponses
     * const examResponse = await prisma.examResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamResponseCreateManyArgs>(args?: SelectSubset<T, ExamResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExamResponses and returns the data saved in the database.
     * @param {ExamResponseCreateManyAndReturnArgs} args - Arguments to create many ExamResponses.
     * @example
     * // Create many ExamResponses
     * const examResponse = await prisma.examResponse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExamResponses and only return the `candidateId`
     * const examResponseWithCandidateIdOnly = await prisma.examResponse.createManyAndReturn({
     *   select: { candidateId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExamResponse.
     * @param {ExamResponseDeleteArgs} args - Arguments to delete one ExamResponse.
     * @example
     * // Delete one ExamResponse
     * const ExamResponse = await prisma.examResponse.delete({
     *   where: {
     *     // ... filter to delete one ExamResponse
     *   }
     * })
     * 
     */
    delete<T extends ExamResponseDeleteArgs>(args: SelectSubset<T, ExamResponseDeleteArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExamResponse.
     * @param {ExamResponseUpdateArgs} args - Arguments to update one ExamResponse.
     * @example
     * // Update one ExamResponse
     * const examResponse = await prisma.examResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamResponseUpdateArgs>(args: SelectSubset<T, ExamResponseUpdateArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExamResponses.
     * @param {ExamResponseDeleteManyArgs} args - Arguments to filter ExamResponses to delete.
     * @example
     * // Delete a few ExamResponses
     * const { count } = await prisma.examResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamResponseDeleteManyArgs>(args?: SelectSubset<T, ExamResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamResponses
     * const examResponse = await prisma.examResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamResponseUpdateManyArgs>(args: SelectSubset<T, ExamResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamResponses and returns the data updated in the database.
     * @param {ExamResponseUpdateManyAndReturnArgs} args - Arguments to update many ExamResponses.
     * @example
     * // Update many ExamResponses
     * const examResponse = await prisma.examResponse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExamResponses and only return the `candidateId`
     * const examResponseWithCandidateIdOnly = await prisma.examResponse.updateManyAndReturn({
     *   select: { candidateId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExamResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExamResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExamResponse.
     * @param {ExamResponseUpsertArgs} args - Arguments to update or create a ExamResponse.
     * @example
     * // Update or create a ExamResponse
     * const examResponse = await prisma.examResponse.upsert({
     *   create: {
     *     // ... data to create a ExamResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamResponse we want to update
     *   }
     * })
     */
    upsert<T extends ExamResponseUpsertArgs>(args: SelectSubset<T, ExamResponseUpsertArgs<ExtArgs>>): Prisma__ExamResponseClient<$Result.GetResult<Prisma.$ExamResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExamResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseCountArgs} args - Arguments to filter ExamResponses to count.
     * @example
     * // Count the number of ExamResponses
     * const count = await prisma.examResponse.count({
     *   where: {
     *     // ... the filter for the ExamResponses we want to count
     *   }
     * })
    **/
    count<T extends ExamResponseCountArgs>(
      args?: Subset<T, ExamResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamResponseAggregateArgs>(args: Subset<T, ExamResponseAggregateArgs>): Prisma.PrismaPromise<GetExamResponseAggregateType<T>>

    /**
     * Group by ExamResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamResponseGroupByArgs['orderBy'] }
        : { orderBy?: ExamResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExamResponse model
   */
  readonly fields: ExamResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExamResponse model
   */
  interface ExamResponseFieldRefs {
    readonly candidateId: FieldRef<"ExamResponse", 'String'>
    readonly batchId: FieldRef<"ExamResponse", 'String'>
    readonly questionId: FieldRef<"ExamResponse", 'String'>
    readonly answerId: FieldRef<"ExamResponse", 'String'>
    readonly startedAt: FieldRef<"ExamResponse", 'DateTime'>
    readonly endedAt: FieldRef<"ExamResponse", 'DateTime'>
    readonly type: FieldRef<"ExamResponse", 'ExamType'>
    readonly marksObtained: FieldRef<"ExamResponse", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ExamResponse findUnique
   */
  export type ExamResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * Filter, which ExamResponse to fetch.
     */
    where: ExamResponseWhereUniqueInput
  }

  /**
   * ExamResponse findUniqueOrThrow
   */
  export type ExamResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * Filter, which ExamResponse to fetch.
     */
    where: ExamResponseWhereUniqueInput
  }

  /**
   * ExamResponse findFirst
   */
  export type ExamResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * Filter, which ExamResponse to fetch.
     */
    where?: ExamResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResponses to fetch.
     */
    orderBy?: ExamResponseOrderByWithRelationInput | ExamResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamResponses.
     */
    cursor?: ExamResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamResponses.
     */
    distinct?: ExamResponseScalarFieldEnum | ExamResponseScalarFieldEnum[]
  }

  /**
   * ExamResponse findFirstOrThrow
   */
  export type ExamResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * Filter, which ExamResponse to fetch.
     */
    where?: ExamResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResponses to fetch.
     */
    orderBy?: ExamResponseOrderByWithRelationInput | ExamResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamResponses.
     */
    cursor?: ExamResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamResponses.
     */
    distinct?: ExamResponseScalarFieldEnum | ExamResponseScalarFieldEnum[]
  }

  /**
   * ExamResponse findMany
   */
  export type ExamResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * Filter, which ExamResponses to fetch.
     */
    where?: ExamResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResponses to fetch.
     */
    orderBy?: ExamResponseOrderByWithRelationInput | ExamResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamResponses.
     */
    cursor?: ExamResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResponses.
     */
    skip?: number
    distinct?: ExamResponseScalarFieldEnum | ExamResponseScalarFieldEnum[]
  }

  /**
   * ExamResponse create
   */
  export type ExamResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a ExamResponse.
     */
    data: XOR<ExamResponseCreateInput, ExamResponseUncheckedCreateInput>
  }

  /**
   * ExamResponse createMany
   */
  export type ExamResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExamResponses.
     */
    data: ExamResponseCreateManyInput | ExamResponseCreateManyInput[]
  }

  /**
   * ExamResponse createManyAndReturn
   */
  export type ExamResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * The data used to create many ExamResponses.
     */
    data: ExamResponseCreateManyInput | ExamResponseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamResponse update
   */
  export type ExamResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a ExamResponse.
     */
    data: XOR<ExamResponseUpdateInput, ExamResponseUncheckedUpdateInput>
    /**
     * Choose, which ExamResponse to update.
     */
    where: ExamResponseWhereUniqueInput
  }

  /**
   * ExamResponse updateMany
   */
  export type ExamResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExamResponses.
     */
    data: XOR<ExamResponseUpdateManyMutationInput, ExamResponseUncheckedUpdateManyInput>
    /**
     * Filter which ExamResponses to update
     */
    where?: ExamResponseWhereInput
    /**
     * Limit how many ExamResponses to update.
     */
    limit?: number
  }

  /**
   * ExamResponse updateManyAndReturn
   */
  export type ExamResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * The data used to update ExamResponses.
     */
    data: XOR<ExamResponseUpdateManyMutationInput, ExamResponseUncheckedUpdateManyInput>
    /**
     * Filter which ExamResponses to update
     */
    where?: ExamResponseWhereInput
    /**
     * Limit how many ExamResponses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamResponse upsert
   */
  export type ExamResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the ExamResponse to update in case it exists.
     */
    where: ExamResponseWhereUniqueInput
    /**
     * In case the ExamResponse found by the `where` argument doesn't exist, create a new ExamResponse with this data.
     */
    create: XOR<ExamResponseCreateInput, ExamResponseUncheckedCreateInput>
    /**
     * In case the ExamResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamResponseUpdateInput, ExamResponseUncheckedUpdateInput>
  }

  /**
   * ExamResponse delete
   */
  export type ExamResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
    /**
     * Filter which ExamResponse to delete.
     */
    where: ExamResponseWhereUniqueInput
  }

  /**
   * ExamResponse deleteMany
   */
  export type ExamResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamResponses to delete
     */
    where?: ExamResponseWhereInput
    /**
     * Limit how many ExamResponses to delete.
     */
    limit?: number
  }

  /**
   * ExamResponse without action
   */
  export type ExamResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResponse
     */
    select?: ExamResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamResponse
     */
    omit?: ExamResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResponseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BatchScalarFieldEnum: {
    id: 'id',
    assessor: 'assessor',
    name: 'name',
    type: 'type',
    status: 'status',
    noOfCandidates: 'noOfCandidates',
    durationInMin: 'durationInMin',
    no: 'no',
    startDate: 'startDate',
    endDate: 'endDate',
    theoryQuestionBank: 'theoryQuestionBank',
    practicalQuestionBank: 'practicalQuestionBank',
    vivaQuestionBank: 'vivaQuestionBank',
    isAssessorReached: 'isAssessorReached',
    isCandidateVideoRequired: 'isCandidateVideoRequired',
    isCandidatePhotosRequired: 'isCandidatePhotosRequired',
    isCandidateLocationRequired: 'isCandidateLocationRequired',
    isCandidateAdharRequired: 'isCandidateAdharRequired',
    isCandidateSelfieRequired: 'isCandidateSelfieRequired',
    isPracticalVisibleToCandidate: 'isPracticalVisibleToCandidate',
    isSuspiciousActivityDetectionRequired: 'isSuspiciousActivityDetectionRequired',
    isAssessorEvidenceRequired: 'isAssessorEvidenceRequired',
    assessorReachedAt: 'assessorReachedAt',
    assessorCoordinates: 'assessorCoordinates',
    assessorGroupPhoto: 'assessorGroupPhoto'
  };

  export type BatchScalarFieldEnum = (typeof BatchScalarFieldEnum)[keyof typeof BatchScalarFieldEnum]


  export const CandidateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    batchId: 'batchId',
    fatherName: 'fatherName',
    enrollmentNo: 'enrollmentNo',
    isActive: 'isActive',
    password: 'password',
    gender: 'gender',
    adharNo: 'adharNo',
    isTheoryStarted: 'isTheoryStarted',
    isEvidanceUploaded: 'isEvidanceUploaded',
    isPresentInTheory: 'isPresentInTheory',
    isPresentInPractical: 'isPresentInPractical',
    isPresentInViva: 'isPresentInViva',
    isTheorySubmitted: 'isTheorySubmitted',
    theoryExamStatus: 'theoryExamStatus',
    practicalExamStatus: 'practicalExamStatus',
    vivaExamStatus: 'vivaExamStatus',
    multipleFaceDetectionCount: 'multipleFaceDetectionCount',
    faceHiddenCount: 'faceHiddenCount',
    tabSwitchCount: 'tabSwitchCount',
    exitFullScreenCount: 'exitFullScreenCount',
    theoryStartedAt: 'theoryStartedAt',
    theorySubmittedAt: 'theorySubmittedAt',
    candidateSelfieCoordinates: 'candidateSelfieCoordinates',
    candidateSelfieTakenAt: 'candidateSelfieTakenAt',
    candidateSelfie: 'candidateSelfie',
    adharPicture: 'adharPicture',
    resetedAt: 'resetedAt',
    practicalStartedAt: 'practicalStartedAt',
    practicalSubmittedAt: 'practicalSubmittedAt'
  };

  export type CandidateScalarFieldEnum = (typeof CandidateScalarFieldEnum)[keyof typeof CandidateScalarFieldEnum]


  export const ExamResponseScalarFieldEnum: {
    candidateId: 'candidateId',
    batchId: 'batchId',
    questionId: 'questionId',
    answerId: 'answerId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    type: 'type',
    marksObtained: 'marksObtained'
  };

  export type ExamResponseScalarFieldEnum = (typeof ExamResponseScalarFieldEnum)[keyof typeof ExamResponseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ExamType'
   */
  export type EnumExamTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type BatchWhereInput = {
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    id?: StringFilter<"Batch"> | string
    assessor?: StringFilter<"Batch"> | string
    name?: StringFilter<"Batch"> | string
    type?: StringFilter<"Batch"> | string
    status?: StringFilter<"Batch"> | string
    noOfCandidates?: IntFilter<"Batch"> | number
    durationInMin?: IntFilter<"Batch"> | number
    no?: StringFilter<"Batch"> | string
    startDate?: DateTimeFilter<"Batch"> | Date | string
    endDate?: DateTimeFilter<"Batch"> | Date | string
    theoryQuestionBank?: StringFilter<"Batch"> | string
    practicalQuestionBank?: StringFilter<"Batch"> | string
    vivaQuestionBank?: StringFilter<"Batch"> | string
    isAssessorReached?: BoolFilter<"Batch"> | boolean
    isCandidateVideoRequired?: BoolFilter<"Batch"> | boolean
    isCandidatePhotosRequired?: BoolFilter<"Batch"> | boolean
    isCandidateLocationRequired?: BoolFilter<"Batch"> | boolean
    isCandidateAdharRequired?: BoolFilter<"Batch"> | boolean
    isCandidateSelfieRequired?: BoolFilter<"Batch"> | boolean
    isPracticalVisibleToCandidate?: BoolFilter<"Batch"> | boolean
    isSuspiciousActivityDetectionRequired?: BoolFilter<"Batch"> | boolean
    isAssessorEvidenceRequired?: BoolFilter<"Batch"> | boolean
    assessorReachedAt?: DateTimeNullableFilter<"Batch"> | Date | string | null
    assessorCoordinates?: StringNullableFilter<"Batch"> | string | null
    assessorGroupPhoto?: StringNullableFilter<"Batch"> | string | null
    candidates?: CandidateListRelationFilter
    examResponses?: ExamResponseListRelationFilter
  }

  export type BatchOrderByWithRelationInput = {
    id?: SortOrder
    assessor?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
    no?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    theoryQuestionBank?: SortOrder
    practicalQuestionBank?: SortOrder
    vivaQuestionBank?: SortOrder
    isAssessorReached?: SortOrder
    isCandidateVideoRequired?: SortOrder
    isCandidatePhotosRequired?: SortOrder
    isCandidateLocationRequired?: SortOrder
    isCandidateAdharRequired?: SortOrder
    isCandidateSelfieRequired?: SortOrder
    isPracticalVisibleToCandidate?: SortOrder
    isSuspiciousActivityDetectionRequired?: SortOrder
    isAssessorEvidenceRequired?: SortOrder
    assessorReachedAt?: SortOrderInput | SortOrder
    assessorCoordinates?: SortOrderInput | SortOrder
    assessorGroupPhoto?: SortOrderInput | SortOrder
    candidates?: CandidateOrderByRelationAggregateInput
    examResponses?: ExamResponseOrderByRelationAggregateInput
  }

  export type BatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    assessor?: StringFilter<"Batch"> | string
    name?: StringFilter<"Batch"> | string
    type?: StringFilter<"Batch"> | string
    status?: StringFilter<"Batch"> | string
    noOfCandidates?: IntFilter<"Batch"> | number
    durationInMin?: IntFilter<"Batch"> | number
    no?: StringFilter<"Batch"> | string
    startDate?: DateTimeFilter<"Batch"> | Date | string
    endDate?: DateTimeFilter<"Batch"> | Date | string
    theoryQuestionBank?: StringFilter<"Batch"> | string
    practicalQuestionBank?: StringFilter<"Batch"> | string
    vivaQuestionBank?: StringFilter<"Batch"> | string
    isAssessorReached?: BoolFilter<"Batch"> | boolean
    isCandidateVideoRequired?: BoolFilter<"Batch"> | boolean
    isCandidatePhotosRequired?: BoolFilter<"Batch"> | boolean
    isCandidateLocationRequired?: BoolFilter<"Batch"> | boolean
    isCandidateAdharRequired?: BoolFilter<"Batch"> | boolean
    isCandidateSelfieRequired?: BoolFilter<"Batch"> | boolean
    isPracticalVisibleToCandidate?: BoolFilter<"Batch"> | boolean
    isSuspiciousActivityDetectionRequired?: BoolFilter<"Batch"> | boolean
    isAssessorEvidenceRequired?: BoolFilter<"Batch"> | boolean
    assessorReachedAt?: DateTimeNullableFilter<"Batch"> | Date | string | null
    assessorCoordinates?: StringNullableFilter<"Batch"> | string | null
    assessorGroupPhoto?: StringNullableFilter<"Batch"> | string | null
    candidates?: CandidateListRelationFilter
    examResponses?: ExamResponseListRelationFilter
  }, "id">

  export type BatchOrderByWithAggregationInput = {
    id?: SortOrder
    assessor?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
    no?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    theoryQuestionBank?: SortOrder
    practicalQuestionBank?: SortOrder
    vivaQuestionBank?: SortOrder
    isAssessorReached?: SortOrder
    isCandidateVideoRequired?: SortOrder
    isCandidatePhotosRequired?: SortOrder
    isCandidateLocationRequired?: SortOrder
    isCandidateAdharRequired?: SortOrder
    isCandidateSelfieRequired?: SortOrder
    isPracticalVisibleToCandidate?: SortOrder
    isSuspiciousActivityDetectionRequired?: SortOrder
    isAssessorEvidenceRequired?: SortOrder
    assessorReachedAt?: SortOrderInput | SortOrder
    assessorCoordinates?: SortOrderInput | SortOrder
    assessorGroupPhoto?: SortOrderInput | SortOrder
    _count?: BatchCountOrderByAggregateInput
    _avg?: BatchAvgOrderByAggregateInput
    _max?: BatchMaxOrderByAggregateInput
    _min?: BatchMinOrderByAggregateInput
    _sum?: BatchSumOrderByAggregateInput
  }

  export type BatchScalarWhereWithAggregatesInput = {
    AND?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    OR?: BatchScalarWhereWithAggregatesInput[]
    NOT?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Batch"> | string
    assessor?: StringWithAggregatesFilter<"Batch"> | string
    name?: StringWithAggregatesFilter<"Batch"> | string
    type?: StringWithAggregatesFilter<"Batch"> | string
    status?: StringWithAggregatesFilter<"Batch"> | string
    noOfCandidates?: IntWithAggregatesFilter<"Batch"> | number
    durationInMin?: IntWithAggregatesFilter<"Batch"> | number
    no?: StringWithAggregatesFilter<"Batch"> | string
    startDate?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    theoryQuestionBank?: StringWithAggregatesFilter<"Batch"> | string
    practicalQuestionBank?: StringWithAggregatesFilter<"Batch"> | string
    vivaQuestionBank?: StringWithAggregatesFilter<"Batch"> | string
    isAssessorReached?: BoolWithAggregatesFilter<"Batch"> | boolean
    isCandidateVideoRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    isCandidatePhotosRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    isCandidateLocationRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    isCandidateAdharRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    isCandidateSelfieRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    isPracticalVisibleToCandidate?: BoolWithAggregatesFilter<"Batch"> | boolean
    isSuspiciousActivityDetectionRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    isAssessorEvidenceRequired?: BoolWithAggregatesFilter<"Batch"> | boolean
    assessorReachedAt?: DateTimeNullableWithAggregatesFilter<"Batch"> | Date | string | null
    assessorCoordinates?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    assessorGroupPhoto?: StringNullableWithAggregatesFilter<"Batch"> | string | null
  }

  export type CandidateWhereInput = {
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    id?: StringFilter<"Candidate"> | string
    name?: StringNullableFilter<"Candidate"> | string | null
    email?: StringNullableFilter<"Candidate"> | string | null
    phone?: StringNullableFilter<"Candidate"> | string | null
    address?: StringNullableFilter<"Candidate"> | string | null
    batchId?: StringFilter<"Candidate"> | string
    fatherName?: StringNullableFilter<"Candidate"> | string | null
    enrollmentNo?: StringFilter<"Candidate"> | string
    isActive?: BoolFilter<"Candidate"> | boolean
    password?: StringFilter<"Candidate"> | string
    gender?: StringNullableFilter<"Candidate"> | string | null
    adharNo?: StringNullableFilter<"Candidate"> | string | null
    isTheoryStarted?: BoolFilter<"Candidate"> | boolean
    isEvidanceUploaded?: BoolFilter<"Candidate"> | boolean
    isPresentInTheory?: BoolFilter<"Candidate"> | boolean
    isPresentInPractical?: BoolFilter<"Candidate"> | boolean
    isPresentInViva?: BoolFilter<"Candidate"> | boolean
    isTheorySubmitted?: BoolFilter<"Candidate"> | boolean
    theoryExamStatus?: StringFilter<"Candidate"> | string
    practicalExamStatus?: StringFilter<"Candidate"> | string
    vivaExamStatus?: StringFilter<"Candidate"> | string
    multipleFaceDetectionCount?: IntFilter<"Candidate"> | number
    faceHiddenCount?: IntFilter<"Candidate"> | number
    tabSwitchCount?: IntFilter<"Candidate"> | number
    exitFullScreenCount?: IntFilter<"Candidate"> | number
    theoryStartedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    theorySubmittedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    candidateSelfieCoordinates?: StringNullableFilter<"Candidate"> | string | null
    candidateSelfieTakenAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    candidateSelfie?: StringNullableFilter<"Candidate"> | string | null
    adharPicture?: StringNullableFilter<"Candidate"> | string | null
    resetedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    practicalStartedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    practicalSubmittedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    examResponses?: ExamResponseListRelationFilter
  }

  export type CandidateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    batchId?: SortOrder
    fatherName?: SortOrderInput | SortOrder
    enrollmentNo?: SortOrder
    isActive?: SortOrder
    password?: SortOrder
    gender?: SortOrderInput | SortOrder
    adharNo?: SortOrderInput | SortOrder
    isTheoryStarted?: SortOrder
    isEvidanceUploaded?: SortOrder
    isPresentInTheory?: SortOrder
    isPresentInPractical?: SortOrder
    isPresentInViva?: SortOrder
    isTheorySubmitted?: SortOrder
    theoryExamStatus?: SortOrder
    practicalExamStatus?: SortOrder
    vivaExamStatus?: SortOrder
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
    theoryStartedAt?: SortOrderInput | SortOrder
    theorySubmittedAt?: SortOrderInput | SortOrder
    candidateSelfieCoordinates?: SortOrderInput | SortOrder
    candidateSelfieTakenAt?: SortOrderInput | SortOrder
    candidateSelfie?: SortOrderInput | SortOrder
    adharPicture?: SortOrderInput | SortOrder
    resetedAt?: SortOrderInput | SortOrder
    practicalStartedAt?: SortOrderInput | SortOrder
    practicalSubmittedAt?: SortOrderInput | SortOrder
    batch?: BatchOrderByWithRelationInput
    examResponses?: ExamResponseOrderByRelationAggregateInput
  }

  export type CandidateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    name?: StringNullableFilter<"Candidate"> | string | null
    email?: StringNullableFilter<"Candidate"> | string | null
    phone?: StringNullableFilter<"Candidate"> | string | null
    address?: StringNullableFilter<"Candidate"> | string | null
    batchId?: StringFilter<"Candidate"> | string
    fatherName?: StringNullableFilter<"Candidate"> | string | null
    enrollmentNo?: StringFilter<"Candidate"> | string
    isActive?: BoolFilter<"Candidate"> | boolean
    password?: StringFilter<"Candidate"> | string
    gender?: StringNullableFilter<"Candidate"> | string | null
    adharNo?: StringNullableFilter<"Candidate"> | string | null
    isTheoryStarted?: BoolFilter<"Candidate"> | boolean
    isEvidanceUploaded?: BoolFilter<"Candidate"> | boolean
    isPresentInTheory?: BoolFilter<"Candidate"> | boolean
    isPresentInPractical?: BoolFilter<"Candidate"> | boolean
    isPresentInViva?: BoolFilter<"Candidate"> | boolean
    isTheorySubmitted?: BoolFilter<"Candidate"> | boolean
    theoryExamStatus?: StringFilter<"Candidate"> | string
    practicalExamStatus?: StringFilter<"Candidate"> | string
    vivaExamStatus?: StringFilter<"Candidate"> | string
    multipleFaceDetectionCount?: IntFilter<"Candidate"> | number
    faceHiddenCount?: IntFilter<"Candidate"> | number
    tabSwitchCount?: IntFilter<"Candidate"> | number
    exitFullScreenCount?: IntFilter<"Candidate"> | number
    theoryStartedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    theorySubmittedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    candidateSelfieCoordinates?: StringNullableFilter<"Candidate"> | string | null
    candidateSelfieTakenAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    candidateSelfie?: StringNullableFilter<"Candidate"> | string | null
    adharPicture?: StringNullableFilter<"Candidate"> | string | null
    resetedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    practicalStartedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    practicalSubmittedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
    examResponses?: ExamResponseListRelationFilter
  }, "id">

  export type CandidateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    batchId?: SortOrder
    fatherName?: SortOrderInput | SortOrder
    enrollmentNo?: SortOrder
    isActive?: SortOrder
    password?: SortOrder
    gender?: SortOrderInput | SortOrder
    adharNo?: SortOrderInput | SortOrder
    isTheoryStarted?: SortOrder
    isEvidanceUploaded?: SortOrder
    isPresentInTheory?: SortOrder
    isPresentInPractical?: SortOrder
    isPresentInViva?: SortOrder
    isTheorySubmitted?: SortOrder
    theoryExamStatus?: SortOrder
    practicalExamStatus?: SortOrder
    vivaExamStatus?: SortOrder
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
    theoryStartedAt?: SortOrderInput | SortOrder
    theorySubmittedAt?: SortOrderInput | SortOrder
    candidateSelfieCoordinates?: SortOrderInput | SortOrder
    candidateSelfieTakenAt?: SortOrderInput | SortOrder
    candidateSelfie?: SortOrderInput | SortOrder
    adharPicture?: SortOrderInput | SortOrder
    resetedAt?: SortOrderInput | SortOrder
    practicalStartedAt?: SortOrderInput | SortOrder
    practicalSubmittedAt?: SortOrderInput | SortOrder
    _count?: CandidateCountOrderByAggregateInput
    _avg?: CandidateAvgOrderByAggregateInput
    _max?: CandidateMaxOrderByAggregateInput
    _min?: CandidateMinOrderByAggregateInput
    _sum?: CandidateSumOrderByAggregateInput
  }

  export type CandidateScalarWhereWithAggregatesInput = {
    AND?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    OR?: CandidateScalarWhereWithAggregatesInput[]
    NOT?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candidate"> | string
    name?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    email?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    address?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    batchId?: StringWithAggregatesFilter<"Candidate"> | string
    fatherName?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    enrollmentNo?: StringWithAggregatesFilter<"Candidate"> | string
    isActive?: BoolWithAggregatesFilter<"Candidate"> | boolean
    password?: StringWithAggregatesFilter<"Candidate"> | string
    gender?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    adharNo?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    isTheoryStarted?: BoolWithAggregatesFilter<"Candidate"> | boolean
    isEvidanceUploaded?: BoolWithAggregatesFilter<"Candidate"> | boolean
    isPresentInTheory?: BoolWithAggregatesFilter<"Candidate"> | boolean
    isPresentInPractical?: BoolWithAggregatesFilter<"Candidate"> | boolean
    isPresentInViva?: BoolWithAggregatesFilter<"Candidate"> | boolean
    isTheorySubmitted?: BoolWithAggregatesFilter<"Candidate"> | boolean
    theoryExamStatus?: StringWithAggregatesFilter<"Candidate"> | string
    practicalExamStatus?: StringWithAggregatesFilter<"Candidate"> | string
    vivaExamStatus?: StringWithAggregatesFilter<"Candidate"> | string
    multipleFaceDetectionCount?: IntWithAggregatesFilter<"Candidate"> | number
    faceHiddenCount?: IntWithAggregatesFilter<"Candidate"> | number
    tabSwitchCount?: IntWithAggregatesFilter<"Candidate"> | number
    exitFullScreenCount?: IntWithAggregatesFilter<"Candidate"> | number
    theoryStartedAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
    theorySubmittedAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
    candidateSelfieCoordinates?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    candidateSelfieTakenAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
    candidateSelfie?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    adharPicture?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    resetedAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
    practicalStartedAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
    practicalSubmittedAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
  }

  export type ExamResponseWhereInput = {
    AND?: ExamResponseWhereInput | ExamResponseWhereInput[]
    OR?: ExamResponseWhereInput[]
    NOT?: ExamResponseWhereInput | ExamResponseWhereInput[]
    candidateId?: StringFilter<"ExamResponse"> | string
    batchId?: StringFilter<"ExamResponse"> | string
    questionId?: StringFilter<"ExamResponse"> | string
    answerId?: StringFilter<"ExamResponse"> | string
    startedAt?: DateTimeFilter<"ExamResponse"> | Date | string
    endedAt?: DateTimeFilter<"ExamResponse"> | Date | string
    type?: EnumExamTypeFilter<"ExamResponse"> | $Enums.ExamType
    marksObtained?: IntFilter<"ExamResponse"> | number
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
  }

  export type ExamResponseOrderByWithRelationInput = {
    candidateId?: SortOrder
    batchId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    type?: SortOrder
    marksObtained?: SortOrder
    candidate?: CandidateOrderByWithRelationInput
    batch?: BatchOrderByWithRelationInput
  }

  export type ExamResponseWhereUniqueInput = Prisma.AtLeast<{
    questionId_candidateId?: ExamResponseQuestionIdCandidateIdCompoundUniqueInput
    AND?: ExamResponseWhereInput | ExamResponseWhereInput[]
    OR?: ExamResponseWhereInput[]
    NOT?: ExamResponseWhereInput | ExamResponseWhereInput[]
    candidateId?: StringFilter<"ExamResponse"> | string
    batchId?: StringFilter<"ExamResponse"> | string
    questionId?: StringFilter<"ExamResponse"> | string
    answerId?: StringFilter<"ExamResponse"> | string
    startedAt?: DateTimeFilter<"ExamResponse"> | Date | string
    endedAt?: DateTimeFilter<"ExamResponse"> | Date | string
    type?: EnumExamTypeFilter<"ExamResponse"> | $Enums.ExamType
    marksObtained?: IntFilter<"ExamResponse"> | number
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    batch?: XOR<BatchScalarRelationFilter, BatchWhereInput>
  }, "questionId_candidateId">

  export type ExamResponseOrderByWithAggregationInput = {
    candidateId?: SortOrder
    batchId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    type?: SortOrder
    marksObtained?: SortOrder
    _count?: ExamResponseCountOrderByAggregateInput
    _avg?: ExamResponseAvgOrderByAggregateInput
    _max?: ExamResponseMaxOrderByAggregateInput
    _min?: ExamResponseMinOrderByAggregateInput
    _sum?: ExamResponseSumOrderByAggregateInput
  }

  export type ExamResponseScalarWhereWithAggregatesInput = {
    AND?: ExamResponseScalarWhereWithAggregatesInput | ExamResponseScalarWhereWithAggregatesInput[]
    OR?: ExamResponseScalarWhereWithAggregatesInput[]
    NOT?: ExamResponseScalarWhereWithAggregatesInput | ExamResponseScalarWhereWithAggregatesInput[]
    candidateId?: StringWithAggregatesFilter<"ExamResponse"> | string
    batchId?: StringWithAggregatesFilter<"ExamResponse"> | string
    questionId?: StringWithAggregatesFilter<"ExamResponse"> | string
    answerId?: StringWithAggregatesFilter<"ExamResponse"> | string
    startedAt?: DateTimeWithAggregatesFilter<"ExamResponse"> | Date | string
    endedAt?: DateTimeWithAggregatesFilter<"ExamResponse"> | Date | string
    type?: EnumExamTypeWithAggregatesFilter<"ExamResponse"> | $Enums.ExamType
    marksObtained?: IntWithAggregatesFilter<"ExamResponse"> | number
  }

  export type BatchCreateInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
    candidates?: CandidateCreateNestedManyWithoutBatchInput
    examResponses?: ExamResponseCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
    candidates?: CandidateUncheckedCreateNestedManyWithoutBatchInput
    examResponses?: ExamResponseUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    candidates?: CandidateUpdateManyWithoutBatchNestedInput
    examResponses?: ExamResponseUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    candidates?: CandidateUncheckedUpdateManyWithoutBatchNestedInput
    examResponses?: ExamResponseUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateManyInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
  }

  export type BatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CandidateCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
    batch: BatchCreateNestedOneWithoutCandidatesInput
    examResponses?: ExamResponseCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    batchId: string
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
    examResponses?: ExamResponseUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batch?: BatchUpdateOneRequiredWithoutCandidatesNestedInput
    examResponses?: ExamResponseUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    batchId?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResponses?: ExamResponseUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateCreateManyInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    batchId: string
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
  }

  export type CandidateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CandidateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    batchId?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamResponseCreateInput = {
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
    candidate: CandidateCreateNestedOneWithoutExamResponsesInput
    batch: BatchCreateNestedOneWithoutExamResponsesInput
  }

  export type ExamResponseUncheckedCreateInput = {
    candidateId: string
    batchId: string
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
  }

  export type ExamResponseUpdateInput = {
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
    candidate?: CandidateUpdateOneRequiredWithoutExamResponsesNestedInput
    batch?: BatchUpdateOneRequiredWithoutExamResponsesNestedInput
  }

  export type ExamResponseUncheckedUpdateInput = {
    candidateId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }

  export type ExamResponseCreateManyInput = {
    candidateId: string
    batchId: string
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
  }

  export type ExamResponseUpdateManyMutationInput = {
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }

  export type ExamResponseUncheckedUpdateManyInput = {
    candidateId?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CandidateListRelationFilter = {
    every?: CandidateWhereInput
    some?: CandidateWhereInput
    none?: CandidateWhereInput
  }

  export type ExamResponseListRelationFilter = {
    every?: ExamResponseWhereInput
    some?: ExamResponseWhereInput
    none?: ExamResponseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CandidateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExamResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchCountOrderByAggregateInput = {
    id?: SortOrder
    assessor?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
    no?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    theoryQuestionBank?: SortOrder
    practicalQuestionBank?: SortOrder
    vivaQuestionBank?: SortOrder
    isAssessorReached?: SortOrder
    isCandidateVideoRequired?: SortOrder
    isCandidatePhotosRequired?: SortOrder
    isCandidateLocationRequired?: SortOrder
    isCandidateAdharRequired?: SortOrder
    isCandidateSelfieRequired?: SortOrder
    isPracticalVisibleToCandidate?: SortOrder
    isSuspiciousActivityDetectionRequired?: SortOrder
    isAssessorEvidenceRequired?: SortOrder
    assessorReachedAt?: SortOrder
    assessorCoordinates?: SortOrder
    assessorGroupPhoto?: SortOrder
  }

  export type BatchAvgOrderByAggregateInput = {
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
  }

  export type BatchMaxOrderByAggregateInput = {
    id?: SortOrder
    assessor?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
    no?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    theoryQuestionBank?: SortOrder
    practicalQuestionBank?: SortOrder
    vivaQuestionBank?: SortOrder
    isAssessorReached?: SortOrder
    isCandidateVideoRequired?: SortOrder
    isCandidatePhotosRequired?: SortOrder
    isCandidateLocationRequired?: SortOrder
    isCandidateAdharRequired?: SortOrder
    isCandidateSelfieRequired?: SortOrder
    isPracticalVisibleToCandidate?: SortOrder
    isSuspiciousActivityDetectionRequired?: SortOrder
    isAssessorEvidenceRequired?: SortOrder
    assessorReachedAt?: SortOrder
    assessorCoordinates?: SortOrder
    assessorGroupPhoto?: SortOrder
  }

  export type BatchMinOrderByAggregateInput = {
    id?: SortOrder
    assessor?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
    no?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    theoryQuestionBank?: SortOrder
    practicalQuestionBank?: SortOrder
    vivaQuestionBank?: SortOrder
    isAssessorReached?: SortOrder
    isCandidateVideoRequired?: SortOrder
    isCandidatePhotosRequired?: SortOrder
    isCandidateLocationRequired?: SortOrder
    isCandidateAdharRequired?: SortOrder
    isCandidateSelfieRequired?: SortOrder
    isPracticalVisibleToCandidate?: SortOrder
    isSuspiciousActivityDetectionRequired?: SortOrder
    isAssessorEvidenceRequired?: SortOrder
    assessorReachedAt?: SortOrder
    assessorCoordinates?: SortOrder
    assessorGroupPhoto?: SortOrder
  }

  export type BatchSumOrderByAggregateInput = {
    noOfCandidates?: SortOrder
    durationInMin?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BatchScalarRelationFilter = {
    is?: BatchWhereInput
    isNot?: BatchWhereInput
  }

  export type CandidateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    batchId?: SortOrder
    fatherName?: SortOrder
    enrollmentNo?: SortOrder
    isActive?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    adharNo?: SortOrder
    isTheoryStarted?: SortOrder
    isEvidanceUploaded?: SortOrder
    isPresentInTheory?: SortOrder
    isPresentInPractical?: SortOrder
    isPresentInViva?: SortOrder
    isTheorySubmitted?: SortOrder
    theoryExamStatus?: SortOrder
    practicalExamStatus?: SortOrder
    vivaExamStatus?: SortOrder
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
    theoryStartedAt?: SortOrder
    theorySubmittedAt?: SortOrder
    candidateSelfieCoordinates?: SortOrder
    candidateSelfieTakenAt?: SortOrder
    candidateSelfie?: SortOrder
    adharPicture?: SortOrder
    resetedAt?: SortOrder
    practicalStartedAt?: SortOrder
    practicalSubmittedAt?: SortOrder
  }

  export type CandidateAvgOrderByAggregateInput = {
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
  }

  export type CandidateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    batchId?: SortOrder
    fatherName?: SortOrder
    enrollmentNo?: SortOrder
    isActive?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    adharNo?: SortOrder
    isTheoryStarted?: SortOrder
    isEvidanceUploaded?: SortOrder
    isPresentInTheory?: SortOrder
    isPresentInPractical?: SortOrder
    isPresentInViva?: SortOrder
    isTheorySubmitted?: SortOrder
    theoryExamStatus?: SortOrder
    practicalExamStatus?: SortOrder
    vivaExamStatus?: SortOrder
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
    theoryStartedAt?: SortOrder
    theorySubmittedAt?: SortOrder
    candidateSelfieCoordinates?: SortOrder
    candidateSelfieTakenAt?: SortOrder
    candidateSelfie?: SortOrder
    adharPicture?: SortOrder
    resetedAt?: SortOrder
    practicalStartedAt?: SortOrder
    practicalSubmittedAt?: SortOrder
  }

  export type CandidateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    batchId?: SortOrder
    fatherName?: SortOrder
    enrollmentNo?: SortOrder
    isActive?: SortOrder
    password?: SortOrder
    gender?: SortOrder
    adharNo?: SortOrder
    isTheoryStarted?: SortOrder
    isEvidanceUploaded?: SortOrder
    isPresentInTheory?: SortOrder
    isPresentInPractical?: SortOrder
    isPresentInViva?: SortOrder
    isTheorySubmitted?: SortOrder
    theoryExamStatus?: SortOrder
    practicalExamStatus?: SortOrder
    vivaExamStatus?: SortOrder
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
    theoryStartedAt?: SortOrder
    theorySubmittedAt?: SortOrder
    candidateSelfieCoordinates?: SortOrder
    candidateSelfieTakenAt?: SortOrder
    candidateSelfie?: SortOrder
    adharPicture?: SortOrder
    resetedAt?: SortOrder
    practicalStartedAt?: SortOrder
    practicalSubmittedAt?: SortOrder
  }

  export type CandidateSumOrderByAggregateInput = {
    multipleFaceDetectionCount?: SortOrder
    faceHiddenCount?: SortOrder
    tabSwitchCount?: SortOrder
    exitFullScreenCount?: SortOrder
  }

  export type EnumExamTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamType | EnumExamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExamType[]
    notIn?: $Enums.ExamType[]
    not?: NestedEnumExamTypeFilter<$PrismaModel> | $Enums.ExamType
  }

  export type CandidateScalarRelationFilter = {
    is?: CandidateWhereInput
    isNot?: CandidateWhereInput
  }

  export type ExamResponseQuestionIdCandidateIdCompoundUniqueInput = {
    questionId: string
    candidateId: string
  }

  export type ExamResponseCountOrderByAggregateInput = {
    candidateId?: SortOrder
    batchId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    type?: SortOrder
    marksObtained?: SortOrder
  }

  export type ExamResponseAvgOrderByAggregateInput = {
    marksObtained?: SortOrder
  }

  export type ExamResponseMaxOrderByAggregateInput = {
    candidateId?: SortOrder
    batchId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    type?: SortOrder
    marksObtained?: SortOrder
  }

  export type ExamResponseMinOrderByAggregateInput = {
    candidateId?: SortOrder
    batchId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    type?: SortOrder
    marksObtained?: SortOrder
  }

  export type ExamResponseSumOrderByAggregateInput = {
    marksObtained?: SortOrder
  }

  export type EnumExamTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamType | EnumExamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExamType[]
    notIn?: $Enums.ExamType[]
    not?: NestedEnumExamTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExamType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExamTypeFilter<$PrismaModel>
    _max?: NestedEnumExamTypeFilter<$PrismaModel>
  }

  export type CandidateCreateNestedManyWithoutBatchInput = {
    create?: XOR<CandidateCreateWithoutBatchInput, CandidateUncheckedCreateWithoutBatchInput> | CandidateCreateWithoutBatchInput[] | CandidateUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutBatchInput | CandidateCreateOrConnectWithoutBatchInput[]
    createMany?: CandidateCreateManyBatchInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type ExamResponseCreateNestedManyWithoutBatchInput = {
    create?: XOR<ExamResponseCreateWithoutBatchInput, ExamResponseUncheckedCreateWithoutBatchInput> | ExamResponseCreateWithoutBatchInput[] | ExamResponseUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutBatchInput | ExamResponseCreateOrConnectWithoutBatchInput[]
    createMany?: ExamResponseCreateManyBatchInputEnvelope
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
  }

  export type CandidateUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<CandidateCreateWithoutBatchInput, CandidateUncheckedCreateWithoutBatchInput> | CandidateCreateWithoutBatchInput[] | CandidateUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutBatchInput | CandidateCreateOrConnectWithoutBatchInput[]
    createMany?: CandidateCreateManyBatchInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type ExamResponseUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<ExamResponseCreateWithoutBatchInput, ExamResponseUncheckedCreateWithoutBatchInput> | ExamResponseCreateWithoutBatchInput[] | ExamResponseUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutBatchInput | ExamResponseCreateOrConnectWithoutBatchInput[]
    createMany?: ExamResponseCreateManyBatchInputEnvelope
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CandidateUpdateManyWithoutBatchNestedInput = {
    create?: XOR<CandidateCreateWithoutBatchInput, CandidateUncheckedCreateWithoutBatchInput> | CandidateCreateWithoutBatchInput[] | CandidateUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutBatchInput | CandidateCreateOrConnectWithoutBatchInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutBatchInput | CandidateUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: CandidateCreateManyBatchInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutBatchInput | CandidateUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutBatchInput | CandidateUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type ExamResponseUpdateManyWithoutBatchNestedInput = {
    create?: XOR<ExamResponseCreateWithoutBatchInput, ExamResponseUncheckedCreateWithoutBatchInput> | ExamResponseCreateWithoutBatchInput[] | ExamResponseUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutBatchInput | ExamResponseCreateOrConnectWithoutBatchInput[]
    upsert?: ExamResponseUpsertWithWhereUniqueWithoutBatchInput | ExamResponseUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: ExamResponseCreateManyBatchInputEnvelope
    set?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    disconnect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    delete?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    update?: ExamResponseUpdateWithWhereUniqueWithoutBatchInput | ExamResponseUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: ExamResponseUpdateManyWithWhereWithoutBatchInput | ExamResponseUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: ExamResponseScalarWhereInput | ExamResponseScalarWhereInput[]
  }

  export type CandidateUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<CandidateCreateWithoutBatchInput, CandidateUncheckedCreateWithoutBatchInput> | CandidateCreateWithoutBatchInput[] | CandidateUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutBatchInput | CandidateCreateOrConnectWithoutBatchInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutBatchInput | CandidateUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: CandidateCreateManyBatchInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutBatchInput | CandidateUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutBatchInput | CandidateUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type ExamResponseUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<ExamResponseCreateWithoutBatchInput, ExamResponseUncheckedCreateWithoutBatchInput> | ExamResponseCreateWithoutBatchInput[] | ExamResponseUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutBatchInput | ExamResponseCreateOrConnectWithoutBatchInput[]
    upsert?: ExamResponseUpsertWithWhereUniqueWithoutBatchInput | ExamResponseUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: ExamResponseCreateManyBatchInputEnvelope
    set?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    disconnect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    delete?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    update?: ExamResponseUpdateWithWhereUniqueWithoutBatchInput | ExamResponseUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: ExamResponseUpdateManyWithWhereWithoutBatchInput | ExamResponseUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: ExamResponseScalarWhereInput | ExamResponseScalarWhereInput[]
  }

  export type BatchCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<BatchCreateWithoutCandidatesInput, BatchUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutCandidatesInput
    connect?: BatchWhereUniqueInput
  }

  export type ExamResponseCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ExamResponseCreateWithoutCandidateInput, ExamResponseUncheckedCreateWithoutCandidateInput> | ExamResponseCreateWithoutCandidateInput[] | ExamResponseUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutCandidateInput | ExamResponseCreateOrConnectWithoutCandidateInput[]
    createMany?: ExamResponseCreateManyCandidateInputEnvelope
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
  }

  export type ExamResponseUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ExamResponseCreateWithoutCandidateInput, ExamResponseUncheckedCreateWithoutCandidateInput> | ExamResponseCreateWithoutCandidateInput[] | ExamResponseUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutCandidateInput | ExamResponseCreateOrConnectWithoutCandidateInput[]
    createMany?: ExamResponseCreateManyCandidateInputEnvelope
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
  }

  export type BatchUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<BatchCreateWithoutCandidatesInput, BatchUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutCandidatesInput
    upsert?: BatchUpsertWithoutCandidatesInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutCandidatesInput, BatchUpdateWithoutCandidatesInput>, BatchUncheckedUpdateWithoutCandidatesInput>
  }

  export type ExamResponseUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ExamResponseCreateWithoutCandidateInput, ExamResponseUncheckedCreateWithoutCandidateInput> | ExamResponseCreateWithoutCandidateInput[] | ExamResponseUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutCandidateInput | ExamResponseCreateOrConnectWithoutCandidateInput[]
    upsert?: ExamResponseUpsertWithWhereUniqueWithoutCandidateInput | ExamResponseUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ExamResponseCreateManyCandidateInputEnvelope
    set?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    disconnect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    delete?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    update?: ExamResponseUpdateWithWhereUniqueWithoutCandidateInput | ExamResponseUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ExamResponseUpdateManyWithWhereWithoutCandidateInput | ExamResponseUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ExamResponseScalarWhereInput | ExamResponseScalarWhereInput[]
  }

  export type ExamResponseUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ExamResponseCreateWithoutCandidateInput, ExamResponseUncheckedCreateWithoutCandidateInput> | ExamResponseCreateWithoutCandidateInput[] | ExamResponseUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ExamResponseCreateOrConnectWithoutCandidateInput | ExamResponseCreateOrConnectWithoutCandidateInput[]
    upsert?: ExamResponseUpsertWithWhereUniqueWithoutCandidateInput | ExamResponseUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ExamResponseCreateManyCandidateInputEnvelope
    set?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    disconnect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    delete?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    connect?: ExamResponseWhereUniqueInput | ExamResponseWhereUniqueInput[]
    update?: ExamResponseUpdateWithWhereUniqueWithoutCandidateInput | ExamResponseUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ExamResponseUpdateManyWithWhereWithoutCandidateInput | ExamResponseUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ExamResponseScalarWhereInput | ExamResponseScalarWhereInput[]
  }

  export type CandidateCreateNestedOneWithoutExamResponsesInput = {
    create?: XOR<CandidateCreateWithoutExamResponsesInput, CandidateUncheckedCreateWithoutExamResponsesInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutExamResponsesInput
    connect?: CandidateWhereUniqueInput
  }

  export type BatchCreateNestedOneWithoutExamResponsesInput = {
    create?: XOR<BatchCreateWithoutExamResponsesInput, BatchUncheckedCreateWithoutExamResponsesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutExamResponsesInput
    connect?: BatchWhereUniqueInput
  }

  export type EnumExamTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExamType
  }

  export type CandidateUpdateOneRequiredWithoutExamResponsesNestedInput = {
    create?: XOR<CandidateCreateWithoutExamResponsesInput, CandidateUncheckedCreateWithoutExamResponsesInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutExamResponsesInput
    upsert?: CandidateUpsertWithoutExamResponsesInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutExamResponsesInput, CandidateUpdateWithoutExamResponsesInput>, CandidateUncheckedUpdateWithoutExamResponsesInput>
  }

  export type BatchUpdateOneRequiredWithoutExamResponsesNestedInput = {
    create?: XOR<BatchCreateWithoutExamResponsesInput, BatchUncheckedCreateWithoutExamResponsesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutExamResponsesInput
    upsert?: BatchUpsertWithoutExamResponsesInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutExamResponsesInput, BatchUpdateWithoutExamResponsesInput>, BatchUncheckedUpdateWithoutExamResponsesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumExamTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamType | EnumExamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExamType[]
    notIn?: $Enums.ExamType[]
    not?: NestedEnumExamTypeFilter<$PrismaModel> | $Enums.ExamType
  }

  export type NestedEnumExamTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamType | EnumExamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExamType[]
    notIn?: $Enums.ExamType[]
    not?: NestedEnumExamTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExamType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExamTypeFilter<$PrismaModel>
    _max?: NestedEnumExamTypeFilter<$PrismaModel>
  }

  export type CandidateCreateWithoutBatchInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
    examResponses?: ExamResponseCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutBatchInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
    examResponses?: ExamResponseUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutBatchInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutBatchInput, CandidateUncheckedCreateWithoutBatchInput>
  }

  export type CandidateCreateManyBatchInputEnvelope = {
    data: CandidateCreateManyBatchInput | CandidateCreateManyBatchInput[]
  }

  export type ExamResponseCreateWithoutBatchInput = {
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
    candidate: CandidateCreateNestedOneWithoutExamResponsesInput
  }

  export type ExamResponseUncheckedCreateWithoutBatchInput = {
    candidateId: string
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
  }

  export type ExamResponseCreateOrConnectWithoutBatchInput = {
    where: ExamResponseWhereUniqueInput
    create: XOR<ExamResponseCreateWithoutBatchInput, ExamResponseUncheckedCreateWithoutBatchInput>
  }

  export type ExamResponseCreateManyBatchInputEnvelope = {
    data: ExamResponseCreateManyBatchInput | ExamResponseCreateManyBatchInput[]
  }

  export type CandidateUpsertWithWhereUniqueWithoutBatchInput = {
    where: CandidateWhereUniqueInput
    update: XOR<CandidateUpdateWithoutBatchInput, CandidateUncheckedUpdateWithoutBatchInput>
    create: XOR<CandidateCreateWithoutBatchInput, CandidateUncheckedCreateWithoutBatchInput>
  }

  export type CandidateUpdateWithWhereUniqueWithoutBatchInput = {
    where: CandidateWhereUniqueInput
    data: XOR<CandidateUpdateWithoutBatchInput, CandidateUncheckedUpdateWithoutBatchInput>
  }

  export type CandidateUpdateManyWithWhereWithoutBatchInput = {
    where: CandidateScalarWhereInput
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyWithoutBatchInput>
  }

  export type CandidateScalarWhereInput = {
    AND?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    OR?: CandidateScalarWhereInput[]
    NOT?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    id?: StringFilter<"Candidate"> | string
    name?: StringNullableFilter<"Candidate"> | string | null
    email?: StringNullableFilter<"Candidate"> | string | null
    phone?: StringNullableFilter<"Candidate"> | string | null
    address?: StringNullableFilter<"Candidate"> | string | null
    batchId?: StringFilter<"Candidate"> | string
    fatherName?: StringNullableFilter<"Candidate"> | string | null
    enrollmentNo?: StringFilter<"Candidate"> | string
    isActive?: BoolFilter<"Candidate"> | boolean
    password?: StringFilter<"Candidate"> | string
    gender?: StringNullableFilter<"Candidate"> | string | null
    adharNo?: StringNullableFilter<"Candidate"> | string | null
    isTheoryStarted?: BoolFilter<"Candidate"> | boolean
    isEvidanceUploaded?: BoolFilter<"Candidate"> | boolean
    isPresentInTheory?: BoolFilter<"Candidate"> | boolean
    isPresentInPractical?: BoolFilter<"Candidate"> | boolean
    isPresentInViva?: BoolFilter<"Candidate"> | boolean
    isTheorySubmitted?: BoolFilter<"Candidate"> | boolean
    theoryExamStatus?: StringFilter<"Candidate"> | string
    practicalExamStatus?: StringFilter<"Candidate"> | string
    vivaExamStatus?: StringFilter<"Candidate"> | string
    multipleFaceDetectionCount?: IntFilter<"Candidate"> | number
    faceHiddenCount?: IntFilter<"Candidate"> | number
    tabSwitchCount?: IntFilter<"Candidate"> | number
    exitFullScreenCount?: IntFilter<"Candidate"> | number
    theoryStartedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    theorySubmittedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    candidateSelfieCoordinates?: StringNullableFilter<"Candidate"> | string | null
    candidateSelfieTakenAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    candidateSelfie?: StringNullableFilter<"Candidate"> | string | null
    adharPicture?: StringNullableFilter<"Candidate"> | string | null
    resetedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    practicalStartedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    practicalSubmittedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
  }

  export type ExamResponseUpsertWithWhereUniqueWithoutBatchInput = {
    where: ExamResponseWhereUniqueInput
    update: XOR<ExamResponseUpdateWithoutBatchInput, ExamResponseUncheckedUpdateWithoutBatchInput>
    create: XOR<ExamResponseCreateWithoutBatchInput, ExamResponseUncheckedCreateWithoutBatchInput>
  }

  export type ExamResponseUpdateWithWhereUniqueWithoutBatchInput = {
    where: ExamResponseWhereUniqueInput
    data: XOR<ExamResponseUpdateWithoutBatchInput, ExamResponseUncheckedUpdateWithoutBatchInput>
  }

  export type ExamResponseUpdateManyWithWhereWithoutBatchInput = {
    where: ExamResponseScalarWhereInput
    data: XOR<ExamResponseUpdateManyMutationInput, ExamResponseUncheckedUpdateManyWithoutBatchInput>
  }

  export type ExamResponseScalarWhereInput = {
    AND?: ExamResponseScalarWhereInput | ExamResponseScalarWhereInput[]
    OR?: ExamResponseScalarWhereInput[]
    NOT?: ExamResponseScalarWhereInput | ExamResponseScalarWhereInput[]
    candidateId?: StringFilter<"ExamResponse"> | string
    batchId?: StringFilter<"ExamResponse"> | string
    questionId?: StringFilter<"ExamResponse"> | string
    answerId?: StringFilter<"ExamResponse"> | string
    startedAt?: DateTimeFilter<"ExamResponse"> | Date | string
    endedAt?: DateTimeFilter<"ExamResponse"> | Date | string
    type?: EnumExamTypeFilter<"ExamResponse"> | $Enums.ExamType
    marksObtained?: IntFilter<"ExamResponse"> | number
  }

  export type BatchCreateWithoutCandidatesInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
    examResponses?: ExamResponseCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutCandidatesInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
    examResponses?: ExamResponseUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutCandidatesInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutCandidatesInput, BatchUncheckedCreateWithoutCandidatesInput>
  }

  export type ExamResponseCreateWithoutCandidateInput = {
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
    batch: BatchCreateNestedOneWithoutExamResponsesInput
  }

  export type ExamResponseUncheckedCreateWithoutCandidateInput = {
    batchId: string
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
  }

  export type ExamResponseCreateOrConnectWithoutCandidateInput = {
    where: ExamResponseWhereUniqueInput
    create: XOR<ExamResponseCreateWithoutCandidateInput, ExamResponseUncheckedCreateWithoutCandidateInput>
  }

  export type ExamResponseCreateManyCandidateInputEnvelope = {
    data: ExamResponseCreateManyCandidateInput | ExamResponseCreateManyCandidateInput[]
  }

  export type BatchUpsertWithoutCandidatesInput = {
    update: XOR<BatchUpdateWithoutCandidatesInput, BatchUncheckedUpdateWithoutCandidatesInput>
    create: XOR<BatchCreateWithoutCandidatesInput, BatchUncheckedCreateWithoutCandidatesInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutCandidatesInput, BatchUncheckedUpdateWithoutCandidatesInput>
  }

  export type BatchUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    examResponses?: ExamResponseUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    examResponses?: ExamResponseUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type ExamResponseUpsertWithWhereUniqueWithoutCandidateInput = {
    where: ExamResponseWhereUniqueInput
    update: XOR<ExamResponseUpdateWithoutCandidateInput, ExamResponseUncheckedUpdateWithoutCandidateInput>
    create: XOR<ExamResponseCreateWithoutCandidateInput, ExamResponseUncheckedCreateWithoutCandidateInput>
  }

  export type ExamResponseUpdateWithWhereUniqueWithoutCandidateInput = {
    where: ExamResponseWhereUniqueInput
    data: XOR<ExamResponseUpdateWithoutCandidateInput, ExamResponseUncheckedUpdateWithoutCandidateInput>
  }

  export type ExamResponseUpdateManyWithWhereWithoutCandidateInput = {
    where: ExamResponseScalarWhereInput
    data: XOR<ExamResponseUpdateManyMutationInput, ExamResponseUncheckedUpdateManyWithoutCandidateInput>
  }

  export type CandidateCreateWithoutExamResponsesInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
    batch: BatchCreateNestedOneWithoutCandidatesInput
  }

  export type CandidateUncheckedCreateWithoutExamResponsesInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    batchId: string
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
  }

  export type CandidateCreateOrConnectWithoutExamResponsesInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutExamResponsesInput, CandidateUncheckedCreateWithoutExamResponsesInput>
  }

  export type BatchCreateWithoutExamResponsesInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
    candidates?: CandidateCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutExamResponsesInput = {
    id: string
    assessor: string
    name: string
    type: string
    status: string
    noOfCandidates: number
    durationInMin: number
    no: string
    startDate: Date | string
    endDate: Date | string
    theoryQuestionBank: string
    practicalQuestionBank: string
    vivaQuestionBank: string
    isAssessorReached: boolean
    isCandidateVideoRequired: boolean
    isCandidatePhotosRequired: boolean
    isCandidateLocationRequired: boolean
    isCandidateAdharRequired: boolean
    isCandidateSelfieRequired: boolean
    isPracticalVisibleToCandidate: boolean
    isSuspiciousActivityDetectionRequired: boolean
    isAssessorEvidenceRequired: boolean
    assessorReachedAt?: Date | string | null
    assessorCoordinates?: string | null
    assessorGroupPhoto?: string | null
    candidates?: CandidateUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutExamResponsesInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutExamResponsesInput, BatchUncheckedCreateWithoutExamResponsesInput>
  }

  export type CandidateUpsertWithoutExamResponsesInput = {
    update: XOR<CandidateUpdateWithoutExamResponsesInput, CandidateUncheckedUpdateWithoutExamResponsesInput>
    create: XOR<CandidateCreateWithoutExamResponsesInput, CandidateUncheckedCreateWithoutExamResponsesInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutExamResponsesInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutExamResponsesInput, CandidateUncheckedUpdateWithoutExamResponsesInput>
  }

  export type CandidateUpdateWithoutExamResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batch?: BatchUpdateOneRequiredWithoutCandidatesNestedInput
  }

  export type CandidateUncheckedUpdateWithoutExamResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    batchId?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchUpsertWithoutExamResponsesInput = {
    update: XOR<BatchUpdateWithoutExamResponsesInput, BatchUncheckedUpdateWithoutExamResponsesInput>
    create: XOR<BatchCreateWithoutExamResponsesInput, BatchUncheckedCreateWithoutExamResponsesInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutExamResponsesInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutExamResponsesInput, BatchUncheckedUpdateWithoutExamResponsesInput>
  }

  export type BatchUpdateWithoutExamResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    candidates?: CandidateUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutExamResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessor?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    noOfCandidates?: IntFieldUpdateOperationsInput | number
    durationInMin?: IntFieldUpdateOperationsInput | number
    no?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    theoryQuestionBank?: StringFieldUpdateOperationsInput | string
    practicalQuestionBank?: StringFieldUpdateOperationsInput | string
    vivaQuestionBank?: StringFieldUpdateOperationsInput | string
    isAssessorReached?: BoolFieldUpdateOperationsInput | boolean
    isCandidateVideoRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidatePhotosRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateLocationRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateAdharRequired?: BoolFieldUpdateOperationsInput | boolean
    isCandidateSelfieRequired?: BoolFieldUpdateOperationsInput | boolean
    isPracticalVisibleToCandidate?: BoolFieldUpdateOperationsInput | boolean
    isSuspiciousActivityDetectionRequired?: BoolFieldUpdateOperationsInput | boolean
    isAssessorEvidenceRequired?: BoolFieldUpdateOperationsInput | boolean
    assessorReachedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assessorCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    assessorGroupPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    candidates?: CandidateUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type CandidateCreateManyBatchInput = {
    id: string
    name?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
    fatherName?: string | null
    enrollmentNo: string
    isActive: boolean
    password: string
    gender?: string | null
    adharNo?: string | null
    isTheoryStarted: boolean
    isEvidanceUploaded: boolean
    isPresentInTheory: boolean
    isPresentInPractical: boolean
    isPresentInViva: boolean
    isTheorySubmitted: boolean
    theoryExamStatus: string
    practicalExamStatus: string
    vivaExamStatus: string
    multipleFaceDetectionCount: number
    faceHiddenCount: number
    tabSwitchCount: number
    exitFullScreenCount: number
    theoryStartedAt?: Date | string | null
    theorySubmittedAt?: Date | string | null
    candidateSelfieCoordinates?: string | null
    candidateSelfieTakenAt?: Date | string | null
    candidateSelfie?: string | null
    adharPicture?: string | null
    resetedAt?: Date | string | null
    practicalStartedAt?: Date | string | null
    practicalSubmittedAt?: Date | string | null
  }

  export type ExamResponseCreateManyBatchInput = {
    candidateId: string
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
  }

  export type CandidateUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResponses?: ExamResponseUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResponses?: ExamResponseUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    enrollmentNo?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    adharNo?: NullableStringFieldUpdateOperationsInput | string | null
    isTheoryStarted?: BoolFieldUpdateOperationsInput | boolean
    isEvidanceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isPresentInTheory?: BoolFieldUpdateOperationsInput | boolean
    isPresentInPractical?: BoolFieldUpdateOperationsInput | boolean
    isPresentInViva?: BoolFieldUpdateOperationsInput | boolean
    isTheorySubmitted?: BoolFieldUpdateOperationsInput | boolean
    theoryExamStatus?: StringFieldUpdateOperationsInput | string
    practicalExamStatus?: StringFieldUpdateOperationsInput | string
    vivaExamStatus?: StringFieldUpdateOperationsInput | string
    multipleFaceDetectionCount?: IntFieldUpdateOperationsInput | number
    faceHiddenCount?: IntFieldUpdateOperationsInput | number
    tabSwitchCount?: IntFieldUpdateOperationsInput | number
    exitFullScreenCount?: IntFieldUpdateOperationsInput | number
    theoryStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    theorySubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfieCoordinates?: NullableStringFieldUpdateOperationsInput | string | null
    candidateSelfieTakenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateSelfie?: NullableStringFieldUpdateOperationsInput | string | null
    adharPicture?: NullableStringFieldUpdateOperationsInput | string | null
    resetedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    practicalSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamResponseUpdateWithoutBatchInput = {
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
    candidate?: CandidateUpdateOneRequiredWithoutExamResponsesNestedInput
  }

  export type ExamResponseUncheckedUpdateWithoutBatchInput = {
    candidateId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }

  export type ExamResponseUncheckedUpdateManyWithoutBatchInput = {
    candidateId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }

  export type ExamResponseCreateManyCandidateInput = {
    batchId: string
    questionId: string
    answerId: string
    startedAt: Date | string
    endedAt: Date | string
    type?: $Enums.ExamType
    marksObtained?: number
  }

  export type ExamResponseUpdateWithoutCandidateInput = {
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
    batch?: BatchUpdateOneRequiredWithoutExamResponsesNestedInput
  }

  export type ExamResponseUncheckedUpdateWithoutCandidateInput = {
    batchId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }

  export type ExamResponseUncheckedUpdateManyWithoutCandidateInput = {
    batchId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExamTypeFieldUpdateOperationsInput | $Enums.ExamType
    marksObtained?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}