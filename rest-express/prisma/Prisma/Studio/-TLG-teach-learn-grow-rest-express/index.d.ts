import { DMMF, DMMFClass, Engine } from './runtime';
/**
 * Utility Types
 */
export declare type Enumerable<T> = T | Array<T>;
export declare type MergeTruthyValues<R extends object, S extends object> = {
    [key in keyof S | keyof R]: key extends false ? never : key extends keyof S ? S[key] extends false ? never : S[key] : key extends keyof R ? R[key] : never;
};
export declare type CleanupNever<T> = {
    [key in keyof T]: T[key] extends never ? never : key;
}[keyof T];
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * A PhotonRequestError is an error that is thrown in conjunction to a concrete query that has been performed with Photon.js.
 */
export declare class PhotonRequestError extends Error {
    message: string;
    code?: string | undefined;
    meta?: any;
    constructor(message: string, code?: string | undefined, meta?: any);
}
declare class PhotonFetcher {
    private readonly photon;
    private readonly engine;
    private readonly debug;
    private readonly hooks?;
    constructor(photon: Photon, engine: Engine, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, path?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}
/**
 * Client
**/
export declare type Datasources = {
    sqlite?: string;
};
export declare type LogLevel = 'INFO' | 'WARN' | 'QUERY';
export declare type LogOption = LogLevel | {
    level: LogLevel;
    /**
     * @default 'stdout'
     */
    emit?: 'event' | 'stdout';
};
export interface PhotonOptions {
    datasources?: Datasources;
    /**
     * @default false
     */
    log?: boolean | LogOption[];
    debug?: any;
    /**
     * You probably don't want to use this. `__internal` is used by internal tooling.
     */
    __internal?: {
        debug?: boolean;
        hooks?: Hooks;
        engine?: {
            cwd?: string;
            binaryPath?: string;
        };
    };
}
export declare type Hooks = {
    beforeRequest?: (options: {
        query: string;
        path: string[];
        rootField?: string;
        typeName?: string;
        document: any;
    }) => any;
};
export declare class Photon {
    private fetcher;
    private readonly dmmf;
    private readonly engine;
    private connectionPromise?;
    constructor(options?: PhotonOptions);
    private connectEngine;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    get permissions(): PermissionDelegate;
    get roles(): RoleDelegate;
    get users(): UserDelegate;
    get posts(): PostDelegate;
    get messages(): MessageDelegate;
}
export declare const OrderByArg: {
    asc: "asc";
    desc: "desc";
};
export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg];
/**
 * Model Permission
 */
export declare type Permission = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare type PermissionScalars = 'name' | 'description' | 'createdAt' | 'updatedAt';
export declare type PermissionSelect = {
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean | RoleSelectArgsOptional;
    user?: boolean | UserSelectArgsOptional;
};
export declare type PermissionInclude = {
    role?: boolean | RoleIncludeArgsOptional;
    user?: boolean | UserIncludeArgsOptional;
};
declare type PermissionDefault = {
    name: true;
    description: true;
    createdAt: true;
    updatedAt: true;
};
declare type PermissionGetSelectPayload<S extends boolean | PermissionSelect> = S extends true ? Permission : S extends PermissionSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends PermissionScalars ? Permission[P] : P extends 'role' ? RoleGetSelectPayload<ExtractRoleSelectArgs<S[P]>> | null : P extends 'user' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> | null : never;
} : never;
declare type PermissionGetIncludePayload<S extends boolean | PermissionInclude> = S extends true ? Permission : S extends PermissionInclude ? {
    [P in CleanupNever<MergeTruthyValues<PermissionDefault, S>>]: P extends PermissionScalars ? Permission[P] : P extends 'role' ? RoleGetIncludePayload<ExtractRoleIncludeArgs<S[P]>> | null : P extends 'user' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> | null : never;
} : never;
export interface PermissionDelegate {
    <T extends FindManyPermissionArgs>(args?: Subset<T, FindManyPermissionArgs>): T extends FindManyPermissionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPermissionSelectArgs ? Promise<Array<PermissionGetSelectPayload<ExtractFindManyPermissionSelectArgs<T>>>> : T extends FindManyPermissionIncludeArgs ? Promise<Array<PermissionGetIncludePayload<ExtractFindManyPermissionIncludeArgs<T>>>> : Promise<Array<Permission>>;
    findOne<T extends FindOnePermissionArgs>(args: Subset<T, FindOnePermissionArgs>): T extends FindOnePermissionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOnePermissionSelectArgs ? Promise<PermissionGetSelectPayload<ExtractFindOnePermissionSelectArgs<T>> | null> : T extends FindOnePermissionIncludeArgs ? Promise<PermissionGetIncludePayload<ExtractFindOnePermissionIncludeArgs<T>> | null> : PermissionClient<Permission | null>;
    findMany<T extends FindManyPermissionArgs>(args?: Subset<T, FindManyPermissionArgs>): T extends FindManyPermissionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPermissionSelectArgs ? Promise<Array<PermissionGetSelectPayload<ExtractFindManyPermissionSelectArgs<T>>>> : T extends FindManyPermissionIncludeArgs ? Promise<Array<PermissionGetIncludePayload<ExtractFindManyPermissionIncludeArgs<T>>>> : Promise<Array<Permission>>;
    create<T extends PermissionCreateArgs>(args: Subset<T, PermissionCreateArgs>): T extends PermissionCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends PermissionSelectCreateArgs ? Promise<PermissionGetSelectPayload<ExtractPermissionSelectCreateArgs<T>>> : T extends PermissionIncludeCreateArgs ? Promise<PermissionGetIncludePayload<ExtractPermissionIncludeCreateArgs<T>>> : PermissionClient<Permission>;
    delete<T extends PermissionDeleteArgs>(args: Subset<T, PermissionDeleteArgs>): T extends PermissionDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends PermissionSelectDeleteArgs ? Promise<PermissionGetSelectPayload<ExtractPermissionSelectDeleteArgs<T>>> : T extends PermissionIncludeDeleteArgs ? Promise<PermissionGetIncludePayload<ExtractPermissionIncludeDeleteArgs<T>>> : PermissionClient<Permission>;
    update<T extends PermissionUpdateArgs>(args: Subset<T, PermissionUpdateArgs>): T extends PermissionUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends PermissionSelectUpdateArgs ? Promise<PermissionGetSelectPayload<ExtractPermissionSelectUpdateArgs<T>>> : T extends PermissionIncludeUpdateArgs ? Promise<PermissionGetIncludePayload<ExtractPermissionIncludeUpdateArgs<T>>> : PermissionClient<Permission>;
    deleteMany<T extends PermissionDeleteManyArgs>(args: Subset<T, PermissionDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends PermissionUpdateManyArgs>(args: Subset<T, PermissionUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends PermissionUpsertArgs>(args: Subset<T, PermissionUpsertArgs>): T extends PermissionUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends PermissionSelectUpsertArgs ? Promise<PermissionGetSelectPayload<ExtractPermissionSelectUpsertArgs<T>>> : T extends PermissionIncludeUpsertArgs ? Promise<PermissionGetIncludePayload<ExtractPermissionIncludeUpsertArgs<T>>> : PermissionClient<Permission>;
    count(): Promise<number>;
}
export declare class PermissionClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    role<T extends RoleArgs = {}>(args?: Subset<T, RoleArgs>): T extends FindOneRoleArgsRequired ? 'Please either choose `select` or `include`' : T extends RoleSelectArgs ? Promise<RoleGetSelectPayload<ExtractRoleSelectArgs<T>> | null> : T extends RoleIncludeArgs ? Promise<RoleGetIncludePayload<ExtractRoleIncludeArgs<T>> | null> : RoleClient<Role | null>;
    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Permission findOne
 */
export declare type FindOnePermissionArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
    where: PermissionWhereUniqueInput;
};
export declare type FindOnePermissionArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
    where: PermissionWhereUniqueInput;
};
export declare type FindOnePermissionSelectArgs = {
    select: PermissionSelect;
    where: PermissionWhereUniqueInput;
};
export declare type FindOnePermissionSelectArgsOptional = {
    select?: PermissionSelect | null;
    where: PermissionWhereUniqueInput;
};
export declare type FindOnePermissionIncludeArgs = {
    include: PermissionInclude;
    where: PermissionWhereUniqueInput;
};
export declare type FindOnePermissionIncludeArgsOptional = {
    include?: PermissionInclude | null;
    where: PermissionWhereUniqueInput;
};
export declare type ExtractFindOnePermissionSelectArgs<S extends undefined | boolean | FindOnePermissionSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePermissionSelectArgs ? S['select'] : true;
export declare type ExtractFindOnePermissionIncludeArgs<S extends undefined | boolean | FindOnePermissionIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePermissionIncludeArgs ? S['include'] : true;
/**
 * Permission findMany
 */
