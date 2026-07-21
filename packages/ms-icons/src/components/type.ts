export interface AbstractNode {
  tag: string;
  attrs: Record<string, string>;
  children?: AbstractNode[];
}
export interface IconDefinition {
  name: string;
  theme: ThemeType;
  icon: ((primaryColor: string, secondaryColor: string) => AbstractNode) | AbstractNode;
}

export type ThemeType = 'filled' | 'outlined' | 'twotone';
export type ThemeTypeUpperCase = 'Filled' | 'Outlined' | 'TwoTone';

export interface AbstractNodeDefinition {
  name: string;
  theme: ThemeType;
  icon: AbstractNode;
}

export interface StringifyFn {
  (icon: AbstractNodeDefinition): string;
}

export interface SVG2DefinitionOptions {
  theme: ThemeType;
  extraNodeTransformFactories: TransformFactory[];
  stringify?: StringifyFn;
}

export interface XML2AbstractNodeOptions extends SVG2DefinitionOptions {
  name: string;
}

export type TransformOptions = Pick<XML2AbstractNodeOptions, 'name' | 'theme'>;

export interface TransformFactory {
  (options: TransformOptions): (asn: AbstractNode) => AbstractNode;
}
