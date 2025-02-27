type Any = { [x: string]: any };

export type PageParams<OtherParams extends Any = Any> = Promise<
  {
    locale: string;
  } & OtherParams
>;

export type PageSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