export declare type FindManyPermissionArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
    where?: PermissionWhereInput | null;
    orderBy?: PermissionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPermissionArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
    where?: PermissionWhereInput | null;
    orderBy?: PermissionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPermissionSelectArgs = {
    select: PermissionSelect;
    where?: PermissionWhereInput | null;
    orderBy?: PermissionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPermissionSelectArgsOptional = {
    select?: PermissionSelect | null;
    where?: PermissionWhereInput | null;
    orderBy?: PermissionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPermissionIncludeArgs = {
    include: PermissionInclude;
    where?: PermissionWhereInput | null;
    orderBy?: PermissionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPermissionIncludeArgsOptional = {
    include?: PermissionInclude | null;
    where?: PermissionWhereInput | null;
    orderBy?: PermissionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyPermissionSelectArgs<S extends undefined | boolean | FindManyPermissionSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPermissionSelectArgs ? S['select'] : true;
export declare type ExtractFindManyPermissionIncludeArgs<S extends undefined | boolean | FindManyPermissionIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPermissionIncludeArgs ? S['include'] : true;
/**
 * Permission create
 */
export declare type PermissionCreateArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
    data: PermissionCreateInput;
};
export declare type PermissionCreateArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
    data: PermissionCreateInput;
};
export declare type PermissionSelectCreateArgs = {
    select: PermissionSelect;
    data: PermissionCreateInput;
};
export declare type PermissionSelectCreateArgsOptional = {
    select?: PermissionSelect | null;
    data: PermissionCreateInput;
};
export declare type PermissionIncludeCreateArgs = {
    include: PermissionInclude;
    data: PermissionCreateInput;
};
export declare type PermissionIncludeCreateArgsOptional = {
    include?: PermissionInclude | null;
    data: PermissionCreateInput;
};
export declare type ExtractPermissionSelectCreateArgs<S extends undefined | boolean | PermissionSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionSelectCreateArgs ? S['select'] : true;
export declare type ExtractPermissionIncludeCreateArgs<S extends undefined | boolean | PermissionIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionIncludeCreateArgs ? S['include'] : true;
/**
 * Permission update
 */
export declare type PermissionUpdateArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
    data: PermissionUpdateInput;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionUpdateArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
    data: PermissionUpdateInput;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionSelectUpdateArgs = {
    select: PermissionSelect;
    data: PermissionUpdateInput;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionSelectUpdateArgsOptional = {
    select?: PermissionSelect | null;
    data: PermissionUpdateInput;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionIncludeUpdateArgs = {
    include: PermissionInclude;
    data: PermissionUpdateInput;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionIncludeUpdateArgsOptional = {
    include?: PermissionInclude | null;
    data: PermissionUpdateInput;
    where: PermissionWhereUniqueInput;
};
export declare type ExtractPermissionSelectUpdateArgs<S extends undefined | boolean | PermissionSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionSelectUpdateArgs ? S['select'] : true;
export declare type ExtractPermissionIncludeUpdateArgs<S extends undefined | boolean | PermissionIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionIncludeUpdateArgs ? S['include'] : true;
/**
 * Permission updateMany
 */
export declare type PermissionUpdateManyArgs = {
    data: PermissionUpdateManyMutationInput;
    where?: PermissionWhereInput | null;
};
/**
 * Permission upsert
 */
export declare type PermissionUpsertArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
    where: PermissionWhereUniqueInput;
    create: PermissionCreateInput;
    update: PermissionUpdateInput;
};
export declare type PermissionUpsertArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
    where: PermissionWhereUniqueInput;
    create: PermissionCreateInput;
    update: PermissionUpdateInput;
};
export declare type PermissionSelectUpsertArgs = {
    select: PermissionSelect;
    where: PermissionWhereUniqueInput;
    create: PermissionCreateInput;
    update: PermissionUpdateInput;
};
export declare type PermissionSelectUpsertArgsOptional = {
    select?: PermissionSelect | null;
    where: PermissionWhereUniqueInput;
    create: PermissionCreateInput;
    update: PermissionUpdateInput;
};
export declare type PermissionIncludeUpsertArgs = {
    include: PermissionInclude;
    where: PermissionWhereUniqueInput;
    create: PermissionCreateInput;
    update: PermissionUpdateInput;
};
export declare type PermissionIncludeUpsertArgsOptional = {
    include?: PermissionInclude | null;
    where: PermissionWhereUniqueInput;
    create: PermissionCreateInput;
    update: PermissionUpdateInput;
};
export declare type ExtractPermissionSelectUpsertArgs<S extends undefined | boolean | PermissionSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionSelectUpsertArgs ? S['select'] : true;
export declare type ExtractPermissionIncludeUpsertArgs<S extends undefined | boolean | PermissionIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionIncludeUpsertArgs ? S['include'] : true;
/**
 * Permission delete
 */
export declare type PermissionDeleteArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionDeleteArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionSelectDeleteArgs = {
    select: PermissionSelect;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionSelectDeleteArgsOptional = {
    select?: PermissionSelect | null;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionIncludeDeleteArgs = {
    include: PermissionInclude;
    where: PermissionWhereUniqueInput;
};
export declare type PermissionIncludeDeleteArgsOptional = {
    include?: PermissionInclude | null;
    where: PermissionWhereUniqueInput;
};
export declare type ExtractPermissionSelectDeleteArgs<S extends undefined | boolean | PermissionSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionSelectDeleteArgs ? S['select'] : true;
export declare type ExtractPermissionIncludeDeleteArgs<S extends undefined | boolean | PermissionIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionIncludeDeleteArgs ? S['include'] : true;
/**
 * Permission deleteMany
 */
export declare type PermissionDeleteManyArgs = {
    where?: PermissionWhereInput | null;
};
/**
 * Permission without action
 */
export declare type PermissionArgs = {
    select?: PermissionSelect | null;
    include?: PermissionInclude | null;
};
export declare type PermissionArgsRequired = {
    select: PermissionSelect;
    include: PermissionInclude;
};
export declare type PermissionSelectArgs = {
    select: PermissionSelect;
};
export declare type PermissionSelectArgsOptional = {
    select?: PermissionSelect | null;
};
export declare type PermissionIncludeArgs = {
    include: PermissionInclude;
};
export declare type PermissionIncludeArgsOptional = {
    include?: PermissionInclude | null;
};
export declare type ExtractPermissionSelectArgs<S extends undefined | boolean | PermissionSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionSelectArgs ? S['select'] : true;
export declare type ExtractPermissionIncludeArgs<S extends undefined | boolean | PermissionIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PermissionIncludeArgs ? S['include'] : true;
/**
 * Model Role
 */
export declare type Role = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare type RoleScalars = 'name' | 'description' | 'createdAt' | 'updatedAt';
export declare type RoleSelect = {
    name?: boolean;
    description?: boolean;
    permissions?: boolean | FindManyPermissionSelectArgsOptional;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | UserSelectArgsOptional;
};
export declare type RoleInclude = {
    permissions?: boolean | FindManyPermissionIncludeArgsOptional;
    user?: boolean | UserIncludeArgsOptional;
};
declare type RoleDefault = {
    name: true;
    description: true;
    createdAt: true;
    updatedAt: true;
};
declare type RoleGetSelectPayload<S extends boolean | RoleSelect> = S extends true ? Role : S extends RoleSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends RoleScalars ? Role[P] : P extends 'permissions' ? Array<PermissionGetSelectPayload<ExtractFindManyPermissionSelectArgs<S[P]>>> : P extends 'user' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> | null : never;
} : never;
declare type RoleGetIncludePayload<S extends boolean | RoleInclude> = S extends true ? Role : S extends RoleInclude ? {
    [P in CleanupNever<MergeTruthyValues<RoleDefault, S>>]: P extends RoleScalars ? Role[P] : P extends 'permissions' ? Array<PermissionGetIncludePayload<ExtractFindManyPermissionIncludeArgs<S[P]>>> : P extends 'user' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> | null : never;
} : never;
export interface RoleDelegate {
    <T extends FindManyRoleArgs>(args?: Subset<T, FindManyRoleArgs>): T extends FindManyRoleArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRoleSelectArgs ? Promise<Array<RoleGetSelectPayload<ExtractFindManyRoleSelectArgs<T>>>> : T extends FindManyRoleIncludeArgs ? Promise<Array<RoleGetIncludePayload<ExtractFindManyRoleIncludeArgs<T>>>> : Promise<Array<Role>>;
    findOne<T extends FindOneRoleArgs>(args: Subset<T, FindOneRoleArgs>): T extends FindOneRoleArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneRoleSelectArgs ? Promise<RoleGetSelectPayload<ExtractFindOneRoleSelectArgs<T>> | null> : T extends FindOneRoleIncludeArgs ? Promise<RoleGetIncludePayload<ExtractFindOneRoleIncludeArgs<T>> | null> : RoleClient<Role | null>;
    findMany<T extends FindManyRoleArgs>(args?: Subset<T, FindManyRoleArgs>): T extends FindManyRoleArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRoleSelectArgs ? Promise<Array<RoleGetSelectPayload<ExtractFindManyRoleSelectArgs<T>>>> : T extends FindManyRoleIncludeArgs ? Promise<Array<RoleGetIncludePayload<ExtractFindManyRoleIncludeArgs<T>>>> : Promise<Array<Role>>;
    create<T extends RoleCreateArgs>(args: Subset<T, RoleCreateArgs>): T extends RoleCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends RoleSelectCreateArgs ? Promise<RoleGetSelectPayload<ExtractRoleSelectCreateArgs<T>>> : T extends RoleIncludeCreateArgs ? Promise<RoleGetIncludePayload<ExtractRoleIncludeCreateArgs<T>>> : RoleClient<Role>;
    delete<T extends RoleDeleteArgs>(args: Subset<T, RoleDeleteArgs>): T extends RoleDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends RoleSelectDeleteArgs ? Promise<RoleGetSelectPayload<ExtractRoleSelectDeleteArgs<T>>> : T extends RoleIncludeDeleteArgs ? Promise<RoleGetIncludePayload<ExtractRoleIncludeDeleteArgs<T>>> : RoleClient<Role>;
    update<T extends RoleUpdateArgs>(args: Subset<T, RoleUpdateArgs>): T extends RoleUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends RoleSelectUpdateArgs ? Promise<RoleGetSelectPayload<ExtractRoleSelectUpdateArgs<T>>> : T extends RoleIncludeUpdateArgs ? Promise<RoleGetIncludePayload<ExtractRoleIncludeUpdateArgs<T>>> : RoleClient<Role>;
    deleteMany<T extends RoleDeleteManyArgs>(args: Subset<T, RoleDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends RoleUpdateManyArgs>(args: Subset<T, RoleUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends RoleUpsertArgs>(args: Subset<T, RoleUpsertArgs>): T extends RoleUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends RoleSelectUpsertArgs ? Promise<RoleGetSelectPayload<ExtractRoleSelectUpsertArgs<T>>> : T extends RoleIncludeUpsertArgs ? Promise<RoleGetIncludePayload<ExtractRoleIncludeUpsertArgs<T>>> : RoleClient<Role>;
    count(): Promise<number>;
}
export declare class RoleClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    permissions<T extends FindManyPermissionArgs = {}>(args?: Subset<T, FindManyPermissionArgs>): T extends FindManyPermissionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPermissionSelectArgs ? Promise<Array<PermissionGetSelectPayload<ExtractFindManyPermissionSelectArgs<T>>>> : T extends FindManyPermissionIncludeArgs ? Promise<Array<PermissionGetIncludePayload<ExtractFindManyPermissionIncludeArgs<T>>>> : Promise<Array<Permission>>;
    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Role findOne
 */
export declare type FindOneRoleArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
    where: RoleWhereUniqueInput;
};
export declare type FindOneRoleArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
    where: RoleWhereUniqueInput;
};
export declare type FindOneRoleSelectArgs = {
    select: RoleSelect;
    where: RoleWhereUniqueInput;
};
export declare type FindOneRoleSelectArgsOptional = {
    select?: RoleSelect | null;
    where: RoleWhereUniqueInput;
};
export declare type FindOneRoleIncludeArgs = {
    include: RoleInclude;
    where: RoleWhereUniqueInput;
};
export declare type FindOneRoleIncludeArgsOptional = {
    include?: RoleInclude | null;
    where: RoleWhereUniqueInput;
};
export declare type ExtractFindOneRoleSelectArgs<S extends undefined | boolean | FindOneRoleSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneRoleSelectArgs ? S['select'] : true;
export declare type ExtractFindOneRoleIncludeArgs<S extends undefined | boolean | FindOneRoleIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneRoleIncludeArgs ? S['include'] : true;
/**
 * Role findMany
 */
export declare type FindManyRoleArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
    where?: RoleWhereInput | null;
    orderBy?: RoleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRoleArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
    where?: RoleWhereInput | null;
    orderBy?: RoleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRoleSelectArgs = {
    select: RoleSelect;
    where?: RoleWhereInput | null;
    orderBy?: RoleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRoleSelectArgsOptional = {
    select?: RoleSelect | null;
    where?: RoleWhereInput | null;
    orderBy?: RoleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRoleIncludeArgs = {
    include: RoleInclude;
    where?: RoleWhereInput | null;
    orderBy?: RoleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRoleIncludeArgsOptional = {
    include?: RoleInclude | null;
    where?: RoleWhereInput | null;
    orderBy?: RoleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyRoleSelectArgs<S extends undefined | boolean | FindManyRoleSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyRoleSelectArgs ? S['select'] : true;
export declare type ExtractFindManyRoleIncludeArgs<S extends undefined | boolean | FindManyRoleIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyRoleIncludeArgs ? S['include'] : true;
/**
 * Role create
 */
export declare type RoleCreateArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
    data: RoleCreateInput;
};
export declare type RoleCreateArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
    data: RoleCreateInput;
};
export declare type RoleSelectCreateArgs = {
    select: RoleSelect;
    data: RoleCreateInput;
};
export declare type RoleSelectCreateArgsOptional = {
    select?: RoleSelect | null;
    data: RoleCreateInput;
};
export declare type RoleIncludeCreateArgs = {
    include: RoleInclude;
    data: RoleCreateInput;
};
export declare type RoleIncludeCreateArgsOptional = {
    include?: RoleInclude | null;
    data: RoleCreateInput;
};
export declare type ExtractRoleSelectCreateArgs<S extends undefined | boolean | RoleSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleSelectCreateArgs ? S['select'] : true;
export declare type ExtractRoleIncludeCreateArgs<S extends undefined | boolean | RoleIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleIncludeCreateArgs ? S['include'] : true;
/**
 * Role update
 */
export declare type RoleUpdateArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
};
export declare type RoleUpdateArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
};
export declare type RoleSelectUpdateArgs = {
    select: RoleSelect;
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
};
export declare type RoleSelectUpdateArgsOptional = {
    select?: RoleSelect | null;
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
};
export declare type RoleIncludeUpdateArgs = {
    include: RoleInclude;
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
};
export declare type RoleIncludeUpdateArgsOptional = {
    include?: RoleInclude | null;
    data: RoleUpdateInput;
    where: RoleWhereUniqueInput;
};
export declare type ExtractRoleSelectUpdateArgs<S extends undefined | boolean | RoleSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleSelectUpdateArgs ? S['select'] : true;
export declare type ExtractRoleIncludeUpdateArgs<S extends undefined | boolean | RoleIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleIncludeUpdateArgs ? S['include'] : true;
/**
 * Role updateMany
 */
export declare type RoleUpdateManyArgs = {
    data: RoleUpdateManyMutationInput;
    where?: RoleWhereInput | null;
};
/**
 * Role upsert
 */
export declare type RoleUpsertArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
    where: RoleWhereUniqueInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
};
export declare type RoleUpsertArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
    where: RoleWhereUniqueInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
};
export declare type RoleSelectUpsertArgs = {
    select: RoleSelect;
    where: RoleWhereUniqueInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
};
export declare type RoleSelectUpsertArgsOptional = {
    select?: RoleSelect | null;
    where: RoleWhereUniqueInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
};
export declare type RoleIncludeUpsertArgs = {
    include: RoleInclude;
    where: RoleWhereUniqueInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
};
export declare type RoleIncludeUpsertArgsOptional = {
    include?: RoleInclude | null;
    where: RoleWhereUniqueInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
};
export declare type ExtractRoleSelectUpsertArgs<S extends undefined | boolean | RoleSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleSelectUpsertArgs ? S['select'] : true;
export declare type ExtractRoleIncludeUpsertArgs<S extends undefined | boolean | RoleIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleIncludeUpsertArgs ? S['include'] : true;
/**
 * Role delete
 */
export declare type RoleDeleteArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
    where: RoleWhereUniqueInput;
};
export declare type RoleDeleteArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
    where: RoleWhereUniqueInput;
};
export declare type RoleSelectDeleteArgs = {
    select: RoleSelect;
    where: RoleWhereUniqueInput;
};
export declare type RoleSelectDeleteArgsOptional = {
    select?: RoleSelect | null;
    where: RoleWhereUniqueInput;
};
export declare type RoleIncludeDeleteArgs = {
    include: RoleInclude;
    where: RoleWhereUniqueInput;
};
export declare type RoleIncludeDeleteArgsOptional = {
    include?: RoleInclude | null;
    where: RoleWhereUniqueInput;
};
export declare type ExtractRoleSelectDeleteArgs<S extends undefined | boolean | RoleSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleSelectDeleteArgs ? S['select'] : true;
export declare type ExtractRoleIncludeDeleteArgs<S extends undefined | boolean | RoleIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleIncludeDeleteArgs ? S['include'] : true;
/**
 * Role deleteMany
 */
