import type { ComponentProps } from 'astro/types';
import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions
} from 'astro/container';
import type { AstroCookies, ResolvedSessionConfig } from 'astro';
import { AstroSession } from 'node_modules/astro/dist/core/session';

type AstroComponentFactory = Parameters<AstroContainer['renderToString']>[0];

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<
  ContainerRenderOptions,
  'props'
> & {
  // @ts-expect-error ComponentProps expects a type that extends a function of arity 1, but
  // AstroComponentFactory is a function of arity 3. Either this is an internal mix up in Astro,
  // or I'm missing something.
  props?: ComponentProps<T>;
};

export async function renderAstroComponent<T extends AstroComponentFactory>(
  Component: T,
  options: ComponentContainerRenderOptions<T> = {}
) {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Component, options);

  // IF RUNNING IN JSDOM FOR EXAMPLE...
  // const template = document.createElement('template');
  // template.innerHTML = result;

  return result;
}

const defaultMockCookies = {
  set: () => {},
  delete: () => {},
  get: () => 'astro cookie'
};

const defaultConfig: ResolvedSessionConfig<'memory'> = {
  driver: 'memory',
  cookie: 'test-session',
  ttl: 60,
  options: {}
};

export function createSession() {
  return new AstroSession(defaultMockCookies as unknown as AstroCookies, defaultConfig);
}
