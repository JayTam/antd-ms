/** 这个文件是因为antd-ms依赖了react-router-dom，但是并非安装依赖。
 * 实际场景下： 使用方的react-router-dom的版本无法固定下来
 * 因为这里我使用了react-router v6的matchPath方法，
 * 而react-router v5 和v6 版本中matchPath方法有破坏性更新，导致匹配规则失效
 * 所以这里直接引入了react-router v6的源码
 */

/// <reference types="react" />
export declare function invariant(cond: any, message: string): asserts cond;
export declare function warning(cond: any, message: string): void;
export declare function warningOnce(key: string, cond: boolean, message: string): void;
declare type ParamParseFailed = {
  failed: true;
};
declare type ParamParseSegment<Segment extends string> =
  Segment extends `${infer LeftSegment}/${infer RightSegment}`
    ? ParamParseSegment<LeftSegment> extends infer LeftResult
      ? ParamParseSegment<RightSegment> extends infer RightResult
        ? LeftResult extends string
          ? RightResult extends string
            ? LeftResult | RightResult
            : LeftResult
          : RightResult extends string
          ? RightResult
          : ParamParseFailed
        : ParamParseFailed
      : ParamParseSegment<RightSegment> extends infer RightResult
      ? RightResult extends string
        ? RightResult
        : ParamParseFailed
      : ParamParseFailed
    : Segment extends `:${infer Remaining}`
    ? Remaining
    : ParamParseFailed;
export declare type ParamParseKey<Segment extends string> =
  ParamParseSegment<Segment> extends string ? ParamParseSegment<Segment> : string;
/**
 * The parameters that were parsed from the URL path.
 */
export declare type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

type CompiledPathParam = any;
/**
 * A route object represents a logical route, with (optionally) its child
 * routes organized in a tree-like structure.
 */
export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/docs/en/v6/api#generatepath
 */
export declare function generatePath(path: string, params?: Params): string;
/**
 * A RouteMatch contains info about how a route matched a URL.
 */
export interface RouteMatch<ParamKey extends string = string> {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params<ParamKey>;
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string;
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string;
  /**
   * The route object that was used to match.
   */
  route: RouteObject;
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/docs/en/v6/api#matchroutes
 */
export declare function matchRoutes(
  routes: RouteObject[],
  locationArg: Partial<Location> | string,
  basename?: string,
): RouteMatch[] | null;
/**
 * A PathPattern is used to match on some portion of a URL pathname.
 */
export interface PathPattern<Path extends string = string> {
  /**
   * A string to match against a URL pathname. May contain `:id`-style segments
   * to indicate placeholders for dynamic parameters. May also end with `/*` to
   * indicate matching the rest of the URL pathname.
   */
  path: Path;
  /**
   * Should be `true` if the static portions of the `path` should be matched in
   * the same case.
   */
  caseSensitive?: boolean;
  /**
   * Should be `true` if this pattern should match the entire URL pathname.
   */
  end?: boolean;
}
/**
 * A PathMatch contains info about how a PathPattern matched on a URL pathname.
 */
export interface PathMatch<ParamKey extends string = string> {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params<ParamKey>;
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string;
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string;
  /**
   * The pattern that was used to match.
   */
  pattern: PathPattern;
}

export function matchPath<ParamKey extends ParamParseKey<Path>, Path extends string>(
  pattern: PathPattern<Path> | Path,
  pathname: string,
): PathMatch<ParamKey> | null {
  if (typeof pattern === 'string') {
    // eslint-disable-next-line no-param-reassign
    pattern = { path: pattern, caseSensitive: false, end: true };
  }

  const [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);

  const match = pathname.match(matcher);
  if (!match) return null;

  const matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, '$1');
  const captureGroups = match.slice(1);
  const params: Params = compiledParams.reduce<any>((memo, { paramName, isOptional }, index) => {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === '*') {
      const splatValue = captureGroups[index] || '';
      pathnameBase = matchedPathname
        .slice(0, matchedPathname.length - splatValue.length)
        .replace(/(.)\/+$/, '$1');
    }

    const value = captureGroups[index];
    if (isOptional && !value) {
      memo[paramName] = undefined;
    } else {
      memo[paramName] = (value || '').replace(/%2F/g, '/');
    }
    return memo;
  }, {});

  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  };
}

function compilePath(
  path: string,
  caseSensitive = false,
  end = true,
): [RegExp, CompiledPathParam[]] {
  const params: CompiledPathParam[] = [];
  let regexpSource =
    '^' +
    path
      .replace(/\/*\*?$/, '') // Ignore trailing / and /*, we'll handle it below
      .replace(/^\/*/, '/') // Make sure it has a leading /
      .replace(/[\\.*+^${}|()[\]]/g, '\\$&') // Escape special regex chars
      .replace(/\/:([\w-]+)(\?)?/g, (_: string, paramName: string, isOptional) => {
        params.push({ paramName, isOptional: isOptional != null });
        return isOptional ? '/?([^\\/]+)?' : '/([^\\/]+)';
      });

  if (path.endsWith('*')) {
    params.push({ paramName: '*' });
    regexpSource +=
      path === '*' || path === '/*'
        ? '(.*)$' // Already matched the initial /, just match the rest
        : '(?:\\/(.+)|\\/*)$'; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += '\\/*$';
  } else if (path !== '' && path !== '/') {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex, so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += '(?:(?=\\/|$))';
  } else {
    // Nothing to match for "" or "/"
  }

  const matcher = new RegExp(regexpSource, caseSensitive ? undefined : 'i');

  return [matcher, params];
}