export declare type RoleDeleteManyArgs = {
    where?: RoleWhereInput | null;
};
/**
 * Role without action
 */
export declare type RoleArgs = {
    select?: RoleSelect | null;
    include?: RoleInclude | null;
};
export declare type RoleArgsRequired = {
    select: RoleSelect;
    include: RoleInclude;
};
export declare type RoleSelectArgs = {
    select: RoleSelect;
};
export declare type RoleSelectArgsOptional = {
    select?: RoleSelect | null;
};
export declare type RoleIncludeArgs = {
    include: RoleInclude;
};
export declare type RoleIncludeArgsOptional = {
    include?: RoleInclude | null;
};
export declare type ExtractRoleSelectArgs<S extends undefined | boolean | RoleSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleSelectArgs ? S['select'] : true;
export declare type ExtractRoleIncludeArgs<S extends undefined | boolean | RoleIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RoleIncludeArgs ? S['include'] : true;
/**
 * Model User
 */
export declare type User = {
    id: string;
    email: string | null;
    name: string | null;
    nickname: string | null;
    avatarUrl: string;
};
export declare type UserScalars = 'id' | 'email' | 'name' | 'nickname' | 'avatarUrl';
export declare type UserSelect = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    nickname?: boolean;
    avatarUrl?: boolean;
    posts?: boolean | FindManyPostSelectArgsOptional;
    messages?: boolean | FindManyMessageSelectArgsOptional;
    roles?: boolean | FindManyRoleSelectArgsOptional;
    permissions?: boolean | FindManyPermissionSelectArgsOptional;
};
export declare type UserInclude = {
    posts?: boolean | FindManyPostIncludeArgsOptional;
    messages?: boolean | FindManyMessageIncludeArgsOptional;
    roles?: boolean | FindManyRoleIncludeArgsOptional;
    permissions?: boolean | FindManyPermissionIncludeArgsOptional;
};
declare type UserDefault = {
    id: true;
    email: true;
    name: true;
    nickname: true;
    avatarUrl: true;
};
declare type UserGetSelectPayload<S extends boolean | UserSelect> = S extends true ? User : S extends UserSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends UserScalars ? User[P] : P extends 'posts' ? Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<S[P]>>> : P extends 'messages' ? Array<MessageGetSelectPayload<ExtractFindManyMessageSelectArgs<S[P]>>> : P extends 'roles' ? Array<RoleGetSelectPayload<ExtractFindManyRoleSelectArgs<S[P]>>> : P extends 'permissions' ? Array<PermissionGetSelectPayload<ExtractFindManyPermissionSelectArgs<S[P]>>> : never;
} : never;
declare type UserGetIncludePayload<S extends boolean | UserInclude> = S extends true ? User : S extends UserInclude ? {
    [P in CleanupNever<MergeTruthyValues<UserDefault, S>>]: P extends UserScalars ? User[P] : P extends 'posts' ? Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<S[P]>>> : P extends 'messages' ? Array<MessageGetIncludePayload<ExtractFindManyMessageIncludeArgs<S[P]>>> : P extends 'roles' ? Array<RoleGetIncludePayload<ExtractFindManyRoleIncludeArgs<S[P]>>> : P extends 'permissions' ? Array<PermissionGetIncludePayload<ExtractFindManyPermissionIncludeArgs<S[P]>>> : never;
} : never;
export interface UserDelegate {
    <T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneUserSelectArgs ? Promise<UserGetSelectPayload<ExtractFindOneUserSelectArgs<T>> | null> : T extends FindOneUserIncludeArgs ? Promise<UserGetIncludePayload<ExtractFindOneUserIncludeArgs<T>> | null> : UserClient<User | null>;
    findMany<T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>): T extends UserCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectCreateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectCreateArgs<T>>> : T extends UserIncludeCreateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeCreateArgs<T>>> : UserClient<User>;
    delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>): T extends UserDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectDeleteArgs ? Promise<UserGetSelectPayload<ExtractUserSelectDeleteArgs<T>>> : T extends UserIncludeDeleteArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeDeleteArgs<T>>> : UserClient<User>;
    update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>): T extends UserUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpdateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpdateArgs<T>>> : T extends UserIncludeUpdateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpdateArgs<T>>> : UserClient<User>;
    deleteMany<T extends UserDeleteManyArgs>(args: Subset<T, UserDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Subset<T, UserUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends UserUpsertArgs>(args: Subset<T, UserUpsertArgs>): T extends UserUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpsertArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpsertArgs<T>>> : T extends UserIncludeUpsertArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpsertArgs<T>>> : UserClient<User>;
    count(): Promise<number>;
}
export declare class UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    messages<T extends FindManyMessageArgs = {}>(args?: Subset<T, FindManyMessageArgs>): T extends FindManyMessageArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyMessageSelectArgs ? Promise<Array<MessageGetSelectPayload<ExtractFindManyMessageSelectArgs<T>>>> : T extends FindManyMessageIncludeArgs ? Promise<Array<MessageGetIncludePayload<ExtractFindManyMessageIncludeArgs<T>>>> : Promise<Array<Message>>;
    roles<T extends FindManyRoleArgs = {}>(args?: Subset<T, FindManyRoleArgs>): T extends FindManyRoleArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRoleSelectArgs ? Promise<Array<RoleGetSelectPayload<ExtractFindManyRoleSelectArgs<T>>>> : T extends FindManyRoleIncludeArgs ? Promise<Array<RoleGetIncludePayload<ExtractFindManyRoleIncludeArgs<T>>>> : Promise<Array<Role>>;
    permissions<T extends FindManyPermissionArgs = {}>(args?: Subset<T, FindManyPermissionArgs>): T extends FindManyPermissionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPermissionSelectArgs ? Promise<Array<PermissionGetSelectPayload<ExtractFindManyPermissionSelectArgs<T>>>> : T extends FindManyPermissionIncludeArgs ? Promise<Array<PermissionGetIncludePayload<ExtractFindManyPermissionIncludeArgs<T>>>> : Promise<Array<Permission>>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * User findOne
 */
export declare type FindOneUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractFindOneUserSelectArgs<S extends undefined | boolean | FindOneUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserSelectArgs ? S['select'] : true;
export declare type ExtractFindOneUserIncludeArgs<S extends undefined | boolean | FindOneUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserIncludeArgs ? S['include'] : true;
/**
 * User findMany
 */
export declare type FindManyUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgs = {
    select: UserSelect;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgsOptional = {
    select?: UserSelect | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgs = {
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyUserSelectArgs<S extends undefined | boolean | FindManyUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserSelectArgs ? S['select'] : true;
export declare type ExtractFindManyUserIncludeArgs<S extends undefined | boolean | FindManyUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserIncludeArgs ? S['include'] : true;
/**
 * User create
 */
export declare type UserCreateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type UserCreateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgs = {
    select: UserSelect;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgsOptional = {
    select?: UserSelect | null;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgs = {
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgsOptional = {
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type ExtractUserSelectCreateArgs<S extends undefined | boolean | UserSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectCreateArgs ? S['select'] : true;
export declare type ExtractUserIncludeCreateArgs<S extends undefined | boolean | UserIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeCreateArgs ? S['include'] : true;
/**
 * User update
 */
export declare type UserUpdateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgs = {
    select: UserSelect;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgsOptional = {
    select?: UserSelect | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgs = {
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgsOptional = {
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectUpdateArgs<S extends undefined | boolean | UserSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpdateArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpdateArgs<S extends undefined | boolean | UserIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpdateArgs ? S['include'] : true;
/**
 * User updateMany
 */
export declare type UserUpdateManyArgs = {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput | null;
};
/**
 * User upsert
 */
export declare type UserUpsertArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserUpsertArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type ExtractUserSelectUpsertArgs<S extends undefined | boolean | UserSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpsertArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpsertArgs<S extends undefined | boolean | UserIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpsertArgs ? S['include'] : true;
/**
 * User delete
 */
export declare type UserDeleteArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type UserDeleteArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectDeleteArgs<S extends undefined | boolean | UserSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectDeleteArgs ? S['select'] : true;
export declare type ExtractUserIncludeDeleteArgs<S extends undefined | boolean | UserIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeDeleteArgs ? S['include'] : true;
/**
 * User deleteMany
 */
export declare type UserDeleteManyArgs = {
    where?: UserWhereInput | null;
};
/**
 * User without action
 */
export declare type UserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
};
export declare type UserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
};
export declare type UserSelectArgs = {
    select: UserSelect;
};
export declare type UserSelectArgsOptional = {
    select?: UserSelect | null;
};
export declare type UserIncludeArgs = {
    include: UserInclude;
};
export declare type UserIncludeArgsOptional = {
    include?: UserInclude | null;
};
export declare type ExtractUserSelectArgs<S extends undefined | boolean | UserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectArgs ? S['select'] : true;
export declare type ExtractUserIncludeArgs<S extends undefined | boolean | UserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeArgs ? S['include'] : true;
/**
 * Model Post
 */
export declare type Post = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    content: string | null;
};
export declare type PostScalars = 'id' | 'createdAt' | 'updatedAt' | 'published' | 'title' | 'content';
export declare type PostSelect = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    author?: boolean | UserSelectArgsOptional;
};
export declare type PostInclude = {
    author?: boolean | UserIncludeArgsOptional;
};
declare type PostDefault = {
    id: true;
    createdAt: true;
    updatedAt: true;
    published: true;
    title: true;
    content: true;
};
declare type PostGetSelectPayload<S extends boolean | PostSelect> = S extends true ? Post : S extends PostSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends PostScalars ? Post[P] : P extends 'author' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> | null : never;
} : never;
declare type PostGetIncludePayload<S extends boolean | PostInclude> = S extends true ? Post : S extends PostInclude ? {
    [P in CleanupNever<MergeTruthyValues<PostDefault, S>>]: P extends PostScalars ? Post[P] : P extends 'author' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> | null : never;
} : never;
export interface PostDelegate {
    <T extends FindManyPostArgs>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    findOne<T extends FindOnePostArgs>(args: Subset<T, FindOnePostArgs>): T extends FindOnePostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOnePostSelectArgs ? Promise<PostGetSelectPayload<ExtractFindOnePostSelectArgs<T>> | null> : T extends FindOnePostIncludeArgs ? Promise<PostGetIncludePayload<ExtractFindOnePostIncludeArgs<T>> | null> : PostClient<Post | null>;
    findMany<T extends FindManyPostArgs>(args?: Subset<T, FindManyPostArgs>): T extends FindManyPostArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPostSelectArgs ? Promise<Array<PostGetSelectPayload<ExtractFindManyPostSelectArgs<T>>>> : T extends FindManyPostIncludeArgs ? Promise<Array<PostGetIncludePayload<ExtractFindManyPostIncludeArgs<T>>>> : Promise<Array<Post>>;
    create<T extends PostCreateArgs>(args: Subset<T, PostCreateArgs>): T extends PostCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectCreateArgs ? Promise<PostGetSelectPayload<ExtractPostSelectCreateArgs<T>>> : T extends PostIncludeCreateArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeCreateArgs<T>>> : PostClient<Post>;
    delete<T extends PostDeleteArgs>(args: Subset<T, PostDeleteArgs>): T extends PostDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectDeleteArgs ? Promise<PostGetSelectPayload<ExtractPostSelectDeleteArgs<T>>> : T extends PostIncludeDeleteArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeDeleteArgs<T>>> : PostClient<Post>;
    update<T extends PostUpdateArgs>(args: Subset<T, PostUpdateArgs>): T extends PostUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectUpdateArgs ? Promise<PostGetSelectPayload<ExtractPostSelectUpdateArgs<T>>> : T extends PostIncludeUpdateArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeUpdateArgs<T>>> : PostClient<Post>;
    deleteMany<T extends PostDeleteManyArgs>(args: Subset<T, PostDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends PostUpdateManyArgs>(args: Subset<T, PostUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends PostUpsertArgs>(args: Subset<T, PostUpsertArgs>): T extends PostUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends PostSelectUpsertArgs ? Promise<PostGetSelectPayload<ExtractPostSelectUpsertArgs<T>>> : T extends PostIncludeUpsertArgs ? Promise<PostGetIncludePayload<ExtractPostIncludeUpsertArgs<T>>> : PostClient<Post>;
    count(): Promise<number>;
}
export declare class PostClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Post findOne
 */
export declare type FindOnePostArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostSelectArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostSelectArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostIncludeArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type FindOnePostIncludeArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type ExtractFindOnePostSelectArgs<S extends undefined | boolean | FindOnePostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePostSelectArgs ? S['select'] : true;
export declare type ExtractFindOnePostIncludeArgs<S extends undefined | boolean | FindOnePostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePostIncludeArgs ? S['include'] : true;
/**
 * Post findMany
 */
export declare type FindManyPostArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostSelectArgs = {
    select: PostSelect;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostSelectArgsOptional = {
    select?: PostSelect | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostIncludeArgs = {
    include: PostInclude;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPostIncludeArgsOptional = {
    include?: PostInclude | null;
    where?: PostWhereInput | null;
    orderBy?: PostOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyPostSelectArgs<S extends undefined | boolean | FindManyPostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPostSelectArgs ? S['select'] : true;
export declare type ExtractFindManyPostIncludeArgs<S extends undefined | boolean | FindManyPostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPostIncludeArgs ? S['include'] : true;
/**
 * Post create
 */
export declare type PostCreateArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    data: PostCreateInput;
};
export declare type PostCreateArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    data: PostCreateInput;
};
export declare type PostSelectCreateArgs = {
    select: PostSelect;
    data: PostCreateInput;
};
export declare type PostSelectCreateArgsOptional = {
    select?: PostSelect | null;
    data: PostCreateInput;
};
export declare type PostIncludeCreateArgs = {
    include: PostInclude;
    data: PostCreateInput;
};
export declare type PostIncludeCreateArgsOptional = {
    include?: PostInclude | null;
    data: PostCreateInput;
};
export declare type ExtractPostSelectCreateArgs<S extends undefined | boolean | PostSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectCreateArgs ? S['select'] : true;
export declare type ExtractPostIncludeCreateArgs<S extends undefined | boolean | PostIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeCreateArgs ? S['include'] : true;
/**
 * Post update
 */
export declare type PostUpdateArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostUpdateArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostSelectUpdateArgs = {
    select: PostSelect;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostSelectUpdateArgsOptional = {
    select?: PostSelect | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeUpdateArgs = {
    include: PostInclude;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeUpdateArgsOptional = {
    include?: PostInclude | null;
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
};
export declare type ExtractPostSelectUpdateArgs<S extends undefined | boolean | PostSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectUpdateArgs ? S['select'] : true;
export declare type ExtractPostIncludeUpdateArgs<S extends undefined | boolean | PostIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeUpdateArgs ? S['include'] : true;
/**
 * Post updateMany
 */
export declare type PostUpdateManyArgs = {
    data: PostUpdateManyMutationInput;
    where?: PostWhereInput | null;
};
/**
 * Post upsert
 */
export declare type PostUpsertArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostUpsertArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostSelectUpsertArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostSelectUpsertArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostIncludeUpsertArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type PostIncludeUpsertArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
};
export declare type ExtractPostSelectUpsertArgs<S extends undefined | boolean | PostSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectUpsertArgs ? S['select'] : true;
export declare type ExtractPostIncludeUpsertArgs<S extends undefined | boolean | PostIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeUpsertArgs ? S['include'] : true;
/**
 * Post delete
 */
export declare type PostDeleteArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type PostDeleteArgsRequired = {
    select: PostSelect;
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type PostSelectDeleteArgs = {
    select: PostSelect;
    where: PostWhereUniqueInput;
};
export declare type PostSelectDeleteArgsOptional = {
    select?: PostSelect | null;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeDeleteArgs = {
    include: PostInclude;
    where: PostWhereUniqueInput;
};
export declare type PostIncludeDeleteArgsOptional = {
    include?: PostInclude | null;
    where: PostWhereUniqueInput;
};
export declare type ExtractPostSelectDeleteArgs<S extends undefined | boolean | PostSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectDeleteArgs ? S['select'] : true;
export declare type ExtractPostIncludeDeleteArgs<S extends undefined | boolean | PostIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeDeleteArgs ? S['include'] : true;
/**
 * Post deleteMany
 */
export declare type PostDeleteManyArgs = {
    where?: PostWhereInput | null;
};
/**
 * Post without action
 */
export declare type PostArgs = {
    select?: PostSelect | null;
    include?: PostInclude | null;
};
export declare type PostArgsRequired = {
    select: PostSelect;
    include: PostInclude;
};
export declare type PostSelectArgs = {
    select: PostSelect;
};
export declare type PostSelectArgsOptional = {
    select?: PostSelect | null;
};
export declare type PostIncludeArgs = {
    include: PostInclude;
};
export declare type PostIncludeArgsOptional = {
    include?: PostInclude | null;
};
export declare type ExtractPostSelectArgs<S extends undefined | boolean | PostSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostSelectArgs ? S['select'] : true;
export declare type ExtractPostIncludeArgs<S extends undefined | boolean | PostIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PostIncludeArgs ? S['include'] : true;
/**
 * Model Message
 */
export declare type Message = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    text: string;
};
export declare type MessageScalars = 'id' | 'createdAt' | 'updatedAt' | 'text';
export declare type MessageSelect = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    text?: boolean;
    author?: boolean | UserSelectArgsOptional;
};
export declare type MessageInclude = {
    author?: boolean | UserIncludeArgsOptional;
};
declare type MessageDefault = {
    id: true;
    createdAt: true;
    updatedAt: true;
    text: true;
};
declare type MessageGetSelectPayload<S extends boolean | MessageSelect> = S extends true ? Message : S extends MessageSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends MessageScalars ? Message[P] : P extends 'author' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
declare type MessageGetIncludePayload<S extends boolean | MessageInclude> = S extends true ? Message : S extends MessageInclude ? {
    [P in CleanupNever<MergeTruthyValues<MessageDefault, S>>]: P extends MessageScalars ? Message[P] : P extends 'author' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface MessageDelegate {
    <T extends FindManyMessageArgs>(args?: Subset<T, FindManyMessageArgs>): T extends FindManyMessageArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyMessageSelectArgs ? Promise<Array<MessageGetSelectPayload<ExtractFindManyMessageSelectArgs<T>>>> : T extends FindManyMessageIncludeArgs ? Promise<Array<MessageGetIncludePayload<ExtractFindManyMessageIncludeArgs<T>>>> : Promise<Array<Message>>;
    findOne<T extends FindOneMessageArgs>(args: Subset<T, FindOneMessageArgs>): T extends FindOneMessageArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneMessageSelectArgs ? Promise<MessageGetSelectPayload<ExtractFindOneMessageSelectArgs<T>> | null> : T extends FindOneMessageIncludeArgs ? Promise<MessageGetIncludePayload<ExtractFindOneMessageIncludeArgs<T>> | null> : MessageClient<Message | null>;
    findMany<T extends FindManyMessageArgs>(args?: Subset<T, FindManyMessageArgs>): T extends FindManyMessageArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyMessageSelectArgs ? Promise<Array<MessageGetSelectPayload<ExtractFindManyMessageSelectArgs<T>>>> : T extends FindManyMessageIncludeArgs ? Promise<Array<MessageGetIncludePayload<ExtractFindManyMessageIncludeArgs<T>>>> : Promise<Array<Message>>;
    create<T extends MessageCreateArgs>(args: Subset<T, MessageCreateArgs>): T extends MessageCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends MessageSelectCreateArgs ? Promise<MessageGetSelectPayload<ExtractMessageSelectCreateArgs<T>>> : T extends MessageIncludeCreateArgs ? Promise<MessageGetIncludePayload<ExtractMessageIncludeCreateArgs<T>>> : MessageClient<Message>;
    delete<T extends MessageDeleteArgs>(args: Subset<T, MessageDeleteArgs>): T extends MessageDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends MessageSelectDeleteArgs ? Promise<MessageGetSelectPayload<ExtractMessageSelectDeleteArgs<T>>> : T extends MessageIncludeDeleteArgs ? Promise<MessageGetIncludePayload<ExtractMessageIncludeDeleteArgs<T>>> : MessageClient<Message>;
    update<T extends MessageUpdateArgs>(args: Subset<T, MessageUpdateArgs>): T extends MessageUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends MessageSelectUpdateArgs ? Promise<MessageGetSelectPayload<ExtractMessageSelectUpdateArgs<T>>> : T extends MessageIncludeUpdateArgs ? Promise<MessageGetIncludePayload<ExtractMessageIncludeUpdateArgs<T>>> : MessageClient<Message>;
    deleteMany<T extends MessageDeleteManyArgs>(args: Subset<T, MessageDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends MessageUpdateManyArgs>(args: Subset<T, MessageUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends MessageUpsertArgs>(args: Subset<T, MessageUpsertArgs>): T extends MessageUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends MessageSelectUpsertArgs ? Promise<MessageGetSelectPayload<ExtractMessageSelectUpsertArgs<T>>> : T extends MessageIncludeUpsertArgs ? Promise<MessageGetIncludePayload<ExtractMessageIncludeUpsertArgs<T>>> : MessageClient<Message>;
    count(): Promise<number>;
}
export declare class MessageClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Message findOne
 */
export declare type FindOneMessageArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
    where: MessageWhereUniqueInput;
};
export declare type FindOneMessageArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
    where: MessageWhereUniqueInput;
};
export declare type FindOneMessageSelectArgs = {
    select: MessageSelect;
    where: MessageWhereUniqueInput;
};
export declare type FindOneMessageSelectArgsOptional = {
    select?: MessageSelect | null;
    where: MessageWhereUniqueInput;
};
export declare type FindOneMessageIncludeArgs = {
    include: MessageInclude;
    where: MessageWhereUniqueInput;
};
export declare type FindOneMessageIncludeArgsOptional = {
    include?: MessageInclude | null;
    where: MessageWhereUniqueInput;
};
export declare type ExtractFindOneMessageSelectArgs<S extends undefined | boolean | FindOneMessageSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneMessageSelectArgs ? S['select'] : true;
export declare type ExtractFindOneMessageIncludeArgs<S extends undefined | boolean | FindOneMessageIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneMessageIncludeArgs ? S['include'] : true;
/**
 * Message findMany
 */
export declare type FindManyMessageArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
    where?: MessageWhereInput | null;
    orderBy?: MessageOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyMessageArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
    where?: MessageWhereInput | null;
    orderBy?: MessageOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyMessageSelectArgs = {
    select: MessageSelect;
    where?: MessageWhereInput | null;
    orderBy?: MessageOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyMessageSelectArgsOptional = {
    select?: MessageSelect | null;
    where?: MessageWhereInput | null;
    orderBy?: MessageOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyMessageIncludeArgs = {
    include: MessageInclude;
    where?: MessageWhereInput | null;
    orderBy?: MessageOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyMessageIncludeArgsOptional = {
    include?: MessageInclude | null;
    where?: MessageWhereInput | null;
    orderBy?: MessageOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyMessageSelectArgs<S extends undefined | boolean | FindManyMessageSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyMessageSelectArgs ? S['select'] : true;
export declare type ExtractFindManyMessageIncludeArgs<S extends undefined | boolean | FindManyMessageIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyMessageIncludeArgs ? S['include'] : true;
/**
 * Message create
 */
export declare type MessageCreateArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
    data: MessageCreateInput;
};
export declare type MessageCreateArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
    data: MessageCreateInput;
};
export declare type MessageSelectCreateArgs = {
    select: MessageSelect;
    data: MessageCreateInput;
};
export declare type MessageSelectCreateArgsOptional = {
    select?: MessageSelect | null;
    data: MessageCreateInput;
};
export declare type MessageIncludeCreateArgs = {
    include: MessageInclude;
    data: MessageCreateInput;
};
export declare type MessageIncludeCreateArgsOptional = {
    include?: MessageInclude | null;
    data: MessageCreateInput;
};
export declare type ExtractMessageSelectCreateArgs<S extends undefined | boolean | MessageSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageSelectCreateArgs ? S['select'] : true;
export declare type ExtractMessageIncludeCreateArgs<S extends undefined | boolean | MessageIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageIncludeCreateArgs ? S['include'] : true;
/**
 * Message update
 */
export declare type MessageUpdateArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
    data: MessageUpdateInput;
    where: MessageWhereUniqueInput;
};
export declare type MessageUpdateArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
    data: MessageUpdateInput;
    where: MessageWhereUniqueInput;
};
export declare type MessageSelectUpdateArgs = {
    select: MessageSelect;
    data: MessageUpdateInput;
    where: MessageWhereUniqueInput;
};
export declare type MessageSelectUpdateArgsOptional = {
    select?: MessageSelect | null;
    data: MessageUpdateInput;
    where: MessageWhereUniqueInput;
};
export declare type MessageIncludeUpdateArgs = {
    include: MessageInclude;
    data: MessageUpdateInput;
    where: MessageWhereUniqueInput;
};
export declare type MessageIncludeUpdateArgsOptional = {
    include?: MessageInclude | null;
    data: MessageUpdateInput;
    where: MessageWhereUniqueInput;
};
export declare type ExtractMessageSelectUpdateArgs<S extends undefined | boolean | MessageSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageSelectUpdateArgs ? S['select'] : true;
export declare type ExtractMessageIncludeUpdateArgs<S extends undefined | boolean | MessageIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageIncludeUpdateArgs ? S['include'] : true;
/**
 * Message updateMany
 */
export declare type MessageUpdateManyArgs = {
    data: MessageUpdateManyMutationInput;
    where?: MessageWhereInput | null;
};
/**
 * Message upsert
 */
export declare type MessageUpsertArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
    where: MessageWhereUniqueInput;
    create: MessageCreateInput;
    update: MessageUpdateInput;
};
export declare type MessageUpsertArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
    where: MessageWhereUniqueInput;
    create: MessageCreateInput;
    update: MessageUpdateInput;
};
export declare type MessageSelectUpsertArgs = {
    select: MessageSelect;
    where: MessageWhereUniqueInput;
    create: MessageCreateInput;
    update: MessageUpdateInput;
};
export declare type MessageSelectUpsertArgsOptional = {
    select?: MessageSelect | null;
    where: MessageWhereUniqueInput;
    create: MessageCreateInput;
    update: MessageUpdateInput;
};
export declare type MessageIncludeUpsertArgs = {
    include: MessageInclude;
    where: MessageWhereUniqueInput;
    create: MessageCreateInput;
    update: MessageUpdateInput;
};
export declare type MessageIncludeUpsertArgsOptional = {
    include?: MessageInclude | null;
    where: MessageWhereUniqueInput;
    create: MessageCreateInput;
    update: MessageUpdateInput;
};
export declare type ExtractMessageSelectUpsertArgs<S extends undefined | boolean | MessageSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageSelectUpsertArgs ? S['select'] : true;
export declare type ExtractMessageIncludeUpsertArgs<S extends undefined | boolean | MessageIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageIncludeUpsertArgs ? S['include'] : true;
/**
 * Message delete
 */
export declare type MessageDeleteArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
    where: MessageWhereUniqueInput;
};
export declare type MessageDeleteArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
    where: MessageWhereUniqueInput;
};
export declare type MessageSelectDeleteArgs = {
    select: MessageSelect;
    where: MessageWhereUniqueInput;
};
export declare type MessageSelectDeleteArgsOptional = {
    select?: MessageSelect | null;
    where: MessageWhereUniqueInput;
};
export declare type MessageIncludeDeleteArgs = {
    include: MessageInclude;
    where: MessageWhereUniqueInput;
};
export declare type MessageIncludeDeleteArgsOptional = {
    include?: MessageInclude | null;
    where: MessageWhereUniqueInput;
};
export declare type ExtractMessageSelectDeleteArgs<S extends undefined | boolean | MessageSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageSelectDeleteArgs ? S['select'] : true;
export declare type ExtractMessageIncludeDeleteArgs<S extends undefined | boolean | MessageIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageIncludeDeleteArgs ? S['include'] : true;
/**
 * Message deleteMany
 */
export declare type MessageDeleteManyArgs = {
    where?: MessageWhereInput | null;
};
/**
 * Message without action
 */
export declare type MessageArgs = {
    select?: MessageSelect | null;
    include?: MessageInclude | null;
};
export declare type MessageArgsRequired = {
    select: MessageSelect;
    include: MessageInclude;
};
export declare type MessageSelectArgs = {
    select: MessageSelect;
};
export declare type MessageSelectArgsOptional = {
    select?: MessageSelect | null;
};
export declare type MessageIncludeArgs = {
    include: MessageInclude;
};
export declare type MessageIncludeArgsOptional = {
    include?: MessageInclude | null;
};
export declare type ExtractMessageSelectArgs<S extends undefined | boolean | MessageSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageSelectArgs ? S['select'] : true;
export declare type ExtractMessageIncludeArgs<S extends undefined | boolean | MessageIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends MessageIncludeArgs ? S['include'] : true;
/**
 * Deep Input Types
 */
export declare type PostWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    published?: boolean | BooleanFilter | null;
    title?: string | StringFilter | null;
    content?: string | NullableStringFilter | null | null;
    AND?: Enumerable<PostWhereInput> | null;
    OR?: Enumerable<PostWhereInput> | null;
    NOT?: Enumerable<PostWhereInput> | null;
    author?: UserWhereInput | null;
};
export declare type MessageWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    text?: string | StringFilter | null;
    AND?: Enumerable<MessageWhereInput> | null;
    OR?: Enumerable<MessageWhereInput> | null;
    NOT?: Enumerable<MessageWhereInput> | null;
    author?: UserWhereInput | null;
};
export declare type UserWhereInput = {
    id?: string | StringFilter | null;
    email?: string | NullableStringFilter | null | null;
    name?: string | NullableStringFilter | null | null;
    nickname?: string | NullableStringFilter | null | null;
    avatarUrl?: string | StringFilter | null;
    posts?: PostFilter | null;
    messages?: MessageFilter | null;
    roles?: RoleFilter | null;
    permissions?: PermissionFilter | null;
    AND?: Enumerable<UserWhereInput> | null;
    OR?: Enumerable<UserWhereInput> | null;
    NOT?: Enumerable<UserWhereInput> | null;
};
export declare type RoleWhereInput = {
    name?: string | StringFilter | null;
    description?: string | StringFilter | null;
    permissions?: PermissionFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    AND?: Enumerable<RoleWhereInput> | null;
    OR?: Enumerable<RoleWhereInput> | null;
    NOT?: Enumerable<RoleWhereInput> | null;
    user?: UserWhereInput | null;
};
export declare type PermissionWhereInput = {
    name?: string | StringFilter | null;
    description?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    AND?: Enumerable<PermissionWhereInput> | null;
    OR?: Enumerable<PermissionWhereInput> | null;
    NOT?: Enumerable<PermissionWhereInput> | null;
    role?: RoleWhereInput | null;
    user?: UserWhereInput | null;
};
export declare type PermissionWhereUniqueInput = {
    name?: string | null;
};
export declare type RoleWhereUniqueInput = {
    name?: string | null;
};
export declare type UserWhereUniqueInput = {
    id?: string | null;
    email?: string | null;
};
export declare type PostWhereUniqueInput = {
    id?: string | null;
};
export declare type MessageWhereUniqueInput = {
    id?: string | null;
};
export declare type PostCreateWithoutAuthorInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title: string;
    content?: string | null;
};
export declare type PostCreateManyWithoutPostsInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput> | null;
    connect?: Enumerable<PostWhereUniqueInput> | null;
};
export declare type MessageCreateWithoutAuthorInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    text: string;
};
export declare type MessageCreateManyWithoutMessagesInput = {
    create?: Enumerable<MessageCreateWithoutAuthorInput> | null;
    connect?: Enumerable<MessageWhereUniqueInput> | null;
};
export declare type PermissionCreateWithoutUserInput = {
    name?: string | null;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    role?: RoleCreateOneWithoutRoleInput | null;
};
export declare type PermissionCreateManyWithoutPermissionsInput = {
    create?: Enumerable<PermissionCreateWithoutUserInput> | null;
    connect?: Enumerable<PermissionWhereUniqueInput> | null;
};
export declare type UserCreateWithoutRolesInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl: string;
    posts?: PostCreateManyWithoutPostsInput | null;
    messages?: MessageCreateManyWithoutMessagesInput | null;
    permissions?: PermissionCreateManyWithoutPermissionsInput | null;
};
export declare type UserCreateOneWithoutUserInput = {
    create?: UserCreateWithoutRolesInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type RoleCreateWithoutPermissionsInput = {
    name?: string | null;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    user?: UserCreateOneWithoutUserInput | null;
};
export declare type RoleCreateOneWithoutRoleInput = {
    create?: RoleCreateWithoutPermissionsInput | null;
    connect?: RoleWhereUniqueInput | null;
};
export declare type PermissionCreateInput = {
    name?: string | null;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    role?: RoleCreateOneWithoutRoleInput | null;
    user?: UserCreateOneWithoutUserInput | null;
};
export declare type PostUpdateWithoutAuthorDataInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
};
export declare type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    data: PostUpdateWithoutAuthorDataInput;
};
export declare type PostScalarWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    published?: boolean | BooleanFilter | null;
    title?: string | StringFilter | null;
    content?: string | NullableStringFilter | null | null;
    AND?: Enumerable<PostScalarWhereInput> | null;
    OR?: Enumerable<PostScalarWhereInput> | null;
    NOT?: Enumerable<PostScalarWhereInput> | null;
};
export declare type PostUpdateManyDataInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
};
export declare type PostUpdateManyWithWhereNestedInput = {
    where: PostScalarWhereInput;
    data: PostUpdateManyDataInput;
};
export declare type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput;
    update: PostUpdateWithoutAuthorDataInput;
    create: PostCreateWithoutAuthorInput;
};
export declare type PostUpdateManyWithoutAuthorInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput> | null;
    connect?: Enumerable<PostWhereUniqueInput> | null;
    set?: Enumerable<PostWhereUniqueInput> | null;
    disconnect?: Enumerable<PostWhereUniqueInput> | null;
    delete?: Enumerable<PostWhereUniqueInput> | null;
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput> | null;
    updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<PostScalarWhereInput> | null;
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput> | null;
};
export declare type MessageUpdateWithoutAuthorDataInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    text?: string | null;
};
export declare type MessageUpdateWithWhereUniqueWithoutAuthorInput = {
    where: MessageWhereUniqueInput;
    data: MessageUpdateWithoutAuthorDataInput;
};
export declare type MessageScalarWhereInput = {
    id?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    text?: string | StringFilter | null;
    AND?: Enumerable<MessageScalarWhereInput> | null;
    OR?: Enumerable<MessageScalarWhereInput> | null;
    NOT?: Enumerable<MessageScalarWhereInput> | null;
};
export declare type MessageUpdateManyDataInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    text?: string | null;
};
export declare type MessageUpdateManyWithWhereNestedInput = {
    where: MessageScalarWhereInput;
    data: MessageUpdateManyDataInput;
};
export declare type MessageUpsertWithWhereUniqueWithoutAuthorInput = {
    where: MessageWhereUniqueInput;
    update: MessageUpdateWithoutAuthorDataInput;
    create: MessageCreateWithoutAuthorInput;
};
export declare type MessageUpdateManyWithoutAuthorInput = {
    create?: Enumerable<MessageCreateWithoutAuthorInput> | null;
    connect?: Enumerable<MessageWhereUniqueInput> | null;
    set?: Enumerable<MessageWhereUniqueInput> | null;
    disconnect?: Enumerable<MessageWhereUniqueInput> | null;
    delete?: Enumerable<MessageWhereUniqueInput> | null;
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutAuthorInput> | null;
    updateMany?: Enumerable<MessageUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<MessageScalarWhereInput> | null;
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutAuthorInput> | null;
};
export declare type PermissionUpdateWithoutUserDataInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    role?: RoleUpdateOneWithoutPermissionsInput | null;
};
export declare type PermissionUpdateWithWhereUniqueWithoutUserInput = {
    where: PermissionWhereUniqueInput;
    data: PermissionUpdateWithoutUserDataInput;
};
export declare type PermissionScalarWhereInput = {
    name?: string | StringFilter | null;
    description?: string | StringFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    AND?: Enumerable<PermissionScalarWhereInput> | null;
    OR?: Enumerable<PermissionScalarWhereInput> | null;
    NOT?: Enumerable<PermissionScalarWhereInput> | null;
};
export declare type PermissionUpdateManyDataInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export declare type PermissionUpdateManyWithWhereNestedInput = {
    where: PermissionScalarWhereInput;
    data: PermissionUpdateManyDataInput;
};
export declare type PermissionUpsertWithWhereUniqueWithoutUserInput = {
    where: PermissionWhereUniqueInput;
    update: PermissionUpdateWithoutUserDataInput;
    create: PermissionCreateWithoutUserInput;
};
export declare type PermissionUpdateManyWithoutUserInput = {
    create?: Enumerable<PermissionCreateWithoutUserInput> | null;
    connect?: Enumerable<PermissionWhereUniqueInput> | null;
    set?: Enumerable<PermissionWhereUniqueInput> | null;
    disconnect?: Enumerable<PermissionWhereUniqueInput> | null;
    delete?: Enumerable<PermissionWhereUniqueInput> | null;
    update?: Enumerable<PermissionUpdateWithWhereUniqueWithoutUserInput> | null;
    updateMany?: Enumerable<PermissionUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<PermissionScalarWhereInput> | null;
    upsert?: Enumerable<PermissionUpsertWithWhereUniqueWithoutUserInput> | null;
};
export declare type UserUpdateWithoutRolesDataInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl?: string | null;
    posts?: PostUpdateManyWithoutAuthorInput | null;
    messages?: MessageUpdateManyWithoutAuthorInput | null;
    permissions?: PermissionUpdateManyWithoutUserInput | null;
};
export declare type UserUpsertWithoutRolesInput = {
    update: UserUpdateWithoutRolesDataInput;
    create: UserCreateWithoutRolesInput;
};
export declare type UserUpdateOneWithoutRolesInput = {
    create?: UserCreateWithoutRolesInput | null;
    connect?: UserWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: UserUpdateWithoutRolesDataInput | null;
    upsert?: UserUpsertWithoutRolesInput | null;
};
export declare type RoleUpdateWithoutPermissionsDataInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    user?: UserUpdateOneWithoutRolesInput | null;
};
export declare type RoleUpsertWithoutPermissionsInput = {
    update: RoleUpdateWithoutPermissionsDataInput;
    create: RoleCreateWithoutPermissionsInput;
};
export declare type RoleUpdateOneWithoutPermissionsInput = {
    create?: RoleCreateWithoutPermissionsInput | null;
    connect?: RoleWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: RoleUpdateWithoutPermissionsDataInput | null;
    upsert?: RoleUpsertWithoutPermissionsInput | null;
};
export declare type RoleCreateWithoutUserInput = {
    name?: string | null;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    permissions?: PermissionCreateManyWithoutPermissionsInput | null;
};
export declare type RoleCreateManyWithoutRolesInput = {
    create?: Enumerable<RoleCreateWithoutUserInput> | null;
    connect?: Enumerable<RoleWhereUniqueInput> | null;
};
export declare type UserCreateWithoutPermissionsInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl: string;
    posts?: PostCreateManyWithoutPostsInput | null;
    messages?: MessageCreateManyWithoutMessagesInput | null;
    roles?: RoleCreateManyWithoutRolesInput | null;
};
export declare type PermissionCreateWithoutRoleInput = {
    name?: string | null;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    user?: UserCreateOneWithoutUserInput | null;
};
export declare type PermissionUpdateWithoutRoleDataInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    user?: UserUpdateOneWithoutPermissionsInput | null;
};
export declare type PermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: PermissionWhereUniqueInput;
    data: PermissionUpdateWithoutRoleDataInput;
};
export declare type PermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: PermissionWhereUniqueInput;
    update: PermissionUpdateWithoutRoleDataInput;
    create: PermissionCreateWithoutRoleInput;
};
export declare type PermissionUpdateManyWithoutRoleInput = {
    create?: Enumerable<PermissionCreateWithoutRoleInput> | null;
    connect?: Enumerable<PermissionWhereUniqueInput> | null;
    set?: Enumerable<PermissionWhereUniqueInput> | null;
    disconnect?: Enumerable<PermissionWhereUniqueInput> | null;
    delete?: Enumerable<PermissionWhereUniqueInput> | null;
    update?: Enumerable<PermissionUpdateWithWhereUniqueWithoutRoleInput> | null;
    updateMany?: Enumerable<PermissionUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<PermissionScalarWhereInput> | null;
    upsert?: Enumerable<PermissionUpsertWithWhereUniqueWithoutRoleInput> | null;
};
export declare type RoleUpdateWithoutUserDataInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    permissions?: PermissionUpdateManyWithoutRoleInput | null;
};
export declare type RoleUpdateWithWhereUniqueWithoutUserInput = {
    where: RoleWhereUniqueInput;
    data: RoleUpdateWithoutUserDataInput;
};
export declare type RoleScalarWhereInput = {
    name?: string | StringFilter | null;
    description?: string | StringFilter | null;
    permissions?: PermissionFilter | null;
    createdAt?: Date | string | DateTimeFilter | null;
    updatedAt?: Date | string | DateTimeFilter | null;
    AND?: Enumerable<RoleScalarWhereInput> | null;
    OR?: Enumerable<RoleScalarWhereInput> | null;
    NOT?: Enumerable<RoleScalarWhereInput> | null;
};
export declare type RoleUpdateManyDataInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export declare type RoleUpdateManyWithWhereNestedInput = {
    where: RoleScalarWhereInput;
    data: RoleUpdateManyDataInput;
};
export declare type RoleUpsertWithWhereUniqueWithoutUserInput = {
    where: RoleWhereUniqueInput;
    update: RoleUpdateWithoutUserDataInput;
    create: RoleCreateWithoutUserInput;
};
export declare type RoleUpdateManyWithoutUserInput = {
    create?: Enumerable<RoleCreateWithoutUserInput> | null;
    connect?: Enumerable<RoleWhereUniqueInput> | null;
    set?: Enumerable<RoleWhereUniqueInput> | null;
    disconnect?: Enumerable<RoleWhereUniqueInput> | null;
    delete?: Enumerable<RoleWhereUniqueInput> | null;
    update?: Enumerable<RoleUpdateWithWhereUniqueWithoutUserInput> | null;
    updateMany?: Enumerable<RoleUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<RoleScalarWhereInput> | null;
    upsert?: Enumerable<RoleUpsertWithWhereUniqueWithoutUserInput> | null;
};
export declare type UserUpdateWithoutPermissionsDataInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl?: string | null;
    posts?: PostUpdateManyWithoutAuthorInput | null;
    messages?: MessageUpdateManyWithoutAuthorInput | null;
    roles?: RoleUpdateManyWithoutUserInput | null;
};
export declare type UserUpsertWithoutPermissionsInput = {
    update: UserUpdateWithoutPermissionsDataInput;
    create: UserCreateWithoutPermissionsInput;
};
export declare type UserUpdateOneWithoutPermissionsInput = {
    create?: UserCreateWithoutPermissionsInput | null;
    connect?: UserWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: UserUpdateWithoutPermissionsDataInput | null;
    upsert?: UserUpsertWithoutPermissionsInput | null;
};
export declare type PermissionUpdateInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    role?: RoleUpdateOneWithoutPermissionsInput | null;
    user?: UserUpdateOneWithoutPermissionsInput | null;
};
export declare type PermissionUpdateManyMutationInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export declare type RoleCreateInput = {
    name?: string | null;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    permissions?: PermissionCreateManyWithoutPermissionsInput | null;
    user?: UserCreateOneWithoutUserInput | null;
};
export declare type RoleUpdateInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    permissions?: PermissionUpdateManyWithoutRoleInput | null;
    user?: UserUpdateOneWithoutRolesInput | null;
};
export declare type RoleUpdateManyMutationInput = {
    name?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
};
export declare type UserCreateInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl: string;
    posts?: PostCreateManyWithoutPostsInput | null;
    messages?: MessageCreateManyWithoutMessagesInput | null;
    roles?: RoleCreateManyWithoutRolesInput | null;
    permissions?: PermissionCreateManyWithoutPermissionsInput | null;
};
export declare type UserUpdateInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl?: string | null;
    posts?: PostUpdateManyWithoutAuthorInput | null;
    messages?: MessageUpdateManyWithoutAuthorInput | null;
    roles?: RoleUpdateManyWithoutUserInput | null;
    permissions?: PermissionUpdateManyWithoutUserInput | null;
};
export declare type UserUpdateManyMutationInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl?: string | null;
};
export declare type UserCreateWithoutPostsInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl: string;
    messages?: MessageCreateManyWithoutMessagesInput | null;
    roles?: RoleCreateManyWithoutRolesInput | null;
    permissions?: PermissionCreateManyWithoutPermissionsInput | null;
};
export declare type UserCreateOneWithoutAuthorInput = {
    create?: UserCreateWithoutPostsInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type PostCreateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title: string;
    content?: string | null;
    author?: UserCreateOneWithoutAuthorInput | null;
};
export declare type UserUpdateWithoutPostsDataInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl?: string | null;
    messages?: MessageUpdateManyWithoutAuthorInput | null;
    roles?: RoleUpdateManyWithoutUserInput | null;
    permissions?: PermissionUpdateManyWithoutUserInput | null;
};
export declare type UserUpsertWithoutPostsInput = {
    update: UserUpdateWithoutPostsDataInput;
    create: UserCreateWithoutPostsInput;
};
export declare type UserUpdateOneWithoutPostsInput = {
    create?: UserCreateWithoutPostsInput | null;
    connect?: UserWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: UserUpdateWithoutPostsDataInput | null;
    upsert?: UserUpsertWithoutPostsInput | null;
};
export declare type PostUpdateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
    author?: UserUpdateOneWithoutPostsInput | null;
};
export declare type PostUpdateManyMutationInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    published?: boolean | null;
    title?: string | null;
    content?: string | null;
};
export declare type MessageCreateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    text: string;
    author: UserCreateOneWithoutAuthorInput;
};
export declare type UserCreateWithoutMessagesInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl: string;
    posts?: PostCreateManyWithoutPostsInput | null;
    roles?: RoleCreateManyWithoutRolesInput | null;
    permissions?: PermissionCreateManyWithoutPermissionsInput | null;
};
export declare type UserUpdateWithoutMessagesDataInput = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    nickname?: string | null;
    avatarUrl?: string | null;
    posts?: PostUpdateManyWithoutAuthorInput | null;
    roles?: RoleUpdateManyWithoutUserInput | null;
    permissions?: PermissionUpdateManyWithoutUserInput | null;
};
export declare type UserUpsertWithoutMessagesInput = {
    update: UserUpdateWithoutMessagesDataInput;
    create: UserCreateWithoutMessagesInput;
};
export declare type UserUpdateOneRequiredWithoutMessagesInput = {
    create?: UserCreateWithoutMessagesInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutMessagesDataInput | null;
    upsert?: UserUpsertWithoutMessagesInput | null;
};
export declare type MessageUpdateInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    text?: string | null;
    author?: UserUpdateOneRequiredWithoutMessagesInput | null;
};
export declare type MessageUpdateManyMutationInput = {
    id?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    text?: string | null;
};
export declare type StringFilter = {
    equals?: string | null;
    not?: string | StringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type DateTimeFilter = {
    equals?: Date | string | null;
    not?: Date | string | DateTimeFilter | null;
    in?: Enumerable<Date | string> | null;
    notIn?: Enumerable<Date | string> | null;
    lt?: Date | string | null;
    lte?: Date | string | null;
    gt?: Date | string | null;
    gte?: Date | string | null;
};
export declare type BooleanFilter = {
    equals?: boolean | null;
    not?: boolean | BooleanFilter | null;
};
export declare type NullableStringFilter = {
    equals?: string | null | null;
    not?: string | null | NullableStringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type PostFilter = {
    every?: PostWhereInput | null;
    some?: PostWhereInput | null;
    none?: PostWhereInput | null;
};
export declare type MessageFilter = {
    every?: MessageWhereInput | null;
    some?: MessageWhereInput | null;
    none?: MessageWhereInput | null;
};
export declare type RoleFilter = {
    every?: RoleWhereInput | null;
    some?: RoleWhereInput | null;
    none?: RoleWhereInput | null;
};
export declare type PermissionFilter = {
    every?: PermissionWhereInput | null;
    some?: PermissionWhereInput | null;
    none?: PermissionWhereInput | null;
};
export declare type PermissionOrderByInput = {
    name?: OrderByArg | null;
    description?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
};
export declare type PostOrderByInput = {
    id?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
    published?: OrderByArg | null;
    title?: OrderByArg | null;
    content?: OrderByArg | null;
};
export declare type MessageOrderByInput = {
    id?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
    text?: OrderByArg | null;
};
export declare type RoleOrderByInput = {
    name?: OrderByArg | null;
    description?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
};
export declare type UserOrderByInput = {
    id?: OrderByArg | null;
    email?: OrderByArg | null;
    name?: OrderByArg | null;
    nickname?: OrderByArg | null;
    avatarUrl?: OrderByArg | null;
};
/**
 * Batch Payload for updateMany & deleteMany
 */
export declare type BatchPayload = {
    count: number;
};
/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
